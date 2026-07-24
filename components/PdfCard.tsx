'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Calendar, Download, FileText, Loader as Loader2 } from 'lucide-react';
import type { PdfItem } from '@/app/insights/pdf-data';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const tagColorMap: Record<string, string> = {
  Expansion: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  AI: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Leadership: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Benchmarking: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
  Talent: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Compensation: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
};

export default function PdfCard({ item }: { item: PdfItem }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#D2A679] hover:bg-white/[0.05] transition-all duration-300 flex flex-col">
      <div className="relative overflow-hidden aspect-[4/3] bg-[#0a0e1a] flex items-center justify-center">
        <Document
          file={item.fileUrl}
          loading={
            <div className="flex flex-col items-center gap-2 text-white/40">
              <Loader2 size={22} className="animate-spin" />
              <span className="text-xs">Loading preview…</span>
            </div>
          }
          error={
            <div className="flex flex-col items-center gap-2 text-white/40">
              <FileText size={28} />
              <span className="text-xs">Preview unavailable</span>
            </div>
          }
        >
          <Page
            pageNumber={1}
            width={420}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            onLoadSuccess={() => setLoaded(true)}
            className="react-pdf__page"
          />
        </Document>

        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/70 via-transparent to-transparent pointer-events-none" />

        <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
          <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold border ${tagColorMap[item.tag] || 'bg-white/10 text-white/60 border-white/20'}`}>
            {item.tag}
          </span>
        </div>

        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#070b14]/80 border border-white/10 flex items-center justify-center text-[#D2A679]">
          <FileText size={14} />
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-[#B87333] transition-colors duration-200 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-white/45 text-xs leading-relaxed mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between text-white/30 text-[10px] sm:text-xs pt-2 sm:pt-3 border-t border-white/10 mt-auto">
          <span className="flex items-center gap-1">
            <Calendar size={9} /> {item.date}
          </span>
          <a
            href={item.fileUrl}
            download
            className="text-[#D2A679] font-medium flex items-center gap-0.5 hover:gap-2 transition-all duration-200"
          >
            Download <Download size={11} />
          </a>
        </div>
      </div>
    </article>
  );
}
