'use client';

import Link from 'next/link';
import { ArrowRight, Star, Eye, Network, Zap, Mail, Phone } from 'lucide-react';

const benefits = [
  {
    icon: <Eye size={24} />,
    title: 'Exclusive Access',
    desc: 'Direct engagement with decision-makers and senior executives across India\'s top GCC organizations.',
  },
  {
    icon: <Star size={24} />,
    title: 'Brand Visibility',
    desc: 'Position your brand alongside India\'s foremost leadership community and its curated executive audience.',
  },
  {
    icon: <Network size={24} />,
    title: 'Strategic Networking',
    desc: 'Build relationships with top-tier professionals in a meaningful, curated environment beyond mass events.',
  },
  {
    icon: <Zap size={24} />,
    title: 'High-Impact Experiences',
    desc: 'Be part of premium events designed for influence, collaboration, and thought leadership at the executive level.',
  },
];

const partnerTiers = [
  {
    name: 'Associate Partner',
    tag: 'Entry Level',
    color: 'border-white/20',
    highlight: false,
    perks: [
      'Logo placement on event materials',
      'Social media mention post-event',
      '2 tickets to partner event',
      'Access to event recap report',
    ],
  },
  {
    name: 'Premium Partner',
    tag: 'Most Popular',
    color: 'border-[#D2A679]/60',
    highlight: true,
    perks: [
      'Everything in Associate tier',
      'Speaking slot at one event',
      '5 tickets per event',
      'Co-branded content opportunity',
      'Introductions to key leaders',
      'Quarterly impact report',
    ],
  },
  {
    name: 'Title Partner',
    tag: 'Maximum Impact',
    color: 'border-amber-500/40',
    highlight: false,
    perks: [
      'Everything in Premium tier',
      'Title sponsorship of event series',
      'Unlimited tickets',
      'Dedicated thought leadership slot',
      'Direct CXO introductions',
      'Custom activation opportunities',
      'Year-round brand integration',
    ],
  },
];

const currentPartners = [
  { name: 'Talentiser', category: 'Founding Partner', img: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'TechCorp India', category: 'Premium Partner', img: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'InnovateCo', category: 'Associate Partner', img: 'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'GlobalEdge', category: 'Associate Partner', img: 'https://images.pexels.com/photos/1181401/pexels-photo-1181401.jpeg?auto=compress&cs=tinysrgb&w=200' },
];

export default function PartnersPage() {
  return (
    <main className="bg-[#070b14] text-white pt-20">
      {/* Hero */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] rounded-full bg-[#D2A679]/8 blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-5 block">Partnership</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            GCC Circle{' '}
            <div className="bg-gradient-to-r from-[#1a6cff] to-[#38bdf8] bg-clip-text text-transparent">
            {/* <div className="bg-gradient-to-r from-[#B87333] to-[#D2A679] bg-clip-text text-transparent"> */}
              Premium Partners
            </div>
          </h1>
          <p className="text-white/55 text-lg leading-relaxed">
            Partner with us to engage India&apos;s premier GCC leaders — where every collaboration adds value to our events and impact to our Circle.
          </p>
        </div>
      </section>

      {/* Why partner */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-4 block">The Value</span>
            <h2 className="text-4xl md:text-5xl font-bold">Why partner with us?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="group p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#D2A679]/40 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D2A679]/15 flex items-center justify-center text-[#D2A679] mb-5 group-hover:bg-[#D2A679]/25 transition-colors">
                  {b.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{b.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner tiers */}
      <section className="py-24 px-6 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-4 block">Options</span>
            <h2 className="text-4xl md:text-5xl font-bold">Partnership Tiers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {partnerTiers.map((t) => (
              <div
                key={t.name}
                className={`relative rounded-2xl border ${t.color} ${t.highlight ? 'bg-[#D2A679]/5' : 'bg-white/[0.03]'} p-8 transition-all duration-300`}
              >
                {t.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#D2A679] text-white text-xs font-bold rounded-full">
                    {t.tag}
                  </div>
                )}
                {!t.highlight && (
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${t.name === 'Title Partner' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-white/10 text-white/50 border border-white/20'}`}>
                    {t.tag}
                  </div>
                )}
                {t.highlight && <div className="h-5 mb-4" />}
                <h3 className="text-2xl font-bold mb-6">{t.name}</h3>
                <ul className="space-y-3 mb-8">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-white/65">
                      <span className="w-4 h-4 rounded-full bg-[#D2A679]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D2A679]" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:partnerships@gcccircle.com"
                  className={`w-full py-3 rounded-full text-sm font-semibold text-center block transition-all duration-200 ${t.highlight ? 'bg-[#D2A679] hover:bg-[#1558d6] text-white hover:shadow-[0_0_20px_rgba(26,108,255,0.4)]' : 'border border-white/20 hover:border-white/40 text-white/70 hover:text-white'}`}
                >
                  Get in Touch
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current partners */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-4 block">Our Network</span>
            <h2 className="text-4xl font-bold">Current Partners</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {currentPartners.map((p) => (
              <div
                key={p.name}
                className="group p-6 rounded-2xl border border-[#D2A679]/30 bg-white/[0.03] hover:border-[#B87333] transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 border border-white/10">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <div className="font-semibold text-sm">{p.name}</div>
                <div className="text-[#B87333] text-xs mt-1">{p.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-3xl border border-[#D2A679]/30 bg-gradient-to-br from-[#D2A679]/10 to-transparent p-14">
            <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#D2A679]/15 rounded-full blur-[60px]" />
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to partner?</h2>
              <p className="text-white/55 mb-8 leading-relaxed max-w-lg mx-auto">
                Explore partnership opportunities for upcoming events and become part of India&apos;s premier GCC leadership circle.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="mailto:partnerships@gcccircle.com"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#D2A679] hover:bg-[#B87333] text-white font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,108,255,0.45)]"
                >
                  <Mail size={15} /> partnerships@gcccircle.com
                </a>
                <a
                  href="https://wa.me/918505823013"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#D2A679] hover:[#B87333] text-white/70 hover:text-white font-semibold rounded-full transition-all duration-200"
                >
                  <Phone size={15} /> +91 8505823013
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
