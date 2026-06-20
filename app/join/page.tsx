'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, CircleCheck as CheckCircle, Users, Zap, Globe } from 'lucide-react';
import { urls } from '@/constants/api';

const benefits = [
  'Exclusive access to closed-door leadership events',
  'Peer-level exchange with CXOs and Site Heads',
  'Curated insights and no-noise industry updates',
  'Introductions to India\'s top GCC professionals',
  'WhatsApp community for real-time discussions',
  'Thought leadership and speaking opportunities',
];

const memberTypes = [
  { label: 'CXO / C-Suite Executive', value: 'cxo' },
  { label: 'Site Head / Country Head', value: 'site_head' },
  { label: 'VP / SVP Engineering', value: 'vp_engineering' },
  { label: 'Director / Senior Director', value: 'director' },
  { label: 'General Manager', value: 'gm' },
  { label: 'Other Senior Leader', value: 'other' },
];

export default function JoinPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    role: '',
    linkedin: '',
    whatsapp: false,
    agreed: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreed) return;
    setLoading(true);
    const res = await fetch(urls.joincircle, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (data?.success) {
      setSubmitted(true);
    }
    setLoading(false);
    
  };

  return (
    <main className="bg-[#070b14] text-white pt-16 sm:pt-20">
      {/* Hero */}
      <section className="relative py-14 sm:py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[300px] sm:h-[600px] rounded-full bg-[#D2A679]/8 blur-[120px]" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-4 sm:mb-5 block">Membership</span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-5">
            Let&apos;s Connect.{' '}
            <span className="bg-gradient-to-r from-[#1a6cff] to-[#38bdf8] bg-clip-text text-transparent">
              Let&apos;s Collaborate.
            </span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed px-2">
            Whether you&apos;re looking to partner, share ideas, or simply say hello — we&apos;re all ears. And if you&apos;re ready to join India&apos;s top GCC leadership community, you can do that here too.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-16 sm:pb-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 sm:gap-12 items-start">
          {/* Benefits sidebar */}
          <div className="md:col-span-2">
            <div className="md:sticky md:top-28">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Join our community</h2>
              <p className="text-white/55 text-sm leading-relaxed mb-6 sm:mb-8">
                Join India&apos;s top GCC leadership community to network, collaborate, and gain exclusive access to curated insights, events, and discussions.
              </p>
              <div className="space-y-2.5 sm:space-y-3 mb-8 sm:mb-10">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-[#D2A679] flex-shrink-0 mt-0.5" />
                    <span className="text-white/65 text-sm leading-snug">{b}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                  {[
                    { icon: <Users size={16} sm-size={18} />, value: '500+', label: 'Members' },
                    { icon: <Globe size={16} sm-size={18} />, value: '10+', label: 'Cities' },
                    { icon: <Zap size={16} sm-size={18} />, value: '25+', label: 'Events' },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="text-[#D2A679] flex justify-center mb-1">{s.icon}</div>
                      <div className="text-white font-bold text-sm sm:text-base">{s.value}</div>
                      <div className="text-white/35 text-[10px] sm:text-xs">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-white/30 text-xs mt-4 sm:mt-6 leading-relaxed">
                * We value your privacy. Your information will only be used to connect with you and share updates about the GCC Circle.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div className="rounded-2xl sm:rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-14 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4 sm:mb-5">
                  <CheckCircle size={28} sm-size={32} className="text-emerald-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">You&apos;re on the list!</h3>
                <p className="text-white/55 leading-relaxed max-w-sm mx-auto text-sm sm:text-base">
                  Thanks for reaching out. Our team will review your application and be in touch shortly to welcome you into the Circle.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8 md:p-10 space-y-5 sm:space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={form.first_name}
                      onChange={handleChange}
                      required
                      placeholder="Ravi"
                      className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#D2A679] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={form.last_name}
                      onChange={handleChange}
                      required
                      placeholder="Sharma"
                      className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#D2A679] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="ravi@company.com"
                    className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#D2A679] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-2">
                      Mobile (India) *
                    </label>
                    <div className="flex gap-2">
                      <span className="bg-white/[0.05] border border-white/15 rounded-xl px-3 py-3 text-sm text-white/50 flex-shrink-0">+91</span>
                      <input
                        type="tel"
                        maxLength={10}
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="9876543210"
                        className="flex-1 bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#D2A679] transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      required
                      placeholder="Acme GCC India"
                      className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#D2A679] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-2">
                    Designation *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    placeholder="VP Engineering & India Site Leader"
                    className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#D2A679] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-2">
                    How did you hear about us? *
                  </label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D2A679] transition-colors appearance-none"
                  >
                    <option value="" className="bg-[#0a0e1a]">Select your role...</option>
                    {memberTypes.map((m) => (
                      <option key={m.value} value={m.label} className="bg-[#0a0e1a]">{m.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-2">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={form.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourname"
                    className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#D2A679] transition-colors"
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5 flex-shrink-0">
                      <input
                        type="checkbox"
                        name="whatsapp"
                        checked={form.whatsapp}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <div className="w-4 h-4 rounded border border-white/30 peer-checked:bg-[#D2A679] peer-checked:border-[#D2A679] transition-colors" />
                      <svg className="absolute inset-0 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 16 16">
                        <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-white/55 text-sm leading-relaxed">Add me to the WhatsApp community</span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <div className="relative mt-0.5 flex-shrink-0">
                      <input
                        type="checkbox"
                        name="agreed"
                        checked={form.agreed}
                        onChange={handleChange}
                        required
                        className="peer sr-only"
                      />
                      <div className="w-4 h-4 rounded border border-white/30 peer-checked:bg-[#D2A679] peer-checked:border-[#D2A679] transition-colors" />
                      <svg className="absolute inset-0 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 16 16">
                        <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-white/55 text-sm leading-relaxed">
                      I agree to the{' '}
                      <span className="text-[#D2A679] hover:underline cursor-pointer">Terms &amp; Conditions</span>
                      {' '}and{' '}
                      <span className="text-[#D2A679] hover:underline cursor-pointer">Terms of Use</span>
                      {' '}of The GCC Circle Community *
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!(form.agreed && form.whatsapp) || loading}
                  className="w-full py-3.5 sm:py-4 bg-[#D2A679] hover:bg-[#B87333] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,108,255,0.4)] flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Join the GCC Circle <ArrowRight size={16} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
