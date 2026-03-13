"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";
import { useLocale } from "@/i18n/LocaleContext";

interface PortfolioDetail {
  id: string;
  client: string;
  title: string;
  description: string;
  detail: string;
  image: string;
  video: string;
  tech_stack: string;
  architecture: string;
  target_device: string;
  frame_enabled: number;
  no_image: number;
  category_name: string;
  category_slug: string;
}

/* ─── Extract images from detail HTML ─── */
function extractImages(html: string): string[] {
  if (!html) return [];
  const matches = html.match(/<img[^>]+src="([^"]+)"/g) || [];
  return matches
    .map((m) => {
      const srcMatch = m.match(/src="([^"]+)"/);
      return srcMatch ? srcMatch[1] : "";
    })
    .filter(Boolean);
}

/* ─── Strip images from HTML for text-only content ─── */
function stripImages(html: string): string {
  return html.replace(/<img[^>]*>/g, "").replace(/<p>\s*<\/p>/g, "");
}

/* ─── Image Slideshow ─── */
function ImageSlideshow({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0a0a0c]">
        <span className="text-white/10 text-sm">No preview</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0a0a0c]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {images[current].endsWith(".webm") ? (
            <video
              src={images[current]}
              className="w-full h-full object-contain p-1"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <img
              src={images[current]}
              alt={`Screen ${current + 1}`}
              className="w-full h-full object-contain p-1"
            />
          )}
        </motion.div>
      </AnimatePresence>
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-purple-400 w-4" : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── PC Monitor Frame ─── */
function PCMonitorFrame({ images, video }: { images: string[]; video?: string }) {
  return (
    <div className="relative w-full">
      <div className="bg-[#1a1a1f] rounded-t-2xl p-2.5 border border-white/[0.08] border-b-0">
        <div className="bg-[#111115] rounded-t-xl overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#0d0d10] border-b border-white/[0.04]">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 mx-6">
              <div className="bg-white/[0.04] rounded-md px-3 py-0.5 text-[9px] text-white/20 text-center truncate">
                hadeulsoft.com
              </div>
            </div>
          </div>
          <div className="relative aspect-[16/10] bg-[#0a0a0c]">
            {video ? (
              <video src={video} className="w-full h-full object-contain p-1" autoPlay loop muted playsInline />
            ) : (
              <ImageSlideshow images={images} />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full h-2.5 bg-[#1a1a1f] border-x border-b border-white/[0.08] rounded-b-lg" />
        <div className="w-20 h-6 bg-gradient-to-b from-[#1a1a1f] to-[#151518] border-x border-white/[0.06]" />
        <div className="w-32 h-1.5 bg-[#1a1a1f] rounded-b-lg border border-t-0 border-white/[0.06]" />
      </div>
    </div>
  );
}

/* ─── Live KST Clock ─── */
function useKSTClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const kst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Seoul" }));
      const h = kst.getHours();
      const m = kst.getMinutes().toString().padStart(2, "0");
      setTime(`${h}:${m}`);
    };
    update();
    const id = setInterval(update, 10_000);
    return () => clearInterval(id);
  }, []);
  return time || "9:41";
}

