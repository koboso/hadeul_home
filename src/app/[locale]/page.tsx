"use client";

import { motion, useScroll, useTransform, useInView, animate, useMotionValue } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";
import { useLocale } from "@/i18n/LocaleContext";

/* ─── HADEUL Corporate Site ─── */

const VID_HERO = "/videos/home-hero.mp4";
const VID_ABOUT = "/videos/home-about.mp4";

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
    { text: "IMAGINE", from: { x: -200, y: 0, rotate: -8 } },
    { text: "BEYOND", from: { x: 200, y: 0, rotate: 5 } },
    { text: "REALITY", from: { x: 0, y: 150, rotate: -3 } },
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
            Intelligent &middot; Solutions
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
    "Transforming", "bold", "ideas", "into", "intelligent", "solutions.",
    "Beyond", "simple", "development—we", "solve", "complex",
    "corporate", "challenges", "and", "architect", "the", "future",
    "of", "gaming", "through", "cutting-edge", "AI.",
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
            {/* Video background */}
            <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src={VID_ABOUT} />
            <div className="absolute inset-0 bg-black/60" />
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
                    isHighlight={["intelligent", "solutions.", "AI.", "gaming"].includes(word)}
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

/* ─── 3. Portfolio (DB featured items) ─── */
interface PortfolioProject {
  id: string;
  client: string;
  title: string;
  description: string;
  image: string;
  category_name: string;
  category_slug: string;
}

