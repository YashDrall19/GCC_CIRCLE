'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, Calendar, Users, Coffee, Wind } from 'lucide-react';

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

const upcomingEvents = [
  {
    city: 'Hyderabad',
    month: 'May',
    date: '22',
    year: '2026',
    type: 'Leadership Mixer',
    desc: 'A closed-door gathering of senior GCC leaders in Hyderabad. Peer-level exchange in a relaxed, curated setting.',
    spots: '40 seats',
  },
  {
    city: 'Hyderabad',
    month: 'May',
    date: '29',
    year: '2026',
    type: 'Tech Mixer',
    desc: 'Deep-dive into technology trends shaping GCCs, with hands-on discussions and lightning talks from tech leaders.',
    spots: '35 seats',
  },
];

const pastEvents = [
  {
    city: 'Delhi',
    month: 'Feb',
    year: '2026',
    type: 'Executive Summit',
    img: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600',
    attendees: '60+',
  },
  {
    city: 'Bangalore',
    month: 'Mar',
    year: '2026',
    type: 'Leadership Mixer',
    img: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
    attendees: '55+',
  },
  {
    city: 'Hyderabad',
    month: 'Apr',
    year: '2026',
    type: 'CXO Roundtable',
    img: 'https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=600',
    attendees: '45+',
  },
];

export default function EventsPage() {
  return (
    <main className="bg-[#070b14] text-white pt-20">
      {/* Hero */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#1a6cff]/8 blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="text-[#1a6cff] text-xs font-semibold uppercase tracking-widest mb-5 block">GCC Circle Events</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Where leaders unwind,<br />
            <span className="bg-gradient-to-r from-[#1a6cff] to-[#38bdf8] bg-clip-text text-transparent">
              connect and inspire
            </span>
          </h1>
          <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
            Exclusive, closed-door gatherings for India&apos;s top GCC executives. Every event is crafted for meaningful peer exchange, not surface-level networking.
          </p>
        </div>
      </section>

      {/* The Experience */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#1a6cff] text-xs font-semibold uppercase tracking-widest mb-4 block">The Experience</span>
            <h2 className="text-4xl md:text-5xl font-bold">What to expect</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {experienceFeatures.map((f) => (
              <div
                key={f.title}
                className="group p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#1a6cff]/40 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1a6cff]/15 flex items-center justify-center text-[#1a6cff] mb-5 group-hover:bg-[#1a6cff]/25 transition-colors duration-300">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-white/55 leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section id="upcoming" className="py-24 px-6 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-14 gap-4">
            <div>
              <span className="text-[#1a6cff] text-xs font-semibold uppercase tracking-widest mb-3 block">What&apos;s Coming</span>
              <h2 className="text-4xl md:text-5xl font-bold">Upcoming Events</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((e, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] hover:border-[#1a6cff]/50 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-56 h-56 bg-[#1a6cff]/5 rounded-full -translate-y-1/2 translate-x-1/3 group-hover:bg-[#1a6cff]/10 transition-colors duration-300 pointer-events-none" />
                <div className="relative p-10">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-2 text-[#1a6cff] text-xs font-semibold uppercase tracking-widest mb-2">
                        <Calendar size={12} />
                        {e.date} {e.month} {e.year}
                      </div>
                      <h3 className="text-3xl font-bold mb-1">{e.city}</h3>
                      <p className="text-white/50 text-sm font-medium">{e.type}</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                      <MapPin size={10} />
                      {e.spots}
                    </div>
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed mb-8">{e.desc}</p>
                  <Link
                    href="/join"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a6cff] hover:bg-[#1558d6] text-white text-sm font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_20px_rgba(26,108,255,0.4)]"
                  >
                    Register Now <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section id="past" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#1a6cff] text-xs font-semibold uppercase tracking-widest mb-4 block">We&apos;ve Been Busy</span>
            <h2 className="text-4xl md:text-5xl font-bold">Past Events</h2>
            <p className="text-white/50 mt-4 text-lg max-w-xl mx-auto">
              A glimpse into the circles we&apos;ve created across India&apos;s leading GCC cities.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pastEvents.map((e, i) => (
              <div
                key={i}
                className="group overflow-hidden rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={e.img}
                    alt={`${e.city} event`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="text-[#1a6cff] text-xs font-semibold uppercase tracking-wide mb-1">{e.month} {e.year}</div>
                    <div className="text-white font-bold text-xl">{e.city}</div>
                  </div>
                </div>
                <div className="p-6 bg-white/[0.03]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-semibold">{e.type}</div>
                      <div className="text-white/40 text-sm mt-1">{e.attendees} attendees</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <ArrowRight size={14} className="text-white/50" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-3xl border border-[#1a6cff]/30 bg-gradient-to-br from-[#1a6cff]/10 to-transparent p-14">
            <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#1a6cff]/15 rounded-full blur-[60px]" />
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Want to be in the room?</h2>
              <p className="text-white/55 mb-8 leading-relaxed">
                Join the GCC Circle and get exclusive access to all upcoming events, roundtables, and leadership summits.
              </p>
              <Link
                href="/join"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1a6cff] hover:bg-[#1558d6] text-white font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,108,255,0.45)]"
              >
                Join the Community <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
