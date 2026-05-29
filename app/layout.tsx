import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import ParticlesBackground from '@/components/particles-background';
import CursorGlow from '@/components/cursor-glow';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GCC Circle — Connect. Network. Influence.',
  description: "India's foremost leadership community for top-tier professionals across GCCs. Where CXOs, Site Heads, and senior leaders come together.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#070b14] antialiased`}>
        <ParticlesBackground />
        <CursorGlow />
        <Navbar />
        {children}
        <Footer />

        {/* Scan line effect overlay */}
        <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden opacity-[0.03]">
          <div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D2A679] to-transparent animate-scan-line"
          />
        </div>
      </body>
    </html>
  );
}
