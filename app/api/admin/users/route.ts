import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function GET() {
  try {
    const [rows] = await db.execute(
      'SELECT id, email, name, role, created_at, updated_at FROM users ORDER BY created_at DESC'
    );
    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, role = 'admin' } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = hashPassword(password);

    // Create user
    const [result] = await db.execute(
      'INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)',
      [email, passwordHash, name, role]
    );

    const insertResult = result as any;
    const [newUser] = await db.execute(
      'SELECT id, email, name, role, created_at FROM users WHERE id = ?',
      [insertResult.insertId]
    );

    return NextResponse.json({ success: true, data: (newUser as any[])[0] });
  } catch (error: any) {
    console.error('Create user error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { success: false, error: 'Email already exists' },
        { status: 400 }
      );
    }
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
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    await db.execute('DELETE FROM users WHERE id = ?', [id]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
