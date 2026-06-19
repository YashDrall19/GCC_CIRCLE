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
      <main className="bg-[#070b14] text-white min-h-screen pt-20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/insights" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft size={18} /> Back to Insights
          </Link>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-20 text-center text-white/60">Article not found.</div>
      </main>
    );
  }

  const relatedArticles = insights.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <main className="bg-[#070b14] text-white min-h-screen pt-20">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Link href="/insights" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
          <ArrowLeft size={18} /> Back to Insights
        </Link>
      </div>

      {/* Hero */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-[#D2A679]/30">
            <div className="aspect-[16/7] relative">
              <Image
                src={article.img}
                alt={article.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/40 to-transparent z-10 pointer-events-none" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
              <span className={`inline-flex px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 border ${tagColors[article.tag] || 'bg-white/10 text-white/60 border-white/20'}`}>
                {article.tag}
              </span>

              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {article.title}
              </h1>

              <p className="text-white/75 text-base md:text-lg max-w-3xl">
                {article.excerpt}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="px-6 mb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-[#D2A679]" />
              <div>
                <p className="text-white/50 text-sm">Published</p>
                <p className="font-medium">{article.date}</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-[#D2A679]" />
              <div>
                <p className="text-white/50 text-sm">Read Time</p>
                <p className="font-medium">{article.readTime}</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <BookOpen size={20} className="text-[#D2A679]" />
              <div>
                <p className="text-white/50 text-sm">Category</p>
                <p className="font-medium">{article.tag}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="px-6 mb-4">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-white/10 p-6 md:p-10 bg-white/[0.02]">
            <div className="text-justify">
              {article.content}
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {/* {relatedArticles.length > 0 && (
        <section className="px-6 pb-28">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((a) => (
                <Link key={a.id} href={`/insights/${a.id}`}>
                  <article className="group overflow-hidden rounded-2xl border border-white/10 hover:border-[#D2A679] bg-white/[0.03] hover:bg-white/[0.05] transition-all duration-300">
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={a.img}
                        alt={a.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/80 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${tagColors[a.tag] || 'bg-white/10 text-white/60 border-white/20'}`}>
                          {a.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-[#B87333] transition-colors duration-200 line-clamp-2">
                        {a.title}
                      </h3>
                      <p className="text-white/45 text-xs leading-relaxed line-clamp-2">{a.excerpt}</p>
                      <div className="flex items-center gap-2 text-white/30 text-xs pt-3 border-t border-white/10 mt-3">
                        <Calendar size={9} /> {a.date}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )} */}

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-3xl border border-[#1a6cff]/30 bg-gradient-to-br from-[#1a6cff]/10 to-transparent p-11">
            <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#D2A679]/15 rounded-full blur-[60px]" />
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the GCC Circle</h2>
              <p className="text-white/55 mb-8 leading-relaxed">Get exclusive access to all insights, roundtables, and leadership events for GCC professionals.</p>
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D2A679] hover:bg-[#B87333] text-white font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,108,255,0.45)]"
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
