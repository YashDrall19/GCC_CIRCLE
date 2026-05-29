'use client';

import Link from 'next/link';
import { ArrowRight, Linkedin } from 'lucide-react';

const legends = [
  {
    name: 'Supriya Rao',
    title: 'MD India',
    company: 'ClearRoute',
    img: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Paras Nigam',
    title: 'VP, Engineering and AI | Site Leader',
    company: 'iCIMS',
    img: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Amod Deshpande',
    title: 'GCC Leader & Country Director',
    company: 'Allvue Systems',
    img: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Anurag Garg',
    title: 'Global Engineering Executive',
    company: 'Ryan',
    img: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Rajesh Puneyani',
    title: 'Vice President & Site Leader',
    company: 'Kenvue',
    img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Yogesh More',
    title: 'General Manager',
    company: 'isolved',
    img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Srinivas Chamarthy',
    title: 'SVP Engineering & India Site Leader',
    company: 'Diligent',
    img: 'https://images.pexels.com/photos/936119/pexels-photo-936119.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Abhishek Chauhan',
    title: 'India Site Leader',
    company: 'SONATYPE',
    img: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Priya Sharma',
    title: 'Country Head & SVP',
    company: 'FinTech Corp',
    img: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Kiran Bhat',
    title: 'Director of Engineering',
    company: 'GlobalEdge',
    img: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Neha Kulkarni',
    title: 'VP Operations & Site Lead',
    company: 'Nexus Systems',
    img: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Vikram Mehta',
    title: 'CTO & India Head',
    company: 'CloudBase Inc',
    img: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {legends.map((l) => (
              <div
                key={l.name}
                className="group relative overflow-hidden rounded-2xl border border-[#B87333] bg-white/[0.03] hover:border-[#D2A679] transition-all duration-300"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={l.img}
                    alt={l.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="font-semibold text-sm leading-tight">{l.name}</div>
                  <div className="text-white/55 text-xs mt-0.5 leading-tight">{l.title}</div>
                  <div className="text-[#D2A679] text-xs font-semibold mt-1">{l.company}</div>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-7 h-7 rounded-full bg-[#1a6cff]/90 flex items-center justify-center">
                    <Linkedin size={12} className="text-white" />
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
