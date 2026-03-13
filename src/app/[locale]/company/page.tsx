"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";
import { CompanyHeroBg, VideoHeroBg } from "@/components/HeroBackgrounds";
import { useLocale } from "@/i18n/LocaleContext";

/* 📹 Envato 영상 다운로드 후 경로 설정 (빈 문자열이면 CSS 애니메이션 fallback) */
const COMPANY_HERO_VIDEO = "/videos/company-hero.mp4";



/* ─── Scroll-pinned section wrapper ─── */
function StickyScene({
  children,
  height = "200vh",
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

/* ─── Parallax reveal block ─── */
function ParallaxReveal({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const initial =
    direction === "left"
      ? { opacity: 0, x: -60 }
      : direction === "right"
      ? { opacity: 0, x: 60 }
      : { opacity: 0, y: 40 };
  const animate = isInView ? { opacity: 1, x: 0, y: 0 } : {};

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}


export default function CompanyPage() {
  const { locale, t } = useLocale();
  const [selectedCompetence, setSelectedCompetence] = useState<typeof COMPETENCES[0] | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.5], [1, 0.9]);
  const heroY = useTransform(heroScroll, [0, 0.5], [0, -100]);

  /* Build translated competences by merging static layout data with i18n strings */
  const COMPETENCE_KEYS = ["ai", "digital", "iot", "defense", "game", "cloud"] as const;
  const TECH_CAT_MAP: Record<string, keyof typeof t.company.techCategories> = {
    "모델 & 프레임워크": "modelsFrameworks",
    "데이터 & 파이프라인": "dataPipeline",
    "배포 & 운영": "deployOps",
    "프론트엔드": "frontend",
    "백엔드": "backend",
    "모바일": "mobile",
    "프로토콜 & 통신": "protocolComm",
    "데이터 & 시각화": "dataViz",
    "엣지 & 자동화": "edgeAuto",
    "시뮬레이션 & GIS": "simGis",
    "전술 체계": "tactical",
    "보안 & 인프라": "securityInfra",
    "게임 엔진": "gameEngine",
    "개발 언어": "devLang",
    "서버 & 인프라": "serverInfra",
    "클라우드": "cloudPlatform",
    "컨테이너 & 오케스트레이션": "containerOrch",
    "CI/CD & 모니터링": "cicdMonitor",
  };

  const translatedCompetences = COMPETENCES.map((c, i) => {
    const key = COMPETENCE_KEYS[i];
    const tc = t.company[key] as { title: string; subtitle: string; desc: string; detail: string; highlights: string[] };
    return {
      ...c,
      title: tc.title,
      subtitle: tc.subtitle,
      desc: tc.desc,
      details: {
        ...c.details,
        description: tc.detail,
        highlights: tc.highlights,
        techStacks: c.details.techStacks.map((stack) => ({
          ...stack,
          category: t.company.techCategories[TECH_CAT_MAP[stack.category] ?? "modelsFrameworks"] ?? stack.category,
        })),
      },
    } as typeof c;
  });

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen overflow-x-clip">
      <Nav />

      {/* ═══ Hero — Kinetic Typography ═══ */}
      <section ref={heroRef} className="relative h-screen">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Video background + CSS fallback */}
          {COMPANY_HERO_VIDEO ? (
            <VideoHeroBg src={COMPANY_HERO_VIDEO} overlay={0.65} />
          ) : null}
          <CompanyHeroBg />

          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className="relative z-10 text-center px-5 sm:px-6 max-w-5xl mx-auto"
          >
            <motion.p
              className="text-purple-400 text-xs sm:text-sm tracking-[0.4em] sm:tracking-[0.5em] uppercase mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.5em" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              About HADEUL
            </motion.p>

            <div className="overflow-hidden py-1">
              <motion.h1
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter"
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                  {t.company.heroLine1}
                </span>
              </motion.h1>
            </div>
            <div className="overflow-hidden py-1">
              <motion.h1
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter"
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {t.company.heroLine2}
              </motion.h1>
            </div>

            <motion.p
              className="text-base sm:text-xl text-white/30 max-w-2xl mx-auto mt-6 sm:mt-10 word-keep-all whitespace-pre-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              {t.company.heroDesc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
              <span className="text-white/15 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Mission — Scroll-driven text reveal ═══ */}
      <StickyScene height="250vh">
        {(scrollYProgress) => {
          const missionOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
          const missionScale = useTransform(scrollYProgress, [0.05, 0.3], [0.95, 1]);
          const leftX = useTransform(scrollYProgress, [0.1, 0.4], [-80, 0]);
          const rightX = useTransform(scrollYProgress, [0.15, 0.45], [80, 0]);
          const visionOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
          const visionY = useTransform(scrollYProgress, [0.5, 0.7], [60, 0]);
          const bgGlow = useTransform(
            scrollYProgress,
            [0, 0.5, 1],
            [
              "radial-gradient(ellipse at 30% 50%, hsla(270,80%,12%,0.3) 0%, transparent 70%)",
              "radial-gradient(ellipse at 50% 50%, hsla(300,70%,15%,0.4) 0%, transparent 70%)",
              "radial-gradient(ellipse at 70% 50%, hsla(200,60%,12%,0.3) 0%, transparent 70%)",
            ]
          );

          /* Split missionHeading for styled rendering */
          const missionHeadingFull = t.company.missionHeading;
          /* Expected: "기술과 창의력으로 새로운 가치를 창출합니다" */
          const missionParts = missionHeadingFull.split(" ");
          /* Render as: line1="기술과 창의력으로", line2(outlined)="새로운 가치를", line3="창출합니다" */

          return (
            <div className="relative w-full h-full flex items-center overflow-hidden">
              <motion.div className="absolute inset-0" style={{ background: bgGlow }} />

              <motion.div
                className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full"
                style={{ opacity: missionOpacity, scale: missionScale }}
              >
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                  <motion.div style={{ x: leftX }}>
                    <p className="text-purple-400 text-xs sm:text-sm tracking-[0.4em] uppercase mb-4">Our Mission</p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tighter mb-6 sm:mb-8">
                      {missionParts.slice(0, 2).join(" ")}
                      <br />
                      <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(139,92,246,0.6)" }}>
                        {missionParts.slice(2, 4).join(" ")}
                      </span>
                      <br />
                      {missionParts.slice(4).join(" ")}
                    </h2>
                    <p className="text-white/35 leading-relaxed text-lg word-keep-all">
                      {t.company.missionDesc}
                    </p>
                  </motion.div>

                  <motion.div style={{ x: rightX }}>
                    <motion.div
                      className="rounded-3xl p-12 text-center bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
                      style={{ opacity: visionOpacity, y: visionY }}
                    >
                      <p className="text-purple-400/60 text-xs tracking-[0.3em] uppercase mb-4">Vision 2030</p>
                      <h3 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight">
                        {(() => {
                          const vision = t.company.vision2030;
                          /* Split at "글로벌 서비스 리더" to apply gradient */
                          const gradientText = vision.match(/글로벌 서비스 리더|Global Service Leader/i)?.[0];
                          if (gradientText) {
                            const idx = vision.indexOf(gradientText);
                            const before = vision.slice(0, idx).trim();
                            return (
                              <>
                                {before}
                                <br />
                                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                  {" "}{gradientText}
                                </span>
                              </>
                            );
                          }
                          return vision;
                        })()}
                      </h3>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          );
        }}
      </StickyScene>

      {/* ═══ CEO Message — Hidden ═══ */}

      {/* ═══ Core Competence — Interactive cards ═══ */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#050505] overflow-hidden">
        {/* Background watermark */}
        <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center">
          <motion.span
            className="text-[20vw] font-black text-transparent leading-none"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.02)" }}
            animate={{ scale: [1, 1.02, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            CORE
          </motion.span>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <ParallaxReveal>
            <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4 text-center">Core Competence</p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-center mb-6 tracking-tighter">
              {(() => {
                const core = t.company.coreTitle;
                /* Expected: "우리가 잘하는 것들" — apply gradient to last word */
                const lastSpaceIdx = core.lastIndexOf(" ");
                if (lastSpaceIdx > 0) {
                  return (
                    <>
                      {core.slice(0, lastSpaceIdx + 1)}
                      <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        {core.slice(lastSpaceIdx + 1)}
                      </span>
                    </>
                  );
                }
                return core;
              })()}
            </h2>
            <p className="text-white/30 text-center max-w-2xl mx-auto mb-20 word-keep-all">
              {t.company.coreSubtitle}
            </p>
          </ParallaxReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {translatedCompetences.map((c, i) => (
              <CompetenceCard key={c.title} item={c} index={i} onClick={() => setSelectedCompetence(c)} />
            ))}
          </div>

          <ParallaxReveal>
            <p className="text-center text-white/15 text-sm mt-10 tracking-wide">
              {t.company.coreClickHint}
            </p>
          </ParallaxReveal>
        </div>
      </section>

      {/* Competence Detail Modal */}
      <AnimatePresence>
        {selectedCompetence && (
          <CompetenceModal
            item={selectedCompetence}
            onClose={() => setSelectedCompetence(null)}
            techStackLabel={t.company.techStack}
            featuredProjectsLabel={t.company.featuredProjects}
          />
        )}
      </AnimatePresence>

      {/* ═══ Confident CTA — Staff expertise ═══ */}
      <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-[#050505] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/[0.04] rounded-full blur-[200px]"
            animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/[0.04] rounded-full blur-[200px]"
            animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <ParallaxReveal>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/5 mb-10"
              animate={{ boxShadow: ["0 0 20px rgba(139,92,246,0.05)", "0 0 30px rgba(139,92,246,0.15)", "0 0 20px rgba(139,92,246,0.05)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-purple-400/80 text-xs tracking-[0.2em] uppercase font-bold">Why HADEUL SOFT</span>
            </motion.div>
          </ParallaxReveal>

          <ParallaxReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] mb-6 sm:mb-8 word-keep-all">
              {(() => {
                const cta = t.company.ctaTitle;
                /* Expected: "최고의 경험을 가진 전문가가 함께합니다" — apply gradient to "전문가" */
                const match = cta.match(/(전문가|experts?)/i);
                if (match && match.index !== undefined) {
                  const before = cta.slice(0, match.index).trim();
                  const keyword = match[0];
                  const after = cta.slice(match.index + keyword.length);
                  return (
                    <>
                      {before}
                      <br />
                      <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                        {keyword}
                      </span>
                      {after}
                    </>
                  );
                }
                return cta;
              })()}
            </h2>
          </ParallaxReveal>

          <ParallaxReveal delay={0.2}>
            <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-6 word-keep-all whitespace-pre-line">
              {t.company.ctaDesc}
            </p>
          </ParallaxReveal>

          <ParallaxReveal delay={0.3}>
            <p className="text-white/25 text-base leading-relaxed max-w-xl mx-auto mb-12 word-keep-all whitespace-pre-line">
              {t.company.ctaSubDesc}
            </p>
          </ParallaxReveal>

          <ParallaxReveal delay={0.4}>
            <div className="flex flex-wrap justify-center gap-8 mb-14">
              {[
                { num: "7+", label: t.company.statExp },
                { num: "200+", label: t.company.statProjects },
                { num: "100%", label: t.company.statSatisfaction },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <p className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.num}
                  </p>
                  <p className="text-white/30 text-sm mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </ParallaxReveal>

          <ParallaxReveal delay={0.5}>
            <motion.a
              href={`/${locale}/inquiry`}
              className="inline-block px-10 py-4 rounded-full text-white font-bold text-lg btn-glow"
              style={{
                backgroundImage: "linear-gradient(90deg, #a855f7, #ec4899, #06b6d4, #a855f7)",
                backgroundSize: "300% 100%",
              }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {t.company.ctaButton}
            </motion.a>
          </ParallaxReveal>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}

/* ═══ Core Competence Data & Component ═══ */
const COMPETENCES = [
  {
    title: "AI & Deep Tech",
    subtitle: "인공지능·딥러닝",
    desc: "LLM, Computer Vision, NLP 등\nAI 기술 기반의 기업 맞춤형 솔루션",
    tags: ["LLM", "RAG", "Vision", "NLP", "Fine-tuning", "Embedding"],
    accent: "from-purple-500 to-indigo-500",
    iconPath: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    details: {
      video: "/videos/company/ai-solution.webm",
      description: "최신 AI 기술을 활용하여 기업의 비즈니스 문제를 해결하는 맞춤형 인공지능 솔루션을 설계·구축합니다. 대규모 언어 모델(LLM)부터 컴퓨터 비전, 자연어 처리까지 폭넓은 AI 역량을 보유하고 있습니다.",
      techStacks: [
        { category: "모델 & 프레임워크", items: ["PyTorch", "TensorFlow", "LangChain", "HuggingFace", "OpenAI API"] },
        { category: "데이터 & 파이프라인", items: ["Pandas", "Spark", "Airflow", "Elasticsearch", "Vector DB"] },
        { category: "배포 & 운영", items: ["MLOps", "Docker", "FastAPI", "Triton", "ONNX Runtime"] },
      ],
      highlights: ["RAG 기반 기업 전용 AI 어시스턴트", "실시간 이미지·영상 분석 시스템", "자연어 기반 데이터 검색·분석 플랫폼"],
    },
  },
  {
    title: "Digital Product",
    subtitle: "웹·앱·SaaS",
    desc: "기업형 웹 애플리케이션, 모바일 앱\nSaaS 플랫폼 설계·구축",
    tags: ["React", "Next.js", "Vue", "Flutter", "React Native", "TypeScript"],
    accent: "from-cyan-500 to-emerald-500",
    iconPath: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    details: {
      video: "/videos/company/web-app.webm",
      description: "최신 프론트엔드·백엔드 기술을 활용하여 기업형 웹 애플리케이션, 모바일 앱, SaaS 플랫폼을 설계하고 구축합니다. 마이크로 프론트엔드 아키텍처부터 서버리스까지 최적의 구조를 제안합니다.",
      techStacks: [
        { category: "프론트엔드", items: ["React", "Next.js", "Vue.js", "Angular", "Svelte", "Tailwind CSS"] },
        { category: "백엔드", items: ["Node.js", "NestJS", "Spring Boot", "Go", "Python", "GraphQL"] },
        { category: "모바일", items: ["Flutter", "React Native", "Swift", "Kotlin"] },
      ],
      highlights: ["대규모 트래픽 대응 SaaS 플랫폼", "마이크로 프론트엔드 아키텍처 설계", "PWA 기반 크로스플랫폼 서비스"],
    },
  },
  {
    title: "IoT & Edge",
    subtitle: "스마트 인더스트리",
    desc: "센서 데이터 수집, 실시간 모니터링\n스마트 팩토리 자동화 시스템",
    tags: ["MQTT", "Edge AI", "PLC", "Digital Twin", "SCADA", "OPC-UA"],
    accent: "from-emerald-500 to-teal-500",
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
    details: {
      video: "/videos/company/iot.webm",
      description: "산업 현장의 센서 데이터를 실시간으로 수집·분석하여 스마트 팩토리 자동화 시스템을 구축합니다. Edge AI와 Digital Twin 기술을 결합한 차세대 산업 솔루션을 제공합니다.",
      techStacks: [
        { category: "프로토콜 & 통신", items: ["MQTT", "OPC-UA", "Modbus", "WebSocket", "gRPC"] },
        { category: "데이터 & 시각화", items: ["InfluxDB", "Grafana", "Kibana", "TimescaleDB"] },
        { category: "엣지 & 자동화", items: ["Edge AI", "PLC", "SCADA", "Digital Twin", "Sensor Fusion"] },
      ],
      highlights: ["실시간 설비 모니터링 대시보드", "예지보전 AI 시스템", "디지털 트윈 기반 공정 시뮬레이션"],
    },
  },
  {
    title: "Defense & Maritime",
    subtitle: "국방·해양 특수체계",
    desc: "국방 시뮬레이션, 해양 관제 시스템\n보안 솔루션 개발",
    tags: ["C4I", "ECDIS", "GIS", "HLA/DIS", "전술체계", "관제시스템"],
    accent: "from-blue-500 to-indigo-500",
    iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    details: {
      image: "/videos/company/marine.png",
      description: "국방 시뮬레이션, 해양 관제 시스템, 보안 솔루션 등 높은 신뢰성과 보안이 요구되는 특수 분야의 소프트웨어를 개발합니다. 군 표준 및 해양 국제 규격을 준수하는 시스템을 구축합니다.",
      techStacks: [
        { category: "시뮬레이션 & GIS", items: ["HLA/DIS", "CesiumJS", "OpenLayers", "GDAL", "3D 시뮬레이션"] },
        { category: "전술 체계", items: ["C4I", "데이터 링크", "ECDIS", "AIS", "레이더 연동"] },
        { category: "보안 & 인프라", items: ["CC인증", "암호화 모듈", "망분리", "RHEL", "보안 OS"] },
      ],
      highlights: ["전술 시뮬레이션 훈련 체계", "해양 관제 통합 플랫폼", "보안 등급별 데이터 처리 시스템"],
    },
  },
  {
    title: "Interactive Contents",
    subtitle: "인터랙티브 콘텐츠",
    desc: "모바일·PC 크로스플랫폼 콘텐츠 개발\n라이브 서비스 운영",
    tags: ["Unity", "Unreal", "Cocos", "C#", "C++"],
    accent: "from-pink-500 to-amber-500",
    iconPath: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    details: {
      video: "/videos/company/game.webm",
      description: "모바일·PC 크로스플랫폼 게임을 기획부터 출시, 라이브 서비스 운영까지 전 과정을 지원합니다. 다양한 게임 엔진 경험 기술을 바탕으로 높은 품질의 콘텐츠를 개발합니다.",
      techStacks: [
        { category: "게임 엔진", items: ["Unity", "Unreal Engine", "Cocos Creator", "Godot"] },
        { category: "개발 언어", items: ["C#", "C++", "TypeScript", "JavaScript", "Lua"] },
        { category: "서버 & 인프라", items: ["Photon", "Mirror", "PlayFab", "Firebase", "Redis"] },
      ],
      highlights: ["앱인토스 기반 미니앱 개발", "라이브 서비스 운영 및 업데이트 관리"],
    },
  },
  {
    title: "Cloud & Infra",
    subtitle: "클라우드·DevOps",
    desc: "CI/CD 파이프라인, 클라우드 아키텍처\n모니터링 체계 구축",
    tags: ["AWS", "Docker", "K8s", "Terraform", "GitHub Actions", "ArgoCD"],
    accent: "from-orange-500 to-red-500",
    iconPath: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    details: {
      video: "/videos/company/devops.webm",
      description: "클라우드 네이티브 아키텍처 설계부터 CI/CD 파이프라인 구축, 모니터링·알럿 체계까지 개발 생산성과 서비스 안정성을 높이는 DevOps 인프라를 구축합니다.",
      techStacks: [
        { category: "클라우드", items: ["AWS", "GCP", "Azure", "NCP", "Cloudflare"] },
        { category: "컨테이너 & 오케스트레이션", items: ["Docker", "Kubernetes", "Helm", "ArgoCD", "Istio"] },
        { category: "CI/CD & 모니터링", items: ["GitHub Actions", "Terraform", "Prometheus", "Grafana", "ELK Stack"] },
      ],
      highlights: ["무중단 배포 파이프라인 설계", "멀티 클라우드 인프라 구축", "실시간 장애 감지·자동 복구 체계"],
    },
  },
];

function CompetenceCard({ item, index, onClick }: { item: typeof COMPETENCES[0]; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl p-8 bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/30 transition-all duration-500 overflow-hidden cursor-pointer"
    >
      {/* Hover glow */}
      <motion.div
        className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-[0.08] blur-[60px] transition-opacity duration-500`}
      />

      {/* Icon */}
      <motion.div
        className="relative mb-6"
        animate={{ rotate: [0, 2, -2, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: index * 0.5 }}
      >
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.accent} p-[1px]`}>
          <div className="w-full h-full rounded-xl bg-[#0a0a0a] flex items-center justify-center">
            <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <h3 className="text-xl font-black tracking-tight mb-1 group-hover:text-purple-300 transition-colors">
        {item.title}
      </h3>
      <p className="text-white/30 text-xs font-bold tracking-wide mb-3">{item.subtitle}</p>
      <p className="text-white/40 text-sm leading-relaxed mb-5 word-keep-all whitespace-pre-line">{item.desc}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-[10px] tracking-wider uppercase text-white/30 border border-white/[0.06] rounded-full group-hover:border-purple-500/20 group-hover:text-purple-400/60 transition-all"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Animated corner accent */}
      <motion.div
        className={`absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl ${item.accent} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`}
        style={{ borderTopLeftRadius: "100%" }}
      />
    </motion.div>
  );
}

/* ═══ Competence Detail Modal ═══ */
function CompetenceModal({
  item,
  onClose,
  techStackLabel,
  featuredProjectsLabel,
}: {
  item: typeof COMPETENCES[0];
  onClose: () => void;
  techStackLabel: string;
  featuredProjectsLabel: string;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal — wide 2-column on PC */}
      <motion.div
        className="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#111] border border-white/[0.08]"
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-[1fr_1.2fr]">
          {/* Left — Media + Header */}
          <div className="relative bg-[#0a0a0a] md:rounded-l-3xl overflow-hidden">
            <div className="aspect-[4/3] md:aspect-auto md:h-full relative flex items-start justify-center">
              {/* Video or Image */}
              {"video" in item.details && item.details.video ? (
                <video
                  src={item.details.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[60%] object-contain p-3"
                />
              ) : (
                <img
                  src={"image" in item.details ? (item.details as { image: string }).image : ""}
                  alt={item.title}
                  className="w-full h-[60%] object-contain p-3"
                />
              )}
              {/* Dark overlay for readability — bottom gradient only */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
            </div>

            {/* Header overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${item.accent} p-[1px] shrink-0`}>
                  <div className="w-full h-full rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-white drop-shadow-lg">{item.title}</h3>
                  <p className="text-white/70 text-xs font-bold tracking-wide">{item.subtitle}</p>
                </div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed word-keep-all drop-shadow-md">
                {item.details.description}
              </p>
            </div>
          </div>

          {/* Right — Tech Stacks + Highlights */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Tech Stacks */}
            <div>
              <p className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase mb-4">{techStackLabel}</p>
              <div className="space-y-5">
                {item.details.techStacks.map((stack, i) => (
                  <motion.div
                    key={stack.category}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                  >
                    <p className="text-white/60 text-xs font-bold mb-2">{stack.category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {stack.items.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[11px] font-medium text-white/50 bg-white/[0.04] border border-white/[0.06] rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.06]" />

            {/* Highlights */}
            <div>
              <p className="text-white/40 text-[10px] font-bold tracking-[0.3em] uppercase mb-3">{featuredProjectsLabel}</p>
              <div className="space-y-2.5">
                {item.details.highlights.map((h, i) => (
                  <motion.div
                    key={h}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.06 }}
                  >
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.accent} shrink-0`} />
                    <span className="text-white/45 text-sm word-keep-all">{h}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
