import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await db.execute('SELECT * FROM reports ORDER BY created_at DESC');

    const data = (rows as any[]).map((row: any) => ({
      ...row,
      active: Boolean(row.active),
    }));

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, image_url, pdf_url, active } = await req.json();

    if (!title || !description) {
      return NextResponse.json({ success: false, error: 'Title and description are required' }, { status: 400 });
    }

    const [result]: any = await db.execute(
      'INSERT INTO reports (title, description, image_url, pdf_url, active) VALUES (?, ?, ?, ?, ?)',
      [title, description, image_url || '', pdf_url || '', active ? 1 : 0]
    );

    const [rows] = await db.execute('SELECT * FROM reports WHERE id = ?', [result.insertId]);
    const row = (rows as any[])[0];

    return NextResponse.json({ success: true, data: { ...row, active: Boolean(row.active) } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const { title, description, image_url, pdf_url, active } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    await db.execute(
      'UPDATE reports SET title = ?, description = ?, image_url = ?, pdf_url = ?, active = ? WHERE id = ?',
      [title, description, image_url, pdf_url, active ? 1 : 0, id]
    );

    const [rows] = await db.execute('SELECT * FROM reports WHERE id = ?', [id]);
    const row = (rows as any[])[0];

    return NextResponse.json({ success: true, data: { ...row, active: Boolean(row.active) } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }

    await db.execute('DELETE FROM reports WHERE id = ?', [id]);

    return NextResponse.json({ success: true, message: 'Report deleted' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
