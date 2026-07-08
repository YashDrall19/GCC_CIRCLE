'use client';

import Link from 'next/link';
import { ArrowRight, Calendar, Mail } from 'lucide-react';
import { insights } from './data';
import { FaWhatsapp } from 'react-icons/fa';

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

const categories = [
  {
    title: 'Industry news',
    subtitle: "The stories shaping India's GCC landscape.",
    description: 'Stay up to date with the latest GCC launches, leadership appointments, expansion announcements, policy updates, investments, mergers, acquisitions, and ecosystem developments—all curated in one place.',
    href: '/insights/industry-updates',
    cta: 'Explore Industry Updates',
  },
  {
    title: 'Reports & Case Studies',
    subtitle: 'Research that moves conversations forward.',
    description: 'Access exclusive GCC Circle reports, talent intelligence, market research, compensation studies, benchmarking reports, and real-world case studies from India’s leading Global Capability Centres.',
    href: '/insights/reports-and-case-studies',
    cta: 'Browse Reports',
  },
  {
    title: 'Blogs',
    subtitle: 'Leadership perspectives from across the GCC ecosystem.',
    description: 'Explore expert opinions, executive interviews, thought leadership, and practical insights on leadership, talent, AI, innovation, workplace transformation, and the future of Global Capability Centres.',
    href: '/insights/blogs',
    cta: 'Read the Latest Articles',
  },
];

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
          <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-4 sm:mb-5 block">Insights</span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-4 sm:mb-6">
            GCC Circle Intelligence <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#1a6cff] to-[#38bdf8] bg-clip-text text-transparent">
              Ideas. Insights. Intelligence.
            </span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed px-2 mb-4">
            From executive thought leadership and industry developments to exclusive research and real-world case studies, discover the knowledge shaping India's next generation of Global Capability Centres.
          </p>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed px-2">
            This positions the page as a destination for leadership intelligence rather than simply a collection of articles, which aligns much better with GCC Circle's premium, executive-first brand.
          </p>
          {/* <p className="text-white/35 text-xs sm:text-sm mt-3 sm:mt-4">
            Want to get an article featured?{' '}
            <a href="mailto:hello@gcccircle.com" className="text-[#D2A679] hover:underline hover:text-[#B87333]">hello@gcccircle.com</a>
          </p> */}
        </div>
      </section>

      {/* Topic cards */}
      <section className="px-4 sm:px-6 pb-14 sm:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-5 lg:grid-cols-3">
            {categories.map((category) => (
              <div key={category.title} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#D2A679] hover:bg-white/[0.05]">
                <div>
                  <p className="text-[#D2A679] text-xs uppercase tracking-[0.24em] font-semibold mb-3">{category.title}</p>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">{category.subtitle}</h2>
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                    {category.description}
                  </p>
                </div>
                <Link
                  href={category.href}
                  className="mt-6 inline-flex items-center gap-2 text-[#D2A679] font-semibold text-sm sm:text-base hover:text-[#B87333]"
                >
                  {category.cta}
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      {/* <section className="px-4 sm:px-6 pb-20 sm:pb-28">
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
      </section> */}

      {/* CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-2xl sm:rounded-3xl border border-[#1a6cff]/30 bg-gradient-to-br from-[#1a6cff]/10 to-transparent p-8 sm:p-11">
            <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-[#D2A679]/15 rounded-full blur-[60px]" />
            </div>
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Get Featured on GCC Circle</h2>
              <p className="text-white/55 sm:mb-8 leading-relaxed text-sm sm:text-base px-2">Have a unique perspective, leadership story, or industry insight to share?</p>
              <p className="text-white/55 sm:mb-8 leading-relaxed text-sm sm:text-base px-2">Publish your article, research, opinion piece, or case study and contribute to conversations shaping India's GCC ecosystem.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a
                  href="mailto:hello@gcccircle.com"
                  className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 bg-[#D2A679] hover:bg-[#B87333] text-white font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,108,255,0.45)] text-sm sm:text-base w-full sm:w-auto justify-center"
                >
                  <Mail size={14} sm-size={15} /> hello@gcccircle.com
                </a>
                <a
                  href="https://wa.me/918505823013"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 border border-[#D2A679] hover:border-[#B87333] text-white/70 hover:text-white font-semibold rounded-full transition-all duration-200 text-sm sm:text-base w-full sm:w-auto justify-center"
                >
                  <FaWhatsapp size={14} sm-size={15} /> +91 8505823013
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
    </main>
  );
}
