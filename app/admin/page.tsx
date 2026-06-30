'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminRootPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/admin/dashboard');
      } else {
        router.push('/admin/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#D2A679] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
