"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useInView, animate, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";

/* ─── Animated Counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);

  useEffect(() => {
    if (isInView) {
      animate(count, target, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v) => {
          if (ref.current) ref.current.textContent = Math.round(v) + suffix;
        },
      });
    }
  }, [isInView, count, target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ─── Sticky Text Scene ─── */
function StickyScene({
  children,
  height = "300vh",
}: {
  children: (progress: ReturnType<typeof useTransform<number, number>>) => React.ReactNode;
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

/* ─── Hero ─── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.85]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-surface" />
      <motion.div
        className="absolute w-[800px] h-[800px] bg-primary/8 rounded-full blur-[160px]"
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] bg-accent/6 rounded-full blur-[140px] translate-x-40"
        animate={{ x: [40, -30, 40], y: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div style={{ opacity, scale }} className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-text-secondary text-sm tracking-[0.4em] uppercase mb-8">
            AI · Game · Solution
          </p>
        </motion.div>

        <motion.h1
          className="text-[clamp(3rem,8vw,8rem)] font-bold leading-[1.05] mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-text-primary">기술로 만드는</span>
          <br />
          <span className="gradient-text">새로운 경험</span>
        </motion.h1>

        <motion.p
          className="text-text-secondary text-lg md:text-xl max-w-lg mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          하들은 인공지능, 게임, 소프트웨어 솔루션으로
          <br className="hidden md:block" />
          디지털 혁신을 이끌어갑니다.
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-text-secondary text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-text-secondary/60 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

/* ─── Intro Story (sticky text transition) ─── */
function IntroStory() {
  return (
    <StickyScene height="400vh">
      {(progress) => {
        const o1 = useTransform(progress, [0, 0.1, 0.2, 0.28], [0, 1, 1, 0]);
        const o2 = useTransform(progress, [0.25, 0.35, 0.45, 0.53], [0, 1, 1, 0]);
        const o3 = useTransform(progress, [0.5, 0.6, 0.7, 0.78], [0, 1, 1, 0]);
        const o4 = useTransform(progress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 0.8]);

        const y1 = useTransform(progress, [0, 0.1, 0.2, 0.28], [40, 0, 0, -30]);
        const y2 = useTransform(progress, [0.25, 0.35, 0.45, 0.53], [40, 0, 0, -30]);
        const y3 = useTransform(progress, [0.5, 0.6, 0.7, 0.78], [40, 0, 0, -30]);
        const y4 = useTransform(progress, [0.75, 0.85, 0.95, 1], [40, 0, 0, 0]);

        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              className="absolute w-[500px] h-[500px] rounded-full blur-[150px]"
              style={{
                opacity: useTransform(progress, [0, 0.5, 1], [0.1, 0.15, 0.1]),
                background: "radial-gradient(circle, rgba(99,102,241,0.3), transparent)",
                x: useTransform(progress, [0, 1], [-200, 200]),
              }}
            />

            <motion.div style={{ opacity: o1, y: y1 }} className="absolute text-center px-6">
              <p className="text-text-secondary text-sm tracking-[0.3em] uppercase mb-4">We Believe</p>
              <h2 className="text-[clamp(2rem,6vw,5.5rem)] font-bold text-text-primary leading-[1.1]">
                모든 사람이 AI의
                <br />
                <span className="gradient-text">가치를 체감</span>할 수 있도록
              </h2>
            </motion.div>

            <motion.div style={{ opacity: o2, y: y2 }} className="absolute text-center px-6">
              <p className="text-text-secondary text-sm tracking-[0.3em] uppercase mb-4">We Create</p>
              <h2 className="text-[clamp(2rem,6vw,5.5rem)] font-bold text-text-primary leading-[1.1]">
                게임을 넘어선
                <br />
                <span className="gradient-text-warm">몰입의 경험</span>을 만듭니다
              </h2>
            </motion.div>

            <motion.div style={{ opacity: o3, y: y3 }} className="absolute text-center px-6">
              <p className="text-text-secondary text-sm tracking-[0.3em] uppercase mb-4">We Solve</p>
              <h2 className="text-[clamp(2rem,6vw,5.5rem)] font-bold text-text-primary leading-[1.1]">
                기술로 비즈니스의
                <br />
                <span className="gradient-text-green">본질적 문제</span>를 해결합니다
              </h2>
            </motion.div>

            <motion.div style={{ opacity: o4, y: y4 }} className="absolute text-center px-6">
              <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">HADEUL</p>
              <h2 className="text-[clamp(2.5rem,7vw,7rem)] font-bold gradient-text leading-[1.05]">
                We Build
                <br />
                the Future
              </h2>
            </motion.div>
          </div>
        );
      }}
    </StickyScene>
  );
}

