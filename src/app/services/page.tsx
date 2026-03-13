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
        <div className="relative aspect-[16/9] bg-black/40 p-3">
          <video
            src={project.video}
            className="w-full h-full object-contain rounded-lg"
            autoPlay
            loop
            muted
            playsInline
          />
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
  {
    num: "01",
    title: "기획",
    subtitle: "Discovery & Planning",
    desc: "요구 분석",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    color: "purple",
    details: [
      "비즈니스 목표 및 KPI 정의",
      "사용자 리서치 & 페르소나 분석",
      "기술 타당성 검토 (PoC)",
      "프로젝트 로드맵 & 마일스톤 수립",
    ],
    deliverables: ["요구사항 명세서", "프로젝트 계획서", "PoC 리포트"],
    duration: "2–4 weeks",
  },
  {
    num: "02",
    title: "설계",
    subtitle: "Architecture & Design",
    desc: "아키텍처",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
    color: "indigo",
    details: [
      "시스템 아키텍처 설계",
      "UI/UX 와이어프레임 & 프로토타입",
      "데이터베이스 & API 스키마 설계",
      "기술 스택 선정 & 인프라 구성",
    ],
    deliverables: ["아키텍처 문서", "UI/UX 프로토타입", "ERD & API 명세"],
    duration: "2–3 weeks",
  },
  {
    num: "03",
    title: "개발",
    subtitle: "Development & Build",
    desc: "구현·코드",
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    color: "cyan",
    details: [
      "애자일 스프린트 기반 개발",
      "CI/CD 파이프라인 구축",
      "코드 리뷰 & 페어 프로그래밍",
      "주간 데모 & 진행 리포트",
    ],
    deliverables: ["소스 코드", "기술 문서", "주간 데모"],
    duration: "8–16 weeks",
  },
  {
    num: "04",
    title: "QA",
    subtitle: "Quality Assurance",
    desc: "테스트",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "emerald",
    details: [
      "단위·통합·E2E 테스트 자동화",
      "성능·부하 테스트 (Load Testing)",
      "보안 취약점 스캐닝",
      "사용자 수용 테스트 (UAT)",
    ],
    deliverables: ["테스트 리포트", "성능 벤치마크", "보안 감사 결과"],
    duration: "2–4 weeks",
  },
  {
    num: "05",
    title: "배포",
    subtitle: "Launch & Deploy",
    desc: "런칭",
    icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12",
    color: "pink",
    details: [
      "스테이징 환경 최종 검증",
      "무중단 배포 (Blue-Green / Canary)",
      "모니터링 & 알럿 시스템 구축",
      "런칭 체크리스트 최종 확인",
    ],
    deliverables: ["배포 가이드", "인프라 구성도", "런칭 리포트"],
    duration: "1–2 weeks",
  },
  {
    num: "06",
    title: "운영",
    subtitle: "Operations & Growth",
    desc: "유지보수",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    color: "amber",
    details: [
      "24/7 시스템 모니터링",
      "정기 업데이트 & 기능 개선",
      "데이터 분석 & 성과 리포팅",
      "스케일링 & 인프라 최적화",
    ],
    deliverables: ["월간 리포트", "SLA 대시보드", "개선 로드맵"],
    duration: "Ongoing",
  },
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

