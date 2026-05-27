'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, Linkedin, Instagram, ArrowRight, CircleCheck as CheckCircle, MapPin } from 'lucide-react';
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
    <main className="bg-[#070b14] text-white pt-20">
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#1a6cff]/8 blur-[100px]" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <span className="text-[#1a6cff] text-xs font-semibold uppercase tracking-widest mb-5 block">Get in Touch</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-5">
            Let&apos;s{' '}
            <span className="bg-gradient-to-r from-[#1a6cff] to-[#38bdf8] bg-clip-text text-transparent">
              Talk
            </span>
          </h1>
          <p className="text-white/55 text-lg leading-relaxed">
            Whether you have a question, a partnership idea, or just want to say hello — we&apos;re always happy to hear from you.
          </p>
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12">
          {/* Contact info */}
          <div className="md:col-span-2">
            <div className="sticky top-28 space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-5">Contact Info</h2>
                <div className="space-y-4">
                  <a
                    href="mailto:hello@gcccircle.com"
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#1a6cff]/40 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#1a6cff]/15 flex items-center justify-center text-[#1a6cff] group-hover:bg-[#1a6cff]/25 transition-colors">
                      <Mail size={18} />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs mb-0.5">Email</div>
                      <div className="text-sm font-medium">hello@gcccircle.com</div>
                    </div>
                  </a>
                  <a
                    href="tel:+918505823013"
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#1a6cff]/40 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#1a6cff]/15 flex items-center justify-center text-[#1a6cff] group-hover:bg-[#1a6cff]/25 transition-colors">
                      <Phone size={18} />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs mb-0.5">Phone / WhatsApp</div>
                      <div className="text-sm font-medium">+91 8505823013</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                    <div className="w-10 h-10 rounded-xl bg-[#1a6cff]/15 flex items-center justify-center text-[#1a6cff]">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs mb-0.5">Based in</div>
                      <div className="text-sm font-medium">India (Pan-India community)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-5">Let&apos;s get social</h2>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/company/gcc-circle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 bg-white/[0.03] hover:border-[#1a6cff]/50 hover:bg-[#1a6cff]/10 text-white/60 hover:text-white transition-all duration-200 text-sm font-medium"
                  >
                    <Linkedin size={15} /> LinkedIn
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 bg-white/[0.03] hover:border-pink-500/50 hover:bg-pink-500/10 text-white/60 hover:text-white transition-all duration-200 text-sm font-medium"
                  >
                    <Instagram size={15} /> Instagram
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-[#1a6cff]/25 bg-[#1a6cff]/5">
                <h3 className="font-semibold mb-2 text-sm">Partnership inquiries?</h3>
                <p className="text-white/50 text-xs leading-relaxed mb-3">
                  For partnership and sponsorship opportunities, reach out directly to our partnerships team.
                </p>
                <a
                  href="mailto:partnerships@gcccircle.com"
                  className="text-[#1a6cff] text-xs font-semibold hover:underline"
                >
                  partnerships@gcccircle.com
                </a>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03]">
                <h3 className="font-semibold mb-2 text-sm">Ready to join?</h3>
                <p className="text-white/50 text-xs leading-relaxed mb-3">
                  Skip the form and join India&apos;s top GCC leadership community directly.
                </p>
                <Link
                  href="/join"
                  className="inline-flex items-center gap-1.5 text-[#1a6cff] text-xs font-semibold hover:gap-3 transition-all duration-200"
                >
                  Join the Circle <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-14 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={32} className="text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Message Received!</h3>
                <p className="text-white/55 leading-relaxed max-w-sm mx-auto">
                  Thanks for reaching out. We&apos;ll get back to you within 1-2 business days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10 space-y-6"
              >
                <h2 className="text-2xl font-bold">Send us a message</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#1a6cff] transition-colors"
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
                      className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#1a6cff] transition-colors"
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
                      className="flex-1 bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#1a6cff] transition-colors"
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
                    className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#1a6cff] transition-colors"
                  />
                </div>
                {/* <div>
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-2">Subject</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#1a6cff] transition-colors appearance-none"
                  >
                    <option value="" className="bg-[#0a0e1a]">Select a topic...</option>
                    <option value="membership" className="bg-[#0a0e1a]">Membership Inquiry</option>
                    <option value="partnership" className="bg-[#0a0e1a]">Partnership / Sponsorship</option>
                    <option value="events" className="bg-[#0a0e1a]">Events</option>
                    <option value="media" className="bg-[#0a0e1a]">Media / Press</option>
                    <option value="other" className="bg-[#0a0e1a]">Other</option>
                  </select>
                </div> */}
                <div>
                  <label className="text-white/60 text-xs font-semibold uppercase tracking-wide block mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us how we can help..."
                    className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#1a6cff] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#1a6cff] hover:bg-[#1558d6] disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-[0_0_30px_rgba(26,108,255,0.4)] flex items-center justify-center gap-2"
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
