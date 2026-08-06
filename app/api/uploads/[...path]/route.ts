import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const uploadsRoot = path.resolve(process.cwd(), 'public', 'uploads');

export async function GET(req: NextRequest, { params }: { params: { path?: string[] } }) {
  try {
    const requestedPath = params.path?.join('/') ?? '';
    if (!requestedPath) {
      return NextResponse.json({ success: false, error: 'Missing file path' }, { status: 400 });
    }

    const safePath = requestedPath.replace(/\.\.(?:\/|\\)/g, '');
    const absolutePath = path.resolve(uploadsRoot, safePath);

    if (!absolutePath.startsWith(uploadsRoot)) {
      return NextResponse.json({ success: false, error: 'Invalid file path' }, { status: 400 });
    }

    if (!fs.existsSync(absolutePath) || !fs.statSync(absolutePath).isFile()) {
      return NextResponse.json({ success: false, error: 'File not found' }, { status: 404 });
    }

    const mimeType = getMimeType(absolutePath);
    const fileBuffer = fs.readFileSync(absolutePath);
    const blob = new Blob([new Uint8Array(fileBuffer)], { type: mimeType });

    return new NextResponse(blob, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    console.error('Upload asset error:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Failed to read upload' }, { status: 500 });
  }
}

function getMimeType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();
  switch (extension) {
    case '.pdf':
      return 'application/pdf';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
}
