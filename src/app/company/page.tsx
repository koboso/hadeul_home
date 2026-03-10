"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";

const timeline = [
  { year: "2023", title: "회사 설립", desc: "AI와 게임 기술의 융합을 목표로 (주)하들소프트 창립" },
  { year: "2024", title: "첫 AI 솔루션 출시", desc: "자체 개발 AI 엔진 기반 B2B 솔루션 런칭" },
  { year: "2025", title: "게임 사업부 확장", desc: "모바일/PC 크로스플랫폼 게임 개발 착수" },
  { year: "2026", title: "글로벌 진출", desc: "해외 파트너십 체결 및 글로벌 서비스 확대" },
];

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
          {/* Animated gradient orbs */}
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
                      (주)하들소프트는 인공지능, 게임 개발, 엔터프라이즈 소프트웨어 솔루션을 통해
                      고객과 사용자에게 최적의 디지털 경험을 제공합니다.
                    </p>
                  </motion.div>

                  <motion.div style={{ x: rightX }}>
                    <motion.div
                      className="rounded-3xl p-12 text-center bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
                      style={{ opacity: visionOpacity, y: visionY }}
                    >
                      <p className="text-purple-400/60 text-xs tracking-[0.3em] uppercase mb-4">Vision 2030</p>
                      <h3 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight">
                        &ldquo;아시아를 대표하는
                        <br />
                        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                          AI·게임 기술 기업
                        </span>
                        &rdquo;
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
                  <p className="text-white font-bold mt-4 text-lg">OOO</p>
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
                  <p className="text-white/50 font-bold text-lg">대표이사 OOO</p>
                </div>
              </ParallaxReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Timeline — Horizontal scroll reveal ═══ */}
      <section className="relative py-32 px-6 bg-[#050505]">
        <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center">
          <span
            className="text-[25vw] font-black text-transparent leading-none"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.02)" }}
          >
            SINCE
          </span>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <ParallaxReveal>
            <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4 text-center">Our Journey</p>
            <h2 className="text-4xl md:text-6xl font-black text-center mb-20 tracking-tighter">
              작은 시작에서{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                글로벌로
              </span>
            </h2>
          </ParallaxReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {timeline.map((item, i) => (
              <ParallaxReveal key={item.year} delay={i * 0.15}>
                <div className="relative p-8 md:p-6 group">
                  {/* Connector line */}
                  {i < timeline.length - 1 && (
                    <div className="hidden md:block absolute top-14 right-0 w-full h-px bg-gradient-to-r from-purple-500/30 to-cyan-500/30 translate-x-1/2" />
                  )}

                  {/* Dot */}
                  <div className="relative z-10 mb-6">
                    <motion.div
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center"
                      whileHover={{ scale: 1.3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="w-3 h-3 rounded-full bg-[#050505]" />
                    </motion.div>
                  </div>

                  <span className="text-purple-400 font-mono font-black text-3xl md:text-4xl">{item.year}</span>
                  <h3 className="text-xl font-black mt-3 tracking-tight group-hover:text-purple-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/30 mt-2 leading-relaxed">{item.desc}</p>
                </div>
              </ParallaxReveal>
            ))}
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
