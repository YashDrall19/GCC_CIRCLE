'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Users,
  Mail,
  UserPlus,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Trophy,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Contacts',
    href: '/admin/contacts',
    icon: Mail,
  },
  {
    label: 'Users',
    href: '/admin/users',
    icon: UserPlus,
  },
  {
    label: 'Legends',
    icon: Trophy,
    children: [
      {
        label: 'Add Legend',
        href: '/admin/legends/add',
      },
      {
        label: 'Conversation Management',
        href: '/admin/legends/conversations',
      },
      {
        label: 'Legends Management',
        href: '/admin/legends/manage',
      },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  useEffect(() => {
    const parent = navItems.find(
      (item) =>
        item.children &&
        item.children.some((child) => pathname === child.href)
    );

    if (parent) {
      setExpandedMenu(parent.label);
    } else {
      setExpandedMenu(null);
    }
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && !user && mounted) {
      router.push('/admin/login');
    }
  }, [user, loading, router, mounted]);

  // Don't apply layout to login page
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading || !mounted) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D2A679] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="admin-layout min-h-screen bg-[#070b14] text-white">
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full bg-[#0a0e1a]/95 backdrop-blur-md border-r border-white/10 z-50 transition-all duration-300',
          sidebarOpen ? 'w-64' : 'w-20',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D2A679] to-[#B87333] flex items-center justify-center text-white font-bold text-sm">
                GC
              </div>
              <span className="font-semibold text-sm">Admin Panel</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 items-center justify-center transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
          {mobileMenuOpen && (
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const hasChildren = !!item.children;

            if (!hasChildren) {
              const isActive = pathname === item.href;

              return (
                <button
                  key={item.href}
                  onClick={() => {
                    setExpandedMenu(null);
                    router.push(item.href!);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                    isActive
                      ? 'bg-[#D2A679]/15 text-[#D2A679] border border-[#D2A679]/30'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {sidebarOpen && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </button>
              );
            }

            const isExpanded = expandedMenu === item.label;
            const isParentActive = item.children.some(
              (child) => pathname === child.href
            );

            return (
              <div key={item.label}>
                <button
                  onClick={() =>
                    setExpandedMenu(isExpanded ? null : item.label)
                  }
                  className={cn(
                    'w-full flex items-center px-3 py-2.5 rounded-xl transition-all duration-200',
                    isParentActive
                      ? 'bg-[#D2A679]/15 text-[#D2A679] border border-[#D2A679]/30'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <item.icon size={20} />

                  {sidebarOpen && (
                    <>
                      <span className="ml-3 flex-1 text-left text-sm font-medium">
                        {item.label}
                      </span>

                      <ChevronDown
                        size={16}
                        className={cn(
                          'transition-transform duration-200',
                          isExpanded && 'rotate-180'
                        )}
                      />
                    </>
                  )}
                </button>

                {sidebarOpen && isExpanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => {
                      const active = pathname === child.href;

                      return (
                        <button
                          key={child.href}
                          onClick={() => {
                            router.push(child.href);
                            setMobileMenuOpen(false);
                          }}
                          className={cn(
                            'w-full text-left rounded-lg px-3 py-2 text-sm transition-all',
                            active
                              ? 'bg-[#D2A679]/20 text-[#D2A679]'
                              : 'text-white/60 hover:bg-white/5 hover:text-white'
                          )}
                        >
                          {child.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10">
          <div className={cn('flex items-center gap-3', sidebarOpen ? 'px-3' : 'justify-center')}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a6cff] to-[#38bdf8] flex items-center justify-center text-sm font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-white/40 truncate">{user.email}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className={cn(
              'mt-3 flex items-center gap-2 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors w-full',
              !sidebarOpen && 'justify-center'
            )}
          >
            <LogOut size={18} />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        className={cn(
          'transition-all duration-300',
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        )}
      >
        {/* Top bar */}
        <header className="h-16 bg-[#0a0e1a]/80 backdrop-blur-md border-b border-white/10 flex items-center px-4 lg:px-6 sticky top-0 z-30">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center"
          >
            <Menu size={20} />
          </button>
          <div className="lg:hidden ml-2">
            <span className="font-semibold text-sm">Admin Panel</span>
          </div>
          <div className="hidden lg:block ml-auto">
            <div className="flex items-center gap-2 text-sm text-white/50">
              <span>Logged in as</span>
              <span className="text-[#D2A679] font-medium">{user.name}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
}
