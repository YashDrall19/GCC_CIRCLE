'use client';

import Link from 'next/link';
import { ArrowRight, Users, Zap, Globe, ChevronDown } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Senior Leaders' },
  { value: '10+', label: 'Cities' },
  { value: '50+', label: 'GCC Companies' },
  { value: '25+', label: 'Events Hosted' },
];

const pillars = [
  {
    icon: <Users size={28} />,
    title: 'Connect',
    desc: "Build relationships with India's top GCC leaders — CXOs, Site Heads, and senior executives from across the ecosystem.",
  },
  {
    icon: <Globe size={28} />,
    title: 'Network',
    desc: 'Move beyond LinkedIn. Engage in curated, closed-door forums and premium events designed for peer-level exchange.',
  },
  {
    icon: <Zap size={28} />,
    title: 'Influence',
    desc: 'Shape the future of GCCs in India — share insights, tackle business challenges, and leave a lasting impact.',
  },
];

const upcomingEvents = [
  { city: 'Hyderabad', month: 'May', year: '2026', type: 'Leadership Mixer' },
  { city: 'Bangalore', month: 'Jun', year: '2026', type: 'Tech Roundtable' },
  { city: 'Delhi', month: 'Jul', year: '2026', type: 'Executive Summit' },
];

const testimonials = [
  {
    name: 'Ravi Wadhwa',
    title: 'Founder, Talentiser',
    quote: "The GCC Circle is the executive ecosystem India's GCC leaders have been waiting for — curated, connected, and built to create real impact.",
  },
  {
    name: 'Arushi Jindal',
    title: 'Co-Founder, Talentiser',
    quote: 'We built the Circle because the best conversations happen when the right people are in the same room with no agenda other than growth.',
  },
  {
    name: 'Sahil Bains',
    title: 'Site Leader, XYZ',
    quote: 'Being part of the GCC Circle has fundamentally changed how I approach leadership and peer learning in this space.',
  },
];

export default function HomePage() {
  return (
    <main className="bg-[#070b14] text-white">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-[#1a6cff]/10 blur-[120px]" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#0040cc]/10 blur-[80px]" />
        </div>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1a6cff]/40 bg-[#1a6cff]/10 text-[#6ea8fe] text-xs font-semibold uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a6cff] animate-pulse" />
            India&apos;s Premier GCC Leadership Network
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6">
            <span className="block text-white">Connect.</span>
            <span className="block text-white">Network.</span>
            <span className="block bg-gradient-to-r from-[#1a6cff] to-[#38bdf8] bg-clip-text text-transparent">
              Influence.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
            Join the GCC Circle — a curated executive ecosystem for CXOs, Site Heads, and senior leaders
            shaping the future of Global Capability Centres in India.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/join"
              className="px-8 py-3.5 bg-[#1a6cff] hover:bg-[#1558d6] text-white font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,108,255,0.5)] flex items-center gap-2"
            >
              Join the Circle <ArrowRight size={16} />
            </Link>
            <Link
              href="/events"
              className="px-8 py-3.5 border border-white/20 hover:border-white/50 text-white/80 hover:text-white font-semibold rounded-full transition-all duration-200"
            >
              View Events
            </Link>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} className="text-white/30" />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#1a6cff] mb-2">{s.value}</div>
                <div className="text-white/50 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#1a6cff] text-xs font-semibold uppercase tracking-widest mb-4 block">Our Vision</span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Leaders of today &amp; tomorrow, together.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              To build a community where the leaders of today and tomorrow can connect meaningfully,
              exchange knowledge, and influence the growth of GCCs in India.
            </p>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              The GCC Circle empowers leaders to stay ahead, foster innovation, and leave a lasting
              impact on their organizations and industries.
            </p>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 text-[#1a6cff] hover:text-white font-semibold transition-colors duration-200 group"
            >
              Become a member
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a6cff]/20 to-transparent rounded-3xl blur-xl" />
            <img
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Leaders collaborating"
              className="relative rounded-3xl w-full object-cover aspect-[4/3] border border-white/10"
            />
          </div>
        </div>
      </section>

      {/* What is GCC Circle */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-[#0a0e1a]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#1a6cff] text-xs font-semibold uppercase tracking-widest mb-4 block">What is GCC Circle?</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Your executive ecosystem</h2>
          <p className="text-white/60 text-lg leading-relaxed mb-6">
            The GCC Circle, launched by Talentiser, is India&apos;s foremost leadership community for
            top-tier professionals across GCCs.
          </p>
          <p className="text-white/60 text-lg leading-relaxed mb-6">
            It&apos;s where CXOs, Site Heads, and senior leaders come together to exchange insights,
            tackle business challenges, and shape the future of their organizations.
          </p>
          <p className="text-white/80 text-xl font-semibold italic">
            Think of it as your executive ecosystem — curated, connected, and collaborative.
          </p>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#1a6cff] text-xs font-semibold uppercase tracking-widest mb-4 block">What We Offer</span>
            <h2 className="text-4xl md:text-5xl font-bold">Built for leaders, by leaders</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="group p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#1a6cff]/40 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#1a6cff]/15 flex items-center justify-center text-[#1a6cff] mb-6 group-hover:bg-[#1a6cff]/25 transition-colors duration-300">
                  {p.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
                <p className="text-white/55 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events preview */}
      <section className="py-24 px-6 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-14 gap-4">
            <div>
              <span className="text-[#1a6cff] text-xs font-semibold uppercase tracking-widest mb-3 block">Calendar</span>
              <h2 className="text-4xl md:text-5xl font-bold">Upcoming Events</h2>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-[#1a6cff] text-white/70 hover:text-white rounded-full text-sm font-semibold transition-all duration-200"
            >
              View all events <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((e) => (
              <div
                key={e.city + e.month}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#1a6cff]/40 transition-all duration-300 p-8"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1a6cff]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#1a6cff]/10 transition-colors duration-300" />
                <div className="relative">
                  <div className="text-[#1a6cff] text-sm font-semibold uppercase tracking-widest mb-1">{e.month} {e.year}</div>
                  <div className="text-3xl font-bold mb-2">{e.city}</div>
                  <div className="text-white/50 text-sm">{e.type}</div>
                  <Link
                    href="/events"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm text-[#1a6cff] font-medium hover:gap-3 transition-all duration-200"
                  >
                    Register <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#1a6cff] text-xs font-semibold uppercase tracking-widest mb-4 block">Experts Speak</span>
            <h2 className="text-4xl md:text-5xl font-bold">Voices from the Circle</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-all duration-300"
              >
                <div className="text-4xl text-[#1a6cff] font-serif mb-4">&ldquo;</div>
                <p className="text-white/70 leading-relaxed mb-6 italic">{t.quote}</p>
                <div className="border-t border-white/10 pt-5">
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-white/45 text-sm mt-0.5">{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative rounded-3xl overflow-hidden border border-[#1a6cff]/30 bg-gradient-to-br from-[#1a6cff]/15 to-[#0040cc]/10 p-16">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#1a6cff]/20 rounded-full blur-[80px]" />
            </div>
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold mb-5">Ready to join the Circle?</h2>
              <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
                Connect with India&apos;s top GCC leaders. Exchange ideas, access exclusive events, and shape the future of your industry.
              </p>
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-10 py-4 bg-[#1a6cff] hover:bg-[#1558d6] text-white font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_40px_rgba(26,108,255,0.5)]"
              >
                Join the GCC Circle <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
