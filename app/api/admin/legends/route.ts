import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const supabase = getSupabase();

    if (id) {
      const { data: legend, error: legendError } = await supabase
        .from('legends')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (legendError) throw legendError;
      if (!legend) {
        return NextResponse.json(
          { success: false, error: 'Legend not found' },
          { status: 404 }
        );
      }

      const { data: answers, error: answersError } = await supabase
        .from('legend_answers')
        .select('id, question_id, answer, display_order')
        .eq('legend_id', id)
        .order('display_order', { ascending: true });

      if (answersError) throw answersError;

      return NextResponse.json({
        success: true,
        data: { ...legend, answers: answers || [] },
      });
    }

    const { data, error } = await supabase
      .from('legends')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, data });
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
    const { name, designation, company, linkedin, image_url, quote, type, date, answers } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { data: legend, error: legendError } = await supabase
      .from('legends')
      .insert({
        name,
        designation: designation || '',
        company: company || '',
        linkedin: linkedin || '',
        image_url: image_url || '',
        quote: quote || '',
        type: type || 'tech',
        date: date || '',
      })
      .select()
      .single();

    if (legendError) throw legendError;

    if (answers && answers.length > 0) {
      const answerRows = answers
        .filter((a: any) => a.question_id && a.answer && a.answer.trim())
        .map((a: any, idx: number) => ({
          legend_id: legend.id,
          question_id: a.question_id,
          answer: a.answer,
          display_order: a.display_order ?? idx,
        }));

      if (answerRows.length > 0) {
        const { error: answersError } = await supabase
          .from('legend_answers')
          .insert(answerRows);

        if (answersError) throw answersError;
      }
    }

    return NextResponse.json({ success: true, data: legend });
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
    const body = await req.json();
    const { id, name, designation, company, linkedin, image_url, quote, type, date, answers } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Legend ID is required' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();

    const { data: legend, error: legendError } = await supabase
      .from('legends')
      .update({
        name,
        designation: designation || '',
        company: company || '',
        linkedin: linkedin || '',
        image_url: image_url || '',
        quote: quote || '',
        type: type || 'tech',
        date: date || '',
      })
      .eq('id', id)
      .select()
      .single();

    if (legendError) throw legendError;

    if (answers !== undefined) {
      await supabase.from('legend_answers').delete().eq('legend_id', id);

      if (answers && answers.length > 0) {
        const answerRows = answers
          .filter((a: any) => a.question_id && a.answer && a.answer.trim())
          .map((a: any, idx: number) => ({
            legend_id: id,
            question_id: a.question_id,
            answer: a.answer,
            display_order: a.display_order ?? idx,
          }));

        if (answerRows.length > 0) {
          const { error: answersError } = await supabase
            .from('legend_answers')
            .insert(answerRows);

          if (answersError) throw answersError;
        }
      }
    }

    return NextResponse.json({ success: true, data: legend });
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

    const supabase = getSupabase();
    const { error } = await supabase.from('legends').delete().eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete legend error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
