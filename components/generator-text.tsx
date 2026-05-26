'use client';

import { useEffect, useState, ReactNode } from 'react';

interface GeneratorTextProps {
  children: ReactNode;
  className?: string;
}

export default function GeneratorText({ children, className = '' }: GeneratorTextProps) {
  const [phase, setPhase] = useState<'startup' | 'flicker' | 'stable'>('startup');
  const [glitchText, setGlitchText] = useState<string>('');
  const [opacity, setOpacity] = useState(0.3);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

  useEffect(() => {
    const targetText = typeof children === 'string' ? children : 'Influence.';
    let iterations = 0;

    // Phase 1: Random character flicker (startup) - like a generator starting
    const startupInterval = setInterval(() => {
      setGlitchText(
        targetText
          .split('')
          .map((char, idx) => {
            if (char === ' ' || char === '.' || !/[a-zA-Z]/.test(char)) return char;
            if (idx < iterations) return targetText[idx];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      iterations += 0.5;

      if (iterations >= targetText.length) {
        clearInterval(startupInterval);
        setGlitchText(targetText);
        setPhase('flicker');
      }
    }, 50);

    return () => clearInterval(startupInterval);
  }, [children]);

  useEffect(() => {
    if (phase === 'flicker') {
      // Phase 2: Quick flicker blinks (power stabilizing)
      let flickerCount = 0;
      const maxFlickers = 6;

      const flickerInterval = setInterval(() => {
        setOpacity(prev => prev === 1 ? 0.4 : 1);
        flickerCount++;

        if (flickerCount >= maxFlickers) {
          clearInterval(flickerInterval);
          setPhase('stable');
          setOpacity(1);
        }
      }, 80);

      return () => clearInterval(flickerInterval);
    }
  }, [phase]);

  // Render based on phase - always show content clearly in stable phase
  return (
    <span className={`relative inline-block ${className}`}>
      <span
        style={{
          opacity: phase === 'stable' ? 1 : opacity,
          textShadow:
            phase === 'stable'
              ? '0 0 20px rgba(56,189,248,0.5), 0 0 40px rgba(26,108,255,0.3)'
              : opacity > 0.5
                ? '0 0 30px rgba(56,189,248,1), 0 0 60px rgba(26,108,255,0.8)'
                : '0 0 5px rgba(56,189,248,0.3)',
          transition: phase === 'stable' ? 'opacity 0.3s, text-shadow 0.3s' : 'none',
        }}
      >
        {phase === 'startup' ? glitchText : children}
      </span>
    </span>
  );
}
