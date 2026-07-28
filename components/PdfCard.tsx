'use client';

import { useEffect, useRef, useState } from 'react';
import { Download, FileText, Loader as Loader2 } from 'lucide-react';

interface PdfCardProps {
  title: string;
  url: string;
  fileName: string;
  onDownload?: () => void;
}

export default function PdfCard({ title, url, fileName, onDownload }: PdfCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        // Configure worker served from public folder
        (pdfjs as any).GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

        const loadingTask = (pdfjs as any).getDocument(url);
        const pdf = await loadingTask.promise;
        if (cancelled) return;

        const page = await pdf.getPage(1);
        if (cancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Render at a thumbnail scale
        const targetWidth = 600;
        const baseViewport = page.getViewport({ scale: 1 });
        const scale = Math.min(2, Math.max(0.5, targetWidth / baseViewport.width));
        const viewport = page.getViewport({ scale });

        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);

        await page.render({ canvasContext: ctx, viewport }).promise;
        if (!cancelled) setStatus('ready');
      } catch (err) {
        console.error('PDF render error:', err);
        if (!cancelled) setStatus('error');
      }
    };

    render();

    return () => {
      cancelled = true;
    };
  }, [url]);

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#D2A679] hover:bg-white/[0.05] transition-all duration-300 flex flex-col">
      <div className="relative overflow-hidden aspect-[4/3] bg-[#0a0e1a] flex items-center justify-center">
        {status === 'loading' && (
          <div className="flex flex-col items-center gap-2 text-white/40">
            <Loader2 size={24} className="animate-spin" />
            <span className="text-xs">Loading preview…</span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-2 text-white/40">
            <FileText size={32} />
            <span className="text-xs">Preview unavailable</span>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            status === 'ready' ? 'opacity-100' : 'opacity-0 absolute'
          }`}
        />

        <div className="absolute top-2 right-2">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-[#070b14]/80 text-[#D2A679] border border-[#D2A679]/30 backdrop-blur-sm">
            PDF
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3
          className="font-semibold text-sm leading-snug mb-3 line-clamp-3 group-hover:text-[#B87333] transition-colors duration-200"
          title={title}
        >
          {title}
        </h3>

        <button
          type="button"
          onClick={() => {
            if (onDownload) {
              onDownload();
            } else {
              window.open(url, "_blank");
            }
          }}
          className="mt-auto inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#D2A679]/15 text-[#D2A679] text-xs font-semibold hover:bg-[#D2A679] hover:text-white transition-all duration-200"
        >
          <Download size={14} />
          Download
        </button>
      </div>
    </article>
  );
}
