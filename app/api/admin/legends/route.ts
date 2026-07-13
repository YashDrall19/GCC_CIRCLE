import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import db from '@/lib/db';

interface QuestionAnswer {
  question: string;
  answer: string;
}

async function getLegendById(id: string) {
  const [rows] = await db.execute('SELECT * FROM legends WHERE id = ?', [id]);
  return (rows as any[])[0] || null;
}

async function fetchLegendQuestionnaire(legendId: string) {
  const [rows] = await db.execute(
    `SELECT q.question, a.answer
     FROM legend_answers a
     JOIN legend_questions q ON a.question_id = q.id
     WHERE a.legend_id = ?
     ORDER BY q.display_order ASC`,
    [legendId]
  );
  return (rows as any[]).map((row) => ({
    question: row.question,
    answer: row.answer,
  }));
}

async function fetchQuestionIdMap(questionnaire: QuestionAnswer[]) {
  const questions = questionnaire
    .map((item) => item.question?.trim())
    .filter((question): question is string => Boolean(question));

  if (!questions.length) {
    return {} as Record<string, string>;
  }

  const placeholders = questions.map(() => '?').join(', ');
  const [rows] = await db.execute(
    `SELECT id, question FROM legend_questions WHERE question IN (${placeholders})`,
    questions
  );

  const map: Record<string, string> = {};
  for (const row of rows as any[]) {
    const question = row.question?.trim();
    if (question) {
      map[question] = row.id;
    }
  }

  return map;
}

async function persistLegendAnswers(legendId: string, questionnaire: QuestionAnswer[]) {
  const questionIdMap = await fetchQuestionIdMap(questionnaire);
  const inserts = questionnaire
    .map((item, index) => {
      const questionId = questionIdMap[item.question?.trim() || ''];
      if (!questionId) return null;
      return db.execute(
        'INSERT INTO legend_answers (id, legend_id, question_id, answer, display_order) VALUES (?, ?, ?, ?, ?)',
        [randomUUID(), legendId, questionId, item.answer || '', index]
      );
    })
    .filter(Boolean) as Array<Promise<any>>;

  await Promise.all(inserts);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const legend = await getLegendById(id);

      if (!legend) {
        return NextResponse.json(
          { success: false, error: 'Legend not found' },
          { status: 404 }
        );
      }

      const questionnaire = await fetchLegendQuestionnaire(id);

      return NextResponse.json({
        success: true,
        data: { ...legend, questionnaire },
      });
    }

    const [allRows] = await db.execute(
      'SELECT * FROM legends ORDER BY created_at DESC'
    );

    return NextResponse.json({ success: true, data: allRows });
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
    const {
      name,
      designation,
      company,
      linkedin,
      image_url,
      quote,
      type,
      date,
      active = true,
      questionnaire,
    } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    const legendId = randomUUID();
    await db.execute(
      `INSERT INTO legends (id, name, designation, company, linkedin, image_url, quote, type, date, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        legendId,
        name,
        designation || '',
        company || '',
        linkedin || '',
        image_url || '',
        quote || '',
        type || 'tech',
        date || '',
        active ? 1 : 0,
      ]
    );

    if (Array.isArray(questionnaire) && questionnaire.length > 0) {
      await persistLegendAnswers(legendId, questionnaire);
    }

    const legend = await getLegendById(legendId);
    const legendQuestionnaire = await fetchLegendQuestionnaire(legendId);

    return NextResponse.json({
      success: true,
      data: { ...legend, questionnaire: legendQuestionnaire },
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
    const {
      name,
      designation,
      company,
      linkedin,
      image_url,
      quote,
      type,
      date,
      active = true,
      questionnaire,
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Legend ID is required' },
        { status: 400 }
      );
    }

    await db.execute(
      `UPDATE legends SET name = ?, designation = ?, company = ?, linkedin = ?, image_url = ?, quote = ?, type = ?, date = ?, active = ? WHERE id = ?`,
      [
        name || '',
        designation || '',
        company || '',
        linkedin || '',
        image_url || '',
        quote || '',
        type || 'tech',
        date || '',
        active ? 1 : 0,
        id,
      ]
    );

    await db.execute('DELETE FROM legend_answers WHERE legend_id = ?', [id]);

    if (Array.isArray(questionnaire) && questionnaire.length > 0) {
      await persistLegendAnswers(id, questionnaire);
    }

    const legend = await getLegendById(id);
    const legendQuestionnaire = await fetchLegendQuestionnaire(id);

    return NextResponse.json({
      success: true,
      data: { ...legend, questionnaire: legendQuestionnaire },
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
