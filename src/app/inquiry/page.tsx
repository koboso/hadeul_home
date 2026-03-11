"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";
import { InquiryHeroBg } from "@/components/HeroBackgrounds";

const inquiryTypes = [
  {
    title: "프로젝트 문의",
    desc: "AI, 게임, 소프트웨어 개발 프로젝트에 대해 상담하세요.",
    email: "info@hadeul.com",
    icon: "01",
  },
  {
    title: "파트너십",
    desc: "기술 파트너십, 공동 사업, 투자 등의 협력을 논의합니다.",
    email: "biz@hadeul.com",
    icon: "02",
  },
  {
    title: "채용 문의",
    desc: "채용 관련 문의나 이력서를 보내주세요.",
    email: "careers@hadeul.com",
    icon: "03",
  },
  {
    title: "기타 문의",
    desc: "그 외 일반적인 문의사항을 남겨주세요.",
    email: "info@hadeul.com",
    icon: "04",
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
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-16 overflow-hidden">
        <InquiryHeroBg />
        <div className="relative z-10 text-center px-6">
          <motion.p
            className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Inquiry
          </motion.p>
          <motion.h1
            className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            LET&apos;S
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              TALK
            </span>
          </motion.h1>
          <motion.p
            className="text-white/40 text-lg max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            프로젝트, 파트너십, 채용 등 무엇이든 편하게 연락하세요.
          </motion.p>
        </div>
      </section>

      {/* Inquiry Types */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {inquiryTypes.map((t, i) => (
            <FadeIn key={t.title} delay={i * 0.1}>
              <a
                href={`mailto:${t.email}`}
                className="group block rounded-2xl p-8 bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/30 transition-all duration-300"
              >
                <span className="text-white/10 text-5xl font-black">{t.icon}</span>
                <h3 className="text-xl font-black mt-4 mb-2 tracking-tight group-hover:text-purple-400 transition-colors">
                  {t.title}
                </h3>
                <p className="text-white/40 text-sm mb-4">{t.desc}</p>
                <span className="text-purple-400/60 text-sm font-mono">{t.email}</span>
              </a>
            </FadeIn>
          ))}
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
                <p className="text-white/60 leading-relaxed">경기도 성남시 분당구<br />판교역로 000, 0층</p>
              </div>
              <div>
                <p className="text-purple-400 text-xs tracking-[0.3em] uppercase mb-3">Email</p>
                <p className="text-white/60">info@hadeul.com</p>
              </div>
              <div>
                <p className="text-purple-400 text-xs tracking-[0.3em] uppercase mb-3">Hours</p>
                <p className="text-white/60">Mon — Fri, 10:00 — 19:00</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
