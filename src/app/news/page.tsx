"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";

const news = [
  {
    date: "2026.03",
    category: "Product",
    title: "AI 기반 신규 솔루션 출시 예정",
    summary: "차세대 AI 엔진을 활용한 새로운 서비스가 곧 공개됩니다. 기업용 AI 어시스턴트와 자동화 플랫폼을 통해 업무 효율을 혁신합니다.",
  },
  {
    date: "2026.02",
    category: "Partnership",
    title: "글로벌 게임 파트너십 체결",
    summary: "해외 주요 퍼블리셔와의 전략적 파트너십을 체결했습니다. 아시아 시장을 넘어 글로벌 게임 시장에 본격 진출합니다.",
  },
  {
    date: "2026.01",
    category: "Investment",
    title: "시리즈 A 투자 유치",
    summary: "기술력과 성장 가능성을 인정받아 주요 VC로부터 투자를 유치했습니다. 확보된 자금은 AI 연구 및 글로벌 확장에 투입됩니다.",
  },
  {
    date: "2025.11",
    category: "Award",
    title: "AI Innovation Award 수상",
    summary: "자체 개발 AI 엔진의 기술력을 인정받아 아시아 AI 혁신상을 수상했습니다.",
  },
  {
    date: "2025.09",
    category: "Product",
    title: "크로스플랫폼 게임 오픈 베타 시작",
    summary: "2년간 개발한 첫 번째 자체 IP 게임의 오픈 베타 테스트가 시작되었습니다.",
  },
  {
    date: "2025.06",
    category: "Company",
    title: "신규 오피스 이전",
    summary: "팀 확장에 따라 판교 신사옥으로 이전했습니다. 최적의 개발 환경을 구축했습니다.",
  },
];

const categories = ["All", "Product", "Partnership", "Investment", "Award", "Company"];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function NewsPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            News
          </motion.p>
          <motion.h1
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            새로운 소식
          </motion.h1>
        </div>
      </section>

      {/* Category filter */}
      <section className="px-6 pb-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex gap-6 overflow-x-auto">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              className={`text-sm tracking-wider uppercase whitespace-nowrap pb-3 border-b-2 transition-colors ${
                i === 0
                  ? "text-white border-purple-500"
                  : "text-white/30 border-transparent hover:text-white/60"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* News list */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto divide-y divide-white/5">
          {news.map((n, i) => (
            <FadeIn key={n.title} delay={i * 0.05}>
              <article className="group py-10 cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12">
                  <div className="flex items-center gap-4 md:w-48 shrink-0">
                    <span className="text-white/20 text-sm font-mono">{n.date}</span>
                    <span className="px-2 py-0.5 text-[10px] tracking-[0.2em] uppercase text-purple-400 border border-purple-400/20 rounded-full">
                      {n.category}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-black tracking-tight group-hover:text-purple-400 transition-colors mb-2">
                      {n.title}
                    </h3>
                    <p className="text-white/30 text-sm md:text-base leading-relaxed max-w-2xl">
                      {n.summary}
                    </p>
                  </div>
                  <span className="text-white/10 group-hover:text-purple-400 transition-colors text-xl hidden md:block mt-2">
                    &rarr;
                  </span>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
