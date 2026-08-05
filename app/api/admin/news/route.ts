import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const [rows] = await db.execute(
        'SELECT * FROM news WHERE id = ?',
        [id]
      );

      const row = (rows as any[])[0];

      if (!row) {
        return NextResponse.json(
          {
            success: false,
            error: 'News not found',
          },
          {
            status: 404,
          }
        );
      }

      row.active = Boolean(row.active);

      return NextResponse.json({
        success: true,
        data: row,
      });
    }

    const [rows] = await db.execute(
      'SELECT * FROM news ORDER BY created_at DESC'
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
    console.error('Get news error:', error);

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

export async function POST(req: NextRequest) {
  try {
    const {
      title,
      description,
      pdf_url,
      active,
    } = await req.json();

    if (!title || !description || !pdf_url) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title, Description and PDF are required.',
        },
        {
          status: 400,
        }
      );
    }

    const [result]: any = await db.execute(
      `
      INSERT INTO news
      (
        title,
        description,
        pdf_url,
        active
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        title,
        description,
        pdf_url,
        active ? 1 : 0,
      ]
    );

    const [rows] = await db.execute(
      'SELECT * FROM news WHERE id = ?',
      [result.insertId]
    );

    const row = (rows as any[])[0];

    row.active = Boolean(row.active);

    return NextResponse.json({
      success: true,
      data: row,
    });
  } catch (error: any) {
    console.error('Create news error:', error);

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

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'News ID is required.',
        },
        {
          status: 400,
        }
      );
    }

    const {
      title,
      description,
      pdf_url,
      active,
    } = await req.json();

    if (!title || !description || !pdf_url) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title, Description and PDF are required.',
        },
        {
          status: 400,
        }
      );
    }

    await db.execute(
      `
      UPDATE news
      SET
        title = ?,
        description = ?,
        pdf_url = ?,
        active = ?
      WHERE id = ?
      `,
      [
        title,
        description,
        pdf_url,
        active ? 1 : 0,
        id,
      ]
    );

    const [rows] = await db.execute(
      'SELECT * FROM news WHERE id = ?',
      [id]
    );

    const row = (rows as any[])[0];

    row.active = Boolean(row.active);

    return NextResponse.json({
      success: true,
      data: row,
    });
  } catch (error: any) {
    console.error('Update news error:', error);

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

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'News ID is required.',
        },
        {
          status: 400,
        }
      );
    }

    await db.execute(
      'DELETE FROM news WHERE id = ?',
      [id]
    );

    return NextResponse.json({
      success: true,
      message: 'News deleted successfully.',
    });
  } catch (error: any) {
    console.error('Delete news error:', error);

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