'use client';

import { useEffect, useState, ReactNode } from 'react';

interface HologramTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function HologramText({ children, className = '', delay = 0 }: HologramTextProps) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span
        className={`relative ${glitch ? 'animate-hologram-glitch' : ''}`}
        style={{
          textShadow: glitch
            ? '2px 0 #1a6cff, -2px 0 #38bdf8'
            : '0 0 20px rgba(26,108,255,0.3), 0 0 40px rgba(56,189,248,0.2)',
        }}
      >
        {children}
      </span>
      {glitch && (
        <>
          <span
            className="absolute inset-0 text-[#1a6cff] opacity-70"
            style={{ transform: 'translate(-2px, 0)', clipPath: 'inset(0 0 50% 0)' }}
            aria-hidden
          >
            {children}
          </span>
          <span
            className="absolute inset-0 text-[#38bdf8] opacity-70"
            style={{ transform: 'translate(2px, 0)', clipPath: 'inset(50% 0 0 0)' }}
            aria-hidden
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}
