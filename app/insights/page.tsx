'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { insights } from './data';

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

export default function InsightsPage() {
  const featured = insights[1] || insights[0];

  return (
    <main className="bg-[#070b14] text-white pt-16 sm:pt-20">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-[#D2A679]/8 blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-4 sm:mb-5 block">Knowledge Hub</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">Insights</h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed px-2">
            Industry news, updates, and insights curated especially for GCC leaders. Sharp, no-noise, and always relevant.
          </p>
          <p className="text-white/35 text-xs sm:text-sm mt-3 sm:mt-4">
            Want to get an article featured?{' '}
            <a href="mailto:hello@gcccircle.com" className="text-[#D2A679] hover:underline hover:text-[#B87333]">hello@gcccircle.com</a>
          </p>
        </div>
      </section>

      {/* Featured article */}
      <section className="px-4 sm:px-6 pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#B87333] hover:border-[#D2A679] transition-all duration-300 cursor-pointer">
            <div className="grid md:grid-cols-2">
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto">
                <img
                  src={featured.img}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#070b14] hidden md:block" />
              </div>
              <div className="p-6 sm:p-10 md:p-14 flex flex-col justify-center bg-white/[0.03]">
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold border ${tagColors[featured.tag] || 'bg-white/10 text-white/60 border-white/20'}`}>
                    <Tag size={10} className="inline mr-1" />
                    {featured.tag}
                  </span>
                  <span className="text-white/35 text-xs">Featured</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight mb-3 sm:mb-4 group-hover:text-[#B87333] transition-colors duration-200">
                  {featured.title}
                </h2>
                <div className="flex items-center gap-4 text-white/35 text-xs mb-6 sm:mb-8">
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {featured.readTime}</span>
                </div>
                <div className="inline-flex items-center gap-2 text-[#D2A679] text-sm font-semibold group-hover:gap-4 transition-all duration-200">
                  <Link href={`/insights/${featured.id}`} className="inline-flex items-center gap-2">
                    Read Article <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="px-4 sm:px-6 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold">All Articles</h2>
            <span className="text-white/35 text-xs sm:text-sm">{insights.length} articles</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {insights.map((a, i) => (
              <article
                key={a.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#D2A679] hover:bg-white/[0.05] transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={a.img}
                    alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/80 to-transparent" />
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold border ${tagColors[a.tag] || 'bg-white/10 text-white/60 border-white/20'}`}>
                      {a.tag}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-[#B87333] transition-colors duration-200 line-clamp-3">
                    {a.title}
                  </h3>
                  <div className="flex items-center justify-between text-white/30 text-[10px] sm:text-xs pt-2 sm:pt-3 border-t border-white/10">
                    <span className="flex items-center gap-1"><Calendar size={9} /> {a.date}</span>
                    <Link href={`/insights/${a.id}`} className="text-[#D2A679] font-medium flex items-center gap-0.5 group-hover:gap-2 transition-all duration-200">
                      Read <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Got a Perspective the Industry Should Hear?</h2>
              <p className="text-white/55 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base px-2">Whether it&apos;s leadership, talent, AI, innovation, or the future of GCCs, share your insights with a community of professionals driving India&apos;s next wave of growth.</p>
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#D2A679] hover:bg-[#B87333] text-white font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,108,255,0.45)] text-sm sm:text-base"
              >
                Join the Circle <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
