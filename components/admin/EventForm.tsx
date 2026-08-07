'use client';

import { ChangeEvent, DragEvent, FormEvent, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export type EventLeader = {
  person_name: string;
  company_name: string;
};

export type EventFormValues = {
  name: string;
  slug: string;
  city: string;
  date: string;
  type: string;
  cover_image: string;
  attendees: number | string;
  leaders: EventLeader[];
  description: string;
  images: string[];
  registration_link: string;
  registrations_open: boolean;
};

interface EventFormProps {
  form: EventFormValues;
  setForm: React.Dispatch<React.SetStateAction<EventFormValues>>;
  selectedFile: File | null;
  previewUrl: string;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  galleryPreviewUrls: string[];
  onGalleryFilesChange: (files: File[]) => void;
  onRemoveGalleryItem: (index: number) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error: string;
  pageTitle: string;
  pageSubtitle: string;
  submitLabel: string;
  cancelLabel: string;
  onCancel: () => void;
}

export default function EventForm({
  form,
  setForm,
  selectedFile,
  previewUrl,
  onFileChange,
  onRemoveFile,
  galleryPreviewUrls,
  onGalleryFilesChange,
  onRemoveGalleryItem,
  onSubmit,
  loading,
  error,
  pageTitle,
  pageSubtitle,
  submitLabel,
  cancelLabel,
  onCancel,
}: EventFormProps) {
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (name === 'attendees') {
      setForm((prev) => ({
        ...prev,
        attendees: value === '' ? '' : Number(value),
      }));
      return;
    }

    if (name === 'registrations_open') {
      setForm((prev) => ({ ...prev, registrations_open: (e.target as HTMLInputElement).checked }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeaderChange = (index: number, field: 'person_name' | 'company_name', value: string) => {
    setForm((prev) => {
      const leaders = [...prev.leaders];
      leaders[index] = { ...leaders[index], [field]: value };
      return { ...prev, leaders };
    });
  };

  const addLeader = () => {
    setForm((prev) => ({ ...prev, leaders: [...prev.leaders, { person_name: '', company_name: '' }] }));
  };

  const removeLeader = (index: number) => {
    setForm((prev) => ({ ...prev, leaders: prev.leaders.filter((_, i) => i !== index) }));
  };

  const handleEditorChange = (content: string) => {
    setForm((prev) => ({ ...prev, description: content }));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingFiles(false);

    const files = Array.from(e.dataTransfer.files || []).filter((file) => file.type.startsWith('image/'));
    if (files.length) {
      onGalleryFilesChange(files);
    }
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
          <h2 className="text-lg font-semibold">Event Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Event Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="GCC Circle Mixer"
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Slug</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="gcc-circle-mixer"
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">City *</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                placeholder="Hyderabad"
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Date *</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Event Type *</label>
              <input
                type="text"
                name="type"
                value={form.type}
                onChange={handleChange}
                required
                placeholder="The GCC Circle Mixer"
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Attendees</label>
              <input
                type="number"
                name="attendees"
                value={form.attendees}
                onChange={handleChange}
                min={0}
                placeholder="50"
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Registration Link (Luma)</label>
              <input
                type="url"
                name="registration_link"
                value={form.registration_link}
                onChange={handleChange}
                placeholder="https://luma.com/event/..."
                className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="registrations_open"
                  checked={form.registrations_open}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-white/15 bg-white/[0.05] text-[#D2A679] focus:ring-0"
                />
                <span className="text-white/70 text-sm">Show registration button</span>
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
            <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Gallery Images</label>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingFiles(true);
              }}
              onDragLeave={() => setIsDraggingFiles(false)}
              className={`rounded-2xl border border-dashed p-4 text-center transition-colors ${isDraggingFiles ? 'border-[#D2A679] bg-[#D2A679]/10' : 'border-white/15 bg-white/[0.03]'}`}
            >
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (files.length) {
                    onGalleryFilesChange(files);
                  }
                }}
                className="hidden"
                id="event-gallery-input"
              />
              <label htmlFor="event-gallery-input" className="cursor-pointer block text-sm text-white/70">
                Drag and drop images here, or click to select multiple files.
              </label>
            </div>

            {(form.images.length > 0 || galleryPreviewUrls.length > 0) && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                {form.images.map((image, index) => (
                  <div key={`existing-${index}`} className="relative overflow-hidden rounded-xl border border-white/10">
                    <img src={image} alt={`Existing gallery ${index + 1}`} className="h-28 w-full object-cover" />
                  </div>
                ))}
                {galleryPreviewUrls.map((image, index) => (
                  <div key={`new-${index}`} className="relative overflow-hidden rounded-xl border border-white/10">
                    <img src={image} alt={`New gallery ${index + 1}`} className="h-28 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => onRemoveGalleryItem(index)}
                      className="absolute -top-1 -right-1 bg-red-600 rounded-full p-1 text-white"
                      aria-label="Remove image"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Leaders</label>
            <div className="space-y-3">
              {form.leaders.map((leader, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <input
                    type="text"
                    value={leader.person_name || leader.name}
                    onChange={(e) => handleLeaderChange(index, 'person_name', e.target.value)}
                    placeholder="Person name"
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
                  />
                  <input
                    type="text"
                    value={leader.company_name || leader.company}
                    onChange={(e) => handleLeaderChange(index, 'company_name', e.target.value)}
                    placeholder="Company"
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => removeLeader(index)}
                    className="px-3 py-2 rounded-xl border border-white/10 text-sm text-white/70 hover:bg-white/10"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addLeader}
                className="rounded-xl border border-[#D2A679]/40 px-3 py-2 text-sm text-[#D2A679] hover:bg-[#D2A679]/10"
              >
                + Add leader
              </button>
            </div>
          </div>

          <div>
            <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Description *</label>
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                value={form.description}
                init={{
                  height: 500,
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
