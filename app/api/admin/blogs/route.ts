import { NextResponse } from 'next/server';
import db from '@/lib/db';

const slugify = (value: string) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'untitled';

const generateUniqueSlug = async (title: string, excludeId?: string) => {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let count = 1;

  while (true) {
    const [rows] = await db.execute(
      'SELECT id FROM blogs WHERE slug = ?' + (excludeId ? ' AND id <> ?' : ''),
      excludeId ? [slug, excludeId] : [slug]
    );

    if ((rows as any[]).length === 0) {
      return slug;
    }

    slug = `${baseSlug}-${count}`;
    count += 1;
  }
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const [rows] = await db.execute(
        'SELECT * FROM blogs WHERE slug = ? AND active = 1',
        [slug]
      );

      const row = (rows as any[])[0];

      if (!row) {
        return NextResponse.json(
          { success: false, error: 'Blog not found' },
          { status: 404 }
        );
      }

      row.active = Boolean(row.active);
      row.read_time = Number(row.read_time || 0);

      return NextResponse.json({ success: true, data: row });
    }

    const [rows] = await db.execute(
      'SELECT * FROM blogs WHERE active = 1 ORDER BY created_at DESC'
    );

    const data = (rows as any[]).map((item) => ({
      ...item,
      active: Boolean(item.active),
      read_time: Number(item.read_time || 0),
    }));

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Get blogs error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      category,
      read_time = 0,
      cover_image = '',
      content = '',
      active = true,
      publish_date = '',
      slug: providedSlug,
    } = body;

    if (!title || !category) {
      return NextResponse.json({ success: false, error: 'Title and category are required' }, { status: 400 });
    }

    const slug = providedSlug
      ? await generateUniqueSlug(String(providedSlug).trim())
      : await generateUniqueSlug(title);

    const [result]: any = await db.execute(
      'INSERT INTO blogs (title, slug, category, read_time, cover_image, content, active, publish_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        title,
        slug,
        category,
        Number(read_time) || 0,
        cover_image || '',
        content || '',
        active ? 1 : 0,
        publish_date || ''
      ]
    );

    const insertId = result.insertId;
    const [rows] = await db.execute('SELECT * FROM blogs WHERE id = ?', [insertId]);
    const row = (rows as any[])[0];
    row.active = Boolean(row.active);
    row.read_time = Number(row.read_time || 0);

    return NextResponse.json({ success: true, data: row });
  } catch (error: any) {
    console.error('Create blog error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Blog ID is required' }, { status: 400 });
    }

    const body = await req.json();
    const [existingRows] = await db.execute('SELECT * FROM blogs WHERE id = ?', [id]);
    const existing = (existingRows as any[])[0];

    if (!existing) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }

    const title = body.title ?? existing.title;
    const category = body.category ?? existing.category;
    const read_time = body.read_time !== undefined ? Number(body.read_time) : Number(existing.read_time || 0);
    const cover_image = body.cover_image ?? existing.cover_image;
    const content = body.content ?? existing.content;
    const active = body.active !== undefined ? Boolean(body.active) : Boolean(existing.active);
    const publish_date = body.publish_date !== undefined ? String(body.publish_date) : existing.publish_date ?? '';

    let slug = existing.slug;
    const providedSlug = typeof body.slug === 'string' ? body.slug.trim() : '';

    if (providedSlug) {
      slug = await generateUniqueSlug(providedSlug, id);
    } else if (body.title && body.title !== existing.title) {
      slug = await generateUniqueSlug(title, id);
    }

    await db.execute(
      'UPDATE blogs SET title = ?, slug = ?, category = ?, read_time = ?, cover_image = ?, content = ?, active = ?, publish_date = ? WHERE id = ?',
      [title, slug, category, read_time, cover_image || '', content || '', active ? 1 : 0, publish_date, id]
    );

    const [rows] = await db.execute('SELECT * FROM blogs WHERE id = ?', [id]);
    const row = (rows as any[])[0];
    row.active = Boolean(row.active);
    row.read_time = Number(row.read_time || 0);

    return NextResponse.json({ success: true, data: row });
  } catch (error: any) {
    console.error('Update blog error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Internal server error' }, { status: 500 });
  }
}
