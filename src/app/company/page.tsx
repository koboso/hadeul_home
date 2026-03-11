"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";
import { CompanyHeroBg } from "@/components/HeroBackgrounds";


const ceoMessage = [
  "안녕하십니까.",
  "주식회사 하들소프트 대표이사 OOO입니다.",
  "",
  "하들소프트는 지난 시간 동안 다양한 현장 경험과 기술적 도전을 통해 축적된 노하우를 기반으로 성장해 왔습니다. 작은 시작이었지만, 우리는 변화하는 IT 환경 속에서 기술의 본질과 고객의 가치를 함께 고민하며 지속적인 혁신을 이어왔습니다.",
  "",
  "오늘날 우리는 인공지능(AI), 데이터, 자동화 기술이 산업 전반의 구조를 바꾸는 거대한 전환의 시대에 서 있습니다. 이러한 변화 속에서 하들소프트는 단순한 기술 제공 기업을 넘어, 문제 해결 중심의 기술 파트너로서 고객의 비즈니스 혁신을 지원하고자 합니다.",
  "",
  "하들소프트는 기술 중심(Technology Driven)과 사람 중심(Human Centered)이라는 두 가지 가치를 기반으로 움직입니다. 다양한 전문 분야의 인재들이 협력하며 복잡한 문제를 체계적으로 해결하고, 고객이 실질적으로 체감할 수 있는 가치 있는 솔루션을 만들어 가고 있습니다.",
  "",
  "우리는 기술이 단순한 도구가 아닌 새로운 가능성을 여는 플랫폼이라고 믿습니다. 하들소프트는 축적된 기술력과 경험을 바탕으로 고객의 성장과 산업의 발전에 기여하는 지속 가능한 기술 기업으로 발전해 나가겠습니다.",
  "",
  "앞으로도 하들소프트는 변화하는 기술 환경 속에서 끊임없이 도전하고 혁신하며, 고객과 함께 성장하는 신뢰받는 기업이 되겠습니다.",
  "",
  "하들소프트의 여정을 따뜻한 관심과 격려로 지켜봐 주시기를 부탁드립니다.",
  "",
  "감사합니다.",
];

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
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const initial =
    direction === "left"
      ? { opacity: 0, x: -60 }
      : direction === "right"
      ? { opacity: 0, x: 60 }
      : { opacity: 0, y: 50 };
  const animate = isInView ? { opacity: 1, x: 0, y: 0 } : {};

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated line by line text ─── */
function RevealLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function CompanyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.5], [1, 0.9]);
  const heroY = useTransform(heroScroll, [0, 0.5], [0, -100]);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen overflow-x-clip">
      <Nav />

      {/* ═══ Hero — Kinetic Typography ═══ */}
      <section ref={heroRef} className="relative h-screen">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Animated gradient orbs + particles */}
          <CompanyHeroBg />

          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            className="relative z-10 text-center px-6 max-w-5xl mx-auto"
          >
            <motion.p
              className="text-purple-400 text-sm tracking-[0.5em] uppercase mb-8"
              initial={{ opacity: 0, y: 20, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.5em" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              About HADEUL
            </motion.p>

            <div className="overflow-hidden">
              <motion.h1
                className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tighter"
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                  기술의 미래를
                </span>
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-tighter"
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                만들어가는 사람들
              </motion.h1>
            </div>

            <motion.p
              className="text-xl text-white/30 max-w-2xl mx-auto mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              (주)하들소프트는 AI, 게임, 소프트웨어 솔루션 분야에서
              혁신적인 기술로 디지털 세상을 변화시키고 있습니다.
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

          return (
            <div className="relative w-full h-full flex items-center overflow-hidden">
              <motion.div className="absolute inset-0" style={{ background: bgGlow }} />

              <motion.div
                className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full"
                style={{ opacity: missionOpacity, scale: missionScale }}
              >
                <div className="grid md:grid-cols-2 gap-16 items-center">
                  <motion.div style={{ x: leftX }}>
                    <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4">Our Mission</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[0.9] tracking-tighter mb-8">
                      기술과 창의력으로
                      <br />
                      <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(139,92,246,0.6)" }}>
                        새로운 가치를
                      </span>
                      <br />
                      창출합니다
                    </h2>
                    <p className="text-white/35 leading-relaxed text-lg">
                      (주)하들소프트는 단순한 협업을 넘어, 새로운 기술과 지식을 끊임없이 공유하며 
                      조직 전체가 함께 진화합니다.
                    </p>
                  </motion.div>

                  <motion.div style={{ x: rightX }}>
                    <motion.div
                      className="rounded-3xl p-12 text-center bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
                      style={{ opacity: visionOpacity, y: visionY }}
                    >
                      <p className="text-purple-400/60 text-xs tracking-[0.3em] uppercase mb-4">Vision 2030</p>
                      <h3 className="text-2xl md:text-3xl font-black tracking-tighter leading-tight">
                        변화에 앞서가는 AI 에이전트 기반
                        <br />
                        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                           글로벌 서비스 리더
                        </span>
                        
                      </h3>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          );
        }}
      </StickyScene>

      {/* ═══ CEO Message — Cinematic reveal ═══ */}
      <section className="relative py-32 md:py-40 px-6">
        {/* Background accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[200px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid md:grid-cols-[1fr_2fr] gap-16 md:gap-20">
            {/* Left — Title */}
            <div className="md:sticky md:top-32 md:self-start">
              <ParallaxReveal direction="left">
                <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4">CEO Message</p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] mb-6">
                  대표이사
                  <br />
                  인사말
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
              </ParallaxReveal>

              <ParallaxReveal direction="left" delay={0.3}>
                <div className="mt-12">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/[0.06] flex items-center justify-center">
                    <span className="text-4xl font-black text-white/20">CEO</span>
                  </div>
                  <p className="text-white font-bold mt-4 text-lg">김재식</p>
                  <p className="text-white/30 text-sm">대표이사</p>
                </div>
              </ParallaxReveal>
            </div>

            {/* Right — Message body */}
            <div className="space-y-0">
              {ceoMessage.map((line, i) => {
                if (line === "") {
                  return <div key={`space-${i}`} className="h-6" />;
                }

                const isBold = line.includes("기술 중심(Technology Driven)");
                const isGreeting = line === "감사합니다.";

                return (
                  <RevealLine key={i} delay={Math.min(i * 0.04, 0.6)}>
                    {isGreeting ? (
                      <p className="text-white/60 text-xl font-bold mt-4">{line}</p>
                    ) : isBold ? (
                      <p className="text-white/50 text-lg leading-[1.9]">
                        하들소프트는{" "}
                        <span className="text-purple-400 font-bold">기술 중심(Technology Driven)</span>과{" "}
                        <span className="text-cyan-400 font-bold">사람 중심(Human Centered)</span>
                        이라는 두 가지 가치를 기반으로 움직입니다. 다양한 전문 분야의 인재들이 협력하며 복잡한 문제를 체계적으로 해결하고, 고객이 실질적으로 체감할 수 있는 가치 있는 솔루션을 만들어 가고 있습니다.
                      </p>
                    ) : (
                      <p className="text-white/40 text-lg leading-[1.9]">{line}</p>
                    )}
                  </RevealLine>
                );
              })}

              {/* Signature */}
              <ParallaxReveal delay={0.5}>
                <div className="pt-12 mt-8 border-t border-white/5">
                  <p className="text-white/50 font-bold text-lg">주식회사 하들소프트</p>
                  <p className="text-white/50 font-bold text-lg">대표이사 김재식</p>
                </div>
              </ParallaxReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Core Competence — Interactive cards ═══ */}
      <section className="relative py-32 px-6 bg-[#050505] overflow-hidden">
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
            <h2 className="text-4xl md:text-6xl font-black text-center mb-6 tracking-tighter">
              우리가 잘하는{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                것들
              </span>
            </h2>
            <p className="text-white/30 text-center max-w-2xl mx-auto mb-20">
              다양한 산업 분야에서 축적한 기술력으로 최적의 솔루션을 제공합니다.
            </p>
          </ParallaxReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPETENCES.map((c, i) => (
              <CompetenceCard key={c.title} item={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Tech Stack & Process — Animated flow ═══ */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[200px]"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Tech Stack */}
          <ParallaxReveal>
            <p className="text-cyan-400 text-sm tracking-[0.4em] uppercase mb-4 text-center">Technology</p>
            <h2 className="text-4xl md:text-6xl font-black text-center mb-20 tracking-tighter">
              기술{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                스택
              </span>
            </h2>
          </ParallaxReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TECH_STACKS.map((stack, i) => (
              <TechStackColumn key={stack.category} stack={stack} index={i} />
            ))}
          </div>

          {/* More tech hint */}
          <ParallaxReveal>
            <p className="text-center text-white/15 text-sm mt-10 tracking-wide">
              +40개 이상의 기술 스택을 프로젝트 요구사항에 맞춰 유연하게 적용합니다
            </p>
          </ParallaxReveal>
        </div>
      </section>

      {/* ═══ Confident CTA — Staff expertise ═══ */}
      <section className="relative py-32 px-6 bg-[#050505] overflow-hidden">
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] mb-8">
              최고의 경험을 가진
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                전문가
              </span>
              가 함께합니다
            </h2>
          </ParallaxReveal>

          <ParallaxReveal delay={0.2}>
            <p className="text-white/40 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-6">
              다양한 산업 현장에서 검증된 임직원들이
              고객의 비즈니스를 깊이 이해하고, 진짜 문제를 찾아 해결합니다.
            </p>
          </ParallaxReveal>

          <ParallaxReveal delay={0.3}>
            <p className="text-white/25 text-base leading-relaxed max-w-xl mx-auto mb-12">
              복잡하고 난해한 기술적 과제도 걱정하지 마세요.
              <br />
              하들소프트가 고객 만족을 위해 끝까지 책임지겠습니다.
            </p>
          </ParallaxReveal>

          <ParallaxReveal delay={0.4}>
            <div className="flex flex-wrap justify-center gap-8 mb-14">
              {[
                { num: "7+", label: "년 평균 경력" },
                { num: "200+", label: "프로젝트 수행" },
                { num: "98%", label: "고객 만족도" },
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
            <a
              href="/inquiry"
              className="inline-block px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full text-white font-bold text-lg btn-glow"
            >
              프로젝트 문의하기
            </a>
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
    title: "AI / ML",
    subtitle: "인공지능",
    desc: "LLM, 컴퓨터 비전, 자연어 처리 등 최신 AI 기술을 활용한 맞춤형 솔루션",
    tags: ["LLM", "RAG", "Vision", "NLP", "Fine-tuning", "Embedding", "Prompt Engineering", "MLOps"],
    accent: "from-purple-500 to-indigo-500",
    iconPath: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  },
  {
    title: "Game Dev",
    subtitle: "게임 개발",
    desc: "모바일·PC 크로스플랫폼 게임 개발, 라이브 서비스 운영",
    tags: ["Unity", "Unreal", "Cocos", "Godot", "C#", "C++"],
    accent: "from-pink-500 to-amber-500",
    iconPath: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Web / App",
    subtitle: "웹·앱 플랫폼",
    desc: "기업형 웹 애플리케이션, 모바일 앱, SaaS 플랫폼 설계·구축",
    tags: ["React", "Next.js", "Vue", "Flutter", "React Native", "TypeScript", "GraphQL", "Micro Frontend"],
    accent: "from-cyan-500 to-emerald-500",
    iconPath: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    title: "IoT / Smart",
    subtitle: "IoT·스마트팩토리",
    desc: "센서 데이터 수집, 실시간 모니터링, 스마트 팩토리 자동화 시스템",
    tags: ["MQTT", "Edge AI", "Dashboard", "PLC", "OPC-UA", "Digital Twin", "Sensor Fusion", "SCADA"],
    accent: "from-emerald-500 to-teal-500",
    iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Defense / Marine",
    subtitle: "국방·해양",
    desc: "국방 시뮬레이션, 해양 관제 시스템, 보안 솔루션 개발",
    tags: ["Simulation", "GIS", "보안", "관제", "C4I", "ECDIS", "전술체계", "데이터 링크"],
    accent: "from-blue-500 to-indigo-500",
    iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "DevOps",
    subtitle: "인프라·자동화",
    desc: "CI/CD 파이프라인, 클라우드 아키텍처, 모니터링 체계 구축",
    tags: ["AWS", "Docker", "K8s", "Terraform", "GitHub Actions", "ArgoCD", "Prometheus", "Grafana"],
    accent: "from-orange-500 to-red-500",
    iconPath: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
];

function CompetenceCard({ item, index }: { item: typeof COMPETENCES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl p-8 bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/30 transition-all duration-500 overflow-hidden"
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
      <p className="text-white/40 text-sm leading-relaxed mb-5">{item.desc}</p>

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

/* ═══ Tech Stack Data & Component ═══ */
const TECH_STACKS = [
  {
    category: "Frontend",
    color: "cyan",
    items: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Flutter", "React Native", "Tailwind CSS", "Svelte"],
  },
  {
    category: "Backend",
    color: "purple",
    items: ["Node.js", "Python", "Go", "Java", "Spring Boot", "NestJS", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    category: "AI / Data",
    color: "pink",
    items: ["PyTorch", "TensorFlow", "LangChain", "OpenAI", "HuggingFace", "Pandas", "Spark", "Airflow", "Elasticsearch"],
  },
  {
    category: "Infra / DevOps",
    color: "emerald",
    items: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "ArgoCD", "Nginx"],
  },
];

const STACK_COLORS: Record<string, string> = {
  cyan: "from-cyan-500 to-cyan-400",
  purple: "from-purple-500 to-purple-400",
  pink: "from-pink-500 to-pink-400",
  emerald: "from-emerald-500 to-emerald-400",
};

function TechStackColumn({ stack, index }: { stack: typeof TECH_STACKS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      {/* Category header */}
      <div className="mb-5">
        <motion.div
          className={`inline-block h-1 rounded-full bg-gradient-to-r ${STACK_COLORS[stack.color]}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: 40 } : {}}
          transition={{ duration: 0.8, delay: index * 0.12 + 0.3 }}
        />
        <h3 className="text-lg font-black tracking-tight mt-3">{stack.category}</h3>
      </div>

      {/* Tech items as flowing tags */}
      <div className="flex flex-wrap gap-2">
        {stack.items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: index * 0.12 + i * 0.05 + 0.4 }}
            className="px-3 py-1.5 text-xs font-medium text-white/50 bg-white/[0.04] border border-white/[0.06] rounded-lg hover:text-white/80 hover:border-purple-500/30 hover:bg-white/[0.06] transition-all duration-300 cursor-default"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

