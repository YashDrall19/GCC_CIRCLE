'use client';

import { useEffect, useState } from 'react';

export default function CardBackgroundCarousel({
  images,
}: {
  images: string[];
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!images?.length) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images?.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images?.length]);

  if (!images?.length) return null;

  return (
    <div className="absolute inset-0">
      {images?.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            current === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={img}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ))}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40 sm:bg-black/30" />

      {/* Premium gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#070b14]/40 via-[#070b14]/70 to-[#070b14]/95 sm:from-[#070b14]/30 sm:via-[#070b14]/60 sm:to-[#070b14]/90" />
    </div>
  );
}
