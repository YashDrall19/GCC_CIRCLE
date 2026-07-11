import { NextResponse } from 'next/server';
import db from '@/lib/db';

interface QuestionAnswer {
  question: string;
  answer: string;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const [rows] = await db.execute(
        'SELECT * FROM legends WHERE id = ?',
        [id]
      );
      const legend = (rows as any[])[0];

      if (!legend) {
        return NextResponse.json(
          { success: false, error: 'Legend not found' },
          { status: 404 }
        );
      }

      let questionnaire: QuestionAnswer[] = [];
      try {
        questionnaire = JSON.parse(legend.questionnaire || '[]');
      } catch {
        questionnaire = [];
      }

      return NextResponse.json({
        success: true,
        data: { ...legend, questionnaire },
      });
    }

    const [allRows] = await db.execute(
      'SELECT * FROM legends ORDER BY created_at DESC'
    );

    const legends = (allRows as any[]).map((l) => {
      let questionnaire: QuestionAnswer[] = [];
      try {
        questionnaire = JSON.parse(l.questionnaire || '[]');
      } catch {
        questionnaire = [];
      }
      return { ...l, questionnaire };
    });

    return NextResponse.json({ success: true, data: legends });
  } catch (error: any) {
    console.error('Get legends error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, designation, company, linkedin, image_url, quote, type, date, questionnaire } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    const qaJson = JSON.stringify(questionnaire || []);

    const [result] = await db.execute(
      `INSERT INTO legends (name, designation, company, linkedin, image_url, quote, type, date, questionnaire)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        designation || '',
        company || '',
        linkedin || '',
        image_url || '',
        quote || '',
        type || 'tech',
        date || '',
        qaJson,
      ]
    );

    const legendId = (result as any).insertId;
    const [rows] = await db.execute(
      'SELECT * FROM legends WHERE id = ?',
      [legendId]
    );

    const legend = (rows as any[])[0];
    return NextResponse.json({
      success: true,
      data: { ...legend, questionnaire: JSON.parse(legend.questionnaire || '[]') },
    });
  } catch (error: any) {
    console.error('Create legend error:', error);
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
    const { name, designation, company, linkedin, image_url, quote, type, date, questionnaire } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Legend ID is required' },
        { status: 400 }
      );
    }

    const qaJson = JSON.stringify(questionnaire || []);

    await db.execute(
      `UPDATE legends SET name = ?, designation = ?, company = ?, linkedin = ?, image_url = ?, quote = ?, type = ?, date = ?, questionnaire = ? WHERE id = ?`,
      [
        name || '',
        designation || '',
        company || '',
        linkedin || '',
        image_url || '',
        quote || '',
        type || 'tech',
        date || '',
        qaJson,
        id,
      ]
    );

    const [rows] = await db.execute(
      'SELECT * FROM legends WHERE id = ?',
      [id]
    );

    const legend = (rows as any[])[0];
    return NextResponse.json({
      success: true,
      data: { ...legend, questionnaire: JSON.parse(legend.questionnaire || '[]') },
    });
  } catch (error: any) {
    console.error('Update legend error:', error);
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
        { success: false, error: 'Legend ID is required' },
        { status: 400 }
      );
    }

    await db.execute('DELETE FROM legends WHERE id = ?', [id]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete legend error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
