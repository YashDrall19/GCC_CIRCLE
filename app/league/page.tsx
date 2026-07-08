'use client';

import Link from 'next/link';
import { ArrowRight, Linkedin } from 'lucide-react';
import type { Leader } from './data';
import { leaderTypeMap, leaders1, slugify } from './data';
import Image from 'next/image';

const leaders: Leader[] = leaders1.map((leader) => ({
  ...leader,
  id: slugify(leader.name),
  type: leaderTypeMap[slugify(leader.name)] ?? 'tech',
}));

const techLeaders = leaders.filter((l) => l.type === 'tech');
const hrLeaders = leaders.filter((l) => l.type === 'hr');

export default function LeaguePage() {
  return (
    <main className="bg-[#070b14] text-white pt-16 sm:pt-20">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[400px] sm:h-[600px] rounded-full bg-[#D2A679]/8 blur-[120px]" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-4 sm:mb-5 block">League</span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            The League of <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#1a6cff] to-[#38bdf8] bg-clip-text text-transparent">
              GCC Leaders
            </span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto px-2">
            Discover the leaders shaping the future of India's Global Capability Centres. Through candid conversations, leadership journeys, and hard-earned lessons, explore the experiences and perspectives behind some of the industry's most influential executives.
          </p>
          {/* <div className="mt-6 sm:mt-8">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#D2A679] hover:bg-[#B87333] text-white font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,108,255,0.5)] text-sm sm:text-base"
            >
              Join the Circle <ArrowRight size={16} />
            </Link>
          </div> */}
        </div>
      </section>

      {/* Stats bar */}
      <section className="py-8 sm:py-10 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-4 gap-4 sm:gap-8 text-center">
            {[
              { value: '400+', label: 'Leaders & Counting' },
              { value: '250+', label: 'GCCs Represented' },
              { value: '30+', label: 'Leadership Experiences' },
              { value: '150+', label: 'Distinguished Speakers' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#D2A679]">{s.value}</div>
                <div className="text-white/45 text-xs sm:text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Members grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            {/* <span className="text-[#B87333] text-xs font-semibold uppercase tracking-widest mb-4 block">Our Members</span> */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1a6cff] to-[#38bdf8] bg-clip-text text-transparent">Explore Leadership Stories below</h2>
            {/* <p className="text-white/50 mt-3 sm:mt-4 text-base sm:text-lg max-w-xl mx-auto px-2">
              India&apos;s most influential GCC leaders, all in one place.
            </p> */}
          </div>

          {/* Tech Leaders Section */}
          <div className="mb-14 sm:mb-20">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 flex items-center gap-3">
              <span className="w-2 h-2 bg-[#1a6cff] rounded-full flex-shrink-0"></span>
              The League of Legends
            </h3>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
              Celebrating the technology visionaries shaping the future of India's GCC ecosystem. Discover the journeys, leadership philosophies, and defining moments of the executives creating lasting impact.
            </p>
            <div className="overflow-x-auto pb-4 -mx-4 sm:-mx-6 px-4 sm:px-6 scrollbar-hide">
              <div className="flex gap-4 sm:gap-6 min-w-min">
                {techLeaders.map((leader) => (
                  <Link key={leader.id} href={`/league/${leader.id}`}>
                    <div className="group relative overflow-hidden rounded-2xl border border-[#B87333] bg-white/[0.03] hover:border-[#D2A679] transition-all duration-300 cursor-pointer w-44 sm:w-56 flex-shrink-0">
                      <div className="aspect-[3/4] overflow-hidden relative">
                        <Image
                          src={leader.image}
                          alt={leader.name}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/40 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <div className="font-semibold text-xs sm:text-sm leading-tight">{leader.name}</div>
                        <div className="text-[#D2A679] text-[10px] sm:text-xs mt-0.5 leading-tight">{leader.designation}</div>
                      </div>
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1a6cff]/90 flex items-center justify-center">
                          <Linkedin size={10} className="text-white" />
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
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 flex items-center gap-3">
              <span className="w-2 h-2 bg-[#D2A679] rounded-full flex-shrink-0"></span>
              The League of Titans
            </h3>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-2 sm:mb-3">
              Conversations with the leading talent & people pioneers building tomorrow's Global Capability Centres. Explore bold ideas, strategic insights, and hard-earned lessons from the leaders driving transformation at scale.
            </p>
            <div className="overflow-x-auto pb-4 -mx-4 sm:-mx-6 px-4 sm:px-6 scrollbar-hide">
              <div className="flex gap-4 sm:gap-6 min-w-min">
                {hrLeaders.map((leader) => (
                  <Link key={leader.id} href={`/league/${leader.id}`}>
                    <div className="group relative overflow-hidden rounded-2xl border border-[#B87333] bg-white/[0.03] hover:border-[#D2A679] transition-all duration-300 cursor-pointer w-44 sm:w-56 flex-shrink-0">
                      <div className="aspect-[3/4] overflow-hidden relative">
                        <Image
                          src={leader.image}
                          alt={leader.name}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/40 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                        <div className="font-semibold text-xs sm:text-sm leading-tight">{leader.name}</div>
                        <div className="text-[#D2A679] text-[10px] sm:text-xs mt-0.5 leading-tight">{leader.designation}</div>
                      </div>
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#D2A679]/90 flex items-center justify-center">
                          <Linkedin size={10} className="text-white" />
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
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-2xl sm:rounded-3xl border border-[#D2A679]/30 bg-gradient-to-br from-[#D2A679]/10 to-transparent p-8 sm:p-14">
            <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-[#D2A679]/15 rounded-full blur-[60px]" />
            </div>
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Want to Be Featured?</h2>
              <p className="text-white/55 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto text-sm sm:text-base px-2">
                If you're a GCC technology leader, CHRO, or Talent Acquisition leader driving impact, we'd love to hear your story.
              </p>
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
