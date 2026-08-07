import { NextResponse } from 'next/server';
import db from '@/lib/db';

const ensureEventsTable = async () => {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      city VARCHAR(255) NOT NULL,
      date VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL,
      cover_image TEXT,
      attendees VARCHAR(64),
      leaders JSON,
      description LONGTEXT,
      images JSON,
      registration_link TEXT,
      registrations_open TINYINT(1) DEFAULT 0,
      active TINYINT(1) DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
};

const slugify = (value: string) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'untitled';

const generateUniqueSlug = async (name: string, excludeId?: string) => {
  const baseSlug = slugify(name);
  let slug = baseSlug;
  let count = 1;

  while (true) {
    const [rows] = await db.execute(
      'SELECT id FROM events WHERE slug = ?' + (excludeId ? ' AND id <> ?' : ''),
      excludeId ? [slug, excludeId] : [slug]
    );

    if ((rows as any[]).length === 0) {
      return slug;
    }

    slug = `${baseSlug}-${count}`;
    count += 1;
  }
};

const parseJsonField = (value: any, fallback: any = []) => {
  if (value === null || value === undefined || value === '') return fallback;
  if (Array.isArray(value) || typeof value === 'object') return value;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return fallback;
    try {
      return JSON.parse(trimmed);
    } catch {
      return fallback;
    }
  }
  return fallback;
};

const normalizeLeaders = (leaders: any) => {
  const parsed = parseJsonField(leaders, []);
  if (Array.isArray(parsed)) return parsed;
  if (parsed && typeof parsed === 'object') return [parsed];
  return [];
};

const serializeEvent = (row: any) => ({
  ...row,
  leaders: normalizeLeaders(row.leaders),
  images: parseJsonField(row.images, []),
  attendees: row.attendees !== null && row.attendees !== undefined ? String(row.attendees) : '',
  registrations_open: Boolean(row.registrations_open),
  cover_image: row.cover_image || '',
  description: row.description || '',
});

export async function GET(req: Request) {
  try {
    await ensureEventsTable();

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const [rows] = await db.execute('SELECT * FROM events WHERE slug = ? AND active = 1', [slug]);
      const row = (rows as any[])[0];

      if (!row) {
        return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: serializeEvent(row) });
    }

    const [rows] = await db.execute('SELECT * FROM events WHERE active = 1 ORDER BY created_at DESC');
    return NextResponse.json({ success: true, data: (rows as any[]).map(serializeEvent) });
  } catch (error: any) {
    console.error('Get events error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await ensureEventsTable();

    const body = await req.json();
    const {
      name,
      slug: providedSlug,
      city,
      date,
      type,
      cover_image = '',
      attendees = '',
      leaders = [],
      description = '',
      images = [],
      registration_link = '',
      registrations_open = false,
      active = true,
    } = body;

    if (!name || !city || !date || !type) {
      return NextResponse.json({ success: false, error: 'Name, city, date and type are required' }, { status: 400 });
    }

    const slug = providedSlug ? await generateUniqueSlug(String(providedSlug).trim()) : await generateUniqueSlug(name);
    const payload = JSON.stringify(normalizeLeaders(leaders));
    const imagePayload = JSON.stringify(Array.isArray(images) ? images : []);

    const [result]: any = await db.execute(
      'INSERT INTO events (name, slug, city, date, type, cover_image, attendees, leaders, description, images, registration_link, registrations_open, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        name,
        slug,
        city,
        date,
        type,
        cover_image || '',
        attendees === '' ? null : Number(attendees),
        payload,
        description || '',
        imagePayload,
        registration_link || '',
        registrations_open ? 1 : 0,
        active ? 1 : 0,
      ]
    );

    const [rows] = await db.execute('SELECT * FROM events WHERE id = ?', [result.insertId]);
    const row = (rows as any[])[0];
    return NextResponse.json({ success: true, data: serializeEvent(row) });
  } catch (error: any) {
    console.error('Create event error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await ensureEventsTable();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Event ID is required' }, { status: 400 });
    }

    const body = await req.json();
    const [existingRows] = await db.execute('SELECT * FROM events WHERE id = ?', [id]);
    const existing = (existingRows as any[])[0];

    if (!existing) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }

    const name = body.name ?? existing.name;
    const city = body.city ?? existing.city;
    const date = body.date ?? existing.date;
    const type = body.type ?? existing.type;
    const cover_image = body.cover_image ?? existing.cover_image;
    const attendees = body.attendees !== undefined ? (body.attendees === '' ? null : Number(body.attendees)) : existing.attendees;
    const leaders = body.leaders !== undefined ? JSON.stringify(normalizeLeaders(body.leaders)) : existing.leaders;
    const description = body.description ?? existing.description;
    const images = body.images !== undefined ? JSON.stringify(Array.isArray(body.images) ? body.images : []) : existing.images;
    const registration_link = body.registration_link ?? existing.registration_link;
    const registrations_open = body.registrations_open !== undefined ? (body.registrations_open ? 1 : 0) : existing.registrations_open;
    const active = body.active !== undefined ? (body.active ? 1 : 0) : existing.active;

    let slug = existing.slug;
    const providedSlug = typeof body.slug === 'string' ? body.slug.trim() : '';

    if (providedSlug) {
      slug = await generateUniqueSlug(providedSlug, id);
    } else if (body.name && body.name !== existing.name) {
      slug = await generateUniqueSlug(name, id);
    }

    await db.execute(
      'UPDATE events SET name = ?, slug = ?, city = ?, date = ?, type = ?, cover_image = ?, attendees = ?, leaders = ?, description = ?, images = ?, registration_link = ?, registrations_open = ?, active = ? WHERE id = ?',
      [name, slug, city, date, type, cover_image || '', attendees, leaders, description || '', images, registration_link || '', registrations_open, active, id]
    );

    const [rows] = await db.execute('SELECT * FROM events WHERE id = ?', [id]);
    const row = (rows as any[])[0];
    return NextResponse.json({ success: true, data: serializeEvent(row) });
  } catch (error: any) {
    console.error('Update event error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await ensureEventsTable();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Event ID is required' }, { status: 400 });
    }

    const [existingRows] = await db.execute('SELECT * FROM events WHERE id = ?', [id]);
    const existing = (existingRows as any[])[0];

    if (!existing) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }

    await db.execute('DELETE FROM events WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Event deleted successfully' });
  } catch (error: any) {
    console.error('Delete event error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}
