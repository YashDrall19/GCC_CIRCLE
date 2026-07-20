'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogForm, { BlogFormValues } from '@/components/admin/BlogForm';

const initialFormState: BlogFormValues = {
  title: '',
  category: '',
  read_time: 0,
  cover_image: '',
  content: '',
  active: true,
};

export default function AddBlogs() {
  const router = useRouter();
  const [form, setForm] = useState<BlogFormValues>(initialFormState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    if (!file) {
      setPreviewUrl('');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setForm((prev) => ({ ...prev, cover_image: '' }));
  };

  const uploadImage = async (file: File) => {
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
      throw new Error(data.error || 'Image upload failed');
    }
    return data.url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let coverImageUrl = form.cover_image;

      if (selectedFile) {
        coverImageUrl = await uploadImage(selectedFile);
        setForm((prev) => ({ ...prev, cover_image: coverImageUrl }));
      }

      if (!coverImageUrl) {
        setError('Please upload a cover image.');
        return;
      }

      const response = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, cover_image: coverImageUrl }),
      });
      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to create blog');
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push('/admin/blogs/manage'), 1200);
    } catch (err: any) {
      setError(err?.message || 'An error occurred while saving the blog');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/blogs/manage');
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Blog added successfully!</h2>
        <p className="text-white/60">Redirecting to blog management...</p>
      </div>
    );
  }

  return (
    <BlogForm
      form={form}
      setForm={setForm}
      selectedFile={selectedFile}
      previewUrl={previewUrl}
      onFileChange={handleFileChange}
      onRemoveFile={handleRemoveFile}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      pageTitle="Add Blog"
      pageSubtitle="Create a new blog post with cover image, category, read time, and rich content."
      submitLabel="Create Blog"
      cancelLabel="Cancel"
      onCancel={handleCancel}
    />
  );
}
