import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filename, data } = body as { filename: string; data: string };

    if (!filename || !data) {
      return NextResponse.json({ success: false, error: 'filename and data required' }, { status: 400 });
    }

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // sanitize filename
    const safeName = `${Date.now()}_${filename.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`;
    const filePath = path.join(uploadsDir, safeName);

    // data is expected to be base64 without data:<mime>;base64, prefix
    const buffer = Buffer.from(data, 'base64');
    const uint8 = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    fs.writeFileSync(filePath, uint8);

    const publicPath = `/uploads/${safeName}`;
    return NextResponse.json({ success: true, url: publicPath });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Upload failed' }, { status: 500 });
  }
}
