import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const offset = (page - 1) * limit;

    let countQuery = 'SELECT COUNT(*) as total FROM contactform';
    let dataQuery = 'SELECT * FROM contactform ORDER BY created_at DESC LIMIT ? OFFSET ?';
    const params: any[] = [limit, offset];

    if (search) {
      const searchPattern = `%${search}%`;
      countQuery = 'SELECT COUNT(*) as total FROM contactform WHERE name LIKE ? OR email LIKE ? OR company LIKE ?';
      dataQuery = 'SELECT * FROM contactform WHERE name LIKE ? OR email LIKE ? OR company LIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?';
      params.unshift(searchPattern, searchPattern, searchPattern);
    }

    const [countRows] = await db.execute(countQuery, search ? [search, search, search] : []);
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
  } catch (error) {
    console.error('Get contacts error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
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
  } catch (error) {
    console.error('Delete contact error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
