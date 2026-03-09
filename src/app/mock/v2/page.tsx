"use client";

import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

/* ─── V2: Bento Grid — Linear/Vercel/Stripe inspired, light & clean ─── */

const UNSPLASH = {
  ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  game: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
  dev: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  abstract: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
};

const VIDEO_BG = "https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4";

/* ─── Utility Components ─── */

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

function RevealText({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ScrollReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Icons (inline SVG) ─── */

function IconAI() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

function IconGame() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 12h4M8 10v4M15 11h.01M18 13h.01" />
    </svg>
  );
}

function IconCode() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconTeam() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconRocket() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ─── Hero floating grid items ─── */

const floatingItems = [
  { x: "10%", y: "15%", size: 48, delay: 0, icon: "ai" },
  { x: "80%", y: "20%", size: 56, delay: 0.3, icon: "game" },
  { x: "20%", y: "70%", size: 44, delay: 0.6, icon: "code" },
  { x: "75%", y: "65%", size: 52, delay: 0.2, icon: "team" },
  { x: "45%", y: "80%", size: 40, delay: 0.5, icon: "rocket" },
  { x: "90%", y: "45%", size: 36, delay: 0.4, icon: "shield" },
  { x: "5%", y: "45%", size: 42, delay: 0.7, icon: "ai" },
  { x: "55%", y: "10%", size: 38, delay: 0.1, icon: "code" },
];

function FloatingIcon({ item }: { item: typeof floatingItems[0] }) {
  const iconMap: Record<string, React.ReactNode> = {
    ai: <IconAI />,
    game: <IconGame />,
    code: <IconCode />,
    team: <IconTeam />,
    rocket: <IconRocket />,
    shield: <IconShield />,
  };

  return (
    <motion.div
      className="absolute flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur-md border border-black/[0.06] text-indigo-500/60"
      style={{ left: item.x, top: item.y, width: item.size, height: item.size }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: item.delay + 0.5, ease: "easeOut" }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3 + item.delay * 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {iconMap[item.icon]}
      </motion.div>
    </motion.div>
  );
}

/* ─── Bento Grid Cards ─── */

const bentoCards = [
  {
    id: "ai",
    title: "AI Integration",
    description: "차세대 인공지능 기술을 활용한 솔루션으로, 비즈니스 프로세스를 혁신합니다. 자연어 처리부터 컴퓨터 비전까지.",
    icon: <IconAI />,
    image: UNSPLASH.ai,
    colSpan: 2,
    rowSpan: 2,
    accent: "from-indigo-500/10 to-violet-500/10",
  },
  {
    id: "game",
    title: "Game Development",
    description: "몰입감 높은 게임 경험을 설계하고 구현합니다.",
    icon: <IconGame />,
    image: UNSPLASH.game,
    colSpan: 1,
    rowSpan: 1,
    accent: "from-rose-500/10 to-orange-500/10",
  },
  {
    id: "dev",
    title: "Full-Stack Engineering",
    description: "확장 가능한 아키텍처와 클린 코드로 견고한 시스템을 구축합니다.",
    icon: <IconCode />,
    colSpan: 1,
    rowSpan: 1,
    accent: "from-emerald-500/10 to-teal-500/10",
  },
  {
    id: "video",
    title: "Creative Studio",
    description: "영상, 모션 그래픽, 인터랙티브 미디어로 브랜드 스토리를 전달합니다.",
    icon: <IconRocket />,
    video: VIDEO_BG,
    colSpan: 2,
    rowSpan: 1,
    accent: "from-amber-500/10 to-yellow-500/10",
  },
  {
    id: "security",
    title: "Security First",
    description: "보안을 최우선으로 한 설계 철학. 엔드투엔드 암호화와 제로 트러스트 아키텍처.",
    icon: <IconShield />,
    colSpan: 1,
    rowSpan: 1,
    accent: "from-sky-500/10 to-cyan-500/10",
  },
  {
    id: "team",
    title: "Our Team",
    description: "다양한 배경의 전문가들이 모여 혁신을 만들어갑니다.",
    icon: <IconTeam />,
    image: UNSPLASH.team,
    colSpan: 1,
    rowSpan: 1,
    accent: "from-purple-500/10 to-pink-500/10",
  },
];

