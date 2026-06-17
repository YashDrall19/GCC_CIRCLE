'use client';

import Link from 'next/link';
import { ArrowLeft, Linkedin, MapPin } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { leaders1, leaderTypeMap } from '../data';
import Image from 'next/image';

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

  if (!leader) {
    return (
      <main className="bg-[#070b14] text-white min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Leader not found</h1>
          <p className="text-white/55 mb-8">
            The leader you're looking for doesn't exist.
          </p>

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
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 py-4">
        <Link
          href="/league"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={18} />
          Back to League
        </Link>
      </div>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Image */}
          <div className="flex justify-center mb-10">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#B87333] w-full max-w-sm">
              <div className="aspect-[3/4]">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                style={{
                  backgroundColor: `${accentColor}20`,
                  color: accentColor,
                }}
              >
                {leaderType === 'tech' ? 'Tech Leader' : 'HR Leader'}
              </span>
            </div>

            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-[#1a6cff] to-[#38bdf8] bg-clip-text text-transparent">
              {leader.name}
            </h1>

            <p
              className="text-xl font-semibold mb-2"
              style={{ color: accentColor }}
            >
              {leader.designation}
            </p>

            {/* <p className="text-lg text-white/70">
              {leader.date || 'GCC Leadership Spotlight'}
            </p> */}
          </div>

          {/* About */}
          <div className="mb-14">
            <h2 className="text-2xl font-bold mb-4">About</h2>

            <p className="text-white/70 leading-relaxed text-lg">
              {leader.quote}
            </p>
          </div>

          {/* Q&A */}
          {leader.questionaire && leader.questionaire.length > 0 && (
            <div className="mb-14">
              <h2 className="text-2xl font-bold mb-8">Q&A</h2>

              <div className="space-y-10">
                {leader.questionaire
                  .filter(
                    (q: any) =>
                      q.answer &&
                      String(q.answer).trim().length > 0
                  )
                  .map((q: any, idx: number) => (
                    <div
                      key={idx}
                      className="border-b border-white/10 pb-8"
                    >
                      <h3 className="text-xl font-semibold mb-4 text-[#D2A679]">
                        {q.question}
                      </h3>

                      <p className="text-white/70 leading-relaxed whitespace-pre-line">
                        {q.answer}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Connect */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Connect</h2>

            <div className="space-y-4">
              {leader.linkedin && (
                <a
                  href={leader.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#D2A679]/20">
                    <Linkedin
                      size={20}
                      style={{ color: '#D2A679' }}
                    />
                  </div>

                  <div>
                    <p className="text-sm text-white/55">LinkedIn</p>
                    <p className="font-semibold">
                      Connect on LinkedIn
                    </p>
                  </div>
                </a>
              )}

              {/* <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#D2A679]/20">
                  <MapPin
                    size={20}
                    style={{ color: '#D2A679' }}
                  />
                </div>

                <div>
                  <p className="text-sm text-white/55">Session</p>
                  <p className="font-semibold">
                    {leader.date || 'GCC Leadership Spotlight'}
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}