function Portfolio() {
  const { locale, t } = useLocale();
  const [projects, setProjects] = useState<PortfolioProject[]>([]);

  useEffect(() => {
    fetch("/api/portfolio")
      .then((r) => r.json())
      .then((d) => {
        const all: PortfolioProject[] = d.data || [];
        setProjects(all.filter((p) => p.category_slug !== "game"));
      });
  }, []);

  if (projects.length === 0) return null;

  return (
    <section className="relative py-24 md:py-32 bg-[#0a0a0a]" id="portfolio">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4">Portfolio</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.95]">
              {t.home.featuredProjects}
            </h2>
          </div>
          <Link
            href={`/${locale}/portfolio`}
            className="hidden md:flex items-center gap-2 group"
          >
            <span className="text-white/30 text-sm group-hover:text-purple-400 transition-colors">{t.home.viewAll}</span>
            <motion.span
              className="text-white/30 group-hover:text-purple-400 transition-colors"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              &rarr;
            </motion.span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 6).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/${locale}/portfolio/${project.id}`}
                className="group block rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden bg-white/[0.02]">
                  {(() => {
                    const thumb = (project.image ? project.image.split(",")[0].trim() : "") || "/images/default-portfolio.svg";
                    return thumb.endsWith(".webm") ? (
                      <video src={thumb} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" autoPlay loop muted playsInline />
                    ) : (
                      <img
                        src={thumb}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => { (e.target as HTMLImageElement).src = "/images/default-portfolio.svg"; }}
                      />
                    );
                  })()}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  <span className="absolute top-4 right-4 text-white/10 text-5xl font-black leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-6 h-[160px] flex flex-col">
                  <span className="text-[10px] px-2 py-0.5 bg-purple-500/10 text-purple-400/80 rounded-full font-bold tracking-wide self-start">
                    {project.category_name}
                  </span>
                  <p className="text-white/50 text-xs font-bold tracking-wide mt-3 mb-1 truncate">
                    {project.client}
                  </p>
                  <h3 className="text-lg font-black text-white tracking-tight mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-white/30 text-sm leading-relaxed line-clamp-1 mt-auto">
                    {project.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href={`/${locale}/portfolio`}
            className="inline-flex items-center gap-2 text-white/30 text-sm hover:text-purple-400 transition-colors"
          >
            {t.home.viewAll} <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── 4. Split-Reveal Section ─── */
function SplitReveal() {
  const { locale, t } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section ref={ref} className="relative h-screen overflow-hidden bg-[#0a0a0a]" id="work">
      {/* Left image */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full overflow-hidden"
        initial={{ x: 0, clipPath: "inset(0 0% 0 0)" }}
        animate={isInView ? { x: -120, clipPath: "inset(0 30% 0 0)" } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src="/images/home-3-01.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Right image */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full overflow-hidden"
        initial={{ x: 0, clipPath: "inset(0 0 0 0%)" }}
        animate={isInView ? { x: 120, clipPath: "inset(0 0 0 30%)" } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src="/images/home-3-02.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Center text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-20"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-center max-w-3xl px-8">
          <motion.p
            className="text-purple-400 text-sm tracking-[0.4em] uppercase font-bold mb-6"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Our Philosophy
          </motion.p>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
            TECHNOLOGY
            <br />
            <motion.span
              className="inline-block text-transparent"
              style={{ WebkitTextStroke: "2px rgba(139,92,246,0.6)" }}
              animate={{ letterSpacing: ["-0.05em", "0.05em", "-0.05em"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              MEETS
            </motion.span>
            <br />
            ARTISTRY
          </h2>
          <motion.p
            className="text-white/30 text-lg max-w-lg mx-auto"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            {t.home.philosophy.split('\n').map((line: string, i: number) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── 5. Large Typography Stats ─── */
function LargeStats() {
  const { locale, t } = useLocale();
  const stats = [
    { target: 200, suffix: "+", label: t.home.statsProjects },
    { target: 50, suffix: "+", label: t.home.statsPartners },
    { target: 15, suffix: "yr", label: t.home.statsYears },
    { target: 8, suffix: "+", label: t.home.statsDomains },
  ];

  return (
    <section className="relative py-20 md:py-32 bg-[#050505] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <motion.span
          className="text-[40vw] font-black text-transparent leading-none"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.02)" }}
          animate={{ scale: [1, 1.03, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          DATA
        </motion.span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`relative py-14 md:py-20 px-4 md:px-8 text-center ${
                i < stats.length - 1 ? "border-r" : ""
              } border-white/5`}
            >
              <div className="relative h-[1em] flex items-baseline justify-center" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
                <span className="font-black leading-none tracking-tighter bg-gradient-to-br from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                  <Counter target={stat.target} suffix={stat.suffix} />
                </span>
              </div>
              <div className="mt-4 relative z-10">
                <p className="text-white text-sm md:text-lg font-black tracking-tight">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5.5. Partner Logo Marquee ─── */
const PARTNERS: { nameKey: string | null; fallback: string; logo: string }[] = [
  { nameKey: "samsung", fallback: "삼성중공업", logo: "/images/partners/samsung-heavy.svg" },
  { nameKey: null, fallback: "ETRI", logo: "/images/partners/etri.svg" },
  { nameKey: null, fallback: "KRISO", logo: "/images/partners/kriso.svg" },
  { nameKey: "chungnam", fallback: "충남대학교", logo: "/images/partners/cnu.svg" },
  { nameKey: null, fallback: "KAIST", logo: "/images/partners/kaist.svg" },
  { nameKey: null, fallback: "이앤애드", logo: "/images/partners/enad.svg" },
  { nameKey: "sme", fallback: "중소기업벤처기업부", logo: "/images/partners/msv.svg" },
  { nameKey: "daejeon", fallback: "대전광역시", logo: "/images/partners/daejeon.svg" },
  { nameKey: "kari", fallback: "항공우주연구원", logo: "/images/partners/kari.svg" },
  { nameKey: "dicia", fallback: "대전정보문화산업진흥원", logo: "/images/partners/dicia.svg" },
  { nameKey: null, fallback: "KCCA", logo: "/images/partners/kcca.svg" },
  { nameKey: "korail", fallback: "코레일네트웍스", logo: "/images/partners/korail.svg" },
  { nameKey: "nias", fallback: "국립축산연구원", logo: "/images/partners/nias.svg" },
  { nameKey: "kscience", fallback: "코리아사이언스", logo: "/images/partners/korea-science.svg" },
  { nameKey: "hyo", fallback: "효문화진흥원", logo: "/images/partners/hyomun.svg" },
  { nameKey: "tmd", fallback: "(주)티엠디 교육그룹", logo: "/images/partners/tmd.svg" },
  { nameKey: "tax", fallback: "세무그룹명성", logo: "/images/partners/tax-ms.svg" },
  { nameKey: "jiran", fallback: "지란지교", logo: "/images/partners/jiranjigy.svg" },
  { nameKey: "geum", fallback: "금단비가", logo: "/images/partners/gdb.svg" },
  { nameKey: null, fallback: "TDEA", logo: "/images/partners/tdea.svg" },
  { nameKey: "surface", fallback: "표면분석학회", logo: "/images/partners/kssa.svg" },
  { nameKey: "mtech", fallback: "엠텍", logo: "/images/partners/mtech.svg" },
  { nameKey: null, fallback: "FIBER PRO", logo: "/images/partners/fiberpro.svg" },
  { nameKey: "geunok", fallback: "주식회사근옥", logo: "/images/partners/geunok.svg" },
];

function PartnerLogo({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center w-[180px] h-[70px] mx-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300">
      <img src={logo} alt={name} className="w-[140px] h-[50px] object-contain" draggable={false} />
    </div>
  );
}

function PartnerMarquee() {
  const { locale, t } = useLocale();
  const getPartnerName = (p: typeof PARTNERS[number]) =>
    p.nameKey ? (t.home.partners as Record<string, string>)[p.nameKey] ?? p.fallback : p.fallback;
  return (
    <section className="relative py-16 bg-[#050505] overflow-hidden border-t border-white/[0.03]">
      <div className="text-center mb-10">
        <p className="text-white/15 text-xs tracking-[0.4em] uppercase font-bold">
          Trusted Partners
        </p>
      </div>

      {/* Row 1 — left scroll */}
      <div className="relative mb-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...PARTNERS.slice(0, 12), ...PARTNERS.slice(0, 12)].map((p, i) => (
            <PartnerLogo key={`a-${i}`} name={getPartnerName(p)} logo={p.logo} />
          ))}
        </motion.div>
      </div>

      {/* Row 2 — right scroll */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[...PARTNERS.slice(12), ...PARTNERS.slice(12)].map((p, i) => (
            <PartnerLogo key={`b-${i}`} name={getPartnerName(p)} logo={p.logo} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 6. CTA ─── */
function CTASection() {
  const { locale, t } = useLocale();
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
            BUILD YOUR
          </h2>
          <h2 className="text-6xl md:text-8xl lg:text-[10vw] font-black leading-[0.85] tracking-tighter mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            VISION
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${locale}/inquiry`}
              className="group relative px-12 py-5 overflow-hidden rounded-full btn-glow"
            >
              <motion.div
                className="absolute inset-0 bg-[length:200%_200%]"
                style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)" }}
                animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative text-white font-bold text-lg tracking-wider uppercase">
                {t.home.projectInquiry}
              </span>
            </Link>
            <Link
              href={`/${locale}/company`}
              className="group relative px-12 py-5 overflow-hidden rounded-full border border-white/10 btn-glow-outline"
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[length:200%_200%] transition-opacity duration-300"
                style={{ backgroundImage: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15), rgba(6,182,212,0.15), rgba(139,92,246,0.15))" }}
                animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="relative text-white/40 font-bold tracking-wider uppercase group-hover:text-white/70 transition-colors">
                About Us
              </span>
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
      <Portfolio />
      <SplitReveal />
      <LargeStats />
      <PartnerMarquee />
      <CTASection />
      <PageFooter />
    </div>
  );
}
