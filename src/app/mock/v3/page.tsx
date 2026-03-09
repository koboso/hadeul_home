"use client";

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

/* ─── V3: Immersive Scroll + Kinetic Typography ─── */

const IMG = {
  ai: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80",
  game: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80",
  dev: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1600&q=80",
  team: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80",
  space: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
};

const VID_HERO = "https://videos.pexels.com/video-files/5752729/5752729-uhd_2560_1440_30fps.mp4";
const VID_MID = "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4";

/* ─── Counter Hook ─── */
function useCountUp(target: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!startOnView || !inView || hasStarted.current) return;
    hasStarted.current = true;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration, startOnView]);

  return { count, ref };
}

/* ─── 1. Hero — Kinetic Typography over Video ─── */
function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0.9]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const words = [
    { text: "CREATE", from: { x: -200, y: 0, rotate: -8 } },
    { text: "INNOVATE", from: { x: 200, y: 0, rotate: 5 } },
    { text: "TRANSFORM", from: { x: 0, y: 150, rotate: -3 } },
  ];

  return (
    <section ref={containerRef} className="relative h-[150vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video background */}
        <motion.div style={{ scale: videoScale }} className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={VID_HERO} type="video/mp4" />
          </video>
        </motion.div>

        {/* Dark overlay */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-black"
        />

        {/* Back link */}
        <Link
          href="/mock"
          className="absolute top-6 left-8 z-50 text-white/40 text-sm font-medium hover:text-white transition-colors tracking-widest uppercase"
        >
          &larr; Back to Mocks
        </Link>

        {/* Company mark */}
        <div className="absolute top-6 right-8 z-50">
          <span className="text-white/20 text-xs tracking-[0.5em] uppercase font-bold">
            Hadeul
          </span>
        </div>

        {/* Kinetic text */}
        <motion.div
          style={{ y: heroTextY }}
          className="relative z-10 h-full flex flex-col items-center justify-center gap-0"
        >
          {words.map((word, i) => (
            <motion.h1
              key={word.text}
              initial={{
                opacity: 0,
                x: word.from.x,
                y: word.from.y,
                rotate: word.from.rotate,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
              }}
              transition={{
                duration: 1.2,
                delay: 0.3 + i * 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[15vw] font-black leading-[0.85] tracking-tighter select-none"
              style={{
                color: i === 1 ? "transparent" : "white",
                WebkitTextStroke: i === 1 ? "2px rgba(255,255,255,0.8)" : "none",
                mixBlendMode: "difference",
              }}
            >
              {word.text}
            </motion.h1>
          ))}

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
            className="mt-8 text-white/30 text-lg md:text-xl tracking-[0.2em] uppercase"
          >
            AI &middot; Game &middot; Software
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-white/20 text-[10px] tracking-[0.4em] uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 2. Scroll-Pinned Text Reveal ─── */
function ScrollTextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const words = [
    "We", "don't", "just", "build", "software.", "We", "architect",
    "experiences", "that", "push", "the", "boundaries", "of", "what's",
    "possible.", "From", "AI", "intelligence", "to", "immersive",
    "gaming", "worlds,", "we", "transform", "bold", "visions",
    "into", "digital", "reality.",
  ];

  const bgHue = useTransform(scrollYProgress, [0, 0.5, 1], [270, 320, 200]);
  const bgSaturation = useTransform(scrollYProgress, [0, 0.5, 1], [80, 70, 60]);
  const bgGradient = useTransform(
    [bgHue, bgSaturation],
    ([h, s]) =>
      `radial-gradient(ellipse at 50% 50%, hsla(${h}, ${s}%, 15%, 0.4) 0%, #0a0a0a 70%)`
  );
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: bgGradient,
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
          <p className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.2] tracking-tight flex flex-wrap gap-x-[0.35em] gap-y-1 justify-center text-center">
            {words.map((word, i) => {
              const wordStart = Math.max(0, (i - 2) / words.length);
              const wordEnd = (i + 1) / words.length;
              return (
                <ScrollWord
                  key={`${word}-${i}`}
                  word={word}
                  progress={scrollYProgress}
                  start={wordStart}
                  end={wordEnd}
                  isHighlight={
                    ["AI", "gaming", "transform", "reality."].includes(word)
                  }
                />
              );
            })}
          </p>
        </div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
          style={{ width: progressWidth }}
        />
      </div>
    </section>
  );
}

function ScrollWord({
  word,
  progress,
  start,
  end,
  isHighlight,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  isHighlight: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [8, 0]);

  if (isHighlight) {
    return (
      <motion.span
        style={{ opacity, y }}
      >
        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
          {word}
        </span>
      </motion.span>
    );
  }

  return (
    <motion.span
      style={{ opacity, y }}
      className="text-white"
    >
      {word}
    </motion.span>
  );
}

/* ─── 3. Horizontal Scroll Gallery ─── */
function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-60%"]);

  const projects = [
    {
      img: IMG.ai,
      title: "AI Solutions",
      desc: "생성형 AI와 대규모 언어 모델 기반의 차세대 솔루션",
      tag: "Artificial Intelligence",
    },
    {
      img: IMG.game,
      title: "Game Dev",
      desc: "크로스플랫폼 게임 개발과 라이브 서비스 운영",
      tag: "Interactive Entertainment",
    },
    {
      img: IMG.dev,
      title: "Software",
      desc: "클라우드 네이티브 아키텍처와 엔터프라이즈 시스템",
      tag: "Engineering",
    },
    {
      img: IMG.space,
      title: "Deep Tech",
      desc: "첨단 기술 연구와 미래 플랫폼 설계",
      tag: "Research & Innovation",
    },
    {
      img: IMG.team,
      title: "Consulting",
      desc: "디지털 전환 전략 수립과 기술 컨설팅",
      tag: "Strategy",
    },
  ];

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Section label */}
        <div className="absolute top-12 left-8 md:left-16 z-20">
          <span className="text-white/20 text-[10px] tracking-[0.5em] uppercase">
            Our Work
          </span>
        </div>

        <motion.div style={{ x }} className="flex gap-8 pl-[10vw]">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="relative flex-shrink-0 w-[75vw] md:w-[45vw] h-[70vh] rounded-2xl overflow-hidden group cursor-pointer"
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={project.img}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Tag */}
              <div className="absolute top-6 left-6 z-10">
                <span className="px-3 py-1 text-[10px] tracking-[0.3em] uppercase text-white/60 border border-white/10 rounded-full">
                  {project.tag}
                </span>
              </div>

              {/* Number */}
              <div className="absolute top-6 right-6 z-10">
                <span
                  className="text-[8vw] md:text-[4vw] font-black leading-none text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
                  {project.title}
                </h3>
                <p className="text-white/40 text-sm md:text-base max-w-md">
                  {project.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 4. Split-Reveal Section ─── */
function SplitReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0.1, 0.4], [0, -100]);
  const rightX = useTransform(scrollYProgress, [0.1, 0.4], [0, 100]);
  const leftClip = useTransform(
    scrollYProgress,
    [0.1, 0.4],
    ["inset(0 0% 0 0)", "inset(0 30% 0 0)"]
  );
  const rightClip = useTransform(
    scrollYProgress,
    [0.1, 0.4],
    ["inset(0 0 0 0%)", "inset(0 0 0 30%)"]
  );
  const centerOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const centerScale = useTransform(scrollYProgress, [0.25, 0.45], [0.8, 1]);
  const imgParallax = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Left half */}
        <motion.div
          className="absolute inset-0 w-1/2 overflow-hidden"
          style={{ x: leftX, clipPath: leftClip }}
        >
          <motion.img
            src={IMG.space}
            alt=""
            className="w-[200%] h-full object-cover"
            style={{ y: imgParallax }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* Right half */}
        <motion.div
          className="absolute inset-0 left-1/2 w-1/2 overflow-hidden"
          style={{ x: rightX, clipPath: rightClip }}
        >
          <motion.img
            src={IMG.dev}
            alt=""
            className="w-[200%] h-full object-cover -translate-x-1/2"
            style={{ y: imgParallax }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* Center content revealed */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20"
          style={{ opacity: centerOpacity, scale: centerScale }}
        >
          <div className="text-center max-w-3xl px-8">
            <motion.p className="text-purple-400 text-sm tracking-[0.4em] uppercase font-bold mb-6">
              Our Philosophy
            </motion.p>
            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8"
            >
              TECHNOLOGY
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "2px rgba(139,92,246,0.6)" }}
              >
                MEETS
              </span>
              <br />
              ARTISTRY
            </h2>
            <p className="text-white/30 text-lg max-w-lg mx-auto">
              기술과 예술의 교차점에서 새로운 가능성을 창조합니다.
              우리는 단순한 개발을 넘어 경험을 설계합니다.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 5. Large Typography Stats ─── */
