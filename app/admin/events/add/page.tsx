'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EventForm, { EventFormValues } from '@/components/admin/EventForm';

const initialFormState: EventFormValues = {
  name: '',
  slug: '',
  city: '',
  date: '',
  type: '',
  cover_image: '',
  attendees: '',
  leaders: [{ person_name: '', company_name: '' }],
  description: '',
  images: [],
  registration_link: '',
  registrations_open: false,
};

export default function AddEvent() {
  const router = useRouter();
  const [form, setForm] = useState<EventFormValues>(initialFormState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviewUrls, setGalleryPreviewUrls] = useState<string[]>([]);
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

  const handleGalleryFilesChange = (files: File[]) => {
    if (!files.length) return;
    const nextFiles = [...galleryFiles, ...files];
    setGalleryFiles(nextFiles);

    const previewPromises = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(previewPromises).then((urls) => {
      setGalleryPreviewUrls((prev) => [...prev, ...urls]);
    });
  };

  const handleRemoveGalleryItem = (index: number) => {
    setGalleryPreviewUrls((prev) => prev.filter((_, idx) => idx !== index));
    setGalleryFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let coverImageUrl = form.cover_image;
      if (selectedFile) {
        coverImageUrl = await uploadImage(selectedFile);
      }

      if (!coverImageUrl) {
        setError('Please upload a cover image.');
        return;
      }

      const galleryUrls = await Promise.all(galleryFiles.map((file) => uploadImage(file)));
      const payload = {
        ...form,
        cover_image: coverImageUrl,
        images: [...form.images, ...galleryUrls],
      };

      const response = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to create event');
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push('/admin/events/manage'), 1200);
    } catch (err: any) {
      setError(err?.message || 'An error occurred while saving the event');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/admin/events/manage');
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Event added successfully!</h2>
        <p className="text-white/60">Redirecting to event management...</p>
      </div>
    );
  }

  return (
    <EventForm
      form={form}
      setForm={setForm}
      selectedFile={selectedFile}
      previewUrl={previewUrl}
      onFileChange={handleFileChange}
      onRemoveFile={handleRemoveFile}
      galleryPreviewUrls={galleryPreviewUrls}
      onGalleryFilesChange={handleGalleryFilesChange}
      onRemoveGalleryItem={handleRemoveGalleryItem}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
      pageTitle="Add Event"
      pageSubtitle="Create a new event with cover image, gallery, leaders, rich description, and registration settings."
      submitLabel="Create Event"
      cancelLabel="Cancel"
      onCancel={handleCancel}
    />
  );
}

