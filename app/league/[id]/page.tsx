'use client';

import Link from 'next/link';
import { ArrowLeft, Linkedin } from 'lucide-react';
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
      <main className="bg-[#070b14] text-white min-h-screen pt-16 sm:pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Leader not found</h1>
          <p className="text-white/55 mb-8 text-sm sm:text-base">
            The leader you&apos;re looking for doesn&apos;t exist.
          </p>

          <Link
            href="/league"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#D2A679] hover:bg-[#B87333] text-white font-semibold rounded-full transition-all duration-200 text-sm sm:text-base"
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
    <main className="bg-[#070b14] text-white min-h-screen pt-16 sm:pt-20">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <Link
          href="/league"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-200 text-sm sm:text-base"
        >
          <ArrowLeft size={18} />
          Back to League
        </Link>
      </div>

      {/* Content */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 lg:gap-14 items-start mb-12">
            {/* Left Column */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#B87333] w-full max-w-[320px]">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover object-top transition-transform duration-500"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent" />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="mb-4">
                <span
                  className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-widest"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    color: accentColor,
                  }}
                >
                  {leaderType === "tech" ? "Tech Leader" : "HR Leader"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3">
                {leader.name}
              </h1>

              <p
                className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6"
                style={{ color: accentColor }}
              >
                {leader.designation}
              </p>

              {leader.linkedin && (
                <a
                  href={leader.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-5 py-3 mb-8 bg-white/[0.03] border border-white/10 rounded-xl text-sm font-semibold text-white/90 hover:bg-white/[0.05] transition-all duration-200"
                >
                  <div className="w-6 h-6 rounded-sm flex items-center justify-center bg-[#D2A679]/20">
                    <Linkedin size={16} style={{ color: "#D2A679" }} />
                  </div>

                  Connect on LinkedIn
                </a>
              )}

              <div className="w-full rounded-2xl border border-white/6 bg-white/[0.02] p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-3">
                  Beyond the Title
                </h2>

                <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                  {leader.quote}
                </p>
              </div>
            </div>
          </div>

          {/* Q&A */}
          {leader.questionaire && leader.questionaire.length > 0 && (
            <div className="mb-10 sm:mb-14">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">In Conversation</h2>

              <div className="space-y-8 sm:space-y-10">
                {leader.questionaire
                  .filter(
                    (q: any) =>
                      q.answer &&
                      String(q.answer).trim().length > 0
                  )
                  .map((q: any, idx: number) => (
                    <div
                      key={idx}
                      className="border-b border-white/10 pb-6 sm:pb-8"
                    >
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#D2A679]">
                        {q.question}
                      </h3>

                      <p className="text-white/70 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {q.answer}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          
        </div>
      </section>
    </main>
  );
}
