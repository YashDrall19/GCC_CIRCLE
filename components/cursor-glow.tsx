'use client';

import { useEffect, useRef, useState } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringPos = useRef({ x: -100, y: -100 });
  const animationFrame = useRef<number>();

  useEffect(() => {
    setMounted(true);
    
    // Detect touch devices
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
    };
    checkTouch();

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    // Animate ring position
    const animate = () => {
      const speed = 0.18;
      ringPos.current.x += (position.x - ringPos.current.x) * speed;
      ringPos.current.y += (position.y - ringPos.current.y) * speed;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      animationFrame.current = requestAnimationFrame(animate);
    };
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, [position.x, position.y]);

  // Don't render on touch devices or server
  if (!mounted || isTouchDevice) return null;

  return (
    <>
      {/* Main glow (dot) */}
      <div
        className="pointer-events-none fixed z-[9999] transition-opacity duration-150 hidden md:block"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          opacity: visible ? 1 : 0,
        }}
      >
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

      {/* Trailing glow ring (follows with lag) */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] transition-opacity duration-200 hidden md:block"
        style={{
          left: ringPos.current.x,
          top: ringPos.current.y,
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
