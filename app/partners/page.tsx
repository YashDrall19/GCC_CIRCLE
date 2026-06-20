'use client';

import Link from 'next/link';
import { ArrowRight, Star, Eye, Network, Zap, Mail } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";

const benefits = [
  {
    icon: <Eye size={22} />,
    title: 'Exclusive Access',
    desc: 'Direct engagement with decision-makers and senior executives across India\'s top GCC organizations.',
  },
  {
    icon: <Star size={22} />,
    title: 'Brand Visibility',
    desc: 'Position your brand alongside India\'s foremost leadership community and its curated executive audience.',
  },
  {
    icon: <Network size={22} />,
    title: 'Strategic Networking',
    desc: 'Build relationships with top-tier professionals in a meaningful, curated environment beyond mass events.',
  },
  {
    icon: <Zap size={22} />,
    title: 'High-Impact Experiences',
    desc: 'Be part of premium events designed for influence, collaboration, and thought leadership at the executive level.',
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
    <main className="bg-[#070b14] text-white pt-16 sm:pt-20">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 lg:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[350px] sm:h-[600px] rounded-full bg-[#D2A679]/8 blur-[100px]" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-4 sm:mb-5 block">Partnership</span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            GCC Circle{' '}
            <span className="bg-gradient-to-r from-[#1a6cff] to-[#38bdf8] bg-clip-text text-transparent">
              Premium Partners
            </span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed px-2">
            Partner with us to engage India&apos;s premier GCC leaders — where every collaboration adds value to our events and impact to our Circle.
          </p>
        </div>
      </section>

      {/* Why partner */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-4 block">The Value</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Why partner with us?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="group p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-[#D2A679]/40 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#D2A679]/15 flex items-center justify-center text-[#D2A679] mb-4 sm:mb-5 group-hover:bg-[#D2A679]/25 transition-colors">
                  {b.icon}
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-2">{b.title}</h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current partners */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-4 block">Our Network</span>
            <h2 className="text-3xl sm:text-4xl font-bold">Current Partners</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {currentPartners.map((p) => (
              <div
                key={p.name}
                className="group p-4 sm:p-6 rounded-2xl border border-[#D2A679]/30 bg-white/[0.03] hover:border-[#B87333] transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mx-auto mb-3 sm:mb-4 border border-white/10">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <div className="font-semibold text-xs sm:text-sm">{p.name}</div>
                <div className="text-[#B87333] text-[10px] sm:text-xs mt-1">{p.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative rounded-2xl sm:rounded-3xl border border-[#D2A679]/30 bg-gradient-to-br from-[#D2A679]/10 to-transparent p-8 sm:p-14">
            <div className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-[#D2A679]/15 rounded-full blur-[60px]" />
            </div>
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to partner?</h2>
              <p className="text-white/55 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto text-sm sm:text-base px-2">
                Explore partnership opportunities for upcoming events and become part of India&apos;s premier GCC leadership circle.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <a
                  href="mailto:partnerships@gcccircle.com"
                  className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 bg-[#D2A679] hover:bg-[#B87333] text-white font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,108,255,0.45)] text-sm sm:text-base w-full sm:w-auto justify-center"
                >
                  <Mail size={14} sm-size={15} /> partnerships@gcccircle.com
                </a>
                <a
                  href="https://wa.me/918505823013"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 border border-[#D2A679] hover:border-[#B87333] text-white/70 hover:text-white font-semibold rounded-full transition-all duration-200 text-sm sm:text-base w-full sm:w-auto justify-center"
                >
                  <FaWhatsapp size={14} sm-size={15} /> +91 8505823013
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
