"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";
import { useLocale } from "@/i18n/LocaleContext";

interface JobData {
  id: string;
  title: string;
  department: string;
  job_type: string;
  location: string;
  description: string;
  requirements: string;
  is_active: number;
  created_at: string;
}

export default function CareerDetailClient({ job }: { job: JobData | null }) {
  const { locale, t } = useLocale();

  if (!job) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Nav />
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
          <h1 className="text-4xl font-black mb-4">{t.careerDetail.notFound}</h1>
          <p className="text-white/40 mb-8">{t.careerDetail.notFoundDesc}</p>
          <Link
            href={`/${locale}/careers`}
            className="px-8 py-3 border border-white/10 rounded-full text-white/60 hover:text-white hover:border-white/20 transition-all"
          >
            {t.careerDetail.backToList}
          </Link>
        </div>
        <PageFooter />
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Nav />

      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href={`/${locale}/careers#positions`}
              className="inline-flex items-center gap-2 text-white/30 text-sm hover:text-white/60 transition-colors mb-10"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              {t.careerDetail.backToPositions}
            </Link>
          </motion.div>

          {/* Badges */}
          <motion.div
            className="flex flex-wrap items-center gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {job.department && (
              <span className="px-3 py-1 text-xs tracking-[0.12em] uppercase text-purple-400/80 bg-purple-500/10 rounded-full font-bold">
                {job.department}
              </span>
            )}
            {job.job_type && (
              <span className="px-3 py-1 text-xs tracking-[0.12em] uppercase text-cyan-400/80 bg-cyan-500/10 rounded-full font-bold">
                {job.job_type}
              </span>
            )}
            {job.location && (
              <span className="px-3 py-1 text-xs tracking-[0.12em] uppercase text-white/40 bg-white/[0.04] rounded-full font-bold">
                {job.location}
              </span>
            )}
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {job.title}
          </motion.h1>

          {/* Divider */}
          <motion.div
            className="h-px bg-gradient-to-r from-purple-500/30 via-pink-500/20 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
          {/* Main */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {job.description && (
              <div className="mb-12">
                <h2 className="text-xl font-black tracking-tight mb-5 text-white/90">{t.careerDetail.jobDescription}</h2>
                <div
                  className="prose prose-invert prose-sm max-w-none text-white/50 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-3 [&_h3]:text-white/80 [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3 [&_h4]:text-white/70 [&_h4]:font-bold [&_h4]:mt-4 [&_h4]:mb-2 [&_strong]:text-white/70 [&_a]:text-purple-400 [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: job.description }}
                />
              </div>
            )}

            {job.requirements && (
              <div className="mb-12">
                <h2 className="text-xl font-black tracking-tight mb-5 text-white/90">{t.careerDetail.requirements}</h2>
                <div
                  className="prose prose-invert prose-sm max-w-none text-white/50 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_p]:mb-3 [&_h3]:text-white/80 [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3 [&_h4]:text-white/70 [&_h4]:font-bold [&_h4]:mt-4 [&_h4]:mb-2 [&_strong]:text-white/70 [&_a]:text-purple-400 [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: job.requirements }}
                />
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="sticky top-28 space-y-6">
              {/* Info card */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
                <h3 className="text-sm font-bold text-white/50 mb-4">{t.careerDetail.jobInfo}</h3>
                <dl className="space-y-4 text-sm">
                  {job.department && (
                    <div>
                      <dt className="text-white/30 mb-1">{t.careerDetail.department}</dt>
                      <dd className="text-white/80 font-bold">{job.department}</dd>
                    </div>
                  )}
                  {job.job_type && (
                    <div>
                      <dt className="text-white/30 mb-1">{t.careerDetail.jobType}</dt>
                      <dd className="text-white/80 font-bold">{job.job_type}</dd>
                    </div>
                  )}
                  {job.location && (
                    <div>
                      <dt className="text-white/30 mb-1">{t.careerDetail.location}</dt>
                      <dd className="text-white/80 font-bold">{job.location}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Apply button — mailto 임시 비활성화 */}
              <button
                type="button"
                disabled
                className="relative block w-full text-center px-8 py-4 rounded-full text-white/50 font-bold text-base overflow-hidden bg-white/[0.06] border border-white/[0.08] cursor-not-allowed"
              >
                <span>{t.careerDetail.preparing}</span>
              </button>
              {/* <a
                href={`mailto:hadeulsoft@gmail.com?subject=[지원] ${job.title}`}
                className="group relative block w-full text-center px-8 py-4 rounded-full text-white font-bold text-base overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-[length:200%_200%]"
                  style={{ backgroundImage: "linear-gradient(135deg, #8b5cf6, #ec4899, #06b6d4, #8b5cf6)" }}
                  animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="relative">지원하기</span>
              </a> */}
            </div>
          </motion.div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
