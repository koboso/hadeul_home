"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";
import { ServicesHeroBg } from "@/components/HeroBackgrounds";

const SERVICES = [
  {
    num: "01",
    title: "AI Solutions",
    subtitle: "인공지능 솔루션",
    desc: "LLM, 컴퓨터 비전, 생성형 AI 등 최첨단 인공지능 기술로\n기업 맞춤형 솔루션을 설계하고 구축합니다.",
    tags: ["LLM", "RAG", "Vision", "NLP", "Fine-tuning", "MLOps"],
    href: "/services/ai",
    accent: "from-purple-500 to-indigo-500",
    accentText: "text-purple-400",
    bgGlow: "bg-purple-500/[0.06]",
    projects: [
      { name: "AI Kolabshop Aigents", type: "이화학 특수 도메인 E커머스 AI 에이전트" },
      { name: "Mission 코드이썬", type: "AI 코드 리뷰 솔루션" },
    ],
  },
  {
    num: "02",
    title: "Game Development",
    subtitle: "게임 개발",
    desc: "몰입감 넘치는 게임 경험을 설계하고,\n크로스 플랫폼 개발부터 라이브 서비스 운영까지.",
    tags: ["Unity", "Unreal", "Cocos", "Godot", "Multiplayer", "Live Ops"],
    href: "/services/game",
    accent: "from-pink-500 to-amber-500",
    accentText: "text-pink-400",
    bgGlow: "bg-pink-500/[0.06]",
    projects: [],
    comingSoon: true,
  },
  {
    num: "03",
    title: "Software Solutions",
    subtitle: "소프트웨어 솔루션",
    desc: "엔터프라이즈급 웹·앱, 클라우드 인프라,\n데이터 파이프라인을 설계하고 구축합니다.",
    tags: ["React", "Next.js", "Flutter", "Node.js", "Cloud", "DevOps"],
    href: "/services/software",
    accent: "from-cyan-500 to-emerald-500",
    accentText: "text-cyan-400",
    bgGlow: "bg-cyan-500/[0.06]",
    projects: [],
    comingSoon: true,
  },
];

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
        <div className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? "" : ""}`}>
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
                <Link
                  href={service.href}
                  className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${service.accent} rounded-full text-white font-bold text-base btn-glow group`}
                >
                  대표 프로젝트 보기
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Link>
              )}
            </motion.div>
          </div>

          {/* Right: Project Preview Cards */}
          <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
            {service.projects.length > 0 ? (
              <div className="space-y-4">
                {service.projects.map((project, pi) => (
                  <motion.div
                    key={project.name}
                    className="group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/30 transition-all duration-500 p-8"
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + pi * 0.15 }}
                    whileHover={{ y: -4 }}
                  >
                    {/* Hover glow */}
                    <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-[0.08] blur-[60px] transition-opacity duration-500`} />

                    <div className="relative z-10">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-white/20 font-bold">
                        Featured Project {String(pi + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-2xl font-black tracking-tight mt-2 mb-2 group-hover:text-purple-300 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-white/35 text-sm">{project.type}</p>

                      {/* Decorative elements */}
                      <div className="mt-6 flex items-center gap-4">
                        <div className={`h-px flex-1 bg-gradient-to-r ${service.accent} opacity-20`} />
                        <span className={`text-xs font-bold ${service.accentText} opacity-60`}>VIEW</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
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
            AI, 게임, 소프트웨어 — 세 가지 핵심 역량으로
            디지털 혁신을 이끕니다.
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

      {/* Service Sections */}
      {SERVICES.map((service, i) => (
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
            className="inline-block px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full text-white font-bold text-lg btn-glow"
          >
            문의하기
          </a>
        </motion.div>
      </section>

      <PageFooter />
    </div>
  );
}
