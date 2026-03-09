"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";

const IMG = {
  ai: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80",
  game: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80",
  dev: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1600&q=80",
};

const services = [
  {
    num: "01",
    title: "AI Solutions",
    subtitle: "인공지능 솔루션",
    desc: "자연어 처리, 컴퓨터 비전, 생성형 AI 등 최신 인공지능 기술을 기반으로 기업 맞춤형 솔루션을 설계하고 구축합니다.",
    details: [
      "LLM 기반 챗봇 및 AI 어시스턴트",
      "컴퓨터 비전 & 이미지 분석",
      "자연어 처리 & 텍스트 마이닝",
      "AI 모델 최적화 & MLOps",
    ],
    img: IMG.ai,
    accent: "from-purple-500 to-indigo-500",
  },
  {
    num: "02",
    title: "Game Development",
    subtitle: "게임 개발",
    desc: "몰입감 넘치는 게임 경험을 설계하고, 크로스 플랫폼 게임 개발부터 라이브 서비스 운영까지 전 과정을 수행합니다.",
    details: [
      "Unity / Unreal 기반 게임 개발",
      "크로스 플랫폼 (PC, Mobile, Console)",
      "게임 서버 & 백엔드 인프라",
      "라이브 운영 & 분석 시스템",
    ],
    img: IMG.game,
    accent: "from-pink-500 to-amber-500",
  },
  {
    num: "03",
    title: "Software Solutions",
    subtitle: "소프트웨어 솔루션",
    desc: "기업 맞춤형 소프트웨어, 클라우드 인프라, 데이터 파이프라인 등 엔터프라이즈급 시스템을 설계하고 구축합니다.",
    details: [
      "클라우드 네이티브 아키텍처",
      "엔터프라이즈 웹/앱 개발",
      "데이터 파이프라인 & 분석",
      "DevOps & CI/CD 구축",
    ],
    img: IMG.dev,
    accent: "from-cyan-500 to-emerald-500",
  },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-16">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/8 rounded-full blur-[140px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
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
            className="text-white/40 text-lg max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            AI, 게임, 소프트웨어 — 세 가지 핵심 역량으로
            디지털 혁신을 이끕니다.
          </motion.p>
        </div>
      </section>

      {/* Service Cards */}
      {services.map((s, i) => (
        <section key={s.num} className={`py-24 px-6 ${i % 2 === 1 ? "bg-[#050505]" : ""}`}>
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className={`grid md:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <span className={`inline-block text-sm font-mono tracking-wider mb-4 bg-gradient-to-r ${s.accent} bg-clip-text text-transparent`}>
                    {s.num}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-2">{s.title}</h2>
                  <p className="text-white/30 text-lg mb-6">{s.subtitle}</p>
                  <p className="text-white/50 text-lg leading-relaxed mb-8">{s.desc}</p>
                  <ul className="space-y-3">
                    {s.details.map((d) => (
                      <li key={d} className="flex items-center gap-3 text-white/40">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${s.accent}`} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`relative h-[50vh] rounded-2xl overflow-hidden ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-32 px-6">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
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
              className="inline-block px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full text-white font-bold text-lg"
            >
              문의하기
            </a>
          </div>
        </FadeIn>
      </section>

      <PageFooter />
    </div>
  );
}