/* ─── Mobile Phone Frame ─── */
function MobilePhoneFrame({ images, video }: { images: string[]; video?: string }) {
  const kstTime = useKSTClock();
  return (
    <div className="relative w-[260px] md:w-[300px]">
      <div className="bg-[#1a1a1f] rounded-[2.5rem] p-2 border border-white/[0.1] shadow-2xl shadow-purple-500/10">
        <div className="bg-[#0a0a0c] rounded-[2rem] overflow-hidden relative">
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-[22px] bg-[#1a1a1f] rounded-full z-20" />
          <div className="relative z-10 flex items-center justify-between px-6 pt-2 pb-0.5">
            <span className="text-[9px] text-white/30 font-bold">{kstTime}</span>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3 text-white/25" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
              </svg>
              <div className="w-4 h-2 border border-white/25 rounded-sm relative">
                <div className="absolute inset-[1px] right-[2px] bg-white/25 rounded-[1px]" />
              </div>
            </div>
          </div>
          <div className="relative aspect-[9/19.5] bg-[#0a0a0c]">
            {video ? (
              <video src={video} className="w-full h-full object-contain p-1" autoPlay loop muted playsInline />
            ) : (
              <ImageSlideshow images={images} />
            )}
          </div>
          <div className="py-2 flex justify-center">
            <div className="w-28 h-1 bg-white/15 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Plain Image Gallery (no frame) ─── */
function PlainImageGallery({ images, video }: { images: string[]; video?: string }) {
  return (
    <div className="space-y-6">
      {video && (
        <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a0c]">
          <video src={video} className="w-full object-contain" autoPlay loop muted playsInline />
        </div>
      )}
      {images.map((src, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a0c]">
          {src.endsWith(".webm") ? (
            <video src={src} className="w-full object-contain" autoPlay loop muted playsInline />
          ) : (
            <img src={src} alt={`Image ${i + 1}`} className="w-full object-contain" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Detail Content Block (reusable) ─── */
function DetailContent({ architecture, textOnlyDetail }: { architecture?: string; textOnlyDetail?: string }) {
  const { t } = useLocale();
  return (
    <>
      {architecture && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-[1px] bg-purple-500/40" />
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-purple-400/60 font-bold">
              {t.portfolioDetail.architecture}
            </h2>
          </div>
          <div className="tiptap max-w-none" dangerouslySetInnerHTML={{ __html: architecture }} />
        </div>
      )}
      {textOnlyDetail && textOnlyDetail.trim() && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-[1px] bg-white/10" />
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-white/30 font-bold">
              {t.portfolioDetail.detail}
            </h2>
          </div>
          <div className="tiptap max-w-none" dangerouslySetInnerHTML={{ __html: textOnlyDetail }} />
        </div>
      )}
    </>
  );
}

export default function PortfolioDetailClient({ item }: { item: PortfolioDetail | null }) {
  const router = useRouter();
  const { locale, t } = useLocale();

  if (!item) {
    return (
      <div className="bg-[#0a0a0a] text-white min-h-screen">
        <Nav />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-white/30 text-lg mb-4">{t.portfolioDetail.notFound}</p>
          <Link href={`/${locale}/portfolio`} className="text-purple-400 hover:text-purple-300 transition-colors">
            &larr; {t.portfolioDetail.backToList}
          </Link>
        </div>
      </div>
    );
  }

  const isMobile = item.target_device === "mobile";
  const techTags = item.tech_stack ? item.tech_stack.split(",").filter(Boolean) : [];
  const detailImages = useMemo(() => extractImages(item.detail), [item.detail]);
  const textOnlyDetail = useMemo(() => stripImages(item.detail), [item.detail]);

  // image field can be comma-separated multiple URLs
  const heroImages = useMemo(() => {
    if (!item.image) return [];
    return item.image.split(",").map((s) => s.trim()).filter(Boolean);
  }, [item.image]);

  const allImages = useMemo(() => {
    return [...heroImages, ...detailImages];
  }, [heroImages, detailImages]);

  const hasDetail = (textOnlyDetail && textOnlyDetail.trim()) || item.architecture;
  const frameEnabled = (item.frame_enabled ?? 1) === 1;
  const noImage = (item.no_image ?? 0) === 1;
  const showMedia = !noImage && (heroImages.length > 0 || !!item.video);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Nav />
      {/* Nav spacer (Nav is fixed, so we need pt) */}
      <div className="h-16" />

      {/* ── Sticky Project Header (below Nav h-16) ── */}
      <div className="sticky top-16 z-30">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-white/[0.04]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            {/* Row 1: Back + Title + Client */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => router.back()}
                className="text-white/30 hover:text-purple-400 transition-colors flex-shrink-0"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-base sm:text-lg md:text-2xl font-black tracking-tight break-keep line-clamp-1">
                {item.title}
              </h1>
              <span className="ml-auto text-white/30 text-xs font-bold whitespace-nowrap flex-shrink-0 hidden sm:inline">
                {t.portfolioDetail.client} : <span className="text-purple-400/70">{item.client}</span>
              </span>
            </div>

            {/* Row 2: Badges + Tech tags */}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="px-2 py-0.5 text-[9px] tracking-[0.12em] uppercase text-purple-400/70 border border-purple-500/20 rounded-full font-bold whitespace-nowrap">
                {item.category_name}
              </span>
              <span className="px-2 py-0.5 text-[9px] tracking-[0.12em] uppercase text-white/20 border border-white/[0.06] rounded-full font-bold">
                {isMobile ? "Mobile" : "Web"}
              </span>
              {techTags.length > 0 && (
                <>
                  <div className="w-[1px] h-3 bg-white/[0.06]" />
                  {techTags.slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white/[0.03] text-white/25 border border-white/[0.04] rounded-full text-[9px] font-medium whitespace-nowrap"
                    >
                      {tag.trim()}
                    </span>
                  ))}
                  {techTags.length > 6 && (
                    <span className="text-white/15 text-[9px] whitespace-nowrap">+{techTags.length - 6}</span>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Main Content ── */}
      <section className="relative px-4 sm:px-6">
        {/* Background glow — contained in own overflow wrapper */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/[0.03] rounded-full blur-[200px]"
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 py-8 md:py-12">
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/40 text-base md:text-lg leading-relaxed max-w-3xl mb-10"
          >
            {item.description}
          </motion.p>

          {/* ─── Mobile viewport: simplified gallery (no device frames) ─── */}
          <div className="block lg:hidden">
            {showMedia && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-10"
              >
                <PlainImageGallery images={allImages} video={item.video || undefined} />
              </motion.div>
            )}
            {hasDetail && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <DetailContent architecture={item.architecture} textOnlyDetail={textOnlyDetail} />
              </motion.div>
            )}
          </div>

          {/* ─── Desktop: PC Layout — Monitor top → Detail below ─── */}
          <div className="hidden lg:block">
            {!isMobile && (
              <div>
                {showMedia && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-5xl mx-auto mb-12 md:mb-16"
                  >
                    {frameEnabled ? (
                      <PCMonitorFrame images={allImages} video={item.video || undefined} />
                    ) : (
                      <PlainImageGallery images={allImages} video={item.video || undefined} />
                    )}
                  </motion.div>
                )}
                {hasDetail && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-4xl mx-auto"
                  >
                    <DetailContent architecture={item.architecture} textOnlyDetail={textOnlyDetail} />
                  </motion.div>
                )}
              </div>
            )}

            {/* ─── Desktop: Mobile Layout — Left=Detail + Right=Phone sticky ─── */}
            {isMobile && (
              <div className="flex flex-row gap-14">
                {hasDetail ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 min-w-0"
                  >
                    <DetailContent architecture={item.architecture} textOnlyDetail={textOnlyDetail} />
                  </motion.div>
                ) : (
                  <div className="flex-1" />
                )}
                {showMedia && (
                  <div className="flex-shrink-0">
                    <div className="sticky top-[7.5rem]">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex justify-center"
                      >
                        {frameEnabled ? (
                          <MobilePhoneFrame images={allImages} video={item.video || undefined} />
                        ) : (
                          <PlainImageGallery images={allImages} video={item.video || undefined} />
                        )}
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {!hasDetail && allImages.length === 0 && <div className="pb-24" />}

      <PageFooter />
    </div>
  );
}
