"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useMemo, lazy, Suspense } from "react";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";
import { InquiryHeroBg, VideoHeroBg } from "@/components/HeroBackgrounds";
import { useLocale } from "@/i18n/LocaleContext";

const TurnstileWidget = lazy(() => import("@/components/TurnstileWidget"));

const INQUIRY_HERO_VIDEO = "/videos/contact-hero.mp4";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

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

/* ─── Inquiry Form ─── */
function InquiryForm() {
  const { t } = useLocale();
  const [form, setForm] = useState({
    company: "", name: "", phone: "", email: "", type: "", content: "", privacyConsent: false,
  });
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  /* ─── Phone auto-dash: only digits, auto-format as 010-0000-0000 ─── */
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  };

  /* ─── Name validation: only Korean/English/spaces ─── */
  const filterName = (value: string) => value.replace(/[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s]/g, "");

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid = useMemo(() => {
    return (
      form.privacyConsent &&
      form.name.trim().length >= 2 &&
      isValidEmail(form.email) &&
      form.content.trim() !== "" &&
      (TURNSTILE_SITE_KEY ? turnstileToken !== "" : true) &&
      status !== "sending"
    );
  }, [form, turnstileToken, status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          turnstileToken,
          _hp: honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        const errorMap: Record<string, string> = {
          too_many_requests: t.inquiry.errorTooMany,
          turnstile_required: t.inquiry.errorTurnstile,
          turnstile_failed: t.inquiry.errorTurnstile,
          required_fields: t.inquiry.errorRequired,
          privacy_required: t.inquiry.errorPrivacy,
          invalid_email: t.inquiry.errorEmail,
          content_too_long: t.inquiry.errorTooLong,
        };
        setErrorMsg(errorMap[data.error] || t.inquiry.errorSend);
        return;
      }

      setStatus("success");
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
        <motion.div
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        >
          <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="text-2xl font-black mb-3">{t.inquiry.successTitle}</h3>
        <p className="text-white/40 mb-8">{t.inquiry.successDesc}</p>
        <button
          onClick={() => {
            setStatus("idle");
            setForm({ company: "", name: "", phone: "", email: "", type: "", content: "", privacyConsent: false });
            setTurnstileToken("");
          }}
          className="px-8 py-3 border border-white/10 rounded-full text-white/60 hover:text-white hover:border-white/20 transition-all"
        >
          {t.inquiry.submitAnother}
        </button>
      </motion.div>
    );
  }

  const inputClass =
    "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-colors text-sm";

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Honeypot */}
      <div className="absolute opacity-0 -z-10" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      {/* Privacy Consent */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5 flex-shrink-0">
            <input
              type="checkbox"
              checked={form.privacyConsent}
              onChange={(e) => setForm({ ...form, privacyConsent: e.target.checked })}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
              form.privacyConsent
                ? "bg-purple-500 border-purple-500"
                : "border-white/20 group-hover:border-white/40"
            }`}>
              {form.privacyConsent && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-white/50 text-sm leading-relaxed">
            {t.inquiry.privacyConsentText}{" "}
            <a href="/my/privacy" target="_blank" className="text-purple-400 hover:text-purple-300 underline underline-offset-2">
              {t.inquiry.privacyPolicyLink}
            </a>
          </span>
        </label>
      </div>

      {/* Row: Company + Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-white/30 text-xs tracking-wider uppercase mb-2">{t.inquiry.labelCompany}</label>
          <input
            type="text"
            className={inputClass}
            placeholder={t.inquiry.placeholderCompany}
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-white/30 text-xs tracking-wider uppercase mb-2">
            {t.inquiry.labelName} <span className="text-purple-400">*</span>
          </label>
          <input
            type="text"
            required
            className={inputClass}
            placeholder={t.inquiry.placeholderName}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: filterName(e.target.value) })}
          />
        </div>
      </div>

      {/* Row: Phone + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-white/30 text-xs tracking-wider uppercase mb-2">{t.inquiry.labelPhone}</label>
          <input
            type="tel"
            className={inputClass}
            placeholder={t.inquiry.placeholderPhone}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
            inputMode="numeric"
          />
        </div>
        <div>
          <label className="block text-white/30 text-xs tracking-wider uppercase mb-2">
            {t.inquiry.labelEmail} <span className="text-purple-400">*</span>
          </label>
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

      {/* Inquiry Type */}
      <div>
        <label className="block text-white/30 text-xs tracking-wider uppercase mb-2">{t.inquiry.labelType}</label>
        <select
          className={`${inputClass} ${form.type ? "text-white" : "text-white/30"}`}
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="" className="bg-[#1a1a1a] text-white/30">{t.inquiry.selectPlaceholder}</option>
          <option value="project" className="bg-[#1a1a1a] text-white">{t.inquiry.optProject}</option>
          <option value="publishing" className="bg-[#1a1a1a] text-white">{t.inquiry.optPublishing}</option>
          <option value="partnership" className="bg-[#1a1a1a] text-white">{t.inquiry.optPartnership}</option>
          <option value="careers" className="bg-[#1a1a1a] text-white">{t.inquiry.optRecruitment}</option>
          <option value="other" className="bg-[#1a1a1a] text-white">{t.inquiry.optOther}</option>
        </select>
      </div>

      {/* Content */}
      <div>
        <label className="block text-white/30 text-xs tracking-wider uppercase mb-2">
          {t.inquiry.labelContent} <span className="text-purple-400">*</span>
        </label>
        <textarea
          required
          rows={6}
          className={`${inputClass} resize-none`}
          placeholder={t.inquiry.placeholderContent}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
      </div>

      {/* Turnstile */}
      {TURNSTILE_SITE_KEY && (
        <Suspense fallback={<div className="h-[65px]" />}>
          <TurnstileWidget
            siteKey={TURNSTILE_SITE_KEY}
            onVerify={(token) => setTurnstileToken(token)}
            onExpire={() => setTurnstileToken("")}
            onError={() => setTurnstileToken("")}
          />
        </Suspense>
      )}

      {/* Error message */}
      {status === "error" && (
        <motion.p
          className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {errorMsg}
        </motion.p>
      )}

      {/* Dynamic Submit Button */}
      <div className="flex justify-center">
      <motion.button
        type="submit"
        disabled={!isFormValid}
        className={`relative w-full md:w-auto px-14 py-4 rounded-full font-bold text-lg overflow-hidden transition-all duration-500 ${
          isFormValid
            ? "bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02]"
            : "bg-white/[0.06] text-white/25 cursor-not-allowed"
        }`}
        whileTap={isFormValid ? { scale: 0.97 } : {}}
      >
        {/* Animated glow */}
        {isFormValid && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-white/20 to-purple-400/0"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
          />
        )}
        <span className="relative flex items-center justify-center gap-2">
          {status === "sending" ? (
            <>
              <motion.svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" />
              </motion.svg>
              {t.inquiry.sending}
            </>
          ) : isFormValid ? (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
              {t.inquiry.submit}
            </>
          ) : (
            t.inquiry.fillRequired
          )}
        </span>
      </motion.button>
      </div>
    </form>
  );
}

/* ─── Main Page ─── */
export default function InquiryPage() {
  const { t } = useLocale();
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

      {/* ═══ Hero — Business Problem Solving ═══ */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {INQUIRY_HERO_VIDEO && <VideoHeroBg src={INQUIRY_HERO_VIDEO} overlay={0.65} />}
        <InquiryHeroBg />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 text-center px-5 sm:px-6 max-w-5xl mx-auto"
        >
          <motion.p
            className="text-purple-400 text-xs sm:text-sm tracking-[0.4em] sm:tracking-[0.5em] uppercase mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Inquiry
          </motion.p>

          {/* Dynamic Hero Title */}
          {t.inquiry.heroTitle.split("\n").map((line, i) => (
            <div key={i} className="overflow-hidden py-1">
              <motion.h1
                className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter"
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {i === 1 ? (
                  <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                    {line}
                  </span>
                ) : (
                  line
                )}
              </motion.h1>
            </div>
          ))}

          <motion.p
            className="text-white/35 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-6 sm:mt-10 whitespace-pre-line word-keep-all"
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

      {/* ═══ Business Value Proposition ═══ */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/[0.03] via-transparent to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto relative">
          <FadeIn>
            <div className="text-center mb-20">
              <motion.h2
                className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6"
              >
                {t.inquiry.valueTitle.split("\n").map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {i === 0 ? (
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{line}</span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </motion.h2>
              <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto whitespace-pre-line leading-relaxed">
                {t.inquiry.valueDesc}
              </p>
            </div>
          </FadeIn>

          {/* Value Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z", key: "consulting" as const },
              { icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z", key: "execution" as const },
              { icon: "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941", key: "growth" as const },
            ].map((item, i) => (
              <FadeIn key={item.key} delay={i * 0.1}>
                <div className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 hover:border-purple-500/20 hover:bg-white/[0.04] transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-6 group-hover:from-purple-500/30 group-hover:to-cyan-500/30 transition-all">
                    <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black tracking-tight mb-3">{t.inquiry.values[item.key].title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{t.inquiry.values[item.key].desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Contact Form ═══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#050505]">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <p className="text-purple-400 text-xs sm:text-sm tracking-[0.4em] uppercase mb-4">Contact Form</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight">{t.inquiry.formTitle}</h2>
            <p className="text-white/30 text-base mb-12">{t.inquiry.formDesc}</p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <InquiryForm />
          </FadeIn>
        </div>
      </section>

      {/* ═══ Office Info ═══ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
              <div>
                <p className="text-purple-400 text-xs tracking-[0.3em] uppercase mb-3">Address</p>
                <p className="text-white/60 leading-relaxed whitespace-pre-line">{t.inquiry.address}</p>
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
