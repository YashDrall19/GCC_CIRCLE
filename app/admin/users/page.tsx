'use client';

import { useState, useEffect, useCallback } from 'react';
import DataTable from '@/components/admin/DataTable';
import { Plus, X, UserPlus, CircleAlert as AlertCircle } from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  created_at: string;
}

interface FormData {
  email: string;
  password: string;
  name: string;
  role: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    name: '',
    role: 'admin',
  });
  const [formError, setFormError] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();

      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormLoading(true);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setShowAddModal(false);
        setFormData({ email: '', password: '', name: '', role: 'admin' });
        fetchUsers();
      } else {
        setFormError(data.error || 'Failed to create user');
      }
    } catch (error) {
      setFormError('An error occurred');
    } finally {
      setFormLoading(false);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (value: string) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a6cff] to-[#38bdf8] flex items-center justify-center text-white text-sm font-medium">
            {value.charAt(0).toUpperCase()}
          </div>
          <span className="font-medium">{value}</span>
        </div>
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
      key: 'role',
      label: 'Role',
      render: (value: string) => (
        <span className="px-2 py-1 rounded-lg bg-[#D2A679]/10 text-[#D2A679] text-xs font-medium capitalize">
          {value}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Users</h1>
          <p className="text-white/50 text-sm">Manage admin accounts</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#D2A679] hover:bg-[#B87333] text-white font-semibold rounded-xl transition-colors text-sm"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        onDelete={handleDelete}
        searchPlaceholder="Search users..."
      />

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative w-full max-w-md bg-[#0a0e1a] rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#D2A679]/15 flex items-center justify-center">
                  <UserPlus size={20} className="text-[#D2A679]" />
                </div>
                <h2 className="text-lg font-semibold">Add Admin User</h2>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="John Doe"
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="admin@gcccircle.com"
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                  Password *
                </label>
                <input
                  type="text"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  placeholder="Secure password"
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#D2A679] transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D2A679] transition-colors appearance-none"
                >
                  <option value="admin" className="bg-[#0a0e1a]">Admin</option>
                  <option value="superadmin" className="bg-[#0a0e1a]">Super Admin</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 border border-white/10 hover:bg-white/5 rounded-xl transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 py-2.5 bg-[#D2A679] hover:bg-[#B87333] disabled:opacity-50 rounded-xl transition-colors text-sm font-semibold flex items-center justify-center gap-2"
                >
                  {formLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    'Create User'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
