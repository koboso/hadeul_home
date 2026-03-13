"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";
import { ServicesHeroBg, VideoHeroBg } from "@/components/HeroBackgrounds";

/* 📹 Envato 영상 다운로드 후 경로 설정 (빈 문자열이면 CSS 애니메이션만) */
const SERVICES_HERO_VIDEO = "/videos/services-hero.mp4";

interface FeaturedProject {
  name: string;
  type: string;
  video: string;
  portfolioId: string;
  stats: { num: string; label: string }[];
  features: string[];
}

const FEATURED_AI: FeaturedProject = {
  name: "AI Aigents",
  type: "이화학 특수 도메인 E커머스 AI 에이전트",
  video: "/videos/kolabshop-aigents.webm",
  portfolioId: "81d01d6c-dba4-4921-bab9-576fd323d9b1",
  stats: [
    { num: "300K+", label: "상품 데이터" },
    { num: "83.2%", label: "QA 정확도" },
  ],
  features: ["하이브리드 검색 엔진", "도메인 특화 역질문", "멀티턴 맥락 유지", "멀티 LLM 아키텍처"],
};

const FEATURED_SW: FeaturedProject = {
  name: "Mission 코드이썬",
  type: "게이미피케이션 코딩 교육 플랫폼",
  video: "/videos/mission-codeison.webm",
  portfolioId: "27a117dd-ad77-4d1b-8da5-979e5b118a1e",
  stats: [
    { num: "80+", label: "미션 콘텐츠" },
    { num: "AI 초·중·고 교육", label: "교육 과정" },
  ],
  features: ["초·중·고 맞춤 커리큘럼", "학생 학습 분석", "게이미피케이션", "EduTech 교육 프로그램"],
};

const GAME_PROJECTS = [
  {
    name: "총검소녀 키우기",
    genre: "방치형 RPG",
    video: "/videos/gunblade.webm",
    platforms: [
      { name: "Android", icon: "android", url: "https://play.google.com/store/apps/details?id=com.hadeul.gunblader" },
    ],
  },
  {
    name: "머지머지 디펜스",
    genre: "디펜스",
    video: "/videos/roof.webm",
    platforms: [
      { name: "Android", icon: "android", url: "#" },
    ],
  },
];

const SERVICES = [
  {
    num: "01",
    title: "AI Solutions",
    subtitle: "인공지능 솔루션",
    desc: "LLM, 컴퓨터 비전, 생성형 AI 등 최첨단 인공지능 기술로\n기업 맞춤형 솔루션을 설계하고 구축합니다.",
    tags: ["LLM", "RAG", "Vision", "NLP", "Fine-tuning", "MLOps"],
    href: "#",
    accent: "from-purple-500 to-indigo-500",
    accentText: "text-purple-400",
    bgGlow: "bg-purple-500/[0.06]",
    featuredProject: FEATURED_AI,
  },
  {
    num: "02",
    title: "Software Solutions",
    subtitle: "소프트웨어 솔루션",
    desc: "엔터프라이즈급 웹·앱, 클라우드 인프라,\n데이터 파이프라인을 설계하고 구축합니다.",
    tags: ["React", "Next.js", "Flutter", "Node.js", "Cloud", "DevOps"],
    href: "/services/software",
    accent: "from-cyan-500 to-emerald-500",
    accentText: "text-cyan-400",
    bgGlow: "bg-cyan-500/[0.06]",
    featuredProject: FEATURED_SW,
  },
  {
    num: "03",
    title: "Contents",
    subtitle: "자체 컨텐츠",
    desc: "몰입감 넘치는 게임 경험을 설계하고,\n크로스 플랫폼 개발부터 라이브 서비스 운영까지.",
    tags: ["Unity", "Unreal", "Cocos", "Godot", "Live Ops"],
    href: "/services/game",
    accent: "from-pink-500 to-amber-500",
    accentText: "text-pink-400",
    bgGlow: "bg-pink-500/[0.06]",
    hasGameProjects: true,
    hideCTA: true,
  },
];

