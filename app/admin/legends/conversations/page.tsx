'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, CreditCard as Edit2, X, CircleAlert as AlertCircle } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  display_order: number;
  created_at: string;
}

export default function ConversationManagementPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ question: '', display_order: 0 });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/questions');
      const data = await res.json();
      if (data.success) {
        setQuestions(data.data);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleEdit = (q: Question) => {
    setEditingId(q.id);
    setFormData({ question: q.question, display_order: q.display_order });
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ question: '', display_order: questions.length + 1 });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId
        ? `/api/admin/questions?id=${editingId}`
        : '/api/admin/questions';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setShowForm(false);
        setEditingId(null);
        setFormData({ question: '', display_order: 0 });
        fetchQuestions();
      } else {
        setFormError(data.error || 'Failed to save question');
      }
    } catch (error) {
      setFormError('An error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/questions?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setDeleteConfirm(null);
        fetchQuestions();
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Conversation Management</h1>
          <p className="text-white/50 text-sm">
            Add, edit, and delete questions for legend conversations
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#D2A679] hover:bg-[#B87333] text-white font-semibold rounded-xl transition-colors text-sm"
        >
          <Plus size={18} />
          Add Question
        </button>
      </div>

      {/* Questions List */}
      <div className="bg-[#0a0e1a]/80 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-6 h-6 border-2 border-[#D2A679] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center py-12 text-white/40 text-sm">
            No questions yet. Click &quot;Add Question&quot; to create one.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#D2A679]/15 text-[#D2A679] text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/80">{q.question}</p>
                  <p className="text-white/30 text-xs mt-0.5">
                    Order: {q.display_order}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(q)}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-[#38bdf8] transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  {deleteConfirm === q.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(q.id)}
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
                    <button
                      onClick={() => setDeleteConfirm(q.id)}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          />
          <div className="relative w-full max-w-md bg-[#0a0e1a] rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">
                {editingId ? 'Edit Question' : 'Add Question'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                  Question *
                </label>
                <textarea
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  required
                  rows={3}
                  placeholder="e.g. What's your leadership philosophy?"
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      display_order: parseInt(e.target.value) || 0,
                    })
                  }
                  min={0}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D2A679] transition-colors"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2.5 border border-white/10 hover:bg-white/5 rounded-xl transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 py-2.5 bg-[#D2A679] hover:bg-[#B87333] disabled:opacity-50 rounded-xl transition-colors text-sm font-semibold flex items-center justify-center gap-2"
                >
                  {formLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : editingId ? (
                    'Save Changes'
                  ) : (
                    'Add Question'
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
