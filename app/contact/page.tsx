'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, Linkedin, ArrowRight, CircleCheck as CheckCircle, MapPin } from 'lucide-react';
import { urls } from '@/constants/api';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '', phone: '', linkedin: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(urls.contact, {
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
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[300px] sm:h-[500px] rounded-full bg-[#D2A679]/8 blur-[100px]" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <span className="text-[#B87333] text-xs font-semibold uppercase tracking-widest mb-4 sm:mb-5 block">Get in Touch</span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-5">
            Let&apos;s{' '}
            <span className="bg-gradient-to-r from-[#1a6cff] to-[#38bdf8] bg-clip-text text-transparent">
              Talk
            </span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed px-2">
            Whether you have a question, a partnership idea, or just want to say hello — we&apos;re always happy to hear from you.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-16 sm:pb-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 sm:gap-12">
          {/* Contact info */}
          <div className="md:col-span-2">
            <div className="md:sticky md:top-28 space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5">Contact Info</h2>
                <div className="space-y-3 sm:space-y-4">
                  <a
                    href="mailto:hello@gcccircle.com"
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#D2A679]/40 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#D2A679]/15 flex items-center justify-center text-[#D2A679] group-hover:bg-[#D2A679]/25 transition-colors flex-shrink-0">
                      <Mail size={16} sm-size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white/40 text-xs mb-0.5">Email</div>
                      <div className="text-xs sm:text-sm font-medium truncate">hello@gcccircle.com</div>
                    </div>
                  </a>
                  <a
                    href="tel:+918505823013"
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#D2A679]/40 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#D2A679]/15 flex items-center justify-center text-[#D2A679] group-hover:bg-[#D2A679]/25 transition-colors flex-shrink-0">
                      <Phone size={16} sm-size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white/40 text-xs mb-0.5">Phone / WhatsApp</div>
                      <div className="text-xs sm:text-sm font-medium">+91 8505823013</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#D2A679]/15 flex items-center justify-center text-[#D2A679] flex-shrink-0">
                      <MapPin size={16} sm-size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white/40 text-xs mb-0.5">Based in</div>
                      <div className="text-xs sm:text-sm font-medium">India (Pan-India community)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-5">Let&apos;s get social</h2>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/company/gcc-circle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/15 bg-white/[0.03] hover:border-[#1a6cff]/50 hover:bg-[#1a6cff]/10 text-white/60 hover:text-white transition-all duration-200 text-xs sm:text-sm font-medium"
                  >
                    <Linkedin size={14} sm-size={15} /> LinkedIn
                  </a>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-[#D2A679]/25 bg-[#D2A679]/5">
                <h3 className="font-semibold mb-2 text-xs sm:text-sm">Partnership inquiries?</h3>
                <p className="text-white/50 text-xs leading-relaxed mb-3">
                  For partnership and sponsorship opportunities, reach out directly to our partnerships team.
                </p>
                <a
                  href="mailto:partnerships@gcccircle.com"
                  className="text-[#D2A679] text-xs font-semibold hover:underline"
                >
                  partnerships@gcccircle.com
                </a>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
                <h3 className="font-semibold mb-2 text-xs sm:text-sm">Ready to join?</h3>
                <p className="text-white/50 text-xs leading-relaxed mb-3">
                  Skip the form and join India&apos;s top GCC leadership community directly.
                </p>
                <Link
                  href="/join"
                  className="inline-flex items-center gap-1.5 text-[#D2A679] text-xs font-semibold hover:gap-3 transition-all duration-200"
                >
                  Join the Circle <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div className="rounded-2xl sm:rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-14 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4 sm:mb-5">
                  <CheckCircle size={28} sm-size={32} className="text-emerald-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">Message Received!</h3>
                <p className="text-white/55 leading-relaxed max-w-sm mx-auto text-sm sm:text-base">
                  Thanks for reaching out. We&apos;ll get back to you within 1-2 business days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:p-8 md:p-10 space-y-5 sm:space-y-6"
              >
                <h2 className="text-xl sm:text-2xl font-bold">Send us a message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#D2A679] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@company.com"
                      className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#D2A679] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-2">Phone (India) *</label>
                  <div className="flex gap-2 w-full">
                    <span className="bg-white/[0.05] border border-white/15 rounded-xl px-3 py-3 text-sm text-white/50 flex-shrink-0">+91</span>
                    <input
                      type="tel"
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
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-2">LinkedIn URL *</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={form.linkedin}
                    onChange={handleChange}
                    required
                    placeholder="https://linkedin.com/in/yourname"
                    className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#D2A679] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#D2A679] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 sm:py-4 bg-[#D2A679] hover:bg-[#B87333] disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,108,255,0.4)] flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Send Message <ArrowRight size={16} /></>
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
