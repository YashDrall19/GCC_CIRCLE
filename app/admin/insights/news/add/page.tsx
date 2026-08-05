'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

export default function AddNewsPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const [active, setActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const uploadFile = async (file: File): Promise<string> => {
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1] ?? '');
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });

    const res = await fetch('/api/admin/uploads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename: file.name,
        data: base64,
      }),
    });

    const data = await res.json();

    if (!data.success || !data.url) {
      throw new Error(data.error || 'Upload failed');
    }

    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      if (!pdfFile) {
        throw new Error('Please select a PDF.');
      }

      const pdfUrl = await uploadFile(pdfFile);

      const res = await fetch('/api/admin/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          pdf_url: pdfUrl,
          active,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to save news.');
      }

      setSuccess(true);

      setTimeout(() => {
        router.push('/admin/insights/news/manage');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-xl font-bold mb-2">
          News Added Successfully!
        </h2>

        <p className="text-white/50 text-sm">
          Redirecting...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold">
          Add Industry News
        </h1>

        <p className="text-white/50 text-sm">
          Create a new industry news PDF.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 space-y-6"
      >

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="space-y-5">

          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase mb-2">
              Title *
            </label>

            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="News title..."
              className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679]"
            />
          </div>

          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase mb-2">
              PDF *
            </label>

            {pdfFile ? (
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.05] p-3">
                <span className="text-sm truncate">
                  {pdfFile.name}
                </span>

                <button
                  type="button"
                  onClick={() => setPdfFile(null)}
                  className="text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) =>
                  setPdfFile(e.target.files?.[0] ?? null)
                }
                className="w-full text-sm"
              />
            )}
          </div>

          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase mb-2">
              Description *
            </label>

            <textarea
              required
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a short description..."
              className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679]"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="h-4 w-4"
            />

            <span className="text-sm text-white/70">
              Active
            </span>
          </label>

        </div>

        <div className="flex gap-3">

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-[#D2A679] text-black font-semibold disabled:opacity-60"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>

          <button
            type="button"
            onClick={() => {
              setTitle('');
              setDescription('');
              setPdfFile(null);
              setActive(true);
            }}
            className="px-6 py-3 rounded-xl border border-white/10"
          >
            Reset
          </button>

        </div>

      </form>

    </div>
  );
}