const STEP_COLORS: Record<string, { bg: string; border: string; text: string; glow: string; gradient: string }> = {
  purple:  { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", glow: "shadow-purple-500/20", gradient: "from-purple-500 to-indigo-500" },
  indigo:  { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-400", glow: "shadow-indigo-500/20", gradient: "from-indigo-500 to-blue-500" },
  cyan:    { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", glow: "shadow-cyan-500/20", gradient: "from-cyan-500 to-teal-500" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", glow: "shadow-emerald-500/20", gradient: "from-emerald-500 to-green-500" },
  pink:    { bg: "bg-pink-500/10", border: "border-pink-500/30", text: "text-pink-400", glow: "shadow-pink-500/20", gradient: "from-pink-500 to-rose-500" },
  amber:   { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", glow: "shadow-amber-500/20", gradient: "from-amber-500 to-orange-500" },
};

function InteractiveProcess() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4 text-center">How We Work</p>
        <h2 className="text-4xl md:text-6xl font-black text-center mb-6 tracking-tighter">
          개발{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
            프로세스
          </span>
        </h2>
        <p className="text-white/25 text-center text-sm mb-16 max-w-md mx-auto">
          각 단계를 클릭하여 상세 내용을 확인하세요
        </p>
      </motion.div>

      {/* Step nodes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-3 relative z-10">
        {PROCESS_STEPS.map((step, i) => {
          const c = STEP_COLORS[step.color];
          const isActive = activeStep === i;

          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Arrow connector (desktop only, between cards) */}
              {i < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:flex absolute top-[52px] -right-[10px] z-20 items-center">
                  <motion.div
                    animate={{ x: [0, 3, 0], opacity: [0.25, 0.6, 0.25] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" className="text-white/30">
                      <path d="M1 1 L6 4 L1 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </div>
              )}

              <motion.button
                onClick={() => setActiveStep(isActive ? null : i)}
                className={`w-full text-center cursor-pointer group transition-all duration-300 rounded-2xl p-4 pb-5 relative overflow-hidden ${
                  isActive
                    ? `${c.bg} border ${c.border} shadow-lg ${c.glow}`
                    : "bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]"
                }`}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Active background shimmer */}
                {isActive && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${c.gradient} opacity-[0.05]`}
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    style={{ backgroundSize: "200% 200%" }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                {/* Icon */}
                <div className="relative mx-auto mb-3">
                  <motion.div
                    className={`relative w-[72px] h-[72px] mx-auto rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-br ${c.gradient} shadow-lg ${c.glow}`
                        : "bg-white/[0.04] border border-white/[0.08] group-hover:border-white/[0.15]"
                    }`}
                    animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg
                      className={`w-7 h-7 transition-colors duration-300 ${isActive ? "text-white" : "text-white/30 group-hover:text-white/50"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                    </svg>
                  </motion.div>

                  {/* Pulse rings when active */}
                  {isActive && (
                    <>
                      <motion.div
                        className={`absolute inset-0 mx-auto w-[72px] rounded-2xl border ${c.border}`}
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <motion.div
                        className={`absolute inset-0 mx-auto w-[72px] rounded-2xl border ${c.border}`}
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      />
                    </>
                  )}
                </div>

                {/* Step number & title */}
                <span className={`text-[10px] font-mono tracking-wider transition-colors ${isActive ? c.text : "text-white/20"}`}>
                  {step.num}
                </span>
                <h4 className={`text-base font-black mt-0.5 transition-colors ${isActive ? "text-white" : "text-white/70 group-hover:text-white/90"}`}>
                  {step.title}
                </h4>
                <p className={`text-[11px] mt-0.5 transition-colors ${isActive ? c.text : "text-white/20"}`}>
                  {step.subtitle}
                </p>

                {/* Active indicator arrow */}
                {isActive && (
                  <motion.div
                    className="flex justify-center mt-2"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <svg width="12" height="8" viewBox="0 0 12 8" className={STEP_COLORS[step.color].text}>
                        <path d="M1 1 L6 6 L11 1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  </motion.div>
                )}
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Expanded detail panel */}
      <AnimatePresence mode="wait">
        {activeStep !== null && (
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top" }}
          >
            {(() => {
              const step = PROCESS_STEPS[activeStep];
              const c = STEP_COLORS[step.color];
              return (
                <div className={`mt-6 rounded-3xl border ${c.border} bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm p-8 md:p-10 relative overflow-hidden`}>
                  {/* Animated background glows */}
                  <motion.div
                    className={`absolute -top-20 -right-20 w-72 h-72 ${c.bg} rounded-full blur-[120px]`}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.6, 0.4] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className={`absolute -bottom-16 -left-16 w-48 h-48 ${c.bg} rounded-full blur-[100px]`}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <span className={`text-xs font-mono ${c.text} tracking-wider`}>STEP {step.num}</span>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight mt-1">
                          {step.title}{" "}
                          <span className="text-white/20 font-medium text-lg">{step.subtitle}</span>
                        </h3>
                      </motion.div>
                      <button
                        onClick={() => setActiveStep(null)}
                        className="w-8 h-8 rounded-full border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white hover:border-white/20 transition-all shrink-0 ml-4"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    {/* Content grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Activities */}
                      <div>
                        <h4 className={`text-xs font-bold ${c.text} tracking-[0.2em] uppercase mb-4`}>주요 활동</h4>
                        <div className="space-y-3">
                          {step.details.map((detail, di) => (
                            <motion.div
                              key={detail}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.15 + di * 0.08, ease: [0.16, 1, 0.3, 1] }}
                              className="flex items-start gap-3 group/item"
                            >
                              <motion.div
                                className={`mt-1 w-6 h-6 rounded-lg bg-gradient-to-br ${c.gradient} flex items-center justify-center shrink-0`}
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2 + di * 0.1, type: "spring", stiffness: 300 }}
                              >
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </motion.div>
                              <span className="text-white/50 text-sm leading-relaxed group-hover/item:text-white/80 transition-colors pt-0.5">{detail}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Deliverables */}
                      <div>
                        <h4 className={`text-xs font-bold ${c.text} tracking-[0.2em] uppercase mb-4`}>산출물</h4>
                        <div className="flex flex-wrap gap-2">
                          {step.deliverables.map((d, di) => (
                            <motion.span
                              key={d}
                              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              transition={{ delay: 0.25 + di * 0.1, type: "spring", stiffness: 200 }}
                              className={`px-4 py-2 text-xs font-bold rounded-xl border ${c.border} ${c.bg} ${c.text}`}
                            >
                              {d}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Step navigation */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/[0.06]">
                      <button
                        onClick={() => setActiveStep(activeStep > 0 ? activeStep - 1 : PROCESS_STEPS.length - 1)}
                        className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-sm group/nav"
                      >
                        <motion.svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          whileHover={{ x: -3 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </motion.svg>
                        <span className="group-hover/nav:text-white/60">{PROCESS_STEPS[(activeStep - 1 + PROCESS_STEPS.length) % PROCESS_STEPS.length].title}</span>
                      </button>
                      {/* Step indicator */}
                      <div className="flex gap-1.5">
                        {PROCESS_STEPS.map((s, i) => {
                          const sc = STEP_COLORS[s.color];
                          return (
                            <button
                              key={i}
                              onClick={() => setActiveStep(i)}
                              className={`h-1.5 rounded-full transition-all duration-300 ${i === activeStep ? `w-6 bg-gradient-to-r ${sc.gradient}` : "w-1.5 bg-white/15 hover:bg-white/30"}`}
                            />
                          );
                        })}
                      </div>
                      <button
                        onClick={() => setActiveStep(activeStep < PROCESS_STEPS.length - 1 ? activeStep + 1 : 0)}
                        className="flex items-center gap-2 text-white/30 hover:text-white/60 transition-colors text-sm group/nav"
                      >
                        <span className="group-hover/nav:text-white/60">{PROCESS_STEPS[(activeStep + 1) % PROCESS_STEPS.length].title}</span>
                        <motion.svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          whileHover={{ x: 3 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
        <InteractiveProcess />
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
