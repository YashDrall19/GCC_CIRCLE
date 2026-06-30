import { NextResponse } from 'next/server';
import { supabase } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, email, linkedin, message, purpose } = body;

    const { error } = await supabase
      .from('contactform')
      .insert({
        name,
        phone,
        email,
        linkedin,
        message,
        purpose,
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
      message: 'Contact form submitted successfully',
    });
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
