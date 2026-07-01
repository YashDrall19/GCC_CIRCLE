import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, secret } = body;

    // Simple secret check to prevent unauthorized access
    if (secret !== process.env.ADMIN_SEED_SECRET && secret !== 'gcc-circle-admin-2024') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const [existingRows] = await db.execute(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if ((existingRows as any[]).length > 0) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = hashPassword(password);

    // Create user
    const [result] = await db.execute(
      'INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)',
      [email, passwordHash, name, 'admin']
    );

    const insertResult = result as any;
    const [newUser] = await db.execute(
      'SELECT id, email, name, role, created_at FROM users WHERE id = ?',
      [insertResult.insertId]
    );

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      data: (newUser as any[])[0],
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