function LargeStats() {
  const stats = [
    { target: 50, suffix: "+", label: "Projects Delivered", sublabel: "프로젝트 완료" },
    { target: 99, suffix: "%", label: "Client Satisfaction", sublabel: "고객 만족도" },
    { target: 20, suffix: "+", label: "Team Members", sublabel: "팀 구성원" },
    { target: 10, suffix: "+", label: "Global Partners", sublabel: "글로벌 파트너" },
  ];

  return (
    <section className="relative py-32 md:py-48 bg-[#050505] overflow-hidden">
      {/* Background decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="text-[40vw] font-black text-transparent leading-none"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.02)" }}
        >
          DATA
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {stats.map((stat, i) => (
            <StatBlock key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatBlock({
  stat,
  index,
}: {
  stat: { target: number; suffix: string; label: string; sublabel: string };
  index: number;
}) {
  const { count, ref } = useCountUp(stat.target, 2000);

  return (
    <div
      ref={ref}
      className={`relative py-16 md:py-24 px-6 md:px-12 ${
        index % 2 === 0 ? "md:border-r" : ""
      } ${index < 2 ? "border-b" : ""} border-white/5`}
    >
      {/* Huge number */}
      <div className="relative">
        <span className="text-[20vw] md:text-[12vw] font-black leading-none tracking-tighter bg-gradient-to-br from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
          {count}
          {stat.suffix}
        </span>
      </div>

      {/* Label overlapping the number */}
      <div className="-mt-4 md:-mt-6 relative z-10">
        <p className="text-white text-xl md:text-2xl font-black tracking-tight">
          {stat.label}
        </p>
        <p className="text-white/20 text-sm mt-1">{stat.sublabel}</p>
      </div>
    </div>
  );
}

