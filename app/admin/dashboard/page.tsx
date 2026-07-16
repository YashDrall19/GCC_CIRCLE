'use client';

import { useEffect, useState } from 'react';
import { Users, Mail, UserPlus, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Stats {
  contacts: number;
  leads: number;
  users: number;
  recentContacts: number;
  recentLeads: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    contacts: 0,
    leads: 0,
    users: 0,
    recentContacts: 0,
    recentLeads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [contactsRes, leadsRes, usersRes] = await Promise.all([
        fetch('/api/admin/contacts?limit=1'),
        fetch('/api/admin/leads?limit=1'),
        fetch('/api/admin/users'),
      ]);

      const contactsData = await contactsRes.json();
      const leadsData = await leadsRes.json();
      const usersData = await usersRes.json();

      // Get recent submissions (last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const recentContactsRes = await fetch('/api/admin/contacts?limit=100');
      const recentLeadsRes = await fetch('/api/admin/leads?limit=100');
      const recentContactsData = await recentContactsRes.json();
      const recentLeadsData = await recentLeadsRes.json();

      const recentContacts = (recentContactsData.data || []).filter(
        (c: any) => new Date(c.created_at) > sevenDaysAgo
      ).length;
      const recentLeads = (recentLeadsData.data || []).filter(
        (l: any) => new Date(l.created_at) > sevenDaysAgo
      ).length;

      setStats({
        contacts: contactsData.pagination?.total || 0,
        leads: leadsData.pagination?.total || 0,
        users: usersData.data?.length || 0,
        recentContacts,
        recentLeads,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Contacts',
      value: stats.contacts,
      icon: Mail,
      color: 'from-[#1a6cff] to-[#38bdf8]',
      change: `+${stats.recentContacts} this week`,
      href: '/admin/contacts',
    },
    {
      label: 'Total Leads',
      value: stats.leads,
      icon: Users,
      color: 'from-[#D2A679] to-[#B87333]',
      change: `+${stats.recentLeads} this week`,
      href: '/admin/legends/manage',
    },
    {
      label: 'Admin Users',
      value: stats.users,
      icon: UserPlus,
      color: 'from-emerald-500 to-emerald-600',
      change: 'Active admins',
      href: '/admin/users',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#D2A679] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-white/50 text-sm">Overview of your GCC Circle data</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-[#0a0e1a]/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-colors group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon size={22} className="text-white" />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                <TrendingUp size={14} />
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-white/50 text-sm group-hover:text-white/70 transition-colors">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <div className="bg-[#0a0e1a]/80 backdrop-blur-md rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Contacts</h2>
            <Link href="/admin/contacts" className="text-[#D2A679] text-sm hover:underline">
              View all
            </Link>
          </div>
          <RecentContacts />
        </div>

        {/* Recent Leads */}
        <div className="bg-[#0a0e1a]/80 backdrop-blur-md rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Leads</h2>
            <Link href="/admin/legends/manage" className="text-[#D2A679] text-sm hover:underline">
              View all
            </Link>
          </div>
          <RecentLeads />
        </div>
      </div>
    </div>
  );
}

function RecentContacts() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/contacts?limit=5')
      .then((res) => res.json())
      .then((data) => {
        setContacts(data.data || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-white/40 text-sm">Loading...</div>;
  }

  if (contacts.length === 0) {
    return <div className="text-white/40 text-sm">No contacts yet</div>;
  }

  return (
    <div className="space-y-3">
      {contacts.map((contact: any) => (
        <div
          key={contact.id}
          className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#1a6cff]/20 flex items-center justify-center text-[#38bdf8] text-sm font-medium">
            {contact.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{contact.name}</p>
            <p className="text-xs text-white/40 truncate">{contact.email}</p>
          </div>
          <div className="text-xs text-white/30 whitespace-nowrap">
            {new Date(contact.created_at).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}

function RecentLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/leads?limit=5')
      .then((res) => res.json())
      .then((data) => {
        setLeads(data.data || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-white/40 text-sm">Loading...</div>;
  }

  if (leads.length === 0) {
    return <div className="text-white/40 text-sm">No leads yet</div>;
  }

  return (
    <div className="space-y-3">
      {leads.map((lead: any) => (
        <div
          key={lead.id}
          className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#D2A679]/20 flex items-center justify-center text-[#D2A679] text-sm font-medium">
            {lead.first_name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {lead.first_name} {lead.last_name}
            </p>
            <p className="text-xs text-white/40 truncate">{lead.company || lead.email}</p>
          </div>
          <div className="text-xs text-white/30 whitespace-nowrap">
            {new Date(lead.created_at).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}
