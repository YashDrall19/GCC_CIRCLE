'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import BlogForm, { BlogFormValues } from '@/components/admin/BlogForm';

type BlogRecord = BlogFormValues & {
  id: number;
  slug: string;
  created_at: string;
  updated_at: string;
};

const emptyFormState: BlogFormValues = {
  title: '',
  category: '',
  read_time: 0,
  cover_image: '',
  content: '',
  active: true,
};

export default function BlogsManagement() {
  const [blogs, setBlogs] = useState<BlogRecord[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogRecord | null>(null);
  const [form, setForm] = useState<BlogFormValues>(emptyFormState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blogs');
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch blogs', err);
    }
  };

  const startEditing = (blog: BlogRecord) => {
    setSelectedBlog(blog);
    setForm({
      title: blog.title,
      category: blog.category,
      read_time: blog.read_time,
      cover_image: blog.cover_image,
      content: blog.content,
      active: blog.active,
    });
    setPreviewUrl(blog.cover_image);
    setSelectedFile(null);
    setError('');
    setSuccessMessage('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    if (!file) {
      setPreviewUrl(selectedBlog?.cover_image || '');
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
    if (!selectedBlog) {
      setError('No blog selected for editing');
      return;
    }

    setError('');
    setLoading(true);

    try {
      let coverImageUrl = form.cover_image;

      if (selectedFile) {
        coverImageUrl = await uploadImage(selectedFile);
      }

      const response = await fetch(`/api/admin/blogs?id=${selectedBlog.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, cover_image: coverImageUrl }),
      });
      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to update blog');
        return;
      }

      setSuccessMessage('Blog updated successfully');
      setSelectedBlog(data.data);
      setForm({
        title: data.data.title,
        category: data.data.category,
        read_time: data.data.read_time,
        cover_image: data.data.cover_image,
        content: data.data.content,
        active: data.data.active,
      });
      setPreviewUrl(data.data.cover_image);
      setSelectedFile(null);
      fetchBlogs();
    } catch (err: any) {
      setError(err?.message || 'An error occurred while updating the blog');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedBlog(null);
    setForm(emptyFormState);
    setSelectedFile(null);
    setPreviewUrl('');
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Blogs Management</h1>
          <p className="text-white/50 text-sm">Edit blog details, update content, and manage active status.</p>
        </div>
        <Link
          href="/admin/blogs/add"
          className="inline-flex items-center justify-center rounded-xl bg-[#D2A679] px-5 py-3 text-sm font-semibold text-black hover:bg-[#b88635] transition-colors"
        >
          Add New Blog
        </Link>
      </div>

      {selectedBlog ? (
        <BlogForm
          form={form}
          setForm={setForm}
          selectedFile={selectedFile}
          previewUrl={previewUrl}
          onFileChange={handleFileChange}
          onRemoveFile={handleRemoveFile}
          onSubmit={handleSubmit}
          loading={loading}
          error={error || successMessage}
          pageTitle={`Editing: ${selectedBlog.title}`}
          pageSubtitle="Update the blog post and publish status."
          submitLabel="Save Changes"
          cancelLabel="Back to list"
          onCancel={handleCancel}
        />
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.03] p-4">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead>
              <tr className="text-white/60">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Read time</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-white/50">
                    No blogs found.
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-white/5">
                    <td className="px-4 py-4 text-white">{blog.title}</td>
                    <td className="px-4 py-4 text-white/70">{blog.category}</td>
                    <td className="px-4 py-4 text-white/70">{blog.read_time} min</td>
                    <td className="px-4 py-4 text-white/70">{blog.active ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-4 text-white/70">{new Date(blog.updated_at).toLocaleDateString()}</td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => startEditing(blog)}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition hover:border-[#D2A679] hover:text-[#D2A679]"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
