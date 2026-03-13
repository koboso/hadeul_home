"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";

const DEFAULT_IMG = "/images/default-news.svg";

function getThumb(image: string) {
  const url = image ? image.split(",")[0].trim() : "";
  return url || DEFAULT_IMG;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  source_url: string;
  source_name: string;
  is_published: number;
  published_at: string;
}

/* ─── 날짜 포맷 ─── */
function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

/* ─── 카테고리 색상 ─── */
function categoryStyle(cat: string) {
  switch (cat) {
    case "보도자료":
      return "bg-purple-500/15 text-purple-300 border-purple-500/20";
    case "언론보도":
      return "bg-cyan-500/15 text-cyan-300 border-cyan-500/20";
    case "회사소식":
      return "bg-green-500/15 text-green-300 border-green-500/20";
    default:
      return "bg-white/10 text-white/50 border-white/10";
  }
}

/* ─── 뉴스 카드 클릭 핸들러 ─── */
function openNews(item: NewsItem) {
  if (item.source_url) {
    window.open(item.source_url, "_blank", "noopener,noreferrer");
  }
}

/* ─── 히어로 슬라이드 (좌측 대형) ─── */
function HeroSlide({ items }: { items: NewsItem[] }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % items.length);
    }, 5000);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [items.length, resetTimer]);

  if (items.length === 0) return null;
  const item = items[current];
  const thumb = getThumb(item.image);

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] cursor-pointer group h-full min-h-[360px] lg:min-h-[420px]"
      onClick={() => openNews(item)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={thumb}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_IMG; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 z-10">
        <div className="flex items-center gap-2 mb-3">
          {item.category && (
            <span className={`px-2.5 py-1 text-[10px] tracking-wider font-bold rounded-full border ${categoryStyle(item.category)}`}>
              {item.category}
            </span>
          )}
        </div>
        <h2 className="text-xl lg:text-2xl font-black text-white tracking-tight mb-2 line-clamp-2 group-hover:text-purple-200 transition-colors">
          {item.title}
        </h2>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-3 hidden sm:block">
          {item.summary}
        </p>
        <div className="flex items-center gap-2 text-xs text-white/30">
          <span>{formatDate(item.published_at)}</span>
          {item.source_name && (
            <>
              <span className="text-white/10">·</span>
              <span>{item.source_name}</span>
            </>
          )}
        </div>
      </div>

      {/* Dots */}
      {items.length > 1 && (
        <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 flex gap-1.5 z-10">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setCurrent(i);
                resetTimer();
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-white" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── 사이드 카드 (우측 소형) ─── */
function SideCard({ item }: { item: NewsItem }) {
  const thumb = item.image ? item.image.split(",")[0].trim() : "";

  return (
    <div
      onClick={() => openNews(item)}
      className="flex flex-col justify-between rounded-2xl bg-white/[0.03] border border-white/[0.06] p-5 cursor-pointer group hover:border-purple-500/30 transition-all duration-300 h-full"
    >
      <div>
        {item.category && (
          <span className={`inline-block px-2 py-0.5 text-[10px] tracking-wider font-bold rounded-full border mb-2.5 ${categoryStyle(item.category)}`}>
            {item.category}
          </span>
        )}
        <h3 className="text-sm font-bold text-white tracking-tight line-clamp-1 group-hover:text-purple-300 transition-colors leading-snug">
          {item.title}
        </h3>
      </div>
      <div className="flex items-center gap-2 text-[11px] text-white/25 mt-3">
        <span>{formatDate(item.published_at)}</span>
        {item.source_name && (
          <>
            <span className="text-white/10">·</span>
            <span>{item.source_name}</span>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── 리스트 카드 ─── */
function ListCard({ item }: { item: NewsItem }) {
  const thumb = getThumb(item.image);

  return (
    <div
      onClick={() => openNews(item)}
      className="flex gap-5 items-start rounded-2xl bg-white/[0.02] border border-white/[0.05] p-5 cursor-pointer group hover:border-purple-500/20 hover:bg-white/[0.04] transition-all duration-300"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          {item.category && (
            <span className={`px-2 py-0.5 text-[10px] tracking-wider font-bold rounded-full border ${categoryStyle(item.category)}`}>
              {item.category}
            </span>
          )}
        </div>
        <h3 className="text-base font-bold text-white tracking-tight mb-1.5 group-hover:text-purple-300 transition-colors line-clamp-1">
          {item.title}
        </h3>
        <p className="text-white/30 text-sm leading-relaxed line-clamp-1 mb-3">
          {item.summary}
        </p>
        <div className="flex items-center gap-2 text-xs text-white/20">
          <span>{formatDate(item.published_at)}</span>
          {item.source_name && (
            <>
              <span className="text-white/10">·</span>
              <span>{item.source_name}</span>
            </>
          )}
          {item.source_url && (
            <span className="ml-auto text-purple-400/50 group-hover:text-purple-400 transition-colors flex items-center gap-1">
              원문 보기
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          )}
        </div>
      </div>
      <div className="w-28 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-white/5">
        <img
          src={thumb}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_IMG; }}
        />
      </div>
    </div>
  );
}

const NEWS_PAGE_SIZE = 10;

/* ─── 메인 페이지 ─── */
export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("전체");
  const [visibleCount, setVisibleCount] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const initialLoadDone = useRef(false);

  useEffect(() => {
    fetch("/api/news?published=1")
      .then((r) => r.json())
      .then((d) => {
        setNews(d.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = [
    "전체",
    ...Array.from(new Set(news.map((n) => n.category).filter(Boolean))),
  ];

  const filtered =
    activeCategory === "전체"
      ? news
      : news.filter((n) => n.category === activeCategory);

  const visibleNews = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  // 최초 로드 시 순차 렌더링
  useEffect(() => {
    if (loading || news.length === 0) return;
    if (initialLoadDone.current) return;
    initialLoadDone.current = true;
    setVisibleCount(3);
    let count = 3;
    const timer = setInterval(() => {
      count += 3;
      if (count >= NEWS_PAGE_SIZE) {
        setVisibleCount(NEWS_PAGE_SIZE);
        clearInterval(timer);
      } else {
        setVisibleCount(count);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [loading, news.length]);

  const staggerLoad = useCallback(() => {
    setVisibleCount(3);
    let count = 3;
    const timer = setInterval(() => {
      count += 3;
      if (count >= NEWS_PAGE_SIZE) {
        setVisibleCount(NEWS_PAGE_SIZE);
        clearInterval(timer);
      } else {
        setVisibleCount(count);
      }
    }, 100);
    return timer;
  }, []);

  const loadMore = useCallback(() => {
    setVisibleCount((c) => Math.min(c + NEWS_PAGE_SIZE, filtered.length));
  }, [filtered.length]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  // 주요 소식: 최신 4개 (히어로 슬라이드용 + 사이드 3개)
  const heroItems = news.slice(0, 4);
  const heroSlideItems = heroItems.slice(0, 4);
  const sideItems = heroItems.slice(1, 4);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Nav />

      {/* ─── 주요 소식 ─── */}
      <section className="pt-24 pb-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl font-black tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            주요 소식
          </motion.h2>

          {loading ? (
            <div className="h-[420px] rounded-2xl bg-white/[0.03] animate-pulse" />
          ) : heroItems.length === 0 ? (
            <div className="flex items-center justify-center h-[300px] rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <p className="text-white/20">등록된 소식이 없습니다.</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              {/* 좌측: 대형 슬라이드 */}
              <HeroSlide items={heroSlideItems} />

              {/* 우측: 사이드 카드 3개 */}
              {sideItems.length > 0 && (
                <div className="flex flex-col gap-4">
                  {sideItems.map((item) => (
                    <SideCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── 최근 뉴스 ─── */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl font-black tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            최근 뉴스
          </motion.h2>

          {/* 카테고리 탭 */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); staggerLoad(); }}
                className={`px-4 py-2 text-sm font-bold rounded-full border whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-white text-[#0a0a0a] border-white"
                    : "bg-transparent text-white/40 border-white/10 hover:text-white/70 hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 뉴스 리스트 */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-28 rounded-2xl bg-white/[0.03] animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <svg className="w-12 h-12 text-white/10 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <p className="text-white/20">해당 카테고리에 뉴스가 없습니다.</p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {visibleNews.map((item, i) => (
                  <div key={item.id} className="animate-[fadeInUp_0.4s_ease-out_both]" style={{ animationDelay: `${(i % NEWS_PAGE_SIZE) * 50}ms` }}>
                    <ListCard item={item} />
                  </div>
                ))}
              </div>

              {/* Sentinel for infinite scroll */}
              {hasMore && (
                <div ref={sentinelRef} className="flex justify-center py-10">
                  <svg className="w-5 h-5 animate-spin text-white/15" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
