'use client';

import { useState, useEffect, useCallback } from 'react';
import DataTable from '@/components/admin/DataTable';
import { ExternalLink } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  message: string;
  purpose: string;
  created_at: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [search, setSearch] = useState('');

  const fetchContacts = useCallback(async (page = 1, searchQuery = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
      });
      if (searchQuery) {
        params.set('search', searchQuery);
      }

      const res = await fetch(`/api/admin/contacts?${params}`);
      const data = await res.json();

      if (data.success) {
        setContacts(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  useEffect(() => {
    fetchContacts(1, search);
  }, [search, fetchContacts]);

  const handlePageChange = (page: number) => {
    fetchContacts(page, search);
  };

  const handleSearch = (searchQuery: string) => {
    setSearch(searchQuery);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/contacts?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        fetchContacts(pagination.page, search);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (value: string) => (
        <span className="font-medium">{value}</span>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (value: string) => (
        <a href={`mailto:${value}`} className="text-[#38bdf8] hover:underline">
          {value}
        </a>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (value: string) => (
        value ? <span>{value}</span> : <span className="text-white/30">-</span>
      ),
    },
    {
      key: 'purpose',
      label: 'Purpose',
      render: (value: string) => (
        <span className="px-2 py-1 rounded-lg bg-[#D2A679]/10 text-[#D2A679] text-xs">
          {value || 'N/A'}
        </span>
      ),
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      render: (value: string) => (
        value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#38bdf8] hover:underline flex items-center gap-1"
          >
            View <ExternalLink size={12} />
          </a>
        ) : (
          <span className="text-white/30">-</span>
        )
      ),
    },
    {
      key: 'message',
      label: 'Message',
      render: (value: string) => (
        <span className="max-w-xs truncate block" title={value}>
          {value ? (value.length > 50 ? `${value.substring(0, 50)}...` : value) : '-'}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Submitted',
      render: (value: string) => (
        <span className="text-white/50 text-xs whitespace-nowrap">
          {new Date(value).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Contacts</h1>
        <p className="text-white/50 text-sm">Manage contact form submissions</p>
      </div>

      <DataTable
        columns={columns}
        data={contacts}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onDelete={handleDelete}
        searchPlaceholder="Search contacts..."
      />
    </div>
  );
}
