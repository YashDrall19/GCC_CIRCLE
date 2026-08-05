'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertCircle, Trash2, CreditCard as Edit2, X, ExternalLink } from 'lucide-react';

type NewsItem = {
  id: number;
  title: string;
  description: string;
  pdf_url: string;
  active: boolean;
  created_at: string;
  updated_at?: string;
};

const emptyFormState = {
  title: '',
  description: '',
  pdf_url: '',
  active: true,
};

export default function NewsManagePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [form, setForm] = useState(emptyFormState);
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/admin/news');
      const data = await response.json();

      if (data.success) {
        setNews(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch news', err);
    }
  };

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

    const response = await fetch('/api/admin/uploads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: file.name, data: base64 }),
    });

    const data = await response.json();

    if (!data.success || !data.url) {
      throw new Error(data.error || 'Upload failed');
    }

    return data.url;
  };

  const startEditing = (item: NewsItem) => {
    setSelectedNews(item);
    setForm({
      title: item.title,
      description: item.description,
      pdf_url: item.pdf_url,
      active: item.active,
    });
    setSelectedPdfFile(null);
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedNews) {
      setError('No news selected for editing');
      return;
    }

    setError('');
    setLoading(true);

    try {
      let pdfUrl = form.pdf_url;

      if (selectedPdfFile) {
        pdfUrl = await uploadFile(selectedPdfFile);
      }

      const response = await fetch(`/api/admin/news?id=${selectedNews.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          pdf_url: pdfUrl,
          active: form.active,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to update news');
        return;
      }

      setSuccessMessage('Industry news updated successfully');
      setSelectedNews(null);
      setForm(emptyFormState);
      setSelectedPdfFile(null);
      fetchNews();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      setError(err?.message || 'An error occurred while updating the news');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/admin/news?id=${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        setSuccessMessage('Industry news deleted successfully');
        setDeleteConfirm(null);
        fetchNews();
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(data.error || 'Failed to delete news');
      }
    } catch (err) {
      setError('An error occurred while deleting the news');
    }
  };

  const handleCancel = () => {
    setSelectedNews(null);
    setForm(emptyFormState);
    setSelectedPdfFile(null);
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Industry News Management</h1>
          <p className="text-white/50 text-sm">Edit or delete saved industry news items.</p>
        </div>
        <Link
          href="/admin/insights/news/add"
          className="inline-flex items-center justify-center rounded-xl bg-[#D2A679] px-5 py-3 text-sm font-semibold text-black hover:bg-[#b88635] transition-colors"
        >
          Add New News
        </Link>
      </div>

      {selectedNews ? (
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
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase mb-2">Description *</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={6}
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase mb-2">PDF</label>
              {form.pdf_url && !selectedPdfFile ? (
                <div className="flex items-center justify-between p-3 bg-white/[0.05] border border-white/10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-white">PDF attached</span>
                    <a
                      href={form.pdf_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[#D2A679] hover:text-[#B87333] text-sm"
                    >
                      View PDF
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <button type="button" onClick={() => setForm({ ...form, pdf_url: '' })} className="text-red-400 hover:text-red-300">
                    Remove
                  </button>
                </div>
              ) : selectedPdfFile ? (
                <div className="flex items-center justify-between p-3 bg-white/[0.05] border border-white/10 rounded-lg">
                  <span className="text-sm text-white">{selectedPdfFile.name}</span>
                  <button type="button" onClick={() => setSelectedPdfFile(null)} className="text-red-400 hover:text-red-300">
                    Remove
                  </button>
                </div>
              ) : (
                <input type="file" accept="application/pdf" onChange={(e) => setSelectedPdfFile(e.target.files?.[0] ?? null)} className="w-full text-sm text-white" />
              )}
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="h-4 w-4 rounded border-white/15 bg-white/[0.05]"
                />
                <span className="text-white/70 text-sm">Active</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="py-3 px-6 bg-[#D2A679] rounded-xl text-black font-semibold disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={handleCancel} className="py-3 px-6 border border-white/10 rounded-xl text-sm">
              Back to list
            </button>
          </div>
        </form>
      ) : (
        <div>
          {successMessage && (
            <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">{successMessage}</div>
          )}

          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.03] p-4">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead>
                <tr className="text-white/60">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Active</th>
                  <th className="px-4 py-3">Updated</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {news.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-white/50">
                      No industry news found.
                    </td>
                  </tr>
                ) : (
                  news.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5">
                      <td className="px-4 py-4 text-white">{item.title}</td>
                      <td className="px-4 py-4 text-white/70 truncate max-w-xs">{item.description}</td>
                      <td className="px-4 py-4 text-white/70">{item.active ? 'Yes' : 'No'}</td>
                      <td className="px-4 py-4 text-white/70">{new Date(item.updated_at ?? item.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-4">
                        {deleteConfirm === item.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/30 transition-colors"
                            >
                              Confirm
                            </button>
                            <button onClick={() => setDeleteConfirm(null)} className="p-1 rounded hover:bg-white/10">
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => startEditing(item)}
                              className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-[#38bdf8] transition-colors"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirm(item.id)}
                              className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
