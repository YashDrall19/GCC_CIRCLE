// components/CinematicHUD.jsx
"use client";

import { motion } from "framer-motion";

export default function HUD() {
  return (
    <div className="relative flex items-center justify-center w-[900px] h-[900px]">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[700px] h-[700px] rounded-full bg-[#1a6cff]/10 blur-[120px]" />

      {/* OUTER THIN RING */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 60,
          ease: "linear",
        }}
        className="absolute w-[720px] h-[720px] rounded-full border border-[#38bdf8]/40"
      />

      {/* OUTER SEMI ARC */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        className="absolute w-[650px] h-[650px] rounded-full border-[20px] border-transparent"
        style={{
          borderTopColor: "#1a6cff",
          borderLeftColor: "#38bdf8",
          filter:
            "drop-shadow(0 0 12px #1a6cff) drop-shadow(0 0 25px #38bdf8)",
        }}
      />

      {/* SECOND SEMICIRCLE */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 16,
          ease: "linear",
        }}
        className="absolute w-[560px] h-[560px] rounded-full border-[14px] border-transparent"
        style={{
          borderBottomColor: "#D2A679",
          borderRightColor: "#B87333",
          filter:
            "drop-shadow(0 0 10px #D2A679) drop-shadow(0 0 20px #B87333)",
        }}
      />

      {/* THIN TECH RINGS */}
      {[500, 460, 420].map((size, i) => (
        <motion.div
          key={i}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            repeat: Infinity,
            duration: 20 + i * 6,
            ease: "linear",
          }}
          className="absolute rounded-full border border-[#38bdf8]/20"
          style={{
            width: size,
            height: size,
          }}
        />
      ))}

      {/* FLOATING SEMI ARC */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
        className="absolute w-[340px] h-[340px] rounded-full border-[18px] border-transparent"
        style={{
          borderTopColor: "#38bdf8",
          borderLeftColor: "#1a6cff",
          filter:
            "drop-shadow(0 0 15px #38bdf8) drop-shadow(0 0 30px #1a6cff)",
        }}
      />

      {/* INNER ARC */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "linear",
        }}
        className="absolute w-[270px] h-[270px] rounded-full border-[10px] border-transparent"
        style={{
          borderBottomColor: "#D2A679",
          borderRightColor: "#B87333",
          filter: "drop-shadow(0 0 10px #D2A679)",
        }}
      />

      {/* CENTER CORE */}
      <motion.div
        animate={{
          scale: [1, 1.04, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="absolute flex items-center justify-center w-[160px] h-[160px] rounded-full border-[10px]"
        style={{
          borderColor: "#38bdf8",
          boxShadow:
            "0 0 30px #38bdf8, inset 0 0 20px rgba(56,189,248,0.4)",
          background:
            "radial-gradient(circle, rgba(26,108,255,0.2), transparent)",
        }}
      >
        <div
          className="w-16 h-16 rounded-full border-[6px]"
          style={{
            borderColor: "#D2A679",
            boxShadow: "0 0 20px #D2A679",
          }}
        />
      </motion.div>

      {/* SMALL FLOATING DOTS */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 2 + i * 0.2,
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 2 === 0 ? "#38bdf8" : "#D2A679",
            transform: `rotate(${i * 30}deg) translateY(-150px)`,
            boxShadow:
              i % 2 === 0
                ? "0 0 10px #38bdf8"
                : "0 0 10px #D2A679",
          }}
        />
      ))}

      {/* SMOOTH RADAR SWEEP */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "linear",
        }}
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(56,189,248,0.35), transparent 12%)",
          filter: "blur(14px)",
        }}
      />

      {/* INNER LIGHT */}
      <div
        className="absolute w-[260px] h-[260px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.15), transparent)",
        }}
      />
    </div>
  );
}