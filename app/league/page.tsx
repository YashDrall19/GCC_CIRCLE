'use client';

import Link from 'next/link';
import { ArrowRight, Linkedin } from 'lucide-react';
import type { Leader } from './data';
import { leaderTypeMap, leaders1, slugify } from './data';


const leaders: Leader[] = leaders1.map((leader) => ({
  ...leader,
  id: slugify(leader.name),
  type: leaderTypeMap[slugify(leader.name)] ?? 'tech',
}));

const techLeaders = leaders.filter((l) => l.type === 'tech');
const hrLeaders = leaders.filter((l) => l.type === 'hr');

export default function LeaguePage() {
  return (
    <main className="bg-[#070b14] text-white pt-20">
      {/* Hero */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-[#D2A679]/8 blur-[120px]" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-5 block">Membership</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            The League of{' '}
            <span className="bg-gradient-to-r from-[#1a6cff] to-[#38bdf8] bg-clip-text text-transparent">
            {/* <span className="bg-gradient-to-r from-[#B87333] to-[#D2A679] bg-clip-text text-transparent"> */}
              Legends
            </span>
          </h1>
          <p className="text-white/55 text-lg leading-relaxed max-w-2xl mx-auto">
            Join GCC Circle — a curated community for India&apos;s top tech leaders. Exchange ideas, stay ahead of what&apos;s next, and access sharp, no-noise insights, conversations, and closed-door forums.
          </p>
          <div className="mt-8">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D2A679] hover:bg-[#B87333] text-white font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,108,255,0.5)]"
            >
              Join the League <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-10 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: '500+', label: 'Members' },
              { value: '50+', label: 'Companies' },
              { value: '10+', label: 'Cities' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl md:text-4xl font-bold text-[#D2A679]">{s.value}</div>
                <div className="text-white/45 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Members grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#B87333] text-xs font-semibold uppercase tracking-widest mb-4 block">Our Members</span>
            <h2 className="text-4xl md:text-5xl font-bold">Meet the Circle</h2>
            <p className="text-white/50 mt-4 text-lg max-w-xl mx-auto">
              India&apos;s most influential GCC leaders, all in one place.
            </p>
          </div>

          {/* Tech Leaders Section */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
              <span className="w-2 h-2 bg-[#1a6cff] rounded-full"></span>
              The League of Legends
            </h3>
            <p className="text-white/60 max-w-2xl leading-relaxed mb-6">
              Join GCC Circle – a curated community for India’s top tech leaders in GCCs. Exchange ideas, stay ahead of what’s next, and access sharp, no-noise insights, conversations, and closed-door forums.
            </p>
            <div className="overflow-x-auto pb-4 -mx-6 px-6">
              <div className="flex gap-6 min-w-min">
                {techLeaders.map((leader) => (
                  <Link key={leader.id} href={`/league/${leader.id}`}>
                    <div className="group relative overflow-hidden rounded-2xl border border-[#B87333] bg-white/[0.03] hover:border-[#D2A679] transition-all duration-300 cursor-pointer w-56 flex-shrink-0">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/40 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="font-semibold text-sm leading-tight">{leader.name}</div>
                        <div className="text-[#D2A679] text-xs mt-0.5 leading-tight">{leader.designation}</div>
                        {/* <div className="text-[#D2A679] text-xs font-semibold mt-1">{leader.date}</div>
                        <p className="text-white/60 text-[11px] leading-snug mt-2">{leader.quote}</p> */}
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-7 h-7 rounded-full bg-[#1a6cff]/90 flex items-center justify-center">
                          <Linkedin size={12} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* HR Leaders Section */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
              <span className="w-2 h-2 bg-[#D2A679] rounded-full"></span>
              The League of Titans
            </h3>
            <p className="text-white/60 max-w-2xl leading-relaxed mb-3">
              Join GCC Circle – built for GCC talent leaders shaping the future of hiring and org design.
            </p>
            <p className="text-white/60 max-w-2xl leading-relaxed mb-6">
              Tap into real conversations, proven playbooks, and a trusted network that actually moves the needle.
            </p>
            <div className="overflow-x-auto pb-4 -mx-6 px-6">
              <div className="flex gap-6 min-w-min">
                {hrLeaders.map((leader) => (
                  <Link key={leader.id} href={`/league/${leader.id}`}>
                    <div className="group relative overflow-hidden rounded-2xl border border-[#B87333] bg-white/[0.03] hover:border-[#D2A679] transition-all duration-300 cursor-pointer w-56 flex-shrink-0">
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/40 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="font-semibold text-sm leading-tight">{leader.name}</div>
                        <div className="text-[#D2A679] text-xs mt-0.5 leading-tight">{leader.designation}</div>
                        {/* <div className="text-[#D2A679] text-xs font-semibold mt-1">{leader.date}</div>
                        <p className="text-white/60 text-[11px] leading-snug mt-2">{leader.quote}</p> */}
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-7 h-7 rounded-full bg-[#D2A679]/90 flex items-center justify-center">
                          <Linkedin size={12} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-3xl border border-[#D2A679]/30 bg-gradient-to-br from-[#D2A679]/10 to-transparent p-14">
            <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#D2A679]/15 rounded-full blur-[60px]" />
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to be listed here?</h2>
              <p className="text-white/55 mb-8 leading-relaxed max-w-lg mx-auto">
                Join the League and become part of India&apos;s most exclusive GCC leadership network.
              </p>
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#D2A679] hover:bg-[#B87333] text-white font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,108,255,0.45)]"
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
