import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM legend_questions ORDER BY display_order ASC, created_at ASC'
    );
    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    console.error('Get questions error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, display_order } = body;

    if (!question) {
      return NextResponse.json(
        { success: false, error: 'Question is required' },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      'INSERT INTO legend_questions (question, display_order) VALUES (?, ?)',
      [question, display_order || 0]
    );

    const insertId = (result as any).insertId;
    const [rows] = await db.execute(
      'SELECT * FROM legend_questions WHERE id = ?',
      [insertId]
    );

    return NextResponse.json({ success: true, data: (rows as any[])[0] });
  } catch (error: any) {
    console.error('Create question error:', error);
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
    const { question, display_order } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Question ID is required' },
        { status: 400 }
      );
    }

    const updates: string[] = [];
    const params: any[] = [];
    if (question !== undefined) {
      updates.push('question = ?');
      params.push(question);
    }
    if (display_order !== undefined) {
      updates.push('display_order = ?');
      params.push(display_order);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400 }
      );
    }

    params.push(id);
    await db.execute(
      `UPDATE legend_questions SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    const [rows] = await db.execute(
      'SELECT * FROM legend_questions WHERE id = ?',
      [id]
    );

    return NextResponse.json({ success: true, data: (rows as any[])[0] });
  } catch (error: any) {
    console.error('Update question error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Question ID is required' },
        { status: 400 }
      );
    }

    await db.execute('DELETE FROM legend_questions WHERE id = ?', [id]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete question error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
