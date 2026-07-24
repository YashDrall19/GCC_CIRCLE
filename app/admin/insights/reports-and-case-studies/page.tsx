'use client';

import { useState } from 'react';

export default function ReportsPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [active, setActive] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // For now just log the values. Backend integration can be added later.
    const form = new FormData();
    form.append('title', title);
    form.append('description', description);
    if (imageFile) form.append('image', imageFile);
    if (pdfFile) form.append('pdf', pdfFile);
    form.append('active', active ? '1' : '0');

    console.log('submit', { title, description, imageFile, pdfFile, active });
    setMessage('Saved (local only) — ready for backend integration.');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reports & Case Studies</h1>
        <p className="text-white/50 text-sm">Create or upload reports (title, description, image, PDF, active).</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 space-y-6">
        {message ? (
          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">{message}</div>
        ) : null}

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase mb-2">Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase mb-2">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={6}
              className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2 text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase mb-2">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-white"
            />
            {imageFile ? <p className="text-white/60 text-sm mt-2">Selected: {imageFile.name}</p> : null}
          </div>

          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase mb-2">PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)}
              className="w-full text-sm text-white"
            />
            {pdfFile ? <p className="text-white/60 text-sm mt-2">Selected: {pdfFile.name}</p> : null}
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="h-4 w-4 rounded border-white/15 bg-white/[0.05]" />
              <span className="text-white/70 text-sm">Active</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="py-3 px-6 bg-[#D2A679] rounded-xl text-black font-semibold">Save</button>
          <button type="button" onClick={() => { setTitle(''); setDescription(''); setImageFile(null); setPdfFile(null); setActive(true); }} className="py-3 px-6 border border-white/10 rounded-xl text-sm">Reset</button>
        </div>
      </form>
    </div>
  );
}
