import { NextResponse } from 'next/server';
import db from '@/lib/db';

async function ensureTables() {
  await db.execute(`CREATE TABLE IF NOT EXISTS legend_questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

  await db.execute(`CREATE TABLE IF NOT EXISTS legends (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(255) DEFAULT '',
    company VARCHAR(255) DEFAULT '',
    linkedin TEXT DEFAULT '',
    image_url TEXT DEFAULT '',
    quote TEXT DEFAULT '',
    type VARCHAR(50) NOT NULL DEFAULT 'tech',
    date VARCHAR(100) DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);

  await db.execute(`CREATE TABLE IF NOT EXISTS legend_answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    legend_id INT NOT NULL,
    question_id INT NOT NULL,
    answer TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_legend_question (legend_id, question_id),
    CONSTRAINT fk_answers_legend FOREIGN KEY (legend_id)
      REFERENCES legends(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_answers_question FOREIGN KEY (question_id)
      REFERENCES legend_questions(id) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`);
}

export async function GET(req: Request) {
  try {
    await ensureTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const [legendRows] = await db.execute(
        'SELECT * FROM legends WHERE id = ?',
        [id]
      );
      const legend = (legendRows as any[])[0];

      if (!legend) {
        return NextResponse.json(
          { success: false, error: 'Legend not found' },
          { status: 404 }
        );
      }

      const [answerRows] = await db.execute(
        'SELECT id, question_id, answer, display_order FROM legend_answers WHERE legend_id = ? ORDER BY display_order ASC',
        [id]
      );

      return NextResponse.json({
        success: true,
        data: { ...legend, answers: answerRows },
      });
    }

    const [rows] = await db.execute(
      'SELECT * FROM legends ORDER BY created_at DESC'
    );

    return NextResponse.json({ success: true, data: rows });
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
    await ensureTables();
    const body = await req.json();
    const { name, designation, company, linkedin, image_url, quote, type, date, answers } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    const [result] = await db.execute(
      `INSERT INTO legends (name, designation, company, linkedin, image_url, quote, type, date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        designation || '',
        company || '',
        linkedin || '',
        image_url || '',
        quote || '',
        type || 'tech',
        date || '',
      ]
    );

    const legendId = (result as any).insertId;

    if (answers && answers.length > 0) {
      const validAnswers = answers
        .filter((a: any) => a.question_id && a.answer && a.answer.trim())
        .map((a: any, idx: number) => [
          legendId,
          a.question_id,
          a.answer,
          a.display_order ?? idx,
        ]);

      for (const ans of validAnswers) {
        await db.execute(
          'INSERT INTO legend_answers (legend_id, question_id, answer, display_order) VALUES (?, ?, ?, ?)',
          ans
        );
      }
    }

    const [rows] = await db.execute(
      'SELECT * FROM legends WHERE id = ?',
      [legendId]
    );

    return NextResponse.json({ success: true, data: (rows as any[])[0] });
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
    await ensureTables();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();
    const { name, designation, company, linkedin, image_url, quote, type, date, answers } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Legend ID is required' },
        { status: 400 }
      );
    }

    await db.execute(
      `UPDATE legends SET name = ?, designation = ?, company = ?, linkedin = ?, image_url = ?, quote = ?, type = ?, date = ? WHERE id = ?`,
      [
        name || '',
        designation || '',
        company || '',
        linkedin || '',
        image_url || '',
        quote || '',
        type || 'tech',
        date || '',
        id,
      ]
    );

    if (answers !== undefined) {
      await db.execute('DELETE FROM legend_answers WHERE legend_id = ?', [id]);

      if (answers && answers.length > 0) {
        const validAnswers = answers
          .filter((a: any) => a.question_id && a.answer && a.answer.trim())
          .map((a: any, idx: number) => [
            id,
            a.question_id,
            a.answer,
            a.display_order ?? idx,
          ]);

        for (const ans of validAnswers) {
          await db.execute(
            'INSERT INTO legend_answers (legend_id, question_id, answer, display_order) VALUES (?, ?, ?, ?)',
            ans
          );
        }
      }
    }

    const [rows] = await db.execute(
      'SELECT * FROM legends WHERE id = ?',
      [id]
    );

    return NextResponse.json({ success: true, data: (rows as any[])[0] });
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
    await ensureTables();
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
