import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import db from '@/lib/db';

// We store legends data in the canonical `leads` table. Admin-only fields
// such as image_url, active, questionnaire (JSON), and type are persisted
// into the `leads` table. Public join submissions continue to insert into
// `leads` with organic = true.

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const [rows] = await db.execute('SELECT * FROM leads WHERE id = ?', [id]);
      const row = (rows as any[])[0];

      if (!row) {
        return NextResponse.json({ success: false, error: 'Legend not found' }, { status: 404 });
      }

      // parse questionnaire JSON if present
      try {
        row.questionnaire = row.questionnaire ? JSON.parse(row.questionnaire) : [];
      } catch (e) {
        row.questionnaire = [];
      }

      return NextResponse.json({ success: true, data: row });
    }

    const [allRows] = await db.execute('SELECT * FROM leads ORDER BY created_at DESC');
    const data = (allRows as any[]).map((r) => {
      try {
        r.questionnaire = r.questionnaire ? JSON.parse(r.questionnaire) : [];
      } catch (e) {
        r.questionnaire = [];
      }
      return r;
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Get legends (leads) error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      first_name,
      last_name,
      title,
      email,
      phone,
      source,
      company,
      linkedin,
      agreed = false,
      whatsapp = false,
      image_url = '',
      quote = '',
      type = 'tech',
      date = '',
      active = true,
      questionnaire = [],
      organic = false,
    } = body;

    if (!first_name || !last_name || !email) {
      return NextResponse.json(
        { success: false, error: 'first_name, last_name and email are required' },
        { status: 400 }
      );
    }

    const questionnaireJson = Array.isArray(questionnaire)
      ? JSON.stringify(questionnaire)
      : JSON.stringify([]);

    const [result]: any = await db.execute(
      `INSERT INTO leads (
        first_name,
        last_name,
        email,
        phone,
        source,
        company,
        linkedin,
        title,
        agreed,
        whatsapp,
        image_url,
        quote,
        type,
        date,
        active,
        questionnaire,
        organic
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name,
        last_name,
        email,
        phone || '',
        source || '',
        company || '',
        linkedin || '',
        title || '',
        agreed ? 1 : 0,
        whatsapp ? 1 : 0,
        image_url || '',
        quote || '',
        type || 'tech',
        date || '',
        active ? 1 : 0,
        questionnaireJson,
        organic ? 1 : 0,
      ]
    );

    const insertId = result.insertId;

    const [rows] = await db.execute(
      'SELECT * FROM leads WHERE id = ?',
      [insertId]
    );

    const row = (rows as any[])[0];

    try {
      row.questionnaire = row.questionnaire
        ? JSON.parse(row.questionnaire)
        : [];
    } catch {
      row.questionnaire = [];
    }

    return NextResponse.json({ success: true, data: row });
  } catch (error: any) {
    console.error('Create legend (lead) error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: 'Legend ID is required' }, { status: 400 });
    }

    const {
      first_name,
      last_name,
      title,
      email,
      phone,
      source,
      company,
      linkedin,
      agreed = false,
      whatsapp = false,
      image_url = '',
      quote = '',
      type = 'tech',
      date = '',
      active = true,
      questionnaire = [],
      organic = false,
    } = body;

    const questionnaireJson = Array.isArray(questionnaire) ? JSON.stringify(questionnaire) : JSON.stringify([]);

    await db.execute(
      `UPDATE leads SET first_name = ?, last_name = ?, email = ?, phone = ?, source = ?, company = ?, linkedin = ?, title = ?, agreed = ?, whatsapp = ?, image_url = ?, quote = ?, type = ?, date = ?, active = ?, questionnaire = ?, organic = ? WHERE id = ?`,
      [
        first_name || '',
        last_name || '',
        email || '',
        phone || '',
        source || '',
        company || '',
        linkedin || '',
        title || '',
        agreed ? 1 : 0,
        whatsapp ? 1 : 0,
        image_url || '',
        quote || '',
        type || 'tech',
        date || '',
        active ? 1 : 0,
        questionnaireJson,
        organic ? 1 : 0,
        id,
      ]
    );

    const [rows] = await db.execute('SELECT * FROM leads WHERE id = ?', [id]);
    const row = (rows as any[])[0];
    try {
      row.questionnaire = row.questionnaire ? JSON.parse(row.questionnaire) : [];
    } catch (e) {
      row.questionnaire = [];
    }

    return NextResponse.json({ success: true, data: row });
  } catch (error: any) {
    console.error('Update legend (lead) error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Legend ID is required' }, { status: 400 });
    }

    await db.execute('DELETE FROM leads WHERE id = ?', [id]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete legend (lead) error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Internal server error' }, { status: 500 });
  }
}
