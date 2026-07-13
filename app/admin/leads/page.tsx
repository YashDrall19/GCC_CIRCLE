'use client';

import { useState, useEffect, useCallback } from 'react';
import DataTable from '@/components/admin/DataTable';
import { ExternalLink } from 'lucide-react';

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  source: string;
  company: string;
  linkedin: string;
  title: string;
  agreed: boolean;
  whatsapp: boolean;
  organic?: boolean;
  created_at: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [search, setSearch] = useState('');

  const fetchLeads = useCallback(async (page = 1, searchQuery = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
      });
      if (searchQuery) {
        params.set('search', searchQuery);
      }

      const res = await fetch(`/api/admin/leads?${params}`);
      const data = await res.json();

      if (data.success) {
        setLeads(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  }, [pagination.limit]);

  useEffect(() => {
    fetchLeads(1, search);
  }, [search, fetchLeads]);

  const handlePageChange = (page: number) => {
    fetchLeads(page, search);
  };

  const handleSearch = (searchQuery: string) => {
    setSearch(searchQuery);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        fetchLeads(pagination.page, search);
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (_: any, row: Lead) => (
        <span className="font-medium">
          {row.first_name} {row.last_name}
        </span>
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
      key: 'company',
      label: 'Company',
      render: (value: string) => (
        value ? <span>{value}</span> : <span className="text-white/30">-</span>
      ),
    },
    {
      key: 'title',
      label: 'Title',
      render: (value: string) => (
        <span className="text-white/70">{value || '-'}</span>
      ),
    },
    {
      key: 'source',
      label: 'Source',
      render: (value: string) => (
        <span className="text-white/50 text-xs">{value || '-'}</span>
      ),
    },
    {
      key: 'organic',
      label: 'Type',
      render: (value: boolean) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            value
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-white/5 text-white/30'
          }`}
        >
          {value ? 'Organic' : 'Admin'}
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
      key: 'whatsapp',
      label: 'WhatsApp',
      render: (value: boolean) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            value
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-white/5 text-white/30'
          }`}
        >
          {value ? 'Yes' : 'No'}
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
        <h1 className="text-2xl font-bold mb-1">Leads</h1>
        <p className="text-white/50 text-sm">Manage community sign-ups</p>
      </div>

      <DataTable
        columns={columns}
        data={leads}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onDelete={handleDelete}
        searchPlaceholder="Search leads..."
      />
    </div>
  );
}
