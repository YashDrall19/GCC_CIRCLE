'use client';

import { useEffect, useState } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Main glow */}
      <div
        className="pointer-events-none fixed z-[9999] transition-opacity duration-150"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          opacity: visible ? 1 : 0,
        }}
      >
        {/* Core */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 8,
            height: 8,
            background: '#38bdf8',
            boxShadow: '0 0 10px #38bdf8, 0 0 20px #1a6cff',
          }}
        />
      </div>

      {/* Trailing glow ring */}
      <div
        className="pointer-events-none fixed z-[9998] transition-all duration-300 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          opacity: visible ? 0.6 : 0,
        }}
      >
        <div
          className="rounded-full border border-[#1a6cff]/50"
          style={{
            width: 40,
            height: 40,
            boxShadow: '0 0 15px rgba(26, 108, 255, 0.3)',
          }}
        />
      </div>
    </>
  );
}
