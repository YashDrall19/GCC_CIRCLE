import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { reportPdfs } from '../pdf-data';
import PdfCard from '@/components/PdfCard';

export default function ReportsAndCaseStudiesPage() {
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
            <span className="text-white/35 text-xs sm:text-sm">{reportPdfs.length} documents</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {reportPdfs.map((item) => (
              <PdfCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
