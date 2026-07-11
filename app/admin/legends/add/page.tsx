'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, CircleAlert as AlertCircle } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  display_order: number;
}

interface AnswerInput {
  question_id: string;
  answer: string;
  display_order: number;
}

export default function AddLegendPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: '',
    designation: '',
    company: '',
    linkedin: '',
    image_url: '',
    quote: '',
    type: 'tech',
    date: '',
  });

  const [answers, setAnswers] = useState<AnswerInput[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await fetch('/api/admin/questions');
      const data = await res.json();
      if (data.success) {
        setQuestions(data.data);
        setAnswers(
          data.data.map((q: Question, idx: number) => ({
            question_id: q.id,
            answer: '',
            display_order: idx,
          }))
        );
      }
    } catch (err) {
      console.error('Error fetching questions:', err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) =>
      prev.map((a) => (a.question_id === questionId ? { ...a, answer: value } : a))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/legends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, answers }),
      });
      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => router.push('/admin/legends/manage'), 1500);
      } else {
        setError(data.error || 'Failed to create legend');
      }
    } catch (err) {
      setError('An error occurred');
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
        <h2 className="text-xl font-bold mb-2">Legend Added!</h2>
        <p className="text-white/50 text-sm">Redirecting to Legends Management...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/admin/legends/manage')}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-2xl font-bold mb-1">Add Legend</h1>
          <p className="text-white/50 text-sm">Create a new legend profile with conversation Q&A</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Basic Info */}
        <div className="bg-[#0a0e1a]/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 space-y-5">
          <h2 className="text-lg font-semibold">Basic Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                placeholder="VP Engineering & Site Leader"
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Acme GCC India"
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                name="linkedin"
                value={form.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourname"
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="https://images.pexels.com/..."
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                Type
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D2A679] transition-colors appearance-none"
              >
                <option value="tech" className="bg-[#0a0e1a]">Tech Leader</option>
                <option value="hr" className="bg-[#0a0e1a]">HR Leader</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
              Date (optional label)
            </label>
            <input
              type="text"
              name="date"
              value={form.date}
              onChange={handleChange}
              placeholder="e.g. 15th March"
              className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
            />
          </div>

          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
              Quote
            </label>
            <textarea
              name="quote"
              value={form.quote}
              onChange={handleChange}
              rows={3}
              placeholder="A short inspirational quote from the leader..."
              className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors resize-none"
            />
          </div>
        </div>

        {/* Q&A Section */}
        <div className="bg-[#0a0e1a]/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Conversation Q&A</h2>
            <span className="text-white/40 text-xs">
              {questions.length} questions available
            </span>
          </div>

          {questions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/40 text-sm mb-3">
                No questions found. Add questions in Conversation Management first.
              </p>
              <button
                type="button"
                onClick={() => router.push('/admin/legends/conversations')}
                className="text-[#D2A679] text-sm font-medium hover:underline"
              >
                Go to Conversation Management
              </button>
            </div>
          ) : (
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
                    <p className="text-sm text-white/80 font-medium">{q.question}</p>
                  </div>
                  <textarea
                    value={answers[idx]?.answer || ''}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    rows={3}
                    placeholder="Enter the answer..."
                    className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors resize-none"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push('/admin/legends/manage')}
            className="flex-1 py-3 border border-white/10 hover:bg-white/5 rounded-xl transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 bg-[#D2A679] hover:bg-[#B87333] disabled:opacity-50 rounded-xl transition-colors text-sm font-semibold flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Plus size={16} />
                Create Legend
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
