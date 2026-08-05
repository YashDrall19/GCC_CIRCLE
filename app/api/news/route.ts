import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await db.execute(
      `
      SELECT
        id,
        title,
        description,
        pdf_url,
        active,
        created_at
      FROM news
      WHERE active = 1
      ORDER BY created_at DESC
      `
    );

    const data = (rows as any[]).map((row) => ({
      ...row,
      active: Boolean(row.active),
    }));

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error('Get public news error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Internal server error',
      },
      {
        status: 500,
      }
    );
  }
}