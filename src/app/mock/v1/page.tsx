"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useInView, animate, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";

const IMG = {
  ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
  game: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=1200&q=80",
  solution: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
};

const VID = {
  hero: "https://videos.pexels.com/video-files/3141208/3141208-uhd_2560_1440_25fps.mp4",
  ai: "https://videos.pexels.com/video-files/8721940/8721940-uhd_2560_1440_24fps.mp4",
};

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  useEffect(() => {
    if (isInView) animate(count, target, { duration: 2, ease: "easeOut", onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v) + suffix; } });
  }, [isInView, count, target, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

function StickyScene({ children, height = "300vh" }: { children: (p: any) => React.ReactNode; height?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} style={{ height }} className="relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">{children(scrollYProgress)}</div>
    </div>
  );
}

/* ─── Hero with video ─── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.85]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
        <source src={VID.hero} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/70 via-[#0a0a0f]/50 to-[#0a0a0f]" />
      <motion.div className="absolute w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[160px]" animate={{ x: [0, 60, 0], y: [0, -40, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />

      <motion.div style={{ opacity, scale }} className="relative z-10 text-center px-6">
        <motion.p className="text-white/40 text-sm tracking-[0.4em] uppercase mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          AI · Game · Solution
        </motion.p>
        <motion.h1 className="text-[clamp(3rem,8vw,8rem)] font-bold leading-[1.05] mb-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15 }}>
          <span className="text-white">기술로 만드는</span><br />
          <span className="gradient-text">새로운 경험</span>
        </motion.h1>
        <motion.p className="text-white/40 text-lg md:text-xl max-w-lg mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>
          하들은 인공지능, 게임, 소프트웨어 솔루션으로<br className="hidden md:block" />디지털 혁신을 이끌어갑니다.
        </motion.p>
      </motion.div>

      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        <span className="text-white/30 text-xs tracking-[0.2em] uppercase">Scroll</span>
        <motion.div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
      </motion.div>
    </section>
  );
}

/* ─── Intro Story: text + background image transitions ─── */
function IntroStory() {
  return (
    <StickyScene height="400vh">
      {(progress: any) => {
        const o1 = useTransform(progress, [0, 0.08, 0.18, 0.25], [0, 1, 1, 0]);
        const o2 = useTransform(progress, [0.25, 0.33, 0.43, 0.50], [0, 1, 1, 0]);
        const o3 = useTransform(progress, [0.50, 0.58, 0.68, 0.75], [0, 1, 1, 0]);
        const o4 = useTransform(progress, [0.75, 0.83, 0.93, 1], [0, 1, 1, 0.8]);
        const y1 = useTransform(progress, [0, 0.08, 0.18, 0.25], [40, 0, 0, -30]);
        const y2 = useTransform(progress, [0.25, 0.33, 0.43, 0.50], [40, 0, 0, -30]);
        const y3 = useTransform(progress, [0.50, 0.58, 0.68, 0.75], [40, 0, 0, -30]);
        const y4 = useTransform(progress, [0.75, 0.83, 0.93, 1], [40, 0, 0, 0]);

        // Background images fade in/out per scene
        const bgO1 = useTransform(progress, [0, 0.08, 0.22, 0.28], [0, 0.2, 0.2, 0]);
        const bgO2 = useTransform(progress, [0.25, 0.33, 0.47, 0.53], [0, 0.2, 0.2, 0]);
        const bgO3 = useTransform(progress, [0.50, 0.58, 0.72, 0.78], [0, 0.25, 0.25, 0]);

        return (
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Background images that change per scene */}
            <motion.img src={IMG.ai} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: bgO1 }} />
            <motion.img src={IMG.game} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: bgO2 }} />
            <motion.img src={IMG.solution} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: bgO3 }} />
            <div className="absolute inset-0 bg-[#0a0a0f]/70" />

            <motion.div className="absolute w-[500px] h-[500px] rounded-full blur-[150px]" style={{ opacity: useTransform(progress, [0, 0.5, 1], [0.1, 0.15, 0.1]), background: "radial-gradient(circle, rgba(99,102,241,0.3), transparent)", x: useTransform(progress, [0, 1], [-200, 200]) }} />

            <motion.div style={{ opacity: o1, y: y1 }} className="absolute text-center px-6">
              <p className="text-white/40 text-sm tracking-[0.3em] uppercase mb-4">We Believe</p>
              <h2 className="text-[clamp(2rem,6vw,5.5rem)] font-bold text-white leading-[1.1]">
                모든 사람이 AI의<br /><span className="gradient-text">가치를 체감</span>할 수 있도록
              </h2>
            </motion.div>

            <motion.div style={{ opacity: o2, y: y2 }} className="absolute text-center px-6">
              <p className="text-white/40 text-sm tracking-[0.3em] uppercase mb-4">We Create</p>
              <h2 className="text-[clamp(2rem,6vw,5.5rem)] font-bold text-white leading-[1.1]">
                게임을 넘어선<br /><span className="gradient-text-warm">몰입의 경험</span>을 만듭니다
              </h2>
            </motion.div>

            <motion.div style={{ opacity: o3, y: y3 }} className="absolute text-center px-6">
              <p className="text-white/40 text-sm tracking-[0.3em] uppercase mb-4">We Solve</p>
              <h2 className="text-[clamp(2rem,6vw,5.5rem)] font-bold text-white leading-[1.1]">
                기술로 비즈니스의<br /><span className="gradient-text-green">본질적 문제</span>를 해결합니다
              </h2>
            </motion.div>

            <motion.div style={{ opacity: o4, y: y4 }} className="absolute text-center px-6">
              <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase mb-4">HADEUL</p>
              <h2 className="text-[clamp(2.5rem,7vw,7rem)] font-bold gradient-text leading-[1.05]">
                We Build<br />the Future
              </h2>
            </motion.div>
          </div>
        );
      }}
    </StickyScene>
  );
}

