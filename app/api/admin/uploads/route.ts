import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filename, data } = body as { filename: string; data: string };

    if (!filename || !data) {
      return NextResponse.json({ success: false, error: 'filename and data required' }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // sanitize filename
    const safeName = `${Date.now()}_${filename.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`;
    const filePath = path.join(uploadsDir, safeName);

    // data is expected to be base64 without data:<mime>;base64, prefix
    const buffer = Buffer.from(data, 'base64');
    // convert to Uint8Array for strict typing compatibility with fs.writeFileSync
    const uint8 = Uint8Array.from(buffer as any);
    fs.writeFileSync(filePath, uint8);

    const publicPath = `/uploads/${safeName}`;
    return NextResponse.json({ success: true, url: publicPath });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Upload failed' }, { status: 500 });
  }
}
