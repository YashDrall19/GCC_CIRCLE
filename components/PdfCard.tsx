'use client';

import { useEffect, useRef, useState } from 'react';
import { Download, FileText, Loader2 } from 'lucide-react';

interface PdfCardProps {
  title: string;
  description: string;
  url: string;
  buttonLabel?: string;
  onDownload?: () => void;
}

export default function PdfCard({
  title,
  description,
  url,
  buttonLabel = 'Download Report',
  onDownload,
}: PdfCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [status, setStatus] = useState<
    'loading' | 'ready' | 'error'
  >('loading');

  useEffect(() => {
    let cancelled = false;

    const renderPdf = async () => {
      try {
        setStatus('loading');

        const pdfjs = await import('pdfjs-dist');

        (pdfjs as any).GlobalWorkerOptions.workerSrc =
          '/pdf.worker.min.mjs';

        const loadingTask = (pdfjs as any).getDocument(url);

        const pdf = await loadingTask.promise;

        if (cancelled) return;

        const page = await pdf.getPage(1);

        if (cancelled) return;

        const canvas = canvasRef.current;

        if (!canvas) return;

        const context = canvas.getContext('2d');

        if (!context) return;

        const viewport = page.getViewport({
          scale: 1,
        });

        const targetWidth = 700;
        const scale = targetWidth / viewport.width;

        const scaledViewport = page.getViewport({
          scale,
        });

        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        await page.render({
          canvasContext: context,
          viewport: scaledViewport,
        }).promise;

        if (!cancelled) {
          setStatus('ready');
        }
      } catch (err) {
        console.error('Unable to render PDF preview:', err);

        if (!cancelled) {
          setStatus('error');
        }
      }
    };

    renderPdf();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#D2A679] hover:bg-white/[0.05] transition-all duration-300 flex flex-col">

      {/* Preview */}
      <div className="relative aspect-[4/3] bg-[#0b1020] overflow-hidden flex items-center justify-center">

        {status === 'loading' && (
          <div className="flex flex-col items-center gap-2 text-white/40">
            <Loader2 size={26} className="animate-spin" />
            <span className="text-xs">
              Loading Preview...
            </span>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-3 text-white/40">
            <FileText size={42} />
            <span className="text-xs">
              Preview unavailable
            </span>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            status === 'ready'
              ? 'opacity-100'
              : 'opacity-0 absolute'
          }`}
        />

        <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-black/70 border border-[#D2A679]/30 text-[#D2A679] backdrop-blur">
          PDF
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">

        <h3
          className="font-semibold text-base leading-snug line-clamp-2 group-hover:text-[#D2A679] transition-colors"
          title={title}
        >
          {title}
        </h3>

        <p className="mt-2 text-sm text-white/60 line-clamp-3">
          {description}
        </p>

        <button
          type="button"
          onClick={() => {
            if (onDownload) {
              onDownload();
            } else {
              window.open(url, '_blank', 'noopener,noreferrer');
            }
          }}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#D2A679]/15 hover:bg-[#D2A679] text-[#D2A679] hover:text-white py-3 font-semibold transition-all duration-200"
        >
          <Download size={16} />
          {buttonLabel}
        </button>
      </div>
    </article>
  );
}