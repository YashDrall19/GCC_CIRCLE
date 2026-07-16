'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, CreditCard as Edit2, ExternalLink, X, CircleAlert as AlertCircle } from 'lucide-react';

interface AnswerInput {
  question: string;
  answer: string;
}

interface Legend {
  id: string;
  first_name: string;
  last_name: string;
  title: string;
  company: string;
  linkedin: string;
  image_url: string;
  quote: string;
  type: string;
  date: string;
  active: boolean;
  created_at: string;
  questionnaire?: AnswerInput[];
}

interface Question {
  id: string;
  question: string;
  display_order: number;
}

export default function LegendsManagementPage() {
  const router = useRouter();
  const [legends, setLegends] = useState<Legend[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [editingLegend, setEditingLegend] = useState<Legend | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    title: '',
    company: '',
    linkedin: '',
    image_url: '',
    quote: '',
    type: 'tech',
    date: '',
    active: true,
  });
  const [editAnswers, setEditAnswers] = useState<AnswerInput[]>([]);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  // Image upload handling for edit modal
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl('');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }, [selectedFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setEditForm((prev) => ({ ...prev, image_url: '' }));
  };

  const uploadImageAndSetUrl = async () => {
    if (!selectedFile) return null;

    const b64 = await new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => {
        const res = r.result as string;
        const idx = res.indexOf(',');
        resolve(res.slice(idx + 1));
      };
      r.onerror = reject;
      r.readAsDataURL(selectedFile);
    });

    const res = await fetch('/api/admin/uploads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: selectedFile.name, data: b64 }),
    });
    const data = await res.json();
    if (data.success && data.url) {
      setEditForm((prev) => ({ ...prev, image_url: data.url }));
      return data.url;
    }
    return null;
  };

  const fetchLegends = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/legends');
      const data = await res.json();
      if (data.success) {
        setLegends(data.data);
      }
    } catch (error) {
      console.error('Error fetching legends:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchQuestions = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/questions');
      const data = await res.json();
      if (data.success) {
        setQuestions(data.data);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  }, []);

  useEffect(() => {
    fetchLegends();
    fetchQuestions();
  }, [fetchLegends, fetchQuestions]);

  const handleEdit = async (legend: Legend) => {
    // Fetch full legend data with answers
    try {
      const res = await fetch(`/api/admin/legends?id=${legend.id}`);
      const data = await res.json();
      if (data.success && data.data) {
        const fullLegend = data.data;
        setEditingLegend(fullLegend);
        setEditForm({
          first_name: fullLegend.first_name || '',
          last_name: fullLegend.last_name || '',
          title: fullLegend.title || '',
          company: fullLegend.company || '',
          linkedin: fullLegend.linkedin || '',
          image_url: fullLegend.image_url || '',
          quote: fullLegend.quote || '',
          type: fullLegend.type || 'tech',
          date: fullLegend.date || '',
          active: fullLegend.active ?? true,
        });

        // Map existing answers to questions
        const existingQA = fullLegend.questionnaire || [];
        const mapped = questions.map((q) => {
          const existing = existingQA.find(
            (a: AnswerInput) => a.question === q.question
          );
          return {
            question: q.question,
            answer: existing?.answer || '',
          };
        });
        setEditAnswers(mapped);
        setShowEditModal(true);
      }
    } catch (error) {
      console.error('Error fetching legend details:', error);
    }
  };

  const handleEditAnswerChange = (questionText: string, value: string) => {
    setEditAnswers((prev) =>
      prev.map((a) =>
        a.question === questionText ? { ...a, answer: value } : a
      )
    );
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError('');
    setEditLoading(true);

    if (!editingLegend) return;

    try {
      // If a new image file is selected, upload it first and set `image_url`
      if (selectedFile && !editForm.image_url) {
        const url = await uploadImageAndSetUrl();
        if (url) {
          // editForm.image_url already set in uploadImageAndSetUrl
        }
      }
      const res = await fetch(`/api/admin/legends?id=${editingLegend.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editForm, questionnaire: editAnswers }),
      });

      const data = await res.json();

      if (data.success) {
        setShowEditModal(false);
        setEditingLegend(null);
        fetchLegends();
      } else {
        setEditError(data.error || 'Failed to update legend');
      }
    } catch (error) {
      setEditError('An error occurred');
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/legends?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setDeleteConfirm(null);
        fetchLegends();
      }
    } catch (error) {
      console.error('Error deleting legend:', error);
    }
  };

  const handleToggleActive = async (legend: Legend, active: boolean) => {
    try {
      const res = await fetch(`/api/admin/legends?id=${legend.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...legend,
          active,
          questionnaire: legend.questionnaire || [],
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchLegends();
      }
    } catch (error) {
      console.error('Error toggling legend active state:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Legends Management</h1>
          <p className="text-white/50 text-sm">View, edit, and delete legend profiles</p>
        </div>
        <button
          onClick={() => router.push('/admin/legends/add')}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#D2A679] hover:bg-[#B87333] text-white font-semibold rounded-xl transition-colors text-sm"
        >
          <Plus size={18} />
          Add Legend
        </button>
      </div>

      {/* Legends Table */}
      <div className="bg-[#0a0e1a]/80 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-[#D2A679] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : legends.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/40 text-sm mb-3">No legends yet.</p>
            <button
              onClick={() => router.push('/admin/legends/add')}
              className="text-[#D2A679] text-sm font-medium hover:underline"
            >
              Add your first legend
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-left text-white/50 font-medium uppercase tracking-wide text-xs">
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-white/50 font-medium uppercase tracking-wide text-xs">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-white/50 font-medium uppercase tracking-wide text-xs">
                    Designation
                  </th>
                  <th className="px-4 py-3 text-left text-white/50 font-medium uppercase tracking-wide text-xs">
                    Company
                  </th>
                  <th className="px-4 py-3 text-left text-white/50 font-medium uppercase tracking-wide text-xs">
                    Active
                  </th>
                  <th className="px-4 py-3 text-left text-white/50 font-medium uppercase tracking-wide text-xs">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-white/50 font-medium uppercase tracking-wide text-xs">
                    LinkedIn
                  </th>
                  <th className="px-4 py-3 text-left text-white/50 font-medium uppercase tracking-wide text-xs w-28">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {legends.map((legend) => (
                  <tr
                    key={legend.id}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {legend.image_url ? (
                          <img
                            src={legend.image_url}
                            alt={legend.first_name}
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#D2A679]/20 flex items-center justify-center text-[#D2A679] text-xs font-medium flex-shrink-0">
                            {legend?.first_name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="font-medium">{legend.first_name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/70">
                      {legend.first_name || '-'} {legend.last_name || '-'}
                    </td>
                    <td className="px-4 py-3 text-white/70">
                      {legend.title || '-'}
                    </td>
                    <td className="px-4 py-3 text-white/70">
                      {legend.company || '-'}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(legend, !legend.active)}
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          legend.active
                            ? 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/20'
                            : 'bg-white/5 text-white/50 hover:bg-white/10'
                        }`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${legend.active ? 'bg-emerald-400' : 'bg-white/30'}`} />
                        {legend.active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-medium capitalize ${
                          legend.type === 'hr'
                            ? 'bg-[#D2A679]/10 text-[#D2A679]'
                            : 'bg-[#1a6cff]/10 text-[#38bdf8]'
                        }`}
                      >
                        {legend.type === 'hr' ? 'HR Leader' : 'Tech Leader'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {legend.linkedin ? (
                        <a
                          href={legend.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#38bdf8] hover:underline flex items-center gap-1"
                        >
                          View <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="text-white/30">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {deleteConfirm === legend.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(legend.id)}
                            className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/30 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="p-1 rounded hover:bg-white/10"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(legend)}
                            className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-[#38bdf8] transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(legend.id)}
                            className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && editingLegend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowEditModal(false)}
          />
          <div className="relative w-full max-w-3xl bg-[#0a0e1a] rounded-2xl border border-white/10 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#0a0e1a] pb-4 -mt-2 pt-2 z-10">
              <h2 className="text-lg font-semibold">Edit Legend</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-5">
              {editError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  {editError}
                </div>
              )}

              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={editForm.first_name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, first_name: e.target.value })
                    }
                    required
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D2A679] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={editForm.last_name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, last_name: e.target.value })
                    }
                    required
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D2A679] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                    Designation
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D2A679] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={editForm.company}
                    onChange={(e) =>
                      setEditForm({ ...editForm, company: e.target.value })
                    }
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D2A679] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={editForm.linkedin}
                    onChange={(e) =>
                      setEditForm({ ...editForm, linkedin: e.target.value })
                    }
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D2A679] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                    Image
                  </label>
                  {previewUrl || editForm.image_url ? (
                    <div className="relative inline-block">
                      <img
                        src={previewUrl || editForm.image_url}
                        alt={editForm.first_name || 'legend'}
                        className="object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeSelectedFile}
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
                      onChange={handleFileChange}
                      className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                    Type
                  </label>
                  <select
                    name="type"
                    value={editForm.type}
                    onChange={(e) =>
                      setEditForm({ ...editForm, type: e.target.value })
                    }
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D2A679] transition-colors appearance-none"
                  >
                    <option value="tech" className="bg-[#0a0e1a]">
                      Tech Leader
                    </option>
                    <option value="hr" className="bg-[#0a0e1a]">
                      HR Leader
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={editForm.date}
                    onChange={(e) =>
                      setEditForm({ ...editForm, date: e.target.value })
                    }
                    placeholder="e.g. 15th March"
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.active}
                    onChange={(e) =>
                      setEditForm({ ...editForm, active: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-white/15 bg-white/[0.05] text-[#D2A679] focus:ring-0"
                  />
                  <span className="text-white/70 text-sm">
                    Active
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                  Quote
                </label>
                <textarea
                  name="quote"
                  value={editForm.quote}
                  onChange={(e) =>
                    setEditForm({ ...editForm, quote: e.target.value })
                  }
                  rows={3}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D2A679] transition-colors resize-none"
                />
              </div>

              {/* Q&A */}
              {questions.length > 0 && (
                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-base font-semibold mb-4">Conversation Q&A</h3>
                  <div className="space-y-4">
                    {questions.map((q, idx) => (
                      <div
                        key={q.id}
                        className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2"
                      >
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D2A679]/20 text-[#D2A679] text-xs font-bold flex items-center justify-center mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-sm text-white/80 font-medium">
                            {q.question}
                          </p>
                        </div>
                        <textarea
                          value={editAnswers[idx]?.answer || ''}
                          onChange={(e) =>
                            handleEditAnswerChange(q.question, e.target.value)
                          }
                          rows={3}
                          placeholder="Enter the answer..."
                          className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors resize-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit */}
              <div className="flex gap-3 pt-2 sticky bottom-0 bg-[#0a0e1a] pb-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2.5 border border-white/10 hover:bg-white/5 rounded-xl transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="flex-1 py-2.5 bg-[#D2A679] hover:bg-[#B87333] disabled:opacity-50 rounded-xl transition-colors text-sm font-semibold flex items-center justify-center gap-2"
                >
                  {editLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
