'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ParticlesBackground from '@/components/particles-background';
import CursorGlow from '@/components/cursor-glow';
import IntroLoader from '@/components/IntroLoader';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  const isAdminRoute = pathname?.startsWith('/admin');

  useEffect(() => {
    if (!isAdminRoute) {
      document.body.style.overflow = loading ? 'hidden' : 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading, isAdminRoute]);

  useEffect(() => {
    if (isAdminRoute) return;

    // Detect mobile/touch devices
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Fallback timeout in case video is slow or fails
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isAdminRoute]);

  const handleFinish = () => {
    setLoading(false);
  };

  // Admin routes have their own layout
  if (isAdminRoute) {
    return (
      <html lang="en">
        <body className={`${inter.className} bg-[#070b14] antialiased overflow-x-hidden`}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#070b14] antialiased overflow-x-hidden`}>
        <AuthProvider>
          {loading ? (
            <IntroLoader onFinish={handleFinish} />
          ) : (
            <>
              <ParticlesBackground />
              {!isMobile && <CursorGlow />}
              <Navbar />

              <main className="min-h-screen">
                {children}
              </main>

              <Footer />

              <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden opacity-[0.03]">
                <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D2A679] to-transparent animate-scan-line" />
              </div>
            </>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
