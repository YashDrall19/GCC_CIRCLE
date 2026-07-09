'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, CircleCheck as CheckCircle, Users, Zap, Globe, Mic, X } from 'lucide-react';
import { urls } from '@/constants/api';

const benefits = [
  "Invitation-only access to executive roundtables, mixers, and leadership experiences",
  "Connect with GCC Heads, Site Leaders, technology executives, CHROs, and talent leaders",
  "Curated industry intelligence, research, and executive insights",
  "Peer-to-peer discussions through an exclusive leadership community",
  "Strategic introductions to leaders across India's GCC ecosystem",
  "Opportunities to contribute through thought leadership, speaking engagements, and community initiatives"
];

const memberTypes = ["LinkedIn", "Email", "Whatsapp", "Colleague / Friend", "Talentiser Team", "GCC Circle Event", "Google Search", "Partner (JLL, CII, etc.)", "Social Media (Other than LinkedIn)", "Others"];

export default function JoinPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    source: '',
    sourceOther: '',
    linkedin: '',
    whatsapp: false,
    agreed: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

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
    
    const submitData = {
      ...form,
      source: form.source === 'Others' ? form.sourceOther : form.source,
    };
    
    const res = await fetch(urls.joincircle, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(submitData)
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
          <span className="text-[#D2A679] text-xs font-semibold uppercase tracking-widest mb-4 sm:mb-5 block">Join the GCC Circle</span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Where India's <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#1a6cff] to-[#38bdf8] bg-clip-text text-transparent">
              GCC Leaders Connect
            </span>
          </h1>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed px-2 mb-6">
            GCC Circle is an invitation-led community built exclusively for GCC Heads, technology leaders, CHROs, Talent Acquisition leaders, and senior executives shaping the future of Global Capability Centres.
          </p>
          <p className="text-white/55 text-base sm:text-lg leading-relaxed px-2 mb-6">
            Connect with peers, exchange ideas, access executive intelligence, and be part of meaningful conversations that happen beyond the boardroom.
          </p>
          <i className="text-white/55 text-base sm:text-lg leading-relaxed px-2">
            Membership at GCC Circle is carefully curated to preserve the quality of our leadership community. Complete the application below, and our team will review your profile. If your application meets our membership criteria, you'll receive an exclusive invitation to join the Circle.
          </i>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-16 sm:pb-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 sm:gap-12 items-start">
          {/* Benefits sidebar */}
          <div className="md:col-span-2">
            <div className="md:sticky md:top-28">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Why Join GCC Circle?</h2>
              <p className="text-white/55 text-sm leading-relaxed mb-6 sm:mb-8">
                Become part of a trusted network designed to foster collaboration, leadership, and knowledge sharing across India's GCC ecosystem.
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
                <div className="grid grid-cols-4 gap-3 sm:gap-4 text-center">
                  {[
                    { icon: <Users size={16} sm-size={18} />, value: '400+', label: 'Leaders & Counting' },
                    { icon: <Globe size={16} sm-size={18} />, value: '250+', label: 'GCCs Represented' },
                    { icon: <Zap size={16} sm-size={18} />, value: '30+', label: 'Leadership Experiences' },
                    { icon: <Mic size={16} />, value: '150+', label: 'Distinguished Speakers' },
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
                    name="source"
                    value={form.source}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D2A679] transition-colors appearance-none"
                  >
                    <option value="" className="bg-[#0a0e1a]">Select...</option>
                    {memberTypes.map((m) => (
                      <option key={m} value={m} className="bg-[#0a0e1a]">{m}</option>
                    ))}
                  </select>
                  {form.source === 'Others' && (
                    <input
                      type="text"
                      name="sourceOther"
                      value={form.sourceOther}
                      onChange={handleChange}
                      placeholder="Please specify..."
                      className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-[#D2A679] transition-colors mt-3"
                    />
                  )}
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
                    <span className="text-white/55 text-sm leading-relaxed">Send me a link to join the WhatsApp community</span>
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
                      I agree to the GCC Circle Community Membership{" "}
                      <button
                        type="button"
                        onClick={() => setShowTerms(true)}
                        className="text-[#D2A679] hover:underline cursor-pointer"
                      >
                        Terms &amp; Conditions
                      </button>
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
      {showTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/60" onClick={() => setShowTerms(false)} />
          <button
            aria-label="Close terms"
            onClick={() => setShowTerms(false)}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-60 bg-[#070b14] border border-white/10 rounded-full p-2 shadow-lg text-white/80 hover:text-white focus:outline-none"
          >
            <X />
          </button>
          <div className="relative z-10 max-w-3xl w-full mx-4 sm:mx-6 bg-[#070b14] border border-white/10 rounded-2xl shadow-lg overflow-y-auto max-h-[85vh]">
            <div className="flex items-start justify-between p-4 sm:p-6 border-b border-white/10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold">GCC Circle Community Membership Terms &amp; Conditions</h3>
                <p className="text-white/50 text-xs mt-1">Last Updated: July, 2026</p>
              </div>
            </div>
            

            <div className="p-4 sm:p-6 text-sm leading-relaxed text-white/80 space-y-4">
              <p>
                These Terms &amp; Conditions ("Terms") govern your application for membership and participation in the GCC Circle community ("GCC Circle", "we", "our", or "us"). By submitting an application, accessing the community, or participating in any GCC Circle initiative, event, platform, or communication, you acknowledge that you have read, understood, and agree to be bound by these Terms.
              </p>

              <h4 className="font-semibold">1. Community Overview</h4>
              <p>
                GCC Circle is a private, curated, invitation-led professional community created to bring together senior leaders across India's Global Capability Centre (GCC) ecosystem. The community exists to facilitate executive networking, leadership development, knowledge exchange, strategic collaborations, and industry engagement through digital platforms, private events, executive roundtables, leadership experiences, research initiatives, and related activities.
              </p>
              <p>
                Membership is intended exclusively for senior professionals including, but not limited to, GCC Heads, Site Leaders, Technology Leaders, Engineering Leaders, CHROs, Talent Acquisition Leaders, Functional Leaders, Enterprise Executives, and selected ecosystem partners.
              </p>

              <h4 className="font-semibold">2. Membership Eligibility</h4>
              <p>
                Membership is by application, nomination, or invitation only.
              </p>
              <p>
                Submitting an application does not guarantee admission into GCC Circle. All applications are reviewed against our internal membership criteria, which may include professional experience, seniority, leadership responsibilities, relevance to the GCC ecosystem, and overall alignment with the objectives of the community.
              </p>
              <p>
                GCC Circle reserves the absolute right to accept, decline, defer, suspend, revoke, or terminate membership at its sole discretion without the obligation to provide reasons.
              </p>

              <h4 className="font-semibold">3. Membership Standards</h4>
              <p>
                Members are expected to maintain the highest standards of professionalism, integrity, confidentiality, and mutual respect.
              </p>
              <p className="ml-4">Members agree not to:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Engage in harassment, discrimination, abusive conduct, or inappropriate behaviour.</li>
                <li>Share offensive, defamatory, misleading, or unlawful content.</li>
                <li>Misrepresent their identity, organisation, or professional credentials.</li>
                <li>Use the community primarily for unsolicited sales, recruitment, marketing, or promotional activities without prior written approval.</li>
                <li>Disrupt discussions or interfere with the intended purpose of the community.</li>
              </ul>
              <p>Failure to comply may result in suspension or permanent removal from GCC Circle.</p>

              <h4 className="font-semibold">4. Confidentiality</h4>
              <p>
                Many discussions, executive conversations, leadership forums, and community interactions involve information shared in confidence.
              </p>
              <p>
                Members agree to treat all discussions, presentations, introductions, and shared materials as confidential unless explicitly stated otherwise by the speaker or organiser.
              </p>
              <p className="ml-4">Without prior consent, members shall not:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Record audio or video during community events.</li>
                <li>Capture or distribute screenshots from community platforms.</li>
                <li>Share attendee lists or participant information.</li>
                <li>Publish confidential discussions or insights attributed to other members.</li>
              </ul>

              <h4 className="font-semibold">5. Events &amp; Community Participation</h4>
              <p>
                GCC Circle regularly hosts leadership experiences including, but not limited to, executive roundtables, networking mixers, fireside conversations, panel discussions, webinars, conferences, research forums, and other community initiatives ("Events").
              </p>
              <p>
                Participation in any Event is subject to registration, eligibility, venue capacity, community guidelines, and, where applicable, invitation or approval by GCC Circle. Submission of an RSVP or registration does not guarantee attendance, and GCC Circle reserves the right to approve, decline, modify, or cancel registrations at its sole discretion.
              </p>
              <p>
                By attending a GCC Circle Event, you acknowledge that photographs, audio recordings, and video recordings may be captured for documentation, editorial, promotional, archival, and marketing purposes. These may be used across GCC Circle's websites, newsletters, social media channels, reports, presentations, promotional materials, and other communication platforms without additional compensation.
              </p>
              <p>
                General event photography and wide-angle imagery featuring attendees as part of the overall event environment may be used without obtaining separate individual approval.
              </p>
              <p>
                However, where GCC Circle intends to publish or promote an attendee through a dedicated leadership profile, executive spotlight, testimonial, attributed quote, interview, case study, or feature that includes the attendee's name, designation, organisation, company logo, professional photograph, or other identifiable professional information, GCC Circle will obtain the attendee's prior consent before publication.
              </p>
              <p>
                Participation in interviews, fireside conversations, podcasts, panel discussions, or recorded sessions does not automatically authorise the publication of attributed quotations or branded executive features. Where such content is intended for external publication in a manner that specifically identifies an individual or their organisation, GCC Circle will seek appropriate review and approval prior to release.
              </p>
              <p>
                Where Events are organised in collaboration with strategic partners, sponsors, or co-hosts, attendees acknowledge that limited professional information, including their name, designation, organisation, and business contact details, may be shared with the relevant event partner solely for purposes directly related to the planning, administration, follow-up, networking, or delivery of that specific Event, in accordance with applicable privacy laws and confidentiality obligations. GCC Circle will not disclose personal information for unrelated commercial purposes without an appropriate legal basis or consent where required.
              </p>
              <p>
                GCC Circle reserves the right to modify Event formats, agendas, speakers, venues, schedules, or participation criteria at any time without prior notice where reasonably necessary.
              </p>

              <h4 className="font-semibold">6. Privacy &amp; Use of Information</h4>
              <p>
                The information you provide through your membership application or subsequent interactions with GCC Circle will be used for purposes including: evaluating membership applications, community administration, event registrations, member communications, research and industry initiatives, invitations to relevant GCC Circle activities, and improving member experience.
              </p>
              <p>
                We take reasonable measures to protect your personal information and will not sell your personal data to third parties.
              </p>
              <p>
                From time to time, GCC Circle may collaborate with carefully selected event partners, ecosystem partners, sponsors, or co-hosts to deliver specific leadership experiences. Where you register for or attend such jointly hosted events, limited professional information—such as your name, designation, organisation, and business contact details—may be shared with the relevant partner solely for purposes directly related to the planning, administration, follow-up, or delivery of that event, subject to applicable laws and reasonable confidentiality obligations. Such information will not be shared for unrelated commercial purposes without an appropriate legal basis or your consent where required.
              </p>

              <h4 className="font-semibold">7. Intellectual Property</h4>
              <p>
                Unless otherwise stated, all content published by GCC Circle, including articles, reports, research, branding, event materials, presentations, graphics, videos, photographs, and community assets, remain the intellectual property of GCC Circle or their respective owners.
              </p>
              <p>
                Members may not reproduce, distribute, modify, publish, or commercially exploit such content without prior written permission.
              </p>

              <h4 className="font-semibold">8. Communications</h4>
              <p>
                By becoming a member, you consent to receive communications relating to community updates, leadership experiences, event invitations, research publications, newsletters, industry intelligence, partnership announcements, and other relevant GCC Circle initiatives. Members may unsubscribe from marketing communications at any time; however, essential membership and event communications may continue where necessary.
              </p>

              <h4 className="font-semibold">9. Member Directory &amp; Networking</h4>
              <p>
                Where applicable, GCC Circle may maintain a member directory or facilitate professional introductions between members. Participation in such initiatives does not constitute an endorsement of any individual, organisation, or commercial offering. Members remain responsible for conducting their own due diligence before entering into professional relationships or business engagements.
              </p>

              <h4 className="font-semibold">10. Limitation of Liability</h4>
              <p>
                GCC Circle acts as a facilitator of professional networking and knowledge exchange. We make no guarantees regarding business outcomes, employment opportunities, partnerships, investments, commercial engagements, or other benefits arising from participation in the community. To the fullest extent permitted by law, GCC Circle shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from membership, participation in events, or reliance upon information shared within the community.
              </p>

              <h4 className="font-semibold">11. Changes to Membership &amp; Terms</h4>
              <p>
                GCC Circle reserves the right to modify these Terms, membership criteria, community guidelines, event policies, or operational procedures at any time without prior notice. Continued participation in the community following such changes constitutes acceptance of the revised Terms.
              </p>

              <h4 className="font-semibold">12. Governing Law</h4>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Noida, Uttar Pradesh.
              </p>

              <h4 className="font-semibold">13. Editorial Content, Quotes &amp; Member Profiles</h4>
              <p>
                GCC Circle may, from time to time, feature members through interviews, leadership spotlights, event highlights, articles, reports, social media, newsletters, videos, and other editorial or promotional content. Where GCC Circle intends to publish or attribute a member's direct quote, interview response, opinion, or feature their professional profile using their name, designation, organisation, company logo, photograph, or other identifiable professional information, we will seek the member's prior approval before publication.
              </p>
              <p>
                By participating in interviews, fireside conversations, panel discussions, podcasts, or other recorded interactions with GCC Circle, you acknowledge that excerpts may be considered for publication. However, any direct quotations or professional attributions intended for external publication will be shared with you for review and consent before being published.
              </p>
              <p>
                GCC Circle reserves the right to reference publicly available factual information, including event participation or publicly announced professional appointments, where appropriate, provided such references do not imply endorsement by the individual or their organisation.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
