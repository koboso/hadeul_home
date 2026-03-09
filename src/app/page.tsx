"use client";

import { motion, useScroll, useTransform, useInView, animate, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";

/* ─── HADEUL Corporate Site ─── */

const IMG = {
  ai: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80",
  game: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80",
  dev: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1600&q=80",
  team: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80",
  space: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
};

const VID_HERO = "https://videos.pexels.com/video-files/8721940/8721940-uhd_2560_1440_24fps.mp4";
const VID_MID = "https://videos.pexels.com/video-files/3141208/3141208-uhd_2560_1440_25fps.mp4";

/* ─── Counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  useEffect(() => {
    if (isInView)
      animate(count, target, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => {
          if (ref.current) ref.current.textContent = Math.round(v) + suffix;
        },
      });
  }, [isInView, count, target, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ─── StickyScene ─── */
function StickyScene({
  children,
  height = "300vh",
}: {
  children: (p: ReturnType<typeof useScroll>["scrollYProgress"]) => React.ReactNode;
  height?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return (
    <div ref={ref} style={{ height }} className="relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {children(scrollYProgress)}
      </div>
    </div>
  );
}

/* ─── 1. Hero — Kinetic Typography over AI Video ─── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.85]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  const words = [
    { text: "CREATE", from: { x: -200, y: 0, rotate: -8 } },
    { text: "INNOVATE", from: { x: 200, y: 0, rotate: 5 } },
    { text: "TRANSFORM", from: { x: 0, y: 150, rotate: -3 } },
  ];

  return (
    <section ref={ref} className="relative h-screen">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <motion.div style={{ scale: videoScale }} className="absolute inset-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src={VID_HERO} type="video/mp4" />
          </video>
        </motion.div>

        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 flex flex-col items-center justify-center gap-0"
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
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
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

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
            className="mt-8 text-white/30 text-lg md:text-xl tracking-[0.2em] uppercase"
          >
            AI &middot; Game &middot; Software
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/20 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 2. Scroll-Pinned Text Reveal ─── */
function ScrollTextReveal() {
  const words = [
    "We", "don't", "just", "build", "software.", "We", "architect",
    "experiences", "that", "push", "the", "boundaries", "of", "what's",
    "possible.", "From", "AI", "intelligence", "to", "immersive",
    "gaming", "worlds,", "we", "transform", "bold", "visions",
    "into", "digital", "reality.",
  ];

  return (
    <StickyScene height="350vh">
      {(scrollYProgress) => {
        const bgHue = useTransform(scrollYProgress, [0, 0.3, 0.6], [270, 320, 200]);
        const bgSaturation = useTransform(scrollYProgress, [0, 0.3, 0.6], [80, 70, 60]);
        const bgGradient = useTransform(
          [bgHue, bgSaturation],
          ([h, s]) =>
            `radial-gradient(ellipse at 50% 50%, hsla(${h}, ${s}%, 15%, 0.4) 0%, #0a0a0a 70%)`
        );
        const progressWidth = useTransform(scrollYProgress, [0, 0.6], ["0%", "100%"]);

        return (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden" id="about">
            <motion.div className="absolute inset-0" style={{ background: bgGradient }} />

            <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
              <p className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.2] tracking-tight flex flex-wrap gap-x-[0.35em] gap-y-1 justify-center text-center">
                {words.map((word, i) => (
                  <ScrollWord
                    key={`${word}-${i}`}
                    word={word}
                    progress={scrollYProgress}
                    start={Math.max(0, ((i - 1) / words.length) * 0.6)}
                    end={((i + 1) / words.length) * 0.6}
                    isHighlight={["AI", "gaming", "transform", "reality."].includes(word)}
                  />
                ))}
              </p>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"
              style={{ width: progressWidth }}
            />
          </div>
        );
      }}
    </StickyScene>
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
      <motion.span style={{ opacity, y }}>
        <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
          {word}
        </span>
      </motion.span>
    );
  }

  return (
    <motion.span style={{ opacity, y }} className="text-white">
      {word}
    </motion.span>
  );
}

