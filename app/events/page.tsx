'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, Calendar, Users, Coffee, Wind, CheckCircle2, Clock3 } from 'lucide-react';
import CardBackgroundCarousel from '@/components/CardBackgroundCarousel';
import { pastEvents, upcomingEvents } from './data';

export default function EventsPage() {

  const experienceFeatures = [
    {
      icon: <Users size={24} />,
      title: 'Networking with Purpose',
      desc: 'Build relationships that go beyond LinkedIn connections — exchange ideas, insights, and opportunities in a relaxed setting.',
    },
    {
      icon: <Coffee size={24} />,
      title: 'Casual Meet & Greet',
      desc: 'Informal gatherings designed to spark authentic conversations and meaningful connections between industry peers.',
    },
    {
      icon: <Wind size={24} />,
      title: 'A Room to Let Loose',
      desc: 'Because even leaders need a space to breathe, laugh, and engage outside of the corporate grind.',
    },
  ];

  return (
    <main className="bg-[#070b14] text-white pt-16 sm:pt-20">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[400px] sm:h-[700px] rounded-full bg-[#D2A679]/8 blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-4 sm:mb-5 block">GCC Circle Events</span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            Where leaders unwind,<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#1a6cff] to-[#38bdf8] bg-clip-text text-transparent">
              connect and inspire
            </span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-2">
            Exclusive, closed-door gatherings for India&apos;s top GCC executives. Every event is crafted for meaningful peer exchange, not surface-level networking.
          </p>
        </div>
      </section>

      {/* The Experience */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-4 block">The Experience</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">What to expect</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
            {experienceFeatures.map((f) => (
              <div
                key={f.title}
                className="group p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#D2A679]/40 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#D2A679]/15 flex items-center justify-center text-[#D2A679] mb-4 sm:mb-5 group-hover:bg-[#D2A679]/25 transition-colors duration-300">
                  {f.icon}
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-2">{f.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="upcoming" className="py-16 sm:py-24 px-4 sm:px-6 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 sm:mb-14 gap-4">
            <div>
              <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-3 block">What&apos;s Coming</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Upcoming Events</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-8">
            {upcomingEvents.map((e, i) => (
              <Link key={i} href={`events/${e?.id}`}>
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] hover:border-[#D2A679]/50 transition-all duration-300"
                >
                  <CardBackgroundCarousel images={e?.images} />
                  <div className="absolute top-0 right-0 w-40 sm:w-56 h-40 sm:h-56 bg-[#D2A679]/5 rounded-full -translate-y-1/2 translate-x-1/3 group-hover:bg-[#D2A679]/10 transition-colors duration-300 pointer-events-none" />
                  <div className="relative p-6 sm:p-10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between mb-4 sm:mb-6 gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-2">
                          <Calendar size={12} />
                          {e.date} {e.month} {e.year}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-1">{e.type}</h3>
                        <p className="text-white/50 text-sm font-medium">{e.city}</p>
                      </div>
                      <div
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap ${
                        e?.registrations_open
                          ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                          : "bg-amber-500/15 border-amber-500/30 text-amber-400"
                      }`}
                    >
                      {e?.registrations_open ? (
                        <CheckCircle2 size={10} />
                      ) : (
                        <Clock3 size={10} />
                      )}

                      {e?.registrations_open
                        ? "Registrations Open"
                        : "Registrations Opening Soon"}
                    </div>
                    </div>
                    <p className="text-white/55 text-sm leading-relaxed mb-6 sm:mb-8">{e.desc}</p>
                    {e.registrations_open &&
                      <Link
                        href="/join"
                        className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#D2A679] hover:bg-[#B87333] text-white text-sm font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_20px_rgba(26,108,255,0.4)]"
                      >
                        Register Now <ArrowRight size={14} />
                      </Link>
                    }
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section id="past" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-4 block">We&apos;ve Been Busy</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Past Events</h2>
            <p className="text-white/50 mt-3 sm:mt-4 text-base sm:text-lg max-w-xl mx-auto px-2">
              A glimpse into the circles we&apos;ve created across India&apos;s leading GCC cities.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {pastEvents.map((e, i) => (
              <Link key={i} href={`events/${e?.id}`}>
                <div
                  className="group overflow-hidden rounded-2xl border border-white/10 hover:border-[#B87333] hover:bg-[#D2A679] transition-all duration-300"
                >
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={e.img}
                      alt={`${e.city} event`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent" />
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                      <div className="text-white font-bold text-lg sm:text-xl">{e.city}</div>
                      <div className="text-[#D2A679] text-xs font-semibold uppercase tracking-wide">{e.date} {e.month} {e.year}</div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-6 bg-white/[0.03]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-semibold text-sm sm:text-base">{e.type}</div>
                        <div className="text-white/40 text-xs sm:text-sm mt-1">{e.attendees} attendees</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <ArrowRight size={14} className="text-white/50" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-2xl sm:rounded-3xl border border-[#1a6cff]/30 bg-gradient-to-br from-[#1a6cff]/10 to-transparent p-8 sm:p-14">
            <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-[#D2A679]/15 rounded-full blur-[60px]" />
            </div>
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Want to be in the room?</h2>
              <p className="text-white/55 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base px-2">
                Join the GCC Circle and get exclusive access to all upcoming events, roundtables, and leadership summits.
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
