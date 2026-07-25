import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const folder = searchParams.get('folder') || 'reports';

    if (folder !== 'news' && folder !== 'reports') {
      return NextResponse.json(
        { success: false, error: 'Invalid folder. Use "news" or "reports".' },
        { status: 400 }
      );
    }

    const dir = path.join(process.cwd(), 'public', folder);

    if (!fs.existsSync(dir)) {
      return NextResponse.json({ success: true, data: [] });
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const pdfs = entries
      .filter(
        (e) =>
          e.isFile() &&
          e.name.toLowerCase().endsWith('.pdf') &&
          !e.name.startsWith('.')
      )
      .map((e) => {
        const name = e.name;
        const baseName = name.replace(/\.pdf$/i, '');
        return {
          id: name,
          name: baseName,
          title: baseName
            .replace(/[-_]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim(),
          url: `/${folder}/${encodeURIComponent(name)}`,
          fileName: name,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ success: true, data: pdfs });
  } catch (error: any) {
    console.error('List PDFs error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
