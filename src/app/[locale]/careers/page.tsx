"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";
import { useLocale } from "@/i18n/LocaleContext";
/* 🖼️ 히어로 배경 이미지 경로 */
const CAREERS_HERO_IMAGE = "/images/careers-hero.jpg";

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

/* ─── Values (Hadeul Way) ─── */
const VALUE_KEYS = [
  { num: "01", keyword: "Agility", key: "agile" as const, gradient: "from-purple-500 to-indigo-600" },
  { num: "02", keyword: "User Focus", key: "userCentric" as const, gradient: "from-pink-500 to-rose-600" },
  { num: "03", keyword: "Share & Evolve", key: "shareEvolve" as const, gradient: "from-cyan-500 to-blue-600" },
  { num: "04", keyword: "Ownership", key: "ownership" as const, gradient: "from-amber-500 to-orange-600" },
  { num: "05", keyword: "Innovation", key: "innovative" as const, gradient: "from-emerald-500 to-teal-600" },
  { num: "06", keyword: "Trust", key: "trust" as const, gradient: "from-violet-500 to-purple-600" },
];

/* ─── Process ─── */
const PROCESS_KEYS = [
  { step: "01", key: "review" as const },
  { step: "02", key: "interview" as const },
  { step: "03", key: "join" as const },
];

