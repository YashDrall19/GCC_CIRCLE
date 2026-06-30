'use client';

import { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Trash2, Download, MoveVertical as MoreVertical, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  loading?: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
  onSearch?: (search: string) => void;
  onDelete?: (id: string) => void;
  searchPlaceholder?: string;
}

export default function DataTable({
  columns,
  data,
  loading = false,
  pagination,
  onPageChange,
  onSearch,
  onDelete,
  searchPlaceholder = 'Search...',
}: DataTableProps) {
  const [search, setSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (onSearch) {
        onSearch(search);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [search, onSearch]);

  const handleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map((row) => row.id)));
    }
  };

  const handleSelectRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const handleDelete = (id: string) => {
    if (onDelete) {
      onDelete(id);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        {onSearch && (
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-white/[0.05] border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
            />
          </div>
        )}
        {selectedRows.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/50">{selectedRows.size} selected</span>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0e1a]/60 backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === data.length && data.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#D2A679] focus:ring-[#D2A679] focus:ring-offset-0"
                  />
                </th>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 text-left text-white/50 font-medium uppercase tracking-wide text-xs"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-white/50 font-medium uppercase tracking-wide text-xs w-20">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length + 2} className="px-4 py-12 text-center text-white/40">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-[#D2A679] border-t-transparent rounded-full animate-spin" />
                      Loading...
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 2} className="px-4 py-12 text-center text-white/40">
                    No data found
                  </td>
                </tr>
              ) : (
                data.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      'border-b border-white/5 hover:bg-white/[0.02] transition-colors',
                      selectedRows.has(row.id) && 'bg-[#D2A679]/5'
                    )}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#D2A679] focus:ring-[#D2A679] focus:ring-offset-0"
                      />
                    </td>
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 text-white/80">
                        {col.render ? col.render(row[col.key], row) : row[col.key]}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      {deleteConfirm === row.id ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="px-2 py-1 rounded bg-red-500/20 text-red-400 text-xs font-medium hover:bg-red-500/30 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="p-1 rounded hover:bg-white/10"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(row.id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-white/40">
            Showing {(pagination.page - 1) * pagination.limit + 1} -{' '}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange?.(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              let page: number;
              if (pagination.totalPages <= 5) {
                page = i + 1;
              } else if (pagination.page <= 3) {
                page = i + 1;
              } else if (pagination.page >= pagination.totalPages - 2) {
                page = pagination.totalPages - 4 + i;
              } else {
                page = pagination.page - 2 + i;
              }
              return (
                <button
                  key={page}
                  onClick={() => onPageChange?.(page)}
                  className={cn(
                    'w-8 h-8 rounded-lg text-sm transition-colors',
                    pagination.page === page
                      ? 'bg-[#D2A679] text-white'
                      : 'hover:bg-white/5 text-white/60'
                  )}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => onPageChange?.(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
