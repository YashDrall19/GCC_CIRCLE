'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

export default function AddReportPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [active, setActive] = useState(true);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!imageFile) {
      setImagePreview('');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: file.name, data: base64 }),
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
      let imageUrl = '';
      let pdfUrl = '';

      if (imageFile) {
        imageUrl = await uploadFile(imageFile);
      }

      if (pdfFile) {
        pdfUrl = await uploadFile(pdfFile);
      }

      const res = await fetch('/api/admin/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          image_url: imageUrl,
          pdf_url: pdfUrl,
          active,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => router.push('/admin/insights/reports/manage'), 1500);
      } else {
        setError(data.error || 'Failed to save report');
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-xl font-bold mb-2">Report Added!</h2>
        <p className="text-white/50 text-sm">Redirecting to Reports Management...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Report</h1>
        <p className="text-white/50 text-sm">Create a new report or case study.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 space-y-6">
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Report title..."
              className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679]"
            />
          </div>

          <div className='flex flex-wrap gap-24'>
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase mb-2">Cover Image</label>
              {imagePreview ? (
                <div className="relative inline-block">
                  <img src={imagePreview} alt="Cover preview" className="w-full max-w-sm h-56 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => setImageFile(null)}
                    className="absolute -top-2 -right-2 bg-red-600 rounded-full p-1 text-white"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                  className="w-full text-sm text-white"
                />
              )}
            </div>

            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase mb-2">PDF</label>
              {pdfFile ? (
                <div className="flex items-center justify-between p-3 bg-white/[0.05] border border-white/10 rounded-lg">
                  <span className="text-sm text-white">{pdfFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setPdfFile(null)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)} className="w-full text-sm text-white" />
              )}
            </div>
          </div>

          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase mb-2">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={6}
              placeholder="Report description..."
              className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679]"
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="h-4 w-4 rounded border-white/15 bg-white/[0.05]" />
              <span className="text-white/70 text-sm">Active</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="py-3 px-6 bg-[#D2A679] rounded-xl text-black font-semibold disabled:opacity-50">
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={() => {
              setTitle('');
              setDescription('');
              setImageFile(null);
              setPdfFile(null);
              setActive(true);
            }}
            className="py-3 px-6 border border-white/10 rounded-xl text-sm"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
