"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";
import { InquiryHeroBg, VideoHeroBg } from "@/components/HeroBackgrounds";
import { useLocale } from "@/i18n/LocaleContext";

const INQUIRY_HERO_VIDEO = "/videos/contact-hero.mp4";

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
  const { locale, t } = useLocale();
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
        setErrorMsg(data.error || t.inquiry.errorSend);
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", type: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg(t.inquiry.errorNetwork);
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
        <h3 className="text-2xl font-black mb-3">{t.inquiry.successTitle}</h3>
        <p className="text-white/40 mb-8">{t.inquiry.successDesc}</p>
        <button
          onClick={() => setStatus("idle")}
          className="px-8 py-3 border border-white/10 rounded-full text-white/60 hover:text-white btn-glow-outline"
        >
          {t.inquiry.submitAnother}
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
          <label className="block text-white/30 text-sm mb-2">{t.inquiry.labelName}</label>
          <input
            type="text"
            required
            className={inputClass}
            placeholder={t.inquiry.placeholderName}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-white/30 text-sm mb-2">{t.inquiry.labelEmail}</label>
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
        <label className="block text-white/30 text-sm mb-2">{t.inquiry.labelType}</label>
        <select
          required
          className={`${inputClass} ${form.type ? "text-white" : "text-white/30"}`}
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="" className="bg-[#1a1a1a] text-white/30">{t.inquiry.selectPlaceholder}</option>
          <option value="project" className="bg-[#1a1a1a] text-white">{t.inquiry.optProject}</option>
          <option value="partnership" className="bg-[#1a1a1a] text-white">{t.inquiry.optPartnership}</option>
          <option value="careers" className="bg-[#1a1a1a] text-white">{t.inquiry.optRecruitment}</option>
          <option value="other" className="bg-[#1a1a1a] text-white">{t.inquiry.optOther}</option>
        </select>
      </div>

      <div>
        <label className="block text-white/30 text-sm mb-2">{t.inquiry.labelMessage}</label>
        <textarea
          required
          rows={6}
          className={`${inputClass} resize-none`}
          placeholder={t.inquiry.placeholderMessage}
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
        {status === "sending" ? t.inquiry.sending : t.inquiry.submit}
      </button>
    </form>
  );
}

export default function InquiryPage() {
  const { locale, t } = useLocale();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.6], [1, 0.92]);
  const heroY = useTransform(heroScroll, [0, 0.6], [0, -80]);

  const inquiryTypes = [
    {
      title: t.inquiry.types.project.title,
      desc: t.inquiry.types.project.desc,
      icon: "01",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      title: t.inquiry.types.partnership.title,
      desc: t.inquiry.types.partnership.desc,
      icon: "02",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      title: t.inquiry.types.recruitment.title,
      desc: t.inquiry.types.recruitment.desc,
      icon: "03",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      title: t.inquiry.types.other.title,
      desc: t.inquiry.types.other.desc,
      icon: "04",
      gradient: "from-amber-500 to-orange-600",
    },
  ];

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
            {t.inquiry.heroDesc}
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
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-16">{t.inquiry.typeHeading}</h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {inquiryTypes.map((item, i) => (
              <FadeIn key={item.icon} delay={i * 0.08}>
                <div className="group relative rounded-2xl p-8 bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500`} />
                  <span className={`absolute -right-3 -top-4 text-[7rem] font-black leading-none bg-gradient-to-br ${item.gradient} bg-clip-text text-transparent opacity-[0.06] select-none pointer-events-none`}>
                    {item.icon}
                  </span>
                  <div className="relative">
                    <h3 className="text-2xl font-black tracking-tight mb-3 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/45 text-base leading-relaxed">{item.desc}</p>
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
            <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tight">{t.inquiry.formTitle}</h2>
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
                <p className="text-white/60 leading-relaxed">{t.inquiry.address}</p>
              </div>
              <div>
                <p className="text-purple-400 text-xs tracking-[0.3em] uppercase mb-3">Email</p>
                <p className="text-white/60">hadeulsoft@gmail.com</p>
              </div>
              <div>
                <p className="text-purple-400 text-xs tracking-[0.3em] uppercase mb-3">Hours</p>
                <p className="text-white/60">{t.inquiry.hours}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