function BentoCard({ card, index }: { card: typeof bentoCards[0]; index: number }) {
  return (
    <ScrollReveal
      delay={index * 0.08}
      className={`${card.colSpan === 2 ? "md:col-span-2" : "col-span-1"} ${card.rowSpan === 2 ? "md:row-span-2" : "row-span-1"}`}
    >
      <motion.div
        className={`group relative h-full min-h-[240px] ${card.rowSpan === 2 ? "md:min-h-[500px]" : ""} overflow-hidden rounded-3xl border border-black/[0.06] bg-white cursor-pointer`}
        whileHover={{ scale: 1.015, y: -4 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ boxShadow: "0 0 0 0 rgba(99, 102, 241, 0)" }}
        whileTap={{ scale: 0.99 }}
      >
        {/* Gradient bg */}
        <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Image or Video bg */}
        {card.image && (
          <div className="absolute inset-0">
            <img
              src={card.image}
              alt={card.title}
              className="h-full w-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/40" />
          </div>
        )}
        {card.video && (
          <div className="absolute inset-0">
            <video
              src={card.video}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover opacity-15 group-hover:opacity-25 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/30" />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors duration-300">
            {card.icon}
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">{card.title}</h3>
          <p className="text-sm leading-relaxed text-gray-500 group-hover:text-gray-600 transition-colors duration-300 max-w-md">
            {card.description}
          </p>
          <motion.div
            className="mt-4 flex items-center gap-1.5 text-sm font-medium text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          >
            자세히 보기 <IconArrow />
          </motion.div>
        </div>

        {/* Hover border glow */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-indigo-500/0 group-hover:border-indigo-500/20 transition-colors duration-300" />
        {/* Hover shadow */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-none group-hover:shadow-xl group-hover:shadow-indigo-500/[0.08] transition-shadow duration-300" />
      </motion.div>
    </ScrollReveal>
  );
}

/* ─── Feature Showcase (Tab-based) ─── */

const features = [
  {
    id: "platform",
    label: "플랫폼",
    title: "통합 개발 플랫폼",
    description: "설계, 개발, 배포까지 하나의 플랫폼에서 관리하세요. CI/CD 파이프라인, 실시간 모니터링, 자동화된 테스트 환경을 통해 개발 생산성을 극대화합니다.",
    image: UNSPLASH.dev,
  },
  {
    id: "ai-engine",
    label: "AI 엔진",
    title: "지능형 AI 엔진",
    description: "최신 트랜스포머 아키텍처 기반의 AI 엔진이 데이터를 분석하고, 패턴을 발견하며, 의사결정을 지원합니다. 커스텀 파인튜닝으로 도메인 특화 모델을 구축하세요.",
    image: UNSPLASH.ai,
  },
  {
    id: "collaboration",
    label: "협업",
    title: "실시간 협업 도구",
    description: "팀원들과 실시간으로 코드를 공유하고, 리뷰하고, 토론하세요. 비동기 커뮤니케이션과 동기 세션을 자유롭게 전환하며 최적의 워크플로우를 만드세요.",
    image: UNSPLASH.team,
  },
];

function FeatureShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <ScrollReveal>
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-600">Features</p>
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          더 나은 방법으로<br />더 빠르게 만듭니다
        </h2>
        <p className="mb-12 max-w-xl text-base text-gray-500">
          하듈이 제공하는 핵심 기능들을 살펴보세요.
        </p>
      </ScrollReveal>

      {/* Tabs */}
      <ScrollReveal delay={0.1}>
        <div className="mb-10 flex gap-1 rounded-2xl bg-gray-100 p-1.5 w-fit">
          {features.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActiveTab(i)}
              className={`relative rounded-xl px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
                activeTab === i ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {activeTab === i && (
                <motion.div
                  layoutId="activeFeatureTab"
                  className="absolute inset-0 rounded-xl bg-white shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{f.label}</span>
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Content */}
      <ScrollReveal delay={0.15}>
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <h3 className="mb-4 text-2xl font-bold text-gray-900">{features[activeTab].title}</h3>
              <p className="mb-6 leading-relaxed text-gray-500">{features[activeTab].description}</p>
              <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors duration-200">
                시작하기 <IconArrow />
              </button>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative overflow-hidden rounded-3xl border border-black/[0.06]"
            >
              <img
                src={features[activeTab].image}
                alt={features[activeTab].title}
                className="h-[300px] w-full object-cover md:h-[360px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ─── Stats ─── */

const stats = [
  { value: 150, suffix: "+", label: "완료 프로젝트" },
  { value: 99.9, suffix: "%", label: "가동률" },
  { value: 50, suffix: "M+", label: "처리 데이터" },
  { value: 24, suffix: "/7", label: "기술 지원" },
];

function StatsSection() {
  return (
    <section className="border-y border-black/[0.06] bg-gray-50/50">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px md:grid-cols-4">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.1}>
            <div className="flex flex-col items-center justify-center px-6 py-16 md:py-20 text-center">
              <div className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl tabular-nums">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */

const testimonials = [
  {
    quote: "하듈과 함께한 AI 프로젝트는 우리 비즈니스의 전환점이었습니다. 기대 이상의 결과를 만들어주었습니다.",
    name: "김지수",
    role: "CTO, TechVentures",
  },
  {
    quote: "기술력뿐만 아니라 커뮤니케이션과 프로젝트 관리 능력까지 탁월합니다. 진정한 파트너입니다.",
    name: "박현우",
    role: "CEO, GameStudio",
  },
  {
    quote: "개발 속도와 품질 모두 인상적이었습니다. 특히 AI 기반 자동화 솔루션이 큰 효과를 가져왔습니다.",
    name: "이서연",
    role: "VP Engineering, DataCorp",
  },
];

function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <ScrollReveal>
        <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-indigo-600">Testimonials</p>
        <h2 className="mb-16 text-center text-3xl font-bold text-gray-900 md:text-4xl">
          파트너들의 이야기
        </h2>
      </ScrollReveal>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 0.1}>
            <motion.div
              className="group flex h-full flex-col rounded-3xl border border-black/[0.06] bg-white p-8 transition-shadow duration-300 hover:shadow-lg hover:shadow-indigo-500/[0.06]"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
            >
              {/* Stars */}
              <div className="mb-5 flex gap-1 text-amber-400">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="mb-6 flex-1 leading-relaxed text-gray-600">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-sm text-gray-400">{t.role}</p>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Partner logos (placeholder text-based) ─── */

const partners = ["Google Cloud", "AWS", "NVIDIA", "Unity", "Vercel", "OpenAI", "Figma", "Slack"];

function PartnersStrip() {
  return (
    <section className="border-y border-black/[0.06] bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <ScrollReveal>
          <p className="mb-10 text-center text-sm text-gray-400">Trusted by industry leaders</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {partners.map((name, i) => (
              <motion.span
                key={name}
                className="text-lg font-semibold text-gray-300 transition-colors duration-200 hover:text-gray-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                {name}
              </motion.span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ─── CTA ─── */

function CTASection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-black/[0.06] bg-gradient-to-br from-indigo-600 to-violet-600 px-8 py-20 text-center md:px-20 md:py-28">
          {/* Decorative grid */}
          <div className="pointer-events-none absolute inset-0 opacity-10" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

          <h2 className="relative mb-4 text-3xl font-bold text-white md:text-5xl">
            함께 만들어갈 준비가 되셨나요?
          </h2>
          <p className="relative mx-auto mb-10 max-w-md text-base text-indigo-100/80">
            아이디어를 현실로 만들어드립니다. 지금 프로젝트를 시작하세요.
          </p>
          <div className="relative flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <button className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-900/20 hover:bg-indigo-50 transition-colors duration-200">
              프로젝트 문의 <IconArrow />
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors duration-200">
              포트폴리오 보기
            </button>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}

/* ─── Footer ─── */

function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
            <span className="text-xs font-bold text-white">H</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">하듈</span>
        </div>
        <div className="flex gap-8 text-sm text-gray-400">
          <span className="cursor-pointer hover:text-gray-600 transition-colors">서비스</span>
          <span className="cursor-pointer hover:text-gray-600 transition-colors">포트폴리오</span>
          <span className="cursor-pointer hover:text-gray-600 transition-colors">팀</span>
          <span className="cursor-pointer hover:text-gray-600 transition-colors">연락처</span>
        </div>
        <p className="text-xs text-gray-300">&copy; 2026 Hadeul. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ─── Main Page ─── */

export default function V2() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.96]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 antialiased selection:bg-indigo-200 selection:text-indigo-900">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-black/[0.04] bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/mock" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            목록으로
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600">
              <span className="text-xs font-bold text-white">H</span>
            </div>
            <span className="text-sm font-semibold">하듈</span>
          </div>
          <button className="rounded-lg bg-gray-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-gray-800 transition-colors">
            문의하기
          </button>
        </div>
      </nav>

      {/* Hero */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative flex min-h-[100vh] items-center justify-center overflow-hidden pt-14"
      >
        {/* Gradient mesh background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-indigo-200/30 blur-[120px]" />
          <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-violet-200/30 blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/20 blur-[80px]" />
        </div>

        {/* Floating grid icons */}
        <div className="pointer-events-none absolute inset-0">
          {floatingItems.map((item, i) => (
            <FloatingIcon key={i} item={item} />
          ))}
        </div>

        {/* Subtle grid lines */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        {/* Hero content */}
        <div className="relative z-10 px-6 text-center">
          <RevealText delay={0.1}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 px-4 py-1.5 text-xs font-medium text-gray-500 backdrop-blur-sm">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              AI &middot; Game &middot; Platform
            </div>
          </RevealText>

          <RevealText delay={0.25}>
            <h1 className="mx-auto max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight text-gray-900 md:text-7xl">
              Build the future,{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                together
              </span>
            </h1>
          </RevealText>

          <RevealText delay={0.4}>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-gray-500 md:text-lg">
              하듈은 AI, 게임, 풀스택 개발을 아우르는 기술 파트너입니다.
              <br className="hidden md:block" />
              아이디어를 현실로 만드는 가장 빠른 방법.
            </p>
          </RevealText>

          <RevealText delay={0.55}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <button className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-gray-900/10 hover:bg-gray-800 transition-colors duration-200">
                프로젝트 시작하기 <IconArrow />
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                더 알아보기
              </button>
            </div>
          </RevealText>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-black/10 p-1">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-gray-400"
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Bento Grid */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <ScrollReveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-600">What we do</p>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">역량과 전문성</h2>
          <p className="mb-14 max-w-lg text-base text-gray-500">
            다양한 분야의 전문성을 하나로 통합하여, 최상의 결과를 만들어냅니다.
          </p>
        </ScrollReveal>

        <div className="grid auto-rows-auto grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {bentoCards.map((card, i) => (
            <BentoCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </section>

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* Stats */}
      <StatsSection />

      {/* Partners */}
      <PartnersStrip />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Abstract image divider */}
      <section className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="overflow-hidden rounded-3xl border border-black/[0.06]">
            <img
              src={UNSPLASH.abstract}
              alt="Abstract"
              className="h-[200px] w-full object-cover md:h-[300px]"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
