'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, Linkedin, Mail } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { leaders1, leaderTypeMap } from '../data';
import Image from 'next/image';
import ScrollReveal from '@/components/scroll-reveal';

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

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                {leader.name}
              </h1>

              <p
                className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#1a6cff]"
              >
                {leader.designation}
              </p>

              <p
                className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6 text-[#B87333]"
              >
                {leader.company}
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
                  Leadership Voice
                </h2>

                <div className='flex gap-2'>
                  <div className="text-4xl text-[#D2A679] font-serif glow-text">
                    &ldquo;
                  </div>
                  <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                    {leader.quote}
                  </p>
                </div>
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

      <ScrollReveal>
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative rounded-3xl overflow-hidden border border-[#D2A679]/40 bg-gradient-to-br from-[#0a0e1a]/80 to-[#070b14]/90 p-16 glow-box">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D2A679]/10 rounded-full blur-[80px]" />
              </div>
              <div className="relative">
                <h2 className="text-2xl md:text-4xl font-bold mb-5 glow-text">Ready to elevate your leadership brand?</h2>
                <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
                  League of Legends celebrates the leaders redefining India's GCC landscape. If you'd like to be featured or explore executive branding, thought leadership, media visibility, keynote opportunities, or strategic partnerships, write to:
                </p>
                {/* <Link
                  href="/join"
                  className="inline-flex items-center gap-2 px-10 py-4 bg-[#D2A679] hover:bg-[#B87333] text-white font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(26,108,255,0.6)]"
                >
                  Express your Interest <ArrowRight size={16} />
                </Link> */}
                <a
                  href="mailto:hello@gcccircle.com"
                  className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 bg-[#D2A679] hover:bg-[#B87333] text-white font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,108,255,0.45)] text-sm sm:text-base w-full sm:w-auto justify-center"
                >
                  <Mail size={14} sm-size={15} /> hello@gcccircle.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
