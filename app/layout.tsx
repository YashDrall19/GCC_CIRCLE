import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

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
      <body className={`${inter.className} bg-[#070b14]`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
