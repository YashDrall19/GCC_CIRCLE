import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { newsPdfs } from '../pdf-data';
import PdfCard from '@/components/PdfCard';

export default function IndustryUpdatesPage() {
  return (
    <main className="bg-[#070b14] text-white min-h-screen pt-16 sm:pt-20">
      <section className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#D2A679] text-xs uppercase tracking-widest mb-4">Industry news</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">The stories shaping India’s GCC landscape.</h1>
          <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Stay up to date with the latest GCC launches, leadership appointments, expansion announcements, policy updates, investments, mergers, acquisitions, and ecosystem developments—all curated in one place.
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
            <h2 className="text-xl sm:text-2xl font-bold">Industry Updates</h2>
            <span className="text-white/35 text-xs sm:text-sm">{newsPdfs.length} documents</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {newsPdfs.map((item) => (
              <PdfCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
