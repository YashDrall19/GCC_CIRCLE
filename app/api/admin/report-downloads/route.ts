import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.max(
      1,
      Math.min(100, parseInt(searchParams.get('limit') || '10'))
    );

    const search = searchParams.get('search') || '';

    const offset = Math.max(0, (page - 1) * limit);

    const safeLimit = limit;
    const safeOffset = offset;

    let countQuery =
      'SELECT COUNT(*) as total FROM report_downloads';

    let dataQuery = `
      SELECT *
      FROM report_downloads
      ORDER BY downloaded_at DESC
      LIMIT ${safeLimit}
      OFFSET ${safeOffset}
    `;

    const params: any[] = [];

    if (search) {
      const searchPattern = `%${search}%`;

      countQuery = `
        SELECT COUNT(*) as total
        FROM report_downloads
        WHERE
          name LIKE ?
          OR email LIKE ?
          OR phone LIKE ?
          OR company LIKE ?
          OR report_name LIKE ?
      `;

      dataQuery = `
        SELECT *
        FROM report_downloads
        WHERE
          name LIKE ?
          OR email LIKE ?
          OR phone LIKE ?
          OR company LIKE ?
          OR report_name LIKE ?
        ORDER BY downloaded_at DESC
        LIMIT ${safeLimit}
        OFFSET ${safeOffset}
      `;

      params.push(
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern,
        searchPattern
      );
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
    console.error('Get report downloads error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error',
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Download ID is required',
        },
        {
          status: 400,
        }
      );
    }

    await db.execute(
      'DELETE FROM report_downloads WHERE id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.error('Delete report download error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error',
      },
      {
        status: 500,
      }
    );
  }
}