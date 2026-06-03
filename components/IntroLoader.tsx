'use client';

import { useEffect, useRef } from 'react';

type IntroLoaderProps = {
  onFinish: () => void;
};

export default function IntroLoader({ onFinish }: IntroLoaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.3; // 1.5x speed
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={onFinish}
        className="w-full h-full object-cover"
      >
        <source src="/videos/hud.mp4" type="video/mp4" />
      </video>
    </div>
  );
}