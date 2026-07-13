import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '10')));
    const search = searchParams.get('search') || '';
    const offset = Math.max(0, (page - 1) * limit);

    const safeLimit = limit;
    const safeOffset = offset;

    let countQuery = 'SELECT COUNT(*) as total FROM contactform';
    let dataQuery = `SELECT * FROM contactform ORDER BY created_at DESC LIMIT ${safeLimit} OFFSET ${safeOffset}`;
    const params: any[] = [];

    if (search) {
      const searchPattern = `%${search}%`;
      countQuery = 'SELECT COUNT(*) as total FROM contactform WHERE name LIKE ? OR email LIKE ? OR company LIKE ?';
      dataQuery = `SELECT * FROM contactform WHERE name LIKE ? OR email LIKE ? OR company LIKE ? ORDER BY created_at DESC LIMIT ${safeLimit} OFFSET ${safeOffset}`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    const [countRows] = await db.execute(countQuery, params);
    const [dataRows] = await db.execute(dataQuery, params);

    const total = Number((countRows as any[])[0].total || 0);

    return NextResponse.json({
      success: true,
      data: dataRows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Get contacts error:', error);
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
        { success: false, error: 'Contact ID is required' },
        { status: 400 }
      );
    }

    await db.execute('DELETE FROM contactform WHERE id = ?', [id]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete contact error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
