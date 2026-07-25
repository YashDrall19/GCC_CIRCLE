'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PdfCard from '@/components/PdfCard';

interface PdfItem {
  id: string;
  name: string;
  title: string;
  url: string;
  fileName: string;
}

export default function ReportsAndCaseStudiesPage() {
  const [pdfs, setPdfs] = useState<PdfItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/insights/pdfs?folder=reports')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPdfs(data.data);
        } else {
          setError(data.error || 'Failed to load');
        }
      })
      .catch((err) => setError(err?.message || 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-[#070b14] text-white min-h-screen pt-16 sm:pt-20">
      <section className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#D2A679] text-xs uppercase tracking-widest mb-4">Reports & Case Studies</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Research that moves conversations forward.</h1>
          <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Access exclusive GCC Circle reports, talent intelligence, market research, compensation studies, benchmarking reports, and real-world case studies from India’s leading Global Capability Centres.
          </p>
          <div className="mt-8">
            <Link
              href="/insights"
              className="text-[#D2A679] font-semibold inline-flex items-center gap-2 hover:text-[#B87333]"
            >
              Back to Insights
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold">Reports & Case Studies</h2>
            <span className="text-white/35 text-xs sm:text-sm">{pdfs.length} documents</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-6 h-6 border-2 border-[#D2A679] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-16 text-red-400/80 text-sm">{error}</div>
          ) : pdfs.length === 0 ? (
            <div className="text-center py-16 text-white/40 text-sm">
              No documents yet. Add PDF files to the <code className="text-[#D2A679]">public/reports</code> folder to see them here.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {pdfs.map((pdf) => (
                <PdfCard
                  key={pdf.id}
                  title={pdf.title}
                  url={pdf.url}
                  fileName={pdf.fileName}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
