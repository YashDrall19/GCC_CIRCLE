import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const offset = (page - 1) * limit;

    let countQuery = 'SELECT COUNT(*) as total FROM leads';
    let dataQuery = 'SELECT * FROM leads ORDER BY created_at DESC LIMIT ? OFFSET ?';
    const params: any[] = [limit, offset];

    if (search) {
      const searchPattern = `%${search}%`;
      countQuery = 'SELECT COUNT(*) as total FROM leads WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR company LIKE ?';
      dataQuery = 'SELECT * FROM leads WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR company LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?';
      params.unshift(searchPattern, searchPattern, searchPattern, searchPattern);
    }

    const [countRows] = await db.execute(countQuery, search ? [search, search, search, search] : []);
    const [dataRows] = await db.execute(dataQuery, params);

    const total = (countRows as any[])[0].total;

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
    console.error('Get leads error:', error);
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
        { success: false, error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    await db.execute('DELETE FROM leads WHERE id = ?', [id]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete lead error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
