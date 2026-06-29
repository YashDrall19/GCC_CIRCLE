'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Zap, Globe, ChevronDown, CircleDot } from 'lucide-react';
import ScrollReveal from '@/components/scroll-reveal';
import HologramText from '@/components/hologram-text';
import GeneratorText from '@/components/generator-text';

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
  { city: 'Hyderabad', month: 'June', year: '2026', type: 'HR Mixer' },
  { city: 'Hyderabad', month: 'June', year: '2026', type: 'Tech Mixer' },
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="bg-transparent text-white relative">
      {/* Hero with hologram intro */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden tech-grid">
        {/* Animated orbital rings - hologram effect */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
          <div className="relative w-[90vw] max-w-[800px] aspect-square">

            {/* Ripple 1 */}
            <div
              className="absolute inset-[20%] rounded-full border border-[#1a6cff]/20 animate-ripple"
              style={{
                opacity: mounted ? 1 : 0,
                transition: 'opacity 0.5s',
              }}
            />

            {/* Ripple 2 */}
            <div
              className="absolute inset-[20%] rounded-full border border-[#1a6cff]/15 animate-ripple"
              style={{
                animationDelay: '2s',
                opacity: mounted ? 1 : 0,
                transition: 'opacity 0.7s',
              }}
            />

            {/* Ripple 3 */}
            <div
              className="absolute inset-[20%] rounded-full border border-[#D2A679]/15 animate-ripple"
              style={{
                animationDelay: '4s',
                opacity: mounted ? 1 : 0,
                transition: 'opacity 0.9s',
              }}
            />

            {/* Center glow */}
            <div className="absolute inset-[42%] rounded-full bg-gradient-to-br from-[#1a6cff]/40 to-[#D2A679]/30 blur-xl" />

          </div>
        </div>

        {/* Radial glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-[#D2A679]/8 blur-[150px]" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#38bdf8]/5 blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[#D2A679]/5 blur-[80px]" />
        </div>

        {/* Circuit pattern overlay */}
        <div className="absolute inset-0 pointer-events-none circuit-pattern opacity-30" />

        {/* Hero content */}
        <div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto opacity-0"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '0.3s',
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1a6cff]/40 bg-[#0a0e1a]/80 backdrop-blur-sm text-[#6ea8fe] text-xs font-semibold uppercase tracking-widest mb-8 hologram-border">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1a6cff] animate-pulse" />
            <span className="glow-text">India&apos;s Premier GCC Leadership Network</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6">
            <HologramText className="block text-white">Connect.</HologramText>{""}
            <HologramText className="block text-white" delay={100}>Network.</HologramText>
            <GeneratorText className="block bg-gradient-to-r from-[#1a6cff] to-[#38bdf8] bg-clip-text text-transparent">
              Influence.
            </GeneratorText>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
            Join the GCC Circle — a curated executive ecosystem for CXOs, Site Heads, and senior leaders
            shaping the future of Global Capability Centres in India.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/join"
              className="group px-8 py-3.5 bg-[#0a0e1a] backdrop-blur-md border border-[#D2A679] hover:bg-[#D2A679] hover:border-[#D2A679] text-white font-semibold rounded-full transition-all duration-300 flex items-center gap-2 glow-box"
            >
              <span>Join the Circle</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/events"
              className="px-8 py-3.5 border border-white/20 hover:border-[#38bdf8]/50 hover:bg-[#38bdf8]/10 text-white/80 hover:text-white font-semibold rounded-full transition-all duration-300"
            >
              View Events
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <span className="text-white/30 text-xs tracking-widest uppercase font-medium">Scroll</span>
          <ChevronDown size={16} className="text-white/30 animate-bounce" />
        </div>
      </section>

      {/* Stats with animated counters */}
      <ScrollReveal>
        <section className="py-16 border-y border-[#D2A679]/20 bg-[#0a0e1a]/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <ScrollReveal key={s.label} delay={i * 100}>
                  <div className="text-center group">
                    <div className="text-4xl md:text-5xl font-bold text-[#D2A679] mb-2 glow-text group-hover:scale-110 transition-transform duration-300">{s.value}</div>
                    <div className="text-white/50 text-sm font-medium">{s.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Vision */}
      <ScrollReveal>
        <section className="py-28 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            {/* <ScrollReveal delay={100}>
              <div>
                <span className="text-[#B87333] text-xs font-semibold uppercase tracking-widest mb-4 block glow-text">Our Vision</span>
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
                  className="inline-flex items-center gap-2 text-[#D2A679] hover:text-[#B87333] font-semibold transition-colors duration-200 group"
                >
                  Become a member
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal> */}

            <ScrollReveal delay={100}>
              <div>
                <span className="text-[#B87333] text-xs font-semibold uppercase tracking-widest mb-4 block glow-text">What is GCC Circle?</span>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Your executive ecosystem.
                </h2>
                <p className="text-white/60 text-lg leading-relaxed mb-6">
                  The GCC Circle, launched by Talentiser, is India&apos;s foremost leadership community for
                  top-tier professionals across GCCs.
                </p>
                <p className="text-white/60 text-lg leading-relaxed mb-6">
                  It&apos;s where CXOs, Site Heads, and senior leaders come together to exchange insights,
                  tackle business challenges, and shape the future of their organizations.
                </p>
                <p className="text-white/80 text-xl font-semibold italic glow-text">
                  Think of it as your executive ecosystem — curated, connected, and collaborative.
                </p>
                <Link
                  href="/join"
                  className="inline-flex items-center gap-2 text-[#D2A679] hover:text-[#B87333] font-semibold transition-colors duration-200 group mt-8"
                >
                  Become a member
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D2A679]/30 to-[#38bdf8]/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="absolute inset-0 hologram-border rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Leaders collaborating"
                  className="relative rounded-3xl w-full object-cover aspect-[4/3] border border-[#D2A679]/20 group-hover:border-[#D2A679]/40 transition-colors duration-300"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </ScrollReveal>

      {/* What is GCC Circle */}
      {/* <ScrollReveal>
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0e1a]/50 to-transparent pointer-events-none" />
          <div className="relative max-w-4xl mx-auto text-center">
            <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-4 block glow-text">What is GCC Circle?</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Your executive ecosystem</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              The GCC Circle, launched by Talentiser, is India&apos;s foremost leadership community for
              top-tier professionals across GCCs.
            </p>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              It&apos;s where CXOs, Site Heads, and senior leaders come together to exchange insights,
              tackle business challenges, and shape the future of their organizations.
            </p>
            <p className="text-white/80 text-xl font-semibold italic glow-text">
              Think of it as your executive ecosystem — curated, connected, and collaborative.
            </p>
          </div>
        </section>
      </ScrollReveal> */}

      {/* Three Pillars */}
      <ScrollReveal>
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-4 block glow-text">What We Offer</span>
                <h2 className="text-4xl md:text-5xl font-bold">Built for leaders, by leaders</h2>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-8">
              {pillars.map((p, i) => (
                <ScrollReveal key={p.title} delay={i * 100}>
                  <div className="group h-full p-8 rounded-2xl border border-[#D2A679]/20 bg-[#0a0e1a]/60 backdrop-blur-sm hover:bg-[#0a0e1a]/80 hover:border-[#D2A679]/50 transition-all duration-300 glow-box">
                    <div className="w-14 h-14 rounded-xl bg-[#D2A679]/15 flex items-center justify-center text-[#D2A679] mb-6 group-hover:bg-[#D2A679]/25 group-hover:shadow-[0_0_20px_rgba(26,108,255,0.3)] transition-all duration-300">
                      {p.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
                    <p className="text-white/55 leading-relaxed">{p.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Upcoming Events preview */}
      <ScrollReveal>
        <section className="py-24 px-6 bg-[#0a0e1a]/40 border-y border-[#D2A679]/15">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-14 gap-4">
              <ScrollReveal>
                <div>
                  <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-3 block glow-text">Calendar</span>
                  <h2 className="text-4xl md:text-5xl font-bold">Upcoming Events</h2>
                </div>
              </ScrollReveal>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#D2A679]/30 hover:border-[#D2A679] hover:bg-[#D2A679]/10 text-white/70 hover:text-white rounded-full text-sm font-semibold transition-all duration-200"
              >
                View all events <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((e, i) => (
                <ScrollReveal key={e.city + e.month} delay={i * 100}>
                  <div className="group relative overflow-hidden rounded-2xl border border-[#D2A679]/20 bg-[#0a0e1a]/60 backdrop-blur-sm hover:border-[#D2A679]/50 transition-all duration-300 p-8 glow-box">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#D2A679]/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#D2A679]/20 transition-colors duration-300" />
                    <div className="relative">
                      <div className="text-[#D2A679] text-sm font-semibold uppercase tracking-widest mb-1 glow-text">{e.month} {e.year}</div>
                      <div className="text-3xl font-bold mb-2">{e.city}</div>
                      <div className="text-white/50 text-sm">{e.type}</div>
                      <Link
                        href="/events"
                        className="mt-6 inline-flex items-center gap-1.5 text-sm text-[#D2A679] font-medium hover:gap-3 transition-all duration-200"
                      >
                        Register <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Testimonials */}
      <ScrollReveal>
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-14">
                <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-4 block glow-text">Experts Speak</span>
                <h2 className="text-4xl md:text-5xl font-bold">Voices from the Circle</h2>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <ScrollReveal key={t.name} delay={i * 100}>
                  <div className="p-8 rounded-2xl border border-[#D2A679] bg-[#0a0e1a] backdrop-blur-sm hover:border-[#B87333] transition-all duration-300 group">
                    <div className="text-4xl text-[#D2A679] font-serif mb-4 glow-text">&ldquo;</div>
                    <p className="text-white/70 leading-relaxed mb-6 italic">{t.quote}</p>
                    <div className="border-t border-[#D2A679]/20 pt-5">
                      <div className="font-semibold text-white">{t.name}</div>
                      <div className="text-white/45 text-sm mt-0.5">{t.title}</div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Banner */}
      <ScrollReveal>
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative rounded-3xl overflow-hidden border border-[#D2A679]/40 bg-gradient-to-br from-[#0a0e1a]/80 to-[#070b14]/90 p-16 glow-box">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D2A679]/10 rounded-full blur-[80px]" />
              </div>
              <div className="relative">
                <h2 className="text-4xl md:text-5xl font-bold mb-5 glow-text">Ready to join the Circle?</h2>
                <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
                  Connect with India&apos;s top GCC leaders. Exchange ideas, access exclusive events, and shape the future of your industry.
                </p>
                <Link
                  href="/join"
                  className="inline-flex items-center gap-2 px-10 py-4 bg-[#D2A679] hover:bg-[#B87333] text-white font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(26,108,255,0.6)]"
                >
                  Join the GCC Circle <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
