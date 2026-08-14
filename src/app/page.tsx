'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function Home() {
  const router = useRouter();
  const { token, init } = useAuthStore();

  useEffect(() => {
    init();
    const storedToken = localStorage.getItem('cms_admin_token');
    if (storedToken || token) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [router, token, init]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 text-slate-400">
      Loading CMS Portal...
    </div>
  );
}
