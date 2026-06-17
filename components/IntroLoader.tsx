'use client';

import { useEffect } from 'react';

interface Props {
  onFinish: () => void;
}

export default function IntroLoader({ onFinish }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#070b14]">

      {/* Aurora */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[550px]
          w-[550px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-sky-500/10
          blur-[140px]
          animate-[aurora_6s_ease-in-out_infinite]
        "
      />

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1a6cff]/10 blur-[140px]" />

        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D2A679]/10 blur-[100px]" />
      </div>

      {/* Grid */}
      <div
        className="
          absolute inset-0 opacity-10
          bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      {/* Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[420px] h-[420px]">

          {/* Network Cross */}
          <div className="absolute inset-0 animate-[slowPulse_4s_ease-in-out_infinite]">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D2A679]/40 to-transparent" />
          </div>

          <div className="absolute inset-0 rounded-full border border-sky-400/20 animate-[spin_18s_linear_infinite]" />

          <div className="absolute inset-[40px] rounded-full border border-[#D2A679]/30 animate-[spinReverse_14s_linear_infinite]" />

          <div className="absolute inset-[80px] rounded-full border border-white/10 animate-[spin_10s_linear_infinite]" />

          {/* Orbit Node 1 */}
          <div className="absolute inset-0 animate-[orbit_8s_linear_infinite]">
            <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-sky-400 shadow-[0_0_20px_#38bdf8]" />
          </div>

          {/* Orbit Node 2 */}
          <div className="absolute inset-[40px] animate-[orbitReverse_10s_linear_infinite]">
            <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[#D2A679] shadow-[0_0_20px_#D2A679]" />
          </div>

          {/* Orbit Node 3 */}
          <div className="absolute inset-[80px] animate-[orbit_12s_linear_infinite]">
            <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_15px_white]" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative z-10 text-center">

          <p
            className="
              mb-5
              text-xs
              uppercase
              tracking-[8px]
              text-sky-400
              opacity-0
              animate-[fadeUp_.7s_ease_forwards]
            "
          >
            Leadership • Technology • Innovation
          </p>

          <h1
            className="
              text-6xl
              md:text-7xl
              font-black
              tracking-[12px]
              text-white
              opacity-0
              animate-[logoReveal_.8s_cubic-bezier(.22,1,.36,1)_forwards]
            "
          >
            GCC
          </h1>

          <p
            className="
              mt-2
              text-xl
              uppercase
              tracking-[8px]
              text-[#D2A679]
              font-medium
              opacity-0
              animate-[logoReveal_.8s_cubic-bezier(.22,1,.36,1)_forwards_.25s]
            "
          >
            Circle
          </p>

          <div
            className="
              mt-6
              mx-auto
              h-px
              w-44
              bg-gradient-to-r
              from-transparent
              via-[#D2A679]
              to-transparent
              opacity-0
              animate-[fadeUp_.7s_ease_forwards_.4s]
            "
          />

          <p
            className="
              mt-6
              text-white/60
              text-sm
              md:text-base
              tracking-[2px]
              opacity-0
              animate-[fadeUp_.7s_ease_forwards_.5s]
            "
          >
            Global Capability Leaders Network
          </p>

          {/* Loading Bar */}
          <div className="relative mt-10 w-72 max-w-[80vw] mx-auto overflow-hidden">

            <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="
                  h-full
                  w-full
                  origin-left
                  scale-x-0
                  bg-gradient-to-r
                  from-[#D2A679]
                  via-sky-400
                  to-[#1a6cff]
                  animate-[loaderProgress_2s_ease_forwards]
                "
              />
            </div>

            <div
              className="
                absolute
                inset-y-0
                w-20
                bg-gradient-to-r
                from-transparent
                via-white/70
                to-transparent
                animate-[scanner_1.5s_linear_infinite]
              "
            />
          </div>
        </div>
      </div>

      {/* Powered By */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">

        <p className="text-[10px] uppercase tracking-[5px] text-white/40">
          Powered by
        </p>

        <p className="mt-1 text-sm font-semibold tracking-[4px] uppercase text-[#D2A679]">
          Talentiser
        </p>

      </div>
    </div>
  );
}