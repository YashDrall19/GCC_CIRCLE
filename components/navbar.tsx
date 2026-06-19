'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from "next/image";


const navLinks = [
  { label: 'The Circle', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'Partners', href: '/partners' },
  { label: 'Insights', href: '/insights' },
  { label: 'League', href: '/league' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-[#0a0e1a]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo/goldlogo.png"
            alt="GCC Circle"
            width={180}
            height={60}
            className="h-24 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors duration-200 relative group',
                pathname === link.href
                  ? 'text-[#D2A679]'
                  : 'text-white/70 hover:text-white'
              )}
            >
              {link.label}
              <span
                className={cn(
                  'absolute -bottom-1 left-0 h-px bg-[#D2A679] transition-all duration-200',
                  pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                )}
              />
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/join"
            className="px-5 py-2 bg-[#D2A679] hover:bg-[#B87333] text-white text-sm font-semibold rounded-full transition-all duration-200 hover:shadow-[0_0_20px_rgba(26,108,255,0.4)]"
          >
            Join the Circle
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden bg-[#0a0e1a]/98 backdrop-blur-md overflow-hidden transition-all duration-300',
          open ? 'max-h-screen py-6' : 'max-h-0'
        )}
      >
        <div className="px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                'text-sm font-medium py-2 border-b border-white/10',
                pathname === link.href ? 'text-[#D2A679]' : 'text-white/70'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/join"
            onClick={() => setOpen(false)}
            className="mt-2 px-5 py-3 bg-[#D2A679] text-white text-sm font-semibold rounded-full text-center"
          >
            Join the Circle
          </Link>
        </div>
      </div>
    </header>
  );
}
