'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Vertical progress line on left */}
      <div className="fixed left-0 top-0 bottom-0 w-1 z-50 pointer-events-none">
        <div
          className="w-full bg-gradient-to-b from-[#1a6cff] via-[#38bdf8] to-[#1a6cff] transition-all duration-100"
          style={{ height: `${progress}%` }}
        />
        {/* Glowing dot at progress point */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#38bdf8] shadow-[0_0_15px_#38bdf8,0_0_30px_#1a6cff]"
          style={{ top: `${progress}%`, transform: 'translate(-50%, -50%)' }}
        />
      </div>

      {/* Horizontal progress bar at top */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50 pointer-events-none bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-[#1a6cff] to-[#38bdf8] transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage indicator */}
      <div className="fixed bottom-6 left-6 z-50 pointer-events-none font-mono text-xs text-[#1a6cff]/70 tabular-nums">
        {Math.round(progress)}%
      </div>
    </>
  );
}
