'use client';

import Link from 'next/link';
import { ArrowLeft, Mail, Linkedin, MapPin } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { leaders1, leaderTypeMap } from '../data';

export default function LeaderDetailPage() {
  const params = useParams();
  const leaderId = params?.id as string;

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/g, '')
      .replace(/-+/g, '-');

  const leader = useMemo(() => {
    return leaders1.find((l: any) => slugify(l.name || '') === leaderId);
  }, [leaderId]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!leader) {
    return (
      <main className="bg-[#070b14] text-white min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Leader not found</h1>
          <p className="text-white/55 mb-8">The leader you're looking for doesn't exist.</p>
          <Link
            href="/league"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D2A679] hover:bg-[#B87333] text-white font-semibold rounded-full transition-all duration-200"
          >
            <ArrowLeft size={16} />
            Back to League
          </Link>
        </div>
      </main>
    );
  }

  const leaderType = leaderTypeMap[leaderId] ?? 'tech';
  const accentColor = leaderType === 'tech' ? '#1a6cff' : '#D2A679';

  return (
    <main className="bg-[#070b14] text-white min-h-screen pt-20">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <Link
          href="/league"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={18} />
          Back to League
        </Link>
      </div>

      {/* Leader Details */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Image Section */}
            <div className="md:col-span-1">
              <div className="relative rounded-2xl overflow-hidden border-2 sticky top-24 border-[#B87333]">
                <div className="aspect-[3/4]">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent" />
              </div>
            </div>

            {/* Content Section */}
            <div className="md:col-span-2">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                    style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
                  >
                    {leaderType === 'tech' ? 'Tech Leader' : 'HR Leader'}
                  </span>
                </div>
                <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-[#1a6cff] to-[#38bdf8] bg-clip-text text-transparent">{leader.name}</h1>
                <div className="space-y-1 mb-6">
                  <p className="text-xl font-semibold" style={{ color: accentColor }}>
                    {leader.designation}
                  </p>
                  <p className="text-lg text-white/70">{leader.date || 'GCC Leadership Spotlight'}</p>
                </div>
              </div>

              {/* About */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">About</h2>
                <p className="text-white/70 leading-relaxed text-lg">
                  {leader.quote}
                </p>
              </div>

              {/* Q&A from pasted data */}
              {leader.questionaire && leader.questionaire.length > 0 && (
                <div className="mb-10">
                  <h2 className="text-2xl font-bold mb-4">Q&A</h2>
                  <div className="space-y-10">
                    {leader.questionaire
                      .filter((q: any) => q.answer && String(q.answer).trim().length > 0)
                      .map((q: any, idx: number) => (
                        <div key={idx} className="rounded-xl border border-white hover:border-[#1a6cff] overflow-hidden">
                          <button
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            aria-expanded={openIndex === idx}
                            className="w-full p-4 flex items-center justify-between text-left bg-white/2 hover:bg-white/3"
                          >
                            <span className="font-semibold text-sm">{q.question}</span>
                            <span className="text-white/60">{openIndex === idx ? '−' : '+'}</span>
                          </button>
                          <div
                            className={`bg-white/3 transition-all duration-300 overflow-hidden ${
                              openIndex === idx
                                ? 'max-h-96 opacity-100 p-4'
                                : 'max-h-0 opacity-0 p-0'
                            }`}
                          >
                            <div className={openIndex === idx ? 'opacity-100 transition-opacity duration-300' : 'opacity-0'}>
                              <p className="text-white/70">{q.answer}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6">Connect</h2>
                <div className="space-y-4">
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#D2A679]/20">
                      <Linkedin size={20} style={{ color: '#D2A679' }} />
                    </div>
                    <div>
                      <p className="text-sm text-white/55">LinkedIn</p>
                      <p className="font-semibold">Connect on LinkedIn</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#D2A679]/20">
                      <MapPin size={20} style={{ color: '#D2A679' }} />
                    </div>
                    <div>
                      <p className="text-sm text-white/55">Session</p>
                      <p className="font-semibold">{leader.date}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              {/* <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Experience', value: '15+ Years' },
                  { label: 'Teams Led', value: '200+' },
                  { label: 'Companies', value: '3+' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-xl border border-white/10 bg-white/[0.02]"
                  >
                    <p className="text-white/55 text-sm">{stat.label}</p>
                    <p className="text-xl font-bold mt-1" style={{ color: '#D2A679' }}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Related Leaders Section */}
      {/* <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Other {leader.type === 'tech' ? 'Tech' : 'HR'} Leaders</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {leaders
              .filter((l) => l.type === leader.type && l.id !== leader.id)
              .slice(0, 4)
              .map((relatedLeader) => (
                <Link key={relatedLeader.id} href={`/league/${relatedLeader.id}`}>
                  <div className="group relative overflow-hidden rounded-2xl border border-[#B87333] bg-white/[0.03] hover:border-[#D2A679] transition-all duration-300 cursor-pointer h-full">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={relatedLeader.img}
                        alt={relatedLeader.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/40 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="font-semibold text-sm leading-tight">{relatedLeader.name}</div>
                      <div className="text-white/55 text-xs mt-0.5 leading-tight">{relatedLeader.title}</div>
                      <div className="text-[#D2A679] text-xs font-semibold mt-1">{relatedLeader.company}</div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section> */}
    </main>
  );
}
