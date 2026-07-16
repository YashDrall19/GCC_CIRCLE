"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLeadsPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Legends Management where leads data now lives
    router.replace('/admin/legends/manage');
  }, [router]);

  return (
    <div className="py-20 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Redirecting to Legends Management...</h2>
      </div>
    </div>
  );
}
