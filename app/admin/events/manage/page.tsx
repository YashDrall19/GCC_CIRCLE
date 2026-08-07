'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CreditCard as Edit2, Trash2, X } from 'lucide-react';
import EventForm, { EventFormValues } from '@/components/admin/EventForm';

type EventRecord = EventFormValues & {
  id: number;
  slug: string;
  created_at: string;
  updated_at: string;
};

const emptyFormState: EventFormValues = {
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

export default function EventsManagement() {
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventRecord | null>(null);
  const [form, setForm] = useState<EventFormValues>(emptyFormState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviewUrls, setGalleryPreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/admin/events');
      const data = await response.json();
      if (data.success) {
        setEvents(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch events', err);
    }
  };

  const startEditing = (event: EventRecord) => {
    setSelectedEvent(event);
    setForm({
      name: event.name,
      slug: event.slug,
      city: event.city,
      date: event.date,
      type: event.type,
      cover_image: event.cover_image,
      attendees: event.attendees,
      leaders: event.leaders?.length ? event.leaders : [{ person_name: '', company_name: '' }],
      description: event.description,
      images: event.images || [],
      registration_link: event.registration_link,
      registrations_open: event.registrations_open,
    });
    setPreviewUrl(event.cover_image || '');
    setGalleryPreviewUrls([]);
    setGalleryFiles([]);
    setSelectedFile(null);
    setError('');
    setSuccessMessage('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

    if (!file) {
      setPreviewUrl(selectedEvent?.cover_image || '');
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
    if (!selectedEvent) {
      setError('No event selected for editing');
      return;
    }

    setError('');
    setLoading(true);

    try {
      let coverImageUrl = form.cover_image;
      if (selectedFile) {
        coverImageUrl = await uploadImage(selectedFile);
      }

      const galleryUrls = await Promise.all(galleryFiles.map((file) => uploadImage(file)));
      const payload = {
        ...form,
        cover_image: coverImageUrl,
        images: [...(form.images || []), ...galleryUrls],
      };

      const response = await fetch(`/api/admin/events?id=${selectedEvent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to update event');
        return;
      }

      setSuccessMessage('Event updated successfully');
      setSelectedEvent(null);
      setForm(emptyFormState);
      setPreviewUrl('');
      setSelectedFile(null);
      setGalleryFiles([]);
      setGalleryPreviewUrls([]);
      fetchEvents();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      setError(err?.message || 'An error occurred while updating the event');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedEvent(null);
    setForm(emptyFormState);
    setSelectedFile(null);
    setPreviewUrl('');
    setGalleryFiles([]);
    setGalleryPreviewUrls([]);
    setError('');
    setSuccessMessage('');
    setDeleteConfirm(null);
  };

  const handleDelete = async (eventId: number) => {
    try {
      const response = await fetch(`/api/admin/events?id=${eventId}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Failed to delete event');
        return;
      }

      setSuccessMessage('Event deleted successfully');
      setDeleteConfirm(null);
      fetchEvents();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      setError(err?.message || 'An error occurred while deleting the event');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Events Management</h1>
          <p className="text-white/50 text-sm">Edit event details, gallery, leaders, and registration settings.</p>
        </div>
        <Link
          href="/admin/events/add"
          className="inline-flex items-center justify-center rounded-xl bg-[#D2A679] px-5 py-3 text-sm font-semibold text-black hover:bg-[#b88635] transition-colors"
        >
          Add New Event
        </Link>
      </div>

      {selectedEvent ? (
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
          pageTitle={`Editing: ${selectedEvent.name}`}
          pageSubtitle="Update the event cover, gallery, leaders, description, and visibility."
          submitLabel="Save Changes"
          cancelLabel="Back to list"
          onCancel={handleCancel}
        />
      ) : (
        <div>
          {successMessage ? (
            <div className="mb-4 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
              {successMessage}
            </div>
          ) : null}

          <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.03] p-4">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead>
                <tr className="text-white/60">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Active</th>
                  <th className="px-4 py-3">Updated</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {events.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-6 text-center text-white/50">
                      No events found.
                    </td>
                  </tr>
                ) : (
                  events.map((event) => (
                    <tr key={event.id} className="hover:bg-white/5">
                      <td className="px-4 py-4 text-white">{event.name}</td>
                      <td className="px-4 py-4 text-white/70">{event.city}</td>
                      <td className="px-4 py-4 text-white/70">{event.date}</td>
                      <td className="px-4 py-4 text-white/70">{event.registrations_open ? 'Yes' : 'No'}</td>
                      <td className="px-4 py-4 text-white/70">{new Date(event.updated_at).toLocaleDateString()}</td>
                      <td className="px-4 py-4">
                        {deleteConfirm === event.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleDelete(event.id)}
                              className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/30 transition-colors"
                            >
                              Confirm
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirm(null)}
                              className="p-1 rounded hover:bg-white/10"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => startEditing(event)}
                              className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-[#38bdf8] transition-colors"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirm(event.id)}
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

