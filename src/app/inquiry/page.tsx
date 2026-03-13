"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";
import { InquiryHeroBg, VideoHeroBg } from "@/components/HeroBackgrounds";

const INQUIRY_HERO_VIDEO = "/videos/contact-hero.mp4";

const inquiryTypes = [
  {
    title: "프로젝트 문의",
    desc: "AI, 게임, 소프트웨어 개발 프로젝트에 대해 상담하세요.",
    icon: "01",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    title: "파트너십",
    desc: "기술 파트너십, 공동 사업, 투자 등의 협력을 논의합니다.",
    icon: "02",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    title: "채용 문의",
    desc: "채용 관련 문의나 이력서를 보내주세요.",
    icon: "03",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    title: "기타 문의",
    desc: "그 외 일반적인 문의사항을 남겨주세요.",
    icon: "04",
    gradient: "from-amber-500 to-orange-600",
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

function InquiryForm() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          _hp: honeypot, // honeypot field
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || "전송에 실패했습니다.");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", type: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-2xl">
          &#10003;
        </div>
        <h3 className="text-2xl font-black mb-3">문의가 접수되었습니다</h3>
        <p className="text-white/40 mb-8">빠른 시일 내에 답변 드리겠습니다.</p>
        <button
          onClick={() => setStatus("idle")}
          className="px-8 py-3 border border-white/10 rounded-full text-white/60 hover:text-white btn-glow-outline"
        >
          추가 문의하기
        </button>
      </motion.div>
    );
  }

  const inputClass =
    "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-colors";

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Honeypot — hidden from users, bots fill it */}
      <div className="absolute opacity-0 -z-10" aria-hidden="true">
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white/30 text-sm mb-2">이름 / 회사명</label>
          <input
            type="text"
            required
            className={inputClass}
            placeholder="홍길동 / (주)하들소프트"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-white/30 text-sm mb-2">이메일</label>
          <input
            type="email"
            required
            className={inputClass}
            placeholder="hello@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-white/30 text-sm mb-2">문의 유형</label>
        <select
          required
          className={`${inputClass} ${form.type ? "text-white" : "text-white/30"}`}
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="" className="bg-[#1a1a1a] text-white/30">선택하세요</option>
          <option value="project" className="bg-[#1a1a1a] text-white">프로젝트 문의</option>
          <option value="partnership" className="bg-[#1a1a1a] text-white">파트너십</option>
          <option value="careers" className="bg-[#1a1a1a] text-white">채용 문의</option>
          <option value="other" className="bg-[#1a1a1a] text-white">기타</option>
        </select>
      </div>

      <div>
        <label className="block text-white/30 text-sm mb-2">내용</label>
        <textarea
          required
          rows={6}
          className={`${inputClass} resize-none`}
          placeholder="프로젝트 내용이나 문의사항을 자유롭게 작성해주세요."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>

      {status === "error" && (
        <p className="text-red-400 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full text-white font-bold text-lg btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "전송 중..." : "문의 보내기"}
      </button>
    </form>
  );
}

export default function InquiryPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.6], [1, 0.92]);
  const heroY = useTransform(heroScroll, [0, 0.6], [0, -80]);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Nav />

      {/* Hero — Fullscreen */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {INQUIRY_HERO_VIDEO && <VideoHeroBg src={INQUIRY_HERO_VIDEO} overlay={0.65} />}
        <InquiryHeroBg />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.p
            className="text-purple-400 text-sm tracking-[0.5em] uppercase mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Inquiry
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              className="text-7xl md:text-9xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter"
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              LET&apos;S
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              className="text-7xl md:text-9xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent"
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              TALK
            </motion.h1>
          </div>

          <motion.p
            className="text-white/35 text-lg md:text-xl max-w-lg mx-auto mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            프로젝트, 파트너십, 채용 등 무엇이든 편하게 연락하세요.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            className="mt-16 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            <motion.div
              className="w-px h-8 bg-gradient-to-b from-purple-500/50 to-transparent"
              animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Inquiry Types */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4">Services</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-16">어떤 문의를 하시겠어요?</h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {inquiryTypes.map((t, i) => (
              <FadeIn key={t.title} delay={i * 0.08}>
                <div className="group relative rounded-2xl p-8 bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} />
                  <span className={`absolute -right-3 -top-4 text-[7rem] font-black leading-none bg-gradient-to-br ${t.gradient} bg-clip-text text-transparent opacity-[0.06] select-none pointer-events-none`}>
                    {t.icon}
                  </span>
                  <div className="relative">
                    <h3 className="text-2xl font-black tracking-tight mb-3 group-hover:text-white transition-colors">
                      {t.title}
                    </h3>
                    <p className="text-white/45 text-base leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 px-6 bg-[#050505]">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-4">Contact Form</p>
            <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">직접 문의하기</h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <InquiryForm />
          </FadeIn>
        </div>
      </section>

      {/* Office Info */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <p className="text-purple-400 text-xs tracking-[0.3em] uppercase mb-3">Address</p>
                <p className="text-white/60 leading-relaxed">대전시 유성구 대학로 31,<br /> 2118호(봉명동, 한진리조트)</p>
              </div>
              <div>
                <p className="text-purple-400 text-xs tracking-[0.3em] uppercase mb-3">Email</p>
                <p className="text-white/60">hadeulsoft@gmail.com</p>
              </div>
              <div>
                <p className="text-purple-400 text-xs tracking-[0.3em] uppercase mb-3">Hours</p>
                <p className="text-white/60">Mon — Fri, 09:00 — 18:00</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