function FeaturedProjectCard({ project, accent, accentText }: { project: FeaturedProject; accent: string; accentText: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <div className="group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06]">
        {/* Video area */}
        <div className="relative aspect-[2/1] bg-black/30">
          <video
            src={project.video}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Info */}
        <div className="p-6">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/20 font-bold">
            Featured Project
          </span>
          <h3 className="text-xl font-black tracking-tight mt-1.5 mb-1">
            {project.name}
          </h3>
          <p className="text-white/35 text-sm mb-3">{project.type}</p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.features.map((f: string) => (
              <span key={f} className="px-2 py-0.5 text-[10px] text-white/30 border border-white/[0.06] rounded-full">{f}</span>
            ))}
          </div>

          <div className="flex gap-6 mb-4">
            {project.stats.map((s: { num: string; label: string }) => (
              <div key={s.label}>
                <p className={`text-lg font-black bg-gradient-to-r ${accent} bg-clip-text text-transparent`}>{s.num}</p>
                <p className="text-white/25 text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>

          <Link
            href="/portfolio"
            className={`inline-flex items-center gap-2 text-xs font-bold ${accentText} opacity-60 hover:opacity-100 transition-opacity`}
          >
            더보기 →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function PlatformIcon({ type }: { type: string }) {
  if (type === "android") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.523 2.236l1.636-1.636a.5.5 0 00-.707-.707L16.7 1.645A7.453 7.453 0 0012 .5a7.453 7.453 0 00-4.7 1.145L5.548-.107a.5.5 0 00-.707.707L6.477 2.236A7.5 7.5 0 004.5 7.5V8h15v-.5a7.5 7.5 0 00-1.977-5.264zM9 5.5a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0zM3 9h1v8a1 1 0 001 1h1v3.5a1.5 1.5 0 003 0V18h6v3.5a1.5 1.5 0 003 0V18h1a1 1 0 001-1V9h1a1.5 1.5 0 010 3H20v-1h-1v6H5V9H4v1H3a1.5 1.5 0 010-3h.5H3zm-2 1.5a1.5 1.5 0 013 0v5a1.5 1.5 0 01-3 0v-5zm22 0a1.5 1.5 0 00-3 0v5a1.5 1.5 0 003 0v-5z" />
      </svg>
    );
  }
  if (type === "ios") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    );
  }
  // onestore
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
  );
}

