"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  job_type: string;
  location: string;
  description: string;
  requirements: string;
  is_active: number;
}

const perks = [
  { title: "유연 근무", desc: "원격 근무와 유연 출퇴근제를 지원합니다." },
  { title: "성장 지원", desc: "교육비, 컨퍼런스, 도서비를 지원합니다." },
  { title: "최신 장비", desc: "최고 사양의 개발 장비를 제공합니다." },
  { title: "건강 관리", desc: "종합 건강검진과 건강 보험을 지원합니다." },
  { title: "스톡옵션", desc: "핵심 인재에게 스톡옵션을 제공합니다." },
  { title: "팀 문화", desc: "수평적 문화와 자율적인 의사결정을 존중합니다." },
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
  const [positions, setPositions] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/careers?active=1")
      .then((r) => r.json())
      .then((d) => {
        setPositions(d.data || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

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

          {loading ? (
            <div className="text-center py-20 text-white/20">로딩 중...</div>
          ) : positions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <svg
                className="w-14 h-14 text-white/10 mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <p className="text-white/30 text-lg mb-2">현재 진행 중인 채용이 없습니다.</p>
              <p className="text-white/20 text-sm">아래 이메일로 상시 지원 가능합니다.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {positions.map((pos, i) => (
                <FadeIn key={pos.id} delay={i * 0.05}>
                  <a
                    href={`mailto:careers@hadeul.com?subject=[지원] ${pos.title}`}
                    className="group py-8 block"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                      <span className="text-purple-400/60 text-xs tracking-[0.3em] uppercase md:w-24 shrink-0">
                        {pos.department}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-xl font-black tracking-tight group-hover:text-purple-400 transition-colors mb-1">
                          {pos.title}
                        </h3>
                        <p className="text-white/30 text-sm">{pos.description}</p>
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="text-white/20 text-xs">{pos.job_type}</span>
                        <span className="text-white/20 text-xs">{pos.location}</span>
                        <span className="text-white/10 group-hover:text-purple-400 transition-colors">&rarr;</span>
                      </div>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          )}
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