/* ─── Services (Horizontal scroll) ─── */
function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const services = [
    {
      num: "01",
      title: "AI Solutions",
      desc: "자연어 처리, 컴퓨터 비전, 생성형 AI 등\n최신 인공지능 기술 기반 솔루션",
      gradient: "from-indigo-500/20 to-violet-500/20",
      accent: "text-indigo-400",
    },
    {
      num: "02",
      title: "Game Dev",
      desc: "몰입감 넘치는 게임 경험 설계,\n크로스 플랫폼 게임 개발",
      gradient: "from-amber-500/20 to-red-500/20",
      accent: "text-amber-400",
    },
    {
      num: "03",
      title: "Solutions",
      desc: "기업 맞춤형 소프트웨어,\n클라우드 인프라, 데이터 파이프라인",
      gradient: "from-emerald-500/20 to-cyan-500/20",
      accent: "text-emerald-400",
    },
  ];

  const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-66.666%"]);

  return (
    <div ref={ref} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <motion.div
          className="px-8 md:px-16 mb-12"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
        >
          <p className="text-text-secondary text-sm tracking-[0.3em] uppercase mb-2">What We Do</p>
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary">Services</h2>
        </motion.div>

        <motion.div style={{ x }} className="flex gap-8 px-8 md:px-16">
          {services.map((s) => (
            <div
              key={s.num}
              className="min-w-[80vw] md:min-w-[50vw] h-[50vh] rounded-3xl flex-shrink-0"
            >
              <div className={`w-full h-full rounded-3xl bg-gradient-to-br ${s.gradient} p-10 md:p-16 flex flex-col justify-between`}>
                <div>
                  <span className={`${s.accent} text-sm font-mono tracking-wider`}>{s.num}</span>
                  <h3 className="text-4xl md:text-6xl font-bold text-text-primary mt-4">{s.title}</h3>
                </div>
                <p className="text-text-secondary text-lg md:text-xl leading-relaxed whitespace-pre-line max-w-md">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Stats ─── */
function Stats() {
  const stats = [
    { num: 50, suffix: "+", label: "프로젝트 완료" },
    { num: 20, suffix: "+", label: "팀 멤버" },
    { num: 10, suffix: "+", label: "파트너사" },
    { num: 3, suffix: "+", label: "글로벌 거점" },
  ];

  return (
    <section className="py-40 px-6 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="text-5xl md:text-7xl font-bold gradient-text mb-3">
                <Counter target={s.num} suffix={s.suffix} />
              </div>
              <p className="text-text-secondary text-sm md:text-base">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── News ─── */
function News() {
  const news = [
    { date: "2026.03", title: "AI 기반 신규 솔루션 출시 예정", summary: "차세대 AI 엔진을 활용한 새로운 서비스가 곧 공개됩니다." },
    { date: "2026.02", title: "글로벌 게임 파트너십 체결", summary: "해외 주요 퍼블리셔와의 전략적 파트너십을 체결했습니다." },
    { date: "2026.01", title: "시리즈 A 투자 유치", summary: "기술력과 성장 가능성을 인정받아 주요 VC로부터 투자를 유치했습니다." },
  ];

  return (
    <section className="py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-end justify-between mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-text-secondary text-sm tracking-[0.3em] uppercase mb-2">News</p>
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary">새로운 소식</h2>
          </div>
          <Link href="#" className="text-text-secondary hover:text-text-primary text-sm tracking-wider transition-colors hidden md:block">
            전체보기 →
          </Link>
        </motion.div>

        <div className="space-y-0 divide-y divide-white/5">
          {news.map((n, i) => (
            <motion.article
              key={n.title}
              className="group py-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-12 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="text-text-secondary text-sm font-mono shrink-0 w-24">{n.date}</span>
              <h3 className="text-xl md:text-2xl font-bold text-text-primary group-hover:text-primary transition-colors flex-1">
                {n.title}
              </h3>
              <p className="text-text-secondary text-sm md:text-base max-w-sm">{n.summary}</p>
              <span className="text-text-secondary group-hover:text-primary transition-colors text-xl hidden md:block">→</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Marquee ─── */
function Marquee() {
  return (
    <div className="py-20 overflow-hidden border-y border-white/5">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 mr-12">
            {["Artificial Intelligence", "Game Development", "Cloud Solutions", "Data Pipeline", "Machine Learning", "Cross Platform"].map((t) => (
              <span key={t + i} className="text-3xl md:text-5xl font-bold text-white/[0.03] select-none">
                {t}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section className="py-40 px-6 relative overflow-hidden">
      <motion.div
        className="absolute w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
            프로젝트를
            <br />
            <span className="gradient-text">시작해볼까요?</span>
          </h2>
          <p className="text-text-secondary text-lg mb-12 max-w-md mx-auto">
            프로젝트 문의, 파트너십, 채용 등
            무엇이든 편하게 연락주세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="mailto:info@hadeul.com"
              className="px-10 py-4 bg-primary hover:bg-primary-dark rounded-full text-white font-medium text-lg transition-colors"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              문의하기
            </motion.a>
            <Link
              href="/about"
              className="px-10 py-4 border border-white/10 hover:border-white/30 rounded-full text-text-primary font-medium text-lg transition-colors text-center"
            >
              회사 소개
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Main ─── */
export default function Home() {
  return (
    <>
      <Hero />
      <IntroStory />
      <Marquee />
      <Services />
      <Stats />
      <News />
      <CTA />
    </>
  );
}
