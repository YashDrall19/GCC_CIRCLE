'use client';

import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';

const featuredArticle = {
  title: 'Owning the AI Stack vs Renting It: The Strategic Trade-off No Leadership Team Can Ignore',
  excerpt: 'As AI infrastructure costs rise and vendor lock-in becomes a real boardroom concern, GCC leaders face a fundamental build-vs-buy question that will define their next decade of operations.',
  date: 'Tuesday, 5 May 2026',
  readTime: '8 min read',
  tag: 'AI Strategy',
  img: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

const articles = [
  {
    title: 'GCC Talent Crunch in India: 40% Skill Gap in AI, Data and Product Roles',
    excerpt: 'The talent gap is widening across global capability centres, impacting hiring timelines, salary benchmarks, and execution velocity for critical initiatives.',
    date: 'Tuesday, 21 April 2026',
    readTime: '6 min read',
    tag: 'Talent',
    img: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: "GCC Workforce Future Predictions: 2.8M Jobs, Leadership Gaps, and What Every Talent Leader Must Do Now",
    excerpt: 'With GCC headcount projected to reach 2.8 million by 2027, the leadership pipeline problem is becoming India\'s most pressing talent challenge.',
    date: 'Tuesday, 17 March 2026',
    readTime: '7 min read',
    tag: 'Leadership',
    img: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: "India's Tax Holiday Till 2047: Why Cloud, AI, and GCC Hiring Just Entered a New Era",
    excerpt: 'The extended special economic zone benefits signal a once-in-a-generation window for GCCs to accelerate their India operations and talent investments.',
    date: 'Wednesday, 4 February 2026',
    readTime: '5 min read',
    tag: 'Policy',
    img: 'https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'From Attrition to Attraction: Strategic Hiring Playbooks GCCs Must Adopt in 2026',
    excerpt: 'As attrition stabilises and candidate expectations evolve, GCCs need a fundamentally different approach to employer branding and offer design.',
    date: 'Wednesday, 4 February 2026',
    readTime: '6 min read',
    tag: 'Hiring',
    img: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Remote, Hybrid, or Back to Office? How GCCs Are Rethinking Work Models',
    excerpt: 'The return-to-office debate is settled for some, but most GCCs are still navigating the balance between productivity, culture, and talent retention.',
    date: 'Friday, 23 January 2026',
    readTime: '5 min read',
    tag: 'Culture',
    img: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: '2026 Prediction: GCCs Will Be Judged on Decisions Made, Not Costs Saved',
    excerpt: 'The era of the GCC as a cost arbitrage vehicle is officially over. Leadership teams that fail to reframe their mandate will find themselves sidelined.',
    date: 'Tuesday, 13 January 2026',
    readTime: '4 min read',
    tag: 'Strategy',
    img: 'https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: '2025 Recap: How AI Reshaped GCC Mandates Faster Than Org Charts Could Keep Up',
    excerpt: 'A look back at how the AI transformation wave forced GCCs to rethink team structures, role definitions, and reporting lines throughout 2025.',
    date: 'Monday, 29 December 2025',
    readTime: '9 min read',
    tag: 'AI Strategy',
    img: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    title: 'Why Global Capability Centers Are Powering the Next Wave of Enterprise Growth',
    excerpt: 'GCCs are no longer back offices. They are becoming the primary engine of product innovation, digital transformation, and enterprise resilience.',
    date: 'Sunday, 23 November 2025',
    readTime: '6 min read',
    tag: 'Innovation',
    img: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

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
  return (
    <main className="bg-[#070b14] text-white pt-20">
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D2A679]/8 blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-5 block">Knowledge Hub</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">Insights</h1>
          <p className="text-white/55 text-lg leading-relaxed">
            Industry news, updates, and insights curated especially for GCC leaders. Sharp, no-noise, and always relevant.
          </p>
          <p className="text-white/35 text-sm mt-4">
            Want to get an article featured?{' '}
            <a href="mailto:hello@gcccircle.com" className="text-[#D2A679] hover:underline hover:text-[#B87333]">hello@gcccircle.com</a>
          </p>
        </div>
      </section>

      {/* Featured article */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="group relative overflow-hidden rounded-3xl border border-[#B87333] hover:border-[#D2A679] transition-all duration-300 cursor-pointer">
            <div className="grid md:grid-cols-2">
              <div className="relative overflow-hidden aspect-[4/3] md:aspect-auto">
                <img
                  src={featuredArticle.img}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#070b14] hidden md:block" />
              </div>
              <div className="p-10 md:p-14 flex flex-col justify-center bg-white/[0.03]">
                <div className="flex items-center gap-3 mb-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${tagColors[featuredArticle.tag] || 'bg-white/10 text-white/60 border-white/20'}`}>
                    <Tag size={10} className="inline mr-1" />
                    {featuredArticle.tag}
                  </span>
                  <span className="text-white/35 text-xs">Featured</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-4 group-hover:text-[#B87333] transition-colors duration-200">
                  {featuredArticle.title}
                </h2>
                <p className="text-white/55 leading-relaxed mb-8 text-sm">{featuredArticle.excerpt}</p>
                <div className="flex items-center gap-4 text-white/35 text-xs mb-8">
                  <span>{featuredArticle.date}</span>
                  <span className="flex items-center gap-1"><Clock size={10} /> {featuredArticle.readTime}</span>
                </div>
                <div className="inline-flex items-center gap-2 text-[#D2A679] text-sm font-semibold group-hover:gap-4 transition-all duration-200">
                  Read Article <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="px-6 pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold">All Articles</h2>
            <span className="text-white/35 text-sm">{articles.length} articles</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {articles.map((a, i) => (
              <article
                key={i}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#D2A679] hover:bg-white/[0.05] transition-all duration-300 cursor-pointer flex flex-col"
              >
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
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-[#B87333] transition-colors duration-200 line-clamp-3">
                    {a.title}
                  </h3>
                  <p className="text-white/45 text-xs leading-relaxed mb-4 line-clamp-2 flex-1">{a.excerpt}</p>
                  <div className="flex items-center justify-between text-white/30 text-xs pt-3 border-t border-white/10">
                    <span className="flex items-center gap-1"><Clock size={9} /> {a.readTime}</span>
                    <span className="text-[#D2A679] font-medium flex items-center gap-0.5 group-hover:gap-2 transition-all duration-200">
                      Read <ArrowRight size={10} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Expert quotes section */}
      <section className="py-20 px-6 border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#B87333] text-xs font-semibold uppercase tracking-widest mb-4 block">Perspectives</span>
            <h2 className="text-4xl font-bold">Experts Speak</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'Ritu Vohra', title: 'CHRO, ABC', quote: 'The insights from the GCC Circle have helped me reframe how we approach talent strategy across our India operations. The signal-to-noise ratio is unlike anything else in this space.' },
              { name: 'Ravi Wadhwa', title: 'Founder, Talentiser', quote: 'We built the Insights section because GCC leaders deserve better than generic management content. Everything here is built around the specific challenges this community faces.' },
            ].map((e) => (
              <div key={e.name} className="p-8 rounded-2xl border border-[#D2A679] hover:border-[#B87333] bg-white/[0.03]">
                <div className="text-4xl text-[#D2A679] font-serif mb-4">&ldquo;</div>
                <p className="text-white/70 leading-relaxed italic mb-6">{e.quote}</p>
                <div className="border-t border-white/10 pt-5">
                  <div className="font-semibold">{e.name}</div>
                  <div className="text-white/40 text-sm mt-0.5">{e.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
