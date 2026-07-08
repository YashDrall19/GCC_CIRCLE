import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { insights } from '../data';
import { tagColors } from '../tag-colors';

export default function BlogsPage() {
  return (
    <main className="bg-[#070b14] text-white min-h-screen pt-16 sm:pt-20">
      <section className="px-4 sm:px-6 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#D2A679] text-xs uppercase tracking-widest mb-4">Blogs</p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Leadership perspectives from across the GCC ecosystem.</h1>
          <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Explore expert opinions, executive interviews, thought leadership, and practical insights on leadership, talent, AI, innovation, workplace transformation, and the future of Global Capability Centres.
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
            <h2 className="text-xl sm:text-2xl font-bold">Latest Articles</h2>
            <span className="text-white/35 text-xs sm:text-sm">{insights.length} articles</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {insights.map((a) => (
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
    </main>
  );
}
