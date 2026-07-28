'use client';

import { useState, useEffect, useCallback } from 'react';
import DataTable from '@/components/admin/DataTable';
import { ExternalLink } from 'lucide-react';

interface ReportDownload {
  id: string;
  report_name: string;
  report_file: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  linkedin_url: string;
  ip_address: string;
  user_agent: string;
  downloaded_at: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function AdminReportDownloadsPage() {
  const [downloads, setDownloads] = useState<ReportDownload[]>([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [search, setSearch] = useState('');

  const fetchDownloads = useCallback(
    async (page = 1, searchQuery = '') => {
      setLoading(true);

      try {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: pagination.limit.toString(),
        });

        if (searchQuery) {
          params.set('search', searchQuery);
        }

        const res = await fetch(
          `/api/admin/report-downloads?${params}`
        );

        const data = await res.json();

        if (data.success) {
          setDownloads(data.data);
          setPagination(data.pagination);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit]
  );

  useEffect(() => {
    fetchDownloads(1, search);
  }, [fetchDownloads, search]);

  const handlePageChange = (page: number) => {
    fetchDownloads(page, search);
  };

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(
        `/api/admin/report-downloads?id=${id}`,
        {
          method: 'DELETE',
        }
      );

      const data = await res.json();

      if (data.success) {
        fetchDownloads(pagination.page, search);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    {
      key: 'report_name',
      label: 'Report',
      render: (value: string) => (
        <span className="font-medium">{value}</span>
      ),
    },
    {
      key: 'name',
      label: 'Name',
      render: (value: string) => (
        <span>{value}</span>
      ),
    },
    {
      key: 'company',
      label: 'Company',
      render: (value: string) => (
        <span>{value}</span>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (value: string) => (
        <a
          href={`mailto:${value}`}
          className="text-[#38bdf8] hover:underline"
        >
          {value}
        </a>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (value: string) => (
        <span>{value}</span>
      ),
    },
    {
      key: 'linkedin_url',
      label: 'LinkedIn',
      render: (value: string) =>
        value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#38bdf8] hover:underline flex items-center gap-1"
          >
            Profile
            <ExternalLink size={12} />
          </a>
        ) : (
          <span className="text-white/30">-</span>
        ),
    },
    {
      key: 'ip_address',
      label: 'IP Address',
      render: (value: string) => (
        <span className="font-mono text-xs">
          {value || '-'}
        </span>
      ),
    },
    {
      key: 'user_agent',
      label: 'Browser',
      render: (value: string) => (
        <span
          className="max-w-xs truncate block text-xs"
          title={value}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'downloaded_at',
      label: 'Downloaded',
      render: (value: string) => (
        <span className="text-white/50 whitespace-nowrap text-xs">
          {new Date(value).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold mb-1">
          Report Downloads
        </h1>

        <p className="text-white/50 text-sm">
          People who downloaded reports
        </p>
      </div>

      <DataTable
        columns={columns}
        data={downloads}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onSearch={handleSearch}
        onDelete={handleDelete}
        searchPlaceholder="Search downloads..."
      />

    </div>
  );
}