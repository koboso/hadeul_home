"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";

const timeline = [
  { year: "2023", title: "회사 설립", desc: "AI와 게임 기술의 융합을 목표로 하들 창립" },
  { year: "2024", title: "첫 AI 솔루션 출시", desc: "자체 개발 AI 엔진 기반 B2B 솔루션 런칭" },
  { year: "2025", title: "게임 사업부 확장", desc: "모바일/PC 크로스플랫폼 게임 개발 착수" },
  { year: "2026", title: "글로벌 진출", desc: "해외 파트너십 체결 및 글로벌 서비스 확대" },
];

const values = [
  { title: "Innovation", desc: "끊임없는 기술 연구와 실험을 통해 새로운 가능성을 탐구합니다." },
  { title: "Collaboration", desc: "팀원, 고객, 파트너와의 긴밀한 협업으로 최고의 결과를 만듭니다." },
  { title: "Excellence", desc: "모든 프로젝트에서 최고 수준의 품질과 성과를 추구합니다." },
  { title: "Global Impact", desc: "기술을 통해 전 세계에 긍정적인 영향력을 확대합니다." },
];

const leadership = [
  { role: "CEO", name: "대표이사", desc: "AI 연구 10년+, 전 네이버 AI Lab" },
  { role: "CTO", name: "기술이사", desc: "게임 엔진 아키텍트, 전 넥슨" },
  { role: "CPO", name: "제품총괄", desc: "B2B SaaS 프로덕트 매니저 8년+" },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
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

export default function CompanyPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-16">
        <motion.div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p
            className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Company
          </motion.p>
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              기술의 미래를
            </span>
            <br />
            만들어가는 사람들
          </motion.h1>
          <motion.p
            className="text-xl text-white/40 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            하들은 AI, 게임, 소프트웨어 솔루션 분야에서
            혁신적인 기술로 디지털 세상을 변화시키고 있습니다.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <FadeIn>
            <div>
              <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4">Our Mission</p>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                기술과 창의력으로
                <br />새로운 가치를 창출합니다
              </h2>
              <p className="text-white/40 leading-relaxed text-lg mb-6">
                하들은 인공지능, 게임 개발, 엔터프라이즈 소프트웨어 솔루션을 통해
                고객과 사용자에게 최적의 디지털 경험을 제공합니다.
              </p>
              <p className="text-white/40 leading-relaxed text-lg">
                자체 AI 연구소를 운영하며, 최신 기술 트렌드를 선도하고
                실질적인 비즈니스 가치를 만들어내는 데 집중합니다.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="rounded-3xl p-12 text-center bg-white/[0.03] border border-white/[0.06]">
              <h3 className="text-3xl font-black mb-4 tracking-tight">Vision 2030</h3>
              <p className="text-white/40 text-lg leading-relaxed">
                &ldquo;아시아를 대표하는<br />AI·게임 기술 기업&rdquo;
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4 text-center">Our Values</p>
            <h2 className="text-4xl md:text-6xl font-black text-center mb-20 tracking-tight">우리가 믿는 가치</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <div className="rounded-2xl p-8 bg-white/[0.03] border border-white/[0.06] h-full">
                  <h3 className="text-xl font-black mb-4 tracking-tight">{v.title}</h3>
                  <p className="text-white/40 leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4 text-center">Our Journey</p>
            <h2 className="text-4xl md:text-6xl font-black text-center mb-20 tracking-tight">작은 시작에서 글로벌로</h2>
          </FadeIn>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-cyan-500/50 to-transparent -translate-x-1/2" />
            <div className="space-y-20">
              {timeline.map((item, i) => (
                <FadeIn key={item.year}>
                  <div className={`relative flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-purple-500 rounded-full -translate-x-1/2 z-10 border-4 border-[#0a0a0a]" />
                    <div className={`ml-20 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-20 md:text-right" : "md:pl-20"}`}>
                      <span className="text-purple-400 font-mono font-bold text-2xl">{item.year}</span>
                      <h3 className="text-2xl font-black mt-2 tracking-tight">{item.title}</h3>
                      <p className="text-white/40 mt-3 text-lg">{item.desc}</p>
                    </div>
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4 text-center">Leadership</p>
            <h2 className="text-4xl md:text-6xl font-black text-center mb-20 tracking-tight">최고의 전문가들</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((t, i) => (
              <FadeIn key={t.role} delay={i * 0.15}>
                <div className="rounded-2xl p-10 text-center bg-white/[0.03] border border-white/[0.06]">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-2xl font-black">
                    {t.role}
                  </div>
                  <h3 className="text-xl font-black mb-2">{t.name}</h3>
                  <p className="text-white/40">{t.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