function GameProjectSlider() {
  const [current, setCurrent] = useState(0);
  const game = GAME_PROJECTS[current];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
    >
      <div className="group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06]">
        {/* Video area */}
        <div className="relative aspect-[16/9] bg-black/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {game.video ? (
                <video
                  src={game.video}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <p className="text-white/20 text-sm font-bold tracking-wide">영상 준비 중</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Info */}
        <div className="p-6 h-[220px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="flex-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/20 font-bold">
                  Game {String(current + 1).padStart(2, "0")}
                </span>
                {/* Navigation arrows */}
                {GAME_PROJECTS.length > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrent((p) => (p - 1 + GAME_PROJECTS.length) % GAME_PROJECTS.length)}
                      className="w-7 h-7 rounded-full border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white hover:border-pink-500/30 transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setCurrent((p) => (p + 1) % GAME_PROJECTS.length)}
                      className="w-7 h-7 rounded-full border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white hover:border-pink-500/30 transition-all"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-black tracking-tight mb-1">
                {game.name}
              </h3>
              <p className="text-white/35 text-sm mb-4">장르 : {game.genre}</p>

              {/* Platform links */}
              <div className="flex gap-3">
                {game.platforms.map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-pink-500/30 transition-all group/btn ${p.url === "#" ? "pointer-events-none opacity-40" : ""}`}
                  >
                    <span className="text-white/50 group-hover/btn:text-pink-400 transition-colors">
                      <PlatformIcon type={p.icon} />
                    </span>
                    <span className="text-xs text-white/40 group-hover/btn:text-white/60 transition-colors font-medium">{p.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          {GAME_PROJECTS.length > 1 && (
            <div className="flex gap-1.5 mt-auto pt-3">
              {GAME_PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-6 bg-pink-400" : "w-1.5 bg-white/20"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const PROCESS_STEPS = [
  { num: "01", title: "기획", desc: "요구 분석", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { num: "02", title: "설계", desc: "아키텍처", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
  { num: "03", title: "개발", desc: "구현·코드", icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" },
  { num: "04", title: "QA", desc: "테스트", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { num: "05", title: "배포", desc: "런칭", icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" },
  { num: "06", title: "운영", desc: "유지보수", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
];

function ServiceSection({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center py-20 px-6 snap-start overflow-hidden"
    >
      {/* Background glow */}
      <motion.div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] ${service.bgGlow} rounded-full blur-[250px]`}
        style={{ opacity }}
      />

      <motion.div
        className="max-w-7xl mx-auto w-full relative z-10"
        style={{ y, opacity }}
      >
        <div className={`grid gap-12 items-center ${("featuredProject" in service && service.featuredProject) || ("hasGameProjects" in service && service.hasGameProjects) ? "md:grid-cols-[1fr_1.3fr] lg:gap-14" : "md:grid-cols-2 lg:gap-20"} ${index % 2 === 1 ? "" : ""}`}>
          {/* Left: Info */}
          <div className={index % 2 === 1 ? "md:order-2" : ""}>
            <motion.span
              className={`inline-block text-sm font-mono tracking-wider mb-4 bg-gradient-to-r ${service.accent} bg-clip-text text-transparent`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {service.num}
            </motion.span>

            <motion.h2
              className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-3"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {service.title}
            </motion.h2>

            <motion.p
              className="text-white/30 text-lg mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {service.subtitle}
            </motion.p>

            <motion.p
              className="text-white/45 text-lg leading-relaxed mb-8 whitespace-pre-line"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {service.desc}
            </motion.p>

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-medium text-white/40 border border-white/[0.08] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            {"hideCTA" in service && service.hideCTA ? null : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {"comingSoon" in service && service.comingSoon ? (
                  <span className="inline-block px-8 py-3 rounded-full text-white/20 border border-white/[0.06] text-sm font-bold tracking-wide cursor-default">
                    Coming Soon
                  </span>
                ) : (
                  <a
                    href="/inquiry"
                    className="group/cta relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-base btn-glow overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-[length:200%_200%]"
                      style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)" }}
                      animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span className="relative">프로젝트 문의</span>
                    <motion.span
                      className="relative inline-block"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </a>
                )}
              </motion.div>
            )}
          </div>

          {/* Right: Project Preview Cards */}
          <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
            {"featuredProject" in service && service.featuredProject ? (
              <FeaturedProjectCard project={service.featuredProject} accent={service.accent} accentText={service.accentText} />
            ) : "hasGameProjects" in service && service.hasGameProjects ? (
              <GameProjectSlider />
            ) : (
              /* Placeholder for coming soon */
              <motion.div
                className="relative h-[400px] rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.04] flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-center">
                  <motion.div
                    className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${service.accent} p-[1px] mb-6`}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 8, repeat: Infinity }}
                  >
                    <div className="w-full h-full rounded-2xl bg-[#0a0a0a] flex items-center justify-center">
                      <span className="text-3xl font-black text-white/10">{service.num}</span>
                    </div>
                  </motion.div>
                  <p className="text-white/15 text-sm font-bold tracking-wide">준비 중입니다</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function ProcessStep({ step, index, total }: { step: typeof PROCESS_STEPS[0]; index: number; total: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative text-center group"
    >
      {index < total - 1 && (
        <motion.div
          className="hidden lg:block absolute top-8 -right-3 z-10"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
        >
          <span className="text-white/10 text-lg">&rarr;</span>
        </motion.div>
      )}

      <motion.div
        className="relative mx-auto mb-4 w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-purple-500/30 transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <svg className="w-6 h-6 text-white/40 group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
        </svg>
        <motion.div
          className="absolute inset-0 rounded-full border border-purple-500/0 group-hover:border-purple-500/20"
          animate={{ scale: [1, 1.3, 1], opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
        />
      </motion.div>

      <span className="text-[10px] font-mono text-purple-400/50 tracking-wider">{step.num}</span>
      <h4 className="text-sm font-black mt-1 group-hover:text-purple-300 transition-colors">{step.title}</h4>
      <p className="text-white/20 text-xs mt-1">{step.desc}</p>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen snap-y snap-mandatory">
      <Nav />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center snap-start overflow-hidden">
        {SERVICES_HERO_VIDEO ? (
          <VideoHeroBg src={SERVICES_HERO_VIDEO} overlay={0.65} />
        ) : null}
        <ServicesHeroBg />
        <div className="relative z-10 text-center px-6">
          <motion.p
            className="text-cyan-400 text-sm tracking-[0.4em] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Services
          </motion.p>
          <motion.h1
            className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            WHAT WE
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              BUILD
            </span>
          </motion.h1>
          <motion.p
            className="text-white/40 text-lg max-w-lg mx-auto mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            기술을 넘어 가치 있는 경험으로
            함께 성장하는 내일을 만듭니다.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-white/15 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* Service Sections (AI, Software) */}
      {SERVICES.filter((s) => !("hasGameProjects" in s && s.hasGameProjects)).map((service, i) => (
        <ServiceSection key={service.num} service={service} index={i} />
      ))}

      {/* Development Process */}
      <section className="py-32 px-6 bg-[#050505] overflow-hidden snap-start">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4 text-center">How We Work</p>
            <h2 className="text-4xl md:text-6xl font-black text-center mb-20 tracking-tighter">
              개발{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                프로세스
              </span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent -translate-y-1/2" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
              {PROCESS_STEPS.map((step, i) => (
                <ProcessStep key={step.title} step={step} index={i} total={PROCESS_STEPS.length} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contents Section (Game) */}
      {SERVICES.filter((s) => "hasGameProjects" in s && s.hasGameProjects).map((service, i) => (
        <ServiceSection key={service.num} service={service} index={i} />
      ))}

      {/* CTA */}
      <section className="py-32 px-6 snap-start">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            프로젝트를 함께
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              시작해볼까요?
            </span>
          </h2>
          <p className="text-white/40 text-lg mb-10">
            프로젝트 문의는 언제든 환영합니다.
          </p>
          <a
            href="/inquiry"
            className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-full text-white font-bold text-lg btn-glow overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-[length:200%_200%]"
              style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)" }}
              animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="relative">문의하기</span>
          </a>
        </motion.div>
      </section>

      <PageFooter />
    </div>
  );
}
