"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";

const perks = [
  { title: "유연 근무", desc: "원격 근무와 유연 출퇴근제를 지원합니다." },
  { title: "성장 지원", desc: "교육비, 컨퍼런스, 도서비를 지원합니다." },
  { title: "최신 장비", desc: "최고 사양의 개발 장비를 제공합니다." },
  { title: "건강 관리", desc: "종합 건강검진과 건강 보험을 지원합니다." },
  { title: "스톡옵션", desc: "핵심 인재에게 스톡옵션을 제공합니다." },
  { title: "팀 문화", desc: "수평적 문화와 자율적인 의사결정을 존중합니다." },
];

const positions = [
  {
    team: "AI Lab",
    title: "Senior AI/ML Engineer",
    type: "정규직",
    location: "판교 / 원격",
    desc: "LLM, 생성형 AI 모델 개발 및 프로덕션 배포 경험이 있는 시니어 엔지니어를 찾습니다.",
  },
  {
    team: "Game Studio",
    title: "Game Client Developer (Unity)",
    type: "정규직",
    location: "판교",
    desc: "Unity 기반 크로스플랫폼 게임 개발 경험이 있는 클라이언트 개발자를 찾습니다.",
  },
  {
    team: "Platform",
    title: "Backend Engineer",
    type: "정규직",
    location: "판교 / 원격",
    desc: "대규모 트래픽 처리 경험이 있는 백엔드 엔지니어를 찾습니다.",
  },
  {
    team: "Design",
    title: "Product Designer",
    type: "정규직",
    location: "판교",
    desc: "B2B SaaS 또는 게임 UI/UX 설계 경험이 있는 프로덕트 디자이너를 찾습니다.",
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

export default function CareersPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-16 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-pink-500/8 rounded-full blur-[140px]"
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <div className="relative z-10 text-center px-6">
          <motion.p
            className="text-pink-400 text-sm tracking-[0.4em] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Careers
          </motion.p>
          <motion.h1
            className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            BUILD THE
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              FUTURE
            </span>
            <br />
            WITH US
          </motion.h1>
          <motion.p
            className="text-white/40 text-lg max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            최고의 팀에서 최고의 기술로 세상을 바꿀 동료를 찾고 있습니다.
          </motion.p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-24 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4 text-center">Why Hadeul</p>
            <h2 className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight">우리와 함께하는 이유</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.08}>
                <div className="rounded-2xl p-8 bg-white/[0.03] border border-white/[0.06]">
                  <h3 className="text-lg font-black mb-2 tracking-tight">{p.title}</h3>
                  <p className="text-white/40">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4">Open Positions</p>
            <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-tight">채용 중인 포지션</h2>
          </FadeIn>

          <div className="divide-y divide-white/5">
            {positions.map((pos, i) => (
              <FadeIn key={pos.title} delay={i * 0.05}>
                <div className="group py-8 cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    <span className="text-purple-400/60 text-xs tracking-[0.3em] uppercase md:w-24 shrink-0">
                      {pos.team}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-xl font-black tracking-tight group-hover:text-purple-400 transition-colors mb-1">
                        {pos.title}
                      </h3>
                      <p className="text-white/30 text-sm">{pos.desc}</p>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-white/20 text-xs">{pos.type}</span>
                      <span className="text-white/20 text-xs">{pos.location}</span>
                      <span className="text-white/10 group-hover:text-purple-400 transition-colors">&rarr;</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 bg-[#050505]">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              원하는 포지션이 없나요?
            </h2>
            <p className="text-white/40 text-lg mb-10 max-w-md mx-auto">
              상시 채용도 진행합니다. 이력서를 보내주시면 적합한 포지션이 열릴 때 연락드리겠습니다.
            </p>
            <a
              href="mailto:careers@hadeul.com"
              className="inline-block px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full text-white font-bold text-lg"
            >
              이력서 보내기
            </a>
          </div>
        </FadeIn>
      </section>

      <PageFooter />
    </div>
  );
}
