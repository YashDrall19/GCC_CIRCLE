'use client';

import { ChangeEvent, FormEvent } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export type BlogFormValues = {
  title: string;
  category: string;
  read_time: number | string;
  cover_image: string;
  content: string;
  active: boolean;
};

interface BlogFormProps {
  form: BlogFormValues;
  setForm: React.Dispatch<React.SetStateAction<BlogFormValues>>;
  selectedFile: File | null;
  previewUrl: string;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error: string;
  pageTitle: string;
  pageSubtitle: string;
  submitLabel: string;
  cancelLabel: string;
  onCancel: () => void;
}

export default function BlogForm({
  form,
  setForm,
  selectedFile,
  previewUrl,
  onFileChange,
  onRemoveFile,
  onSubmit,
  loading,
  error,
  pageTitle,
  pageSubtitle,
  submitLabel,
  cancelLabel,
  onCancel,
}: BlogFormProps) {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === 'read_time') {
      setForm((prev) => ({
        ...prev,
        read_time: value === '' ? '' : Number(value),
      }));
      return;
    }

    if (name === 'active') {
      setForm((prev) => ({ ...prev, active: (e.target as HTMLInputElement).checked }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content: string) => {
    setForm((prev) => ({ ...prev, content }));
  };

  const uploadHandler = async (
    blobInfo: any,
    success: (url: string) => void,
    failure: (message: string) => void
  ) => {
    try {
      const filename = blobInfo.filename?.() || `upload-${Date.now()}.png`;
      let base64 = blobInfo.base64?.();

      if (!base64) {
        const blob = blobInfo.blob();
        base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            const value = result.split(',')[1];
            if (!value) {
              reject(new Error('Could not parse image data'));
              return;
            }
            resolve(value);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }

      if (!base64) {
        failure('Could not read image data');
        return;
      }

      const response = await fetch('/api/admin/uploads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, data: base64 }),
      });

      const data = await response.json().catch(() => null);
      if (!data || !data.success || !data.url) {
        failure(data?.error || 'Upload failed');
        return;
      }

      success(data.url);
      return data.url;
    } catch (error: any) {
      failure(error?.message || 'Image upload failed');
      return undefined;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">{pageTitle}</h1>
          <p className="text-white/50 text-sm">{pageSubtitle}</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 space-y-6">
        {error ? (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        ) : null}

        <div className="bg-[#0a0e1a]/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 space-y-5">
          <h2 className="text-lg font-semibold">Blog Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="The future of GCC leadership"
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Category *</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                placeholder="Leadership"
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Read time (mins)</label>
              <input
                type="number"
                name="read_time"
                value={form.read_time}
                onChange={handleChange}
                min={1}
                placeholder="8"
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-white/15 bg-white/[0.05] text-[#D2A679] focus:ring-0"
                />
                <span className="text-white/70 text-sm">Active</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Cover Image *</label>
            {previewUrl ? (
              <div className="relative inline-block">
                <img src={previewUrl} alt="Cover preview" className="w-full max-w-sm h-56 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={onRemoveFile}
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
                onChange={onFileChange}
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
              />
            )}
          </div>

          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Content *</label>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                value={form.content}
                init={{
                  height: 700,
                  menubar: true,
                  plugins:
                    'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
                  toolbar:
                    'undo redo | bold italic underline strikethrough | blocks | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | removeformat | code | help',
                  images_upload_handler: uploadHandler,
                  file_picker_types: 'image',
                  automatic_uploads: true,
                  content_style: 'body { font-family:Inter,sans-serif; font-size:14px; color:#e5e7eb; background:#030712; }',
                }}
                onEditorChange={handleEditorChange}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 border border-white/10 hover:bg-white/5 rounded-xl transition-colors text-sm font-medium"
          >
            {cancelLabel}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 bg-[#D2A679] hover:bg-[#B87333] disabled:opacity-50 rounded-xl transition-colors text-sm font-semibold"
          >
            {loading ? 'Saving...' : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
