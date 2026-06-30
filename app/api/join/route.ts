import { NextResponse } from 'next/server';
import { supabase } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { first_name, last_name, email, phone, source, company, linkedin, title, agreed, whatsapp } = body;

    const { error } = await supabase
      .from('leads')
      .insert({
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
      });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Data added successfully',
    });
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
