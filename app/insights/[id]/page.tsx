'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, BookOpen } from 'lucide-react';
import { useParams } from 'next/navigation';
import { insights } from '../data';

const tagColors: Record<string, string> = {
  'AI Strategy': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'Talent': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'Leadership': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'Policy': 'bg-rose-500/15 text-rose-400 border-rose-500/30',
  'Hiring': 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  'Culture': 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  'Strategy': 'bg-teal-500/15 text-teal-400 border-teal-500/30',
  'Innovation': 'bg-sky-500/15 text-sky-400 border-sky-500/30',
};

export default function InsightDetailPage() {
  const { id } = useParams();
  const article = insights.find((i) => i.id === id);

  if (!article) {
    return (
      <main className="bg-[#070b14] text-white min-h-screen pt-16 sm:pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <Link href="/insights" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm sm:text-base">
            <ArrowLeft size={18} /> Back to Insights
          </Link>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center text-white/60">Article not found.</div>
      </main>
    );
  }

  return (
    <main className="bg-[#070b14] text-white min-h-screen pt-16 sm:pt-20">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <Link href="/insights" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm sm:text-base">
          <ArrowLeft size={18} /> Back to Insights
        </Link>
      </div>

      {/* Hero */}
      <section className="px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#D2A679]/30">
            <div className="aspect-[16/9] sm:aspect-[16/7] relative">
              <Image
                src={article.img}
                alt={article.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/40 to-transparent z-10 pointer-events-none" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-10 z-20">
              <span className={`inline-flex px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-3 sm:mb-4 border ${tagColors[article.tag] || 'bg-white/10 text-white/60 border-white/20'}`}>
                {article.tag}
              </span>

              <h1 className="text-xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">
                {article.title}
              </h1>

              {/* <p className="text-white/75 text-sm sm:text-base md:text-lg max-w-3xl">
                {article.excerpt}
              </p> */}
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="px-4 sm:px-6 mb-10 sm:mb-16">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <Calendar size={18} sm-size={20} className="text-[#D2A679] flex-shrink-0" />
              <div>
                <p className="text-white/50 text-xs sm:text-sm">Published</p>
                <p className="font-medium text-sm sm:text-base">{article.date}</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <Clock size={18} sm-size={20} className="text-[#D2A679] flex-shrink-0" />
              <div>
                <p className="text-white/50 text-xs sm:text-sm">Read Time</p>
                <p className="font-medium text-sm sm:text-base">{article.readTime}</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <BookOpen size={18} sm-size={20} className="text-[#D2A679] flex-shrink-0" />
              <div>
                <p className="text-white/50 text-xs sm:text-sm">Category</p>
                <p className="font-medium text-sm sm:text-base">{article.tag}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="px-4 sm:px-6 mb-4">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl sm:rounded-3xl border border-white/10 p-5 sm:p-8 md:p-10 bg-white/[0.02]">
            <div className="text-justify">
              {article.content}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-2xl sm:rounded-3xl border border-[#1a6cff]/30 bg-gradient-to-br from-[#1a6cff]/10 to-transparent p-8 sm:p-11">
            <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-[#D2A679]/15 rounded-full blur-[60px]" />
            </div>
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Join the GCC Circle</h2>
              <p className="text-white/55 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base px-2">Get exclusive access to all insights, roundtables, and leadership events for GCC professionals.</p>
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#D2A679] hover:bg-[#B87333] text-white font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,108,255,0.45)] text-sm sm:text-base"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