/* ─── FAQ ─── */
const FAQ_KEYS = [1, 2, 3] as const;

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Value Card (그리드 카드) ─── */
function ValueCard({ value, index }: { value: typeof VALUE_KEYS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { t } = useLocale();

  return (
    <motion.div
      ref={ref}
      className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10 overflow-hidden hover:border-white/[0.12] transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Hover glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} />

      {/* Background number */}
      <span className={`absolute -right-4 -top-6 text-[8rem] font-black leading-none bg-gradient-to-br ${value.gradient} bg-clip-text text-transparent opacity-[0.06] select-none pointer-events-none`}>
        {value.num}
      </span>

      <div className="relative">
        <span className={`inline-block px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full bg-gradient-to-r ${value.gradient} text-white/90 mb-4`}>
          {value.keyword}
        </span>
        <h3 className="text-xl md:text-2xl font-black tracking-tight leading-snug mb-3">
          {t.careers.values[value.key].title}
        </h3>
        <p className="text-white/35 text-sm leading-relaxed whitespace-pre-line">
          {t.careers.values[value.key].desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ─── FAQ Item ─── */
function FAQItem({ faqIndex, index }: { faqIndex: number; index: number }) {
  const [open, setOpen] = useState(false);
  const { t } = useLocale();
  const qKey = `q${faqIndex}` as "q1" | "q2" | "q3";
  const aKey = `a${faqIndex}` as "a1" | "a2" | "a3";

  return (
    <FadeIn delay={index * 0.05}>
      <div className="border-b border-white/[0.06]">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-6 text-left group"
        >
          <span className="text-base md:text-lg font-bold tracking-tight pr-4 group-hover:text-white transition-colors text-white/80">
            {t.careers.faq[qKey]}
          </span>
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 w-8 h-8 rounded-full border border-white/[0.1] flex items-center justify-center text-white/30 group-hover:border-white/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </motion.div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-white/40 text-sm leading-relaxed pb-6 pr-12 whitespace-pre-line">
                {t.careers.faq[aKey]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

/* ─── Job Card ─── */
function JobCard({ pos, index }: { pos: JobPosting; index: number }) {
  const { locale, t } = useLocale();
  return (
    <FadeIn delay={index * 0.06}>
      <Link
        href={`/${locale}/careers/${pos.id}`}
        className="group block rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/20 hover:bg-white/[0.04] transition-all duration-300 p-6 md:p-8"
      >
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {pos.department && (
            <span className="px-2.5 py-0.5 text-[10px] tracking-[0.12em] uppercase text-purple-400/80 bg-purple-500/10 rounded-full font-bold">
              {pos.department}
            </span>
          )}
          {pos.job_type && (
            <span className="px-2.5 py-0.5 text-[10px] tracking-[0.12em] uppercase text-cyan-400/80 bg-cyan-500/10 rounded-full font-bold">
              {pos.job_type}
            </span>
          )}
          {pos.location && (
            <span className="px-2.5 py-0.5 text-[10px] tracking-[0.12em] uppercase text-white/40 bg-white/[0.04] rounded-full font-bold">
              {pos.location}
            </span>
          )}
        </div>
        <h3 className="text-xl font-black tracking-tight mb-2 group-hover:text-purple-300 transition-colors">
          {pos.title}
        </h3>
        {pos.description && (
          <p className="text-white/30 text-sm leading-relaxed line-clamp-2 mb-4">
            {pos.description.replace(/<[^>]*>/g, "")}
          </p>
        )}
        <div className="flex items-center gap-2 text-sm font-bold text-white/20 group-hover:text-purple-400 transition-colors">
          <span>{t.careers.viewDetails}</span>
          <motion.span
            className="inline-block"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </div>
      </Link>
    </FadeIn>
  );
}

export default function CareersPage() {
  const [positions, setPositions] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const { locale, t } = useLocale();

  useEffect(() => {
    fetch("/api/careers?active=1")
      .then((r) => r.json())
      .then((d) => {
        setPositions(d.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* Split heroTitle by newline for multi-line rendering */
  const heroLines = t.careers.heroTitle.split("\n");

  return (
    <div className="bg-black text-white min-h-screen">
      <Nav />

      {/* ── Hero (풀스크린, 비주얼 임팩트) ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background image */}
        {CAREERS_HERO_IMAGE && (
          <>
            <img
              src={CAREERS_HERO_IMAGE}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
          </>
        )}

        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 40%, transparent 70%)",
          }}
          animate={{
            background: [
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 40%, transparent 70%)",
              "radial-gradient(ellipse 80% 60% at 40% 50%, rgba(236,72,153,0.12) 0%, rgba(6,182,212,0.06) 40%, transparent 70%)",
              "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(6,182,212,0.12) 0%, rgba(139,92,246,0.06) 40%, transparent 70%)",
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(139,92,246,0.12) 0%, rgba(236,72,153,0.06) 40%, transparent 70%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.95] tracking-tighter mb-8">
              {heroLines.map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {i === 1 ? (
                    <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>
          </motion.div>

          <motion.p
            className="text-white/35 text-lg md:text-xl max-w-lg mx-auto mb-12 whitespace-pre-line"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t.careers.heroDesc}
          </motion.p>

          <motion.a
            href="#positions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full text-white font-bold text-base overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-[length:200%_200%]"
              style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)" }}
              animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="relative">{t.careers.viewOpenings}</span>
            <motion.span
              className="relative"
              animate={{ y: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ↓
            </motion.span>
          </motion.a>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* ── Hadeul Way (Values) ── */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4">Hadeul Way</p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
              {t.careers.wayTitle}
            </h2>
            <p className="text-white/35 text-lg max-w-xl mb-20">
              {t.careers.waySubtitle}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALUE_KEYS.map((v, i) => (
              <ValueCard key={v.keyword} value={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Hiring Process ── */}
      <section className="py-24 px-6 bg-[#050505]">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-pink-400 text-sm tracking-[0.4em] uppercase mb-4">Process</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">{t.careers.processTitle}</h2>
            </div>
          </FadeIn>
          <div className="relative">
            <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
              {PROCESS_KEYS.map((p, i) => (
                <FadeIn key={p.step} delay={i * 0.1}>
                  <div className="relative text-center group">
                    <motion.div
                      className="relative mx-auto mb-5 w-20 h-20 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-purple-500/30 transition-all duration-300"
                      whileHover={{ scale: 1.08 }}
                    >
                      <span className="text-xl font-black bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {p.step}
                      </span>
                      <motion.div
                        className="absolute inset-0 rounded-full border border-purple-500/0 group-hover:border-purple-500/20"
                        animate={{ scale: [1, 1.2, 1], opacity: [0, 0.4, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                      />
                    </motion.div>
                    {i < PROCESS_KEYS.length - 1 && (
                      <motion.div
                        className="hidden md:block absolute top-10 -right-2 z-10"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                      >
                        <span className="text-white/10 text-lg">&rarr;</span>
                      </motion.div>
                    )}
                    <h4 className="text-lg font-black tracking-tight mb-1 group-hover:text-purple-300 transition-colors">{t.careers.steps[p.key].title}</h4>
                    <p className="text-white/30 text-sm">{t.careers.steps[p.key].desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Open Positions ── */}
      <section className="py-24 px-6 bg-black" id="positions">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div>
                <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4">Open Positions</p>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">{t.careers.openPositions}</h2>
              </div>
              {positions.length > 0 && (
                <p className="text-white/30 text-sm">
                  {t.careers.totalPrefix} <span className="text-white font-bold">{positions.length}</span>{t.careers.positionsSuffix}
                </p>
              )}
            </div>
          </FadeIn>

          {loading ? (
            <div className="text-center py-20 text-white/20">{t.careers.loading}</div>
          ) : positions.length === 0 ? (
            <FadeIn>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-12 md:p-16 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                  <svg className="w-7 h-7 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.193 23.193 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-black mb-2">{t.careers.noPositionsTitle}</h3>
                <p className="text-white/30 text-sm mb-8 max-w-sm mx-auto">
                  {t.careers.noPositionsDesc}
                </p>
                <a
                  href="mailto:hadeulsoft@gmail.com?subject=[상시지원] 이력서 제출"
                  className="group/btn relative inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-bold text-sm overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-[length:200%_200%]"
                    style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)" }}
                    animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="relative">{t.careers.applyAnytime}</span>
                  <motion.span className="relative" animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                </a>
              </div>
            </FadeIn>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {positions.map((pos, i) => (
                <JobCard key={pos.id} pos={pos} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-6 bg-[#050505]">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-cyan-400 text-sm tracking-[0.4em] uppercase mb-4">FAQ</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">{t.careers.faq.title}</h2>
            </div>
          </FadeIn>
          <div>
            {FAQ_KEYS.map((faqIdx, i) => (
              <FAQItem key={faqIdx} faqIndex={faqIdx} index={i} />
            ))}
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
