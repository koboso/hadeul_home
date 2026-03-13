"use client";

import { motion } from "framer-motion";

/* ─── Video background layer (shared by Company / Services / Careers) ─── */
export function VideoHeroBg({
  src,
  overlay = 0.7,
}: {
  src: string;
  overlay?: number;
}) {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
      />
      {/* Dark overlay — keeps neon text readable */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${overlay})` }}
      />
    </>
  );
}

/* ─── Portfolio: Floating grid nodes ─── */
export function PortfolioHeroBg() {
  const nodes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: `${10 + (i % 5) * 20}%`,
    y: `${15 + Math.floor(i / 5) * 22}%`,
    delay: i * 0.15,
    size: 2 + (i % 3),
  }));

  return (
    <>
      <motion.div
        className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-purple-500/8 rounded-full blur-[160px]"
        animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      {nodes.map((n) => (
        <motion.div
          key={n.id}
          className="absolute rounded-full bg-purple-400"
          style={{ left: n.x, top: n.y, width: n.size, height: n.size }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scale: [1, 1.5, 1],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3 + (n.id % 3),
            repeat: Infinity,
            delay: n.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04 }}>
        <motion.line
          x1="15%" y1="25%" x2="50%" y2="35%"
          stroke="#8b5cf6" strokeWidth="1"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.line
          x1="50%" y1="35%" x2="85%" y2="20%"
          stroke="#8b5cf6" strokeWidth="1"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.line
          x1="30%" y1="60%" x2="70%" y2="55%"
          stroke="#8b5cf6" strokeWidth="1"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        />
      </svg>
    </>
  );
}

/* ─── Services: Orbiting rings ─── */
export function ServicesHeroBg() {
  return (
    <>
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-cyan-500/10"
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity } }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-purple-500/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-pink-500/10"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity } }}
      />
      {/* Orbiting dots */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-cyan-400/40 blur-[2px]"
        animate={{
          x: [250, 0, -250, 0, 250],
          y: [0, -250, 0, 250, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ marginLeft: -6, marginTop: -6 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-purple-400/50 blur-[1px]"
        animate={{
          x: [-175, 0, 175, 0, -175],
          y: [0, 175, 0, -175, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ marginLeft: -4, marginTop: -4 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/6 rounded-full blur-[140px]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </>
  );
}

/* ─── News: Horizontal scan lines ─── */
export function NewsHeroBg() {
  return (
    <>
      <motion.div
        className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-500/6 rounded-full blur-[160px]"
        animate={{ x: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
        animate={{ top: ["10%", "90%", "10%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent"
        animate={{ top: ["80%", "20%", "80%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Ticker dots */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-purple-400/30"
          style={{ left: `${12 + i * 11}%`, top: "50%" }}
          animate={{ opacity: [0.1, 0.6, 0.1], scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
        />
      ))}
    </>
  );
}

/* ─── Inquiry: Ripple waves ─── */
export function InquiryHeroBg() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/10"
          animate={{
            width: [100, 600],
            height: [100, 600],
            opacity: [0.4, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.3,
            ease: "easeOut",
          }}
        />
      ))}
      <motion.div
        className="absolute top-1/2 right-1/3 w-[600px] h-[600px] bg-purple-500/8 rounded-full blur-[160px]"
        animate={{ scale: [1, 1.15, 1], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      {/* Center pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-400/30"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </>
  );
}

/* ─── Company: Enhanced floating particles ─── */
const COMPANY_PARTICLES = [
  { id: 0, x: 8, y: 12, size: 2, dur: 5, delay: 0, dy: -25, dx: 5 },
  { id: 1, x: 22, y: 45, size: 3, dur: 7, delay: 0.4, dy: -35, dx: -8 },
  { id: 2, x: 35, y: 78, size: 2, dur: 6, delay: 1.2, dy: -28, dx: 3 },
  { id: 3, x: 48, y: 20, size: 4, dur: 8, delay: 0.8, dy: -40, dx: -5 },
  { id: 4, x: 62, y: 55, size: 2, dur: 5, delay: 1.6, dy: -22, dx: 7 },
  { id: 5, x: 75, y: 30, size: 3, dur: 9, delay: 0.2, dy: -30, dx: -10 },
  { id: 6, x: 88, y: 65, size: 2, dur: 6, delay: 2.0, dy: -26, dx: 4 },
  { id: 7, x: 15, y: 85, size: 3, dur: 7, delay: 1.0, dy: -32, dx: -6 },
  { id: 8, x: 42, y: 40, size: 2, dur: 5, delay: 2.4, dy: -20, dx: 9 },
  { id: 9, x: 55, y: 72, size: 4, dur: 8, delay: 0.6, dy: -38, dx: -3 },
  { id: 10, x: 70, y: 15, size: 2, dur: 6, delay: 1.8, dy: -24, dx: 6 },
  { id: 11, x: 30, y: 60, size: 3, dur: 9, delay: 2.8, dy: -34, dx: -7 },
  { id: 12, x: 82, y: 48, size: 2, dur: 5, delay: 1.4, dy: -27, dx: 2 },
  { id: 13, x: 50, y: 90, size: 3, dur: 7, delay: 0.3, dy: -30, dx: -4 },
  { id: 14, x: 95, y: 35, size: 2, dur: 6, delay: 2.2, dy: -22, dx: 8 },
];

export function CompanyHeroBg() {
  return (
    <>
      <motion.div
        className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/8 rounded-full blur-[160px]"
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[120px]"
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      {COMPANY_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, p.dy, 0],
            x: [0, p.dx, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
