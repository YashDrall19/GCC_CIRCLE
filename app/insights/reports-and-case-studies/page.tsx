'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PdfCard from '@/components/PdfCard';
import DownloadReportModal from '@/components/DownloadReportModal';

interface PdfItem {
  id: number;
  title: string;
  description: string;
  pdf_url: string;
  active: boolean;
  created_at: string;
}

export default function ReportsAndCaseStudiesPage() {
  const [pdfs, setPdfs] = useState<PdfItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedPdf, setSelectedPdf] = useState<PdfItem | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/reports', {
        cache: 'no-store',
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch reports');
      }

      setPdfs(data.data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to fetch reports.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const handleDownload = (pdf: PdfItem) => {
    setSelectedPdf(pdf);
    setOpenModal(true);
  };

  return (
    <>
      <main className="bg-[#070b14] text-white min-h-screen pt-16 sm:pt-20">
        {/* Hero */}
        <section className="px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-[#D2A679] text-xs uppercase tracking-widest mb-4">
              Reports &amp; Case Studies
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Research that moves conversations forward.
            </h1>

            <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              Access exclusive GCC Circle reports, talent intelligence,
              market research, compensation studies, benchmarking reports,
              and real-world case studies from India's leading Global
              Capability Centres.
            </p>

            <div className="mt-8">
              <Link
                href="/insights"
                className="text-[#D2A679] font-semibold inline-flex items-center gap-2 hover:text-[#B87333] transition-colors"
              >
                Back to Insights
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Reports */}
        <section className="px-4 sm:px-6 pb-20 sm:pb-28">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold">
                Reports &amp; Case Studies
              </h2>

              {!loading && (
                <span className="text-white/35 text-xs sm:text-sm">
                  {pdfs.length} {pdfs.length === 1 ? 'document' : 'documents'}
                </span>
              )}
            </div>

            {loading ? (
              <div className="flex justify-center py-16">
                <div className="w-7 h-7 rounded-full border-2 border-[#D2A679] border-t-transparent animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center py-16 text-red-400">
                {error}
              </div>
            ) : pdfs.length === 0 ? (
              <div className="text-center py-16 text-white/40">
                No reports available.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pdfs.map((pdf) => (
                  <PdfCard
                    key={pdf.id}
                    title={pdf.title}
                    description={pdf.description}
                    url={pdf.pdf_url}
                    onDownload={() => handleDownload(pdf)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <DownloadReportModal
        open={openModal}
        pdf={selectedPdf}
        onClose={() => {
          setOpenModal(false);
          setSelectedPdf(null);
        }}
      />
    </>
  );
}