/* ─── 3. Horizontal Scroll Gallery ─── */
function HorizontalGallery() {
  const projects = [
    { img: IMG.ai, title: "AI Solutions", desc: "생성형 AI와 대규모 언어 모델 기반의 차세대 솔루션", tag: "Artificial Intelligence" },
    { img: IMG.game, title: "Game Dev", desc: "크로스플랫폼 게임 개발과 라이브 서비스 운영", tag: "Interactive Entertainment" },
    { img: IMG.dev, title: "Software", desc: "클라우드 네이티브 아키텍처와 엔터프라이즈 시스템", tag: "Engineering" },
    { img: IMG.space, title: "Deep Tech", desc: "첨단 기술 연구와 미래 플랫폼 설계", tag: "Research & Innovation" },
    { img: IMG.team, title: "Consulting", desc: "디지털 전환 전략 수립과 기술 컨설팅", tag: "Strategy" },
  ];

  return (
    <StickyScene height="300vh">
      {(scrollYProgress) => {
        const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-75%"]);
        const labelOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

        return (
          <div className="relative w-full h-full flex items-center overflow-hidden bg-[#0a0a0a]" id="services">
            <motion.div className="absolute top-12 left-8 md:left-16 z-20" style={{ opacity: labelOpacity }}>
              <span className="text-white/20 text-[10px] tracking-[0.5em] uppercase">Our Services</span>
            </motion.div>

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

                  <div className="absolute top-6 left-6 z-10">
                    <span className="px-3 py-1 text-[10px] tracking-[0.3em] uppercase text-white/60 border border-white/10 rounded-full">
                      {project.tag}
                    </span>
                  </div>

                  <div className="absolute top-6 right-6 z-10">
                    <span
                      className="text-[8vw] md:text-[4vw] font-black leading-none text-transparent"
                      style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                    <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
                      {project.title}
                    </h3>
                    <p className="text-white/40 text-sm md:text-base max-w-md">{project.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        );
      }}
    </StickyScene>
  );
}

/* ─── 4. Split-Reveal Section ─── */
function SplitReveal() {
  return (
    <StickyScene height="250vh">
      {(scrollYProgress) => {
        const leftX = useTransform(scrollYProgress, [0, 0.4], [0, -120]);
        const rightX = useTransform(scrollYProgress, [0, 0.4], [0, 120]);
        const leftClip = useTransform(scrollYProgress, [0, 0.4], ["inset(0 0% 0 0)", "inset(0 30% 0 0)"]);
        const rightClip = useTransform(scrollYProgress, [0, 0.4], ["inset(0 0 0 0%)", "inset(0 0 0 30%)"]);
        const centerOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);
        const centerScale = useTransform(scrollYProgress, [0.2, 0.45], [0.85, 1]);
        const imgParallax = useTransform(scrollYProgress, [0, 1], [-40, 40]);

        return (
          <div className="relative w-full h-full overflow-hidden bg-[#0a0a0a]" id="work">
            <motion.div
              className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
              style={{ x: leftX, clipPath: leftClip }}
            >
              <motion.img src={IMG.space} alt="" className="w-full h-full object-cover" style={{ y: imgParallax }} />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>

            <motion.div
              className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
              style={{ x: rightX, clipPath: rightClip }}
            >
              <motion.img src={IMG.dev} alt="" className="w-full h-full object-cover" style={{ y: imgParallax }} />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>

            <motion.div
              className="absolute inset-0 flex items-center justify-center z-20"
              style={{ opacity: centerOpacity, scale: centerScale }}
            >
              <div className="text-center max-w-3xl px-8">
                <p className="text-purple-400 text-sm tracking-[0.4em] uppercase font-bold mb-6">
                  Our Philosophy
                </p>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                  TECHNOLOGY
                  <br />
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(139,92,246,0.6)" }}>
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
        );
      }}
    </StickyScene>
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
    <section className="relative py-20 md:py-32 bg-[#050505] overflow-hidden">
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
            <div
              key={stat.label}
              className={`relative py-16 md:py-24 px-6 md:px-12 ${
                i % 2 === 0 ? "md:border-r" : ""
              } ${i < 2 ? "border-b" : ""} border-white/5`}
            >
              <div className="relative">
                <span className="text-[20vw] md:text-[12vw] font-black leading-none tracking-tighter bg-gradient-to-br from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                  <Counter target={stat.target} suffix={stat.suffix} />
                </span>
              </div>
              <div className="-mt-4 md:-mt-6 relative z-10">
                <p className="text-white text-xl md:text-2xl font-black tracking-tight">{stat.label}</p>
                <p className="text-white/20 text-sm mt-1">{stat.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 6. AI Video Interlude ─── */
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
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src={VID_MID} type="video/mp4" />
        </video>
      </motion.div>

      <motion.div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }} />

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

/* ─── 7. CTA ─── */
function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [360, 0]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  return (
    <section ref={containerRef} className="relative py-28 md:py-40 overflow-hidden bg-[#0a0a0a]" id="contact">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-[120px]"
        style={{
          rotate,
          scale: orbScale,
          background: "conic-gradient(from 0deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 blur-[80px]"
        style={{
          rotate: rotateReverse,
          background: "conic-gradient(from 180deg, #06b6d4, #ec4899, #8b5cf6, #06b6d4)",
        }}
      />

      <div className="relative z-10 text-center px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-white/20 text-sm tracking-[0.5em] uppercase mb-8">Ready to Start?</p>
          <h2 className="text-6xl md:text-8xl lg:text-[10vw] font-black text-white leading-[0.85] tracking-tighter mb-4">
            LET&apos;S
          </h2>
          <h2 className="text-6xl md:text-8xl lg:text-[10vw] font-black leading-[0.85] tracking-tighter mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
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
              href="/company"
              className="px-12 py-5 border border-white/10 text-white/40 font-bold tracking-wider uppercase rounded-full hover:border-white/30 hover:text-white/60 transition-all duration-300"
            >
              About Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <div className="bg-[#0a0a0a] text-white overflow-x-clip">
      <Nav />
      <Hero />
      <ScrollTextReveal />
      <HorizontalGallery />
      <SplitReveal />
      <LargeStats />
      <VideoInterlude />
      <CTASection />
      <PageFooter />
    </div>
  );
}