/* ─── 6. Video Interlude ─── */
function VideoInterlude() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [60, 0, 0, -60]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 0.5, 0.5, 0.8]);
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={containerRef} className="relative h-[80vh] overflow-hidden">
      <motion.div style={{ scale: videoScale }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={VID_MID} type="video/mp4" />
        </video>
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      <motion.div
        className="relative z-10 h-full flex items-center justify-center text-center px-8"
        style={{ opacity: textOpacity, y: textY }}
      >
        <div>
          <p className="text-cyan-400 text-sm tracking-[0.5em] uppercase font-bold mb-6">
            The Future is Now
          </p>
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
            BUILDING
            <br />
            TOMORROW&apos;S
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              DIGITAL WORLD
            </span>
          </h2>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── 7. CTA with Animated Gradient ─── */
function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <section
      ref={containerRef}
      className="relative py-40 md:py-56 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-[120px]"
        style={{
          rotate,
          scale,
          background:
            "conic-gradient(from 0deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-[80px]"
        style={{
          rotate: useTransform(scrollYProgress, [0, 1], [360, 0]),
          background:
            "conic-gradient(from 180deg, #06b6d4, #ec4899, #8b5cf6, #06b6d4)",
        }}
      />

      <div className="relative z-10 text-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-white/20 text-sm tracking-[0.5em] uppercase mb-8">
            Ready to Start?
          </p>
          <h2 className="text-6xl md:text-8xl lg:text-[10vw] font-black text-white leading-[0.85] tracking-tighter mb-4">
            LET&apos;S
          </h2>
          <h2
            className="text-6xl md:text-8xl lg:text-[10vw] font-black leading-[0.85] tracking-tighter mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent"
          >
            CREATE
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:info@hadeul.com"
              className="group relative px-12 py-5 overflow-hidden rounded-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 transition-transform duration-500 group-hover:scale-110" />
              <span className="relative text-white font-bold text-lg tracking-wider uppercase">
                Contact Us
              </span>
            </a>
            <Link
              href="/mock"
              className="px-12 py-5 border border-white/10 text-white/40 font-bold tracking-wider uppercase rounded-full hover:border-white/30 hover:text-white/60 transition-all duration-300"
            >
              View All Mocks
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 8. Minimal Footer ─── */
function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h3
              className="text-3xl md:text-5xl font-black text-transparent leading-none tracking-tighter mb-4"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
            >
              HADEUL
            </h3>
            <p className="text-white/15 text-sm">
              AI &middot; Game &middot; Software Engineering
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/10 text-xs tracking-[0.3em] uppercase">
              &copy; 2026 Hadeul Corp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Page ─── */
export default function V3() {
  return (
    <div className="bg-[#0a0a0a] text-white overflow-x-hidden">
      <Hero />
      <ScrollTextReveal />
      <HorizontalGallery />
      <SplitReveal />
      <LargeStats />
      <VideoInterlude />
      <CTASection />
      <Footer />
    </div>
  );
}