/* ─── Services: horizontal scroll with images ─── */
function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "-66.666%"]);

  const items = [
    { num: "01", title: "AI Solutions", desc: "자연어 처리, 컴퓨터 비전, 생성형 AI 등\n최신 인공지능 기술 기반 솔루션", img: IMG.ai, accent: "text-indigo-400" },
    { num: "02", title: "Game Dev", desc: "몰입감 넘치는 게임 경험 설계,\n크로스 플랫폼 게임 개발", img: IMG.game, accent: "text-amber-400" },
    { num: "03", title: "Solutions", desc: "기업 맞춤형 소프트웨어,\n클라우드 인프라, 데이터 파이프라인", img: IMG.solution, accent: "text-emerald-400" },
  ];

  return (
    <div ref={ref} className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <motion.div className="px-8 md:px-16 mb-8" style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}>
          <p className="text-white/30 text-sm tracking-[0.3em] uppercase mb-2">What We Do</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Services</h2>
        </motion.div>

        <motion.div style={{ x }} className="flex gap-8 px-8 md:px-16">
          {items.map((s) => (
            <div key={s.num} className="min-w-[85vw] md:min-w-[50vw] h-[55vh] rounded-3xl flex-shrink-0 relative overflow-hidden group">
              <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="relative z-10 h-full p-10 md:p-16 flex flex-col justify-between">
                <span className={`${s.accent} text-sm font-mono tracking-wider`}>{s.num}</span>
                <div>
                  <h3 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-4">{s.title}</h3>
                  <p className="text-white/50 text-lg leading-relaxed whitespace-pre-line max-w-md">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Video Feature Section ─── */
function VideoFeature() {
  return (
    <section className="relative h-[80vh] overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-50">
        <source src={VID.ai} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <motion.div className="relative z-10 h-full flex items-center px-8 md:px-16" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <div className="max-w-xl">
          <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase mb-4">Featured</p>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">AI 엔진으로<br />미래를 설계하다</h2>
          <p className="text-white/40 text-lg leading-relaxed mb-8">자체 개발 AI 엔진을 기반으로, 기업과 사용자 모두를 위한 차세대 솔루션을 만들어가고 있습니다.</p>
          <a href="#" className="inline-flex items-center gap-2 text-white border-b border-white/30 pb-1 hover:border-white transition-colors">자세히 보기 <span>→</span></a>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Photo Grid ─── */
function PhotoGrid() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
          <p className="text-white/30 text-sm tracking-[0.3em] uppercase mb-2">Culture</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">우리가 일하는 방식</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[IMG.team, IMG.office, IMG.ai, IMG.game, IMG.solution, IMG.team].map((src, i) => (
            <motion.div key={i} className={`overflow-hidden rounded-2xl ${i === 0 || i === 5 ? "row-span-2" : ""}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <img src={src} alt="" className="w-full h-full object-cover min-h-[200px] hover:scale-110 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
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
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-cyan-500/5" />
      <div className="relative max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-16">
        {stats.map((s, i) => (
          <motion.div key={s.label} className="text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <div className="text-5xl md:text-7xl font-bold gradient-text mb-3"><Counter target={s.num} suffix={s.suffix} /></div>
            <p className="text-white/40 text-sm">{s.label}</p>
          </motion.div>
        ))}
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
        <motion.div className="flex items-end justify-between mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div>
            <p className="text-white/30 text-sm tracking-[0.3em] uppercase mb-2">News</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">새로운 소식</h2>
          </div>
        </motion.div>
        <div className="divide-y divide-white/5">
          {news.map((n, i) => (
            <motion.article key={n.title} className="group py-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-12 cursor-pointer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <span className="text-white/20 text-sm font-mono shrink-0 w-24">{n.date}</span>
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors flex-1">{n.title}</h3>
              <p className="text-white/30 text-sm max-w-sm">{n.summary}</p>
              <span className="text-white/20 group-hover:text-indigo-400 transition-colors text-xl hidden md:block">→</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
function CTA() {
  return (
    <section className="py-40 px-6 relative overflow-hidden">
      <motion.div className="absolute w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[160px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} />
      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">프로젝트를<br /><span className="gradient-text">시작해볼까요?</span></h2>
          <p className="text-white/40 text-lg mb-12 max-w-md mx-auto">프로젝트 문의, 파트너십, 채용 등 무엇이든 편하게 연락주세요.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a href="mailto:info@hadeul.com" className="px-10 py-4 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white font-medium text-lg transition-colors" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>문의하기</motion.a>
            <Link href="/mock" className="px-10 py-4 border border-white/10 hover:border-white/30 rounded-full text-white font-medium text-lg transition-colors text-center">← 시안 목록</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function V1() {
  return (
    <div className="bg-[#0a0a0f] text-white">
      <Hero />
      <IntroStory />
      <Services />
      <VideoFeature />
      <PhotoGrid />
      <Stats />
      <News />
      <CTA />
    </div>
  );
}
