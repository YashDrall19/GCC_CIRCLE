'use client';

import { useEffect, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

interface PdfItem {
  id: string;
  title: string;
  url: string;
  fileName: string;
}

interface Props {
  open: boolean;
  pdf: PdfItem | null;
  onClose: () => void;
}

export default function DownloadReportModal({
  open,
  pdf,
  onClose,
}: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    linkedin: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    const saved = localStorage.getItem('gcc-report-user');
    if (saved) {
      setForm(JSON.parse(saved));
    }
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDownload = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!pdf) return;

    setLoading(true);

    try {
      const response = await fetch('/api/report-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          report_name: pdf.title,
          report_file: pdf.fileName,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || 'Something went wrong.');
        return;
      }

      localStorage.setItem(
        'gcc-report-user',
        JSON.stringify(form)
      );

      window.open(pdf.url, '_blank');

      onClose();
    } catch (err) {
      console.error(err);
      alert('Unable to download report.');
    } finally {
      setLoading(false);
    }
  };

  if (!open || !pdf) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-[#070b14] shadow-2xl">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-white/50 hover:text-white transition"
        >
          <X size={22} />
        </button>

        <div className="p-8 md:p-10">

          <div className="text-center mb-8">
            <p className="text-[#D2A679] uppercase tracking-[0.3em] text-xs mb-3">
              Report Download
            </p>

            <h2 className="text-3xl font-bold text-white">
              Download Report
            </h2>

            <p className="mt-3 text-white/60 text-sm leading-relaxed">
              Fill in your details to download this exclusive GCC Circle report.
            </p>
          </div>

          <form
            onSubmit={handleDownload}
            className="space-y-5"
          >

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block text-xs uppercase tracking-wide text-white/60 mb-2">
                  Name *
                </label>

                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D2A679]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wide text-white/60 mb-2">
                  Email *
                </label>

                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D2A679]"
                />
              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block text-xs uppercase tracking-wide text-white/60 mb-2">
                  Phone *
                </label>

                <input
                  required
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D2A679]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wide text-white/60 mb-2">
                  Company *
                </label>

                <input
                  required
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Google"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D2A679]"
                />
              </div>

            </div>

            <div>
              <label className="block text-xs uppercase tracking-wide text-white/60 mb-2">
                LinkedIn URL *
              </label>

              <input
                required
                type="url"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourname"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#D2A679]"
              />
            </div>

            <div className="pt-4">

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#D2A679] hover:bg-[#B87333] transition py-4 font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Download Report
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}