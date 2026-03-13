"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";
import { PortfolioHeroBg, VideoHeroBg } from "@/components/HeroBackgrounds";

const PORTFOLIO_HERO_VIDEO = "/videos/portfolio-hero.mp4";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface PortfolioItem {
  id: string;
  client: string;
  title: string;
  description: string;
  image: string;
  category_name: string;
  category_slug: string;
}

const GAME_SLUG = "game";
const PAGE_SIZE = 12;

export default function PortfolioPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allItems, setAllItems] = useState<PortfolioItem[]>([]);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [activeTab, setActiveTab] = useState<"project" | "contents">("project");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const initialLoadDone = useRef(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.6], [1, 0.92]);
  const heroY = useTransform(heroScroll, [0, 0.6], [0, -80]);

  useEffect(() => {
    Promise.all([
      fetch("/api/categories").then((r) => r.json()),
      fetch("/api/portfolio").then((r) => r.json()),
    ]).then(([catData, portData]) => {
      const fetchedItems: PortfolioItem[] = portData.data || [];
      const catSlugsWithItems = new Set(fetchedItems.map((i) => i.category_slug));
      const activeCats = (catData.data || []).filter((c: Category) => catSlugsWithItems.has(c.slug));
      setCategories(activeCats);
      setAllItems(fetchedItems);
      setItems(fetchedItems.filter((i) => i.category_slug !== GAME_SLUG));
      setLoading(false);
    });
  }, []);

  const staggerLoad = useCallback(() => {
    setVisibleCount(3);
    let count = 3;
    const timer = setInterval(() => {
      count += 3;
      if (count >= PAGE_SIZE) {
        setVisibleCount(PAGE_SIZE);
        clearInterval(timer);
      } else {
        setVisibleCount(count);
      }
    }, 120);
    return timer;
  }, []);

  const handleTabChange = (tab: "project" | "contents") => {
    setActiveTab(tab);
    setActiveCategory("all");
    staggerLoad();
    if (tab === "project") {
      setItems(allItems.filter((i) => i.category_slug !== GAME_SLUG));
    } else {
      setItems(allItems.filter((i) => i.category_slug === GAME_SLUG));
    }
  };

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug);
    staggerLoad();
    const tabItems = activeTab === "project"
      ? allItems.filter((i) => i.category_slug !== GAME_SLUG)
      : allItems.filter((i) => i.category_slug === GAME_SLUG);
    if (slug === "all") {
      setItems(tabItems);
    } else {
      setItems(tabItems.filter((i) => i.category_slug === slug));
    }
  };

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  // 최초 로드 시 3개(한 줄)씩 순차 렌더링
  useEffect(() => {
    if (loading || items.length === 0) return;
    if (initialLoadDone.current) return;
    initialLoadDone.current = true;
    setVisibleCount(3);
    let count = 3;
    const timer = setInterval(() => {
      count += 3;
      if (count >= PAGE_SIZE) {
        setVisibleCount(PAGE_SIZE);
        clearInterval(timer);
      } else {
        setVisibleCount(count);
      }
    }, 120);
    return () => clearInterval(timer);
  }, [loading, items.length]);

  const loadMore = useCallback(() => {
    setVisibleCount((c) => Math.min(c + PAGE_SIZE, items.length));
  }, [items.length]);

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

  const filteredCategories = categories.filter((c) =>
    activeTab === "project" ? c.slug !== GAME_SLUG : c.slug === GAME_SLUG
  );

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Nav />

      {/* Hero — Fullscreen */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video background */}
        {PORTFOLIO_HERO_VIDEO && <VideoHeroBg src={PORTFOLIO_HERO_VIDEO} overlay={0.65} />}

        {/* Animated mesh gradient */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(139,92,246,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 70% 60%, rgba(236,72,153,0.1) 0%, transparent 50%)",
          }}
          animate={{
            background: [
              "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(139,92,246,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 70% 60%, rgba(236,72,153,0.1) 0%, transparent 50%)",
              "radial-gradient(ellipse 70% 50% at 60% 40%, rgba(236,72,153,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 30% 50%, rgba(6,182,212,0.1) 0%, transparent 50%)",
              "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(6,182,212,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 50% 30%, rgba(139,92,246,0.1) 0%, transparent 50%)",
              "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(139,92,246,0.15) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 70% 60%, rgba(236,72,153,0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <PortfolioHeroBg />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.p
            className="text-purple-400 text-sm tracking-[0.5em] uppercase mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Portfolio
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              className="text-7xl md:text-9xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter"
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              OUR
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              className="text-7xl md:text-9xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent"
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              WORK
            </motion.h1>
          </div>

          <motion.p
            className="text-white/35 text-lg md:text-xl max-w-lg mx-auto mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            산업 분야별 대표 프로젝트를 확인하세요.
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

      {/* Tab Switcher */}
      <section className="pt-8 pb-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-center gap-2">
          <button
            onClick={() => handleTabChange("project")}
            className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all ${
              activeTab === "project"
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white btn-glow"
                : "border border-white/10 text-white/40 hover:text-white"
            }`}
          >
            프로젝트
          </button>
          <button
            onClick={() => handleTabChange("contents")}
            className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all ${
              activeTab === "contents"
                ? "bg-gradient-to-r from-pink-500 to-amber-500 text-white btn-glow"
                : "border border-white/10 text-white/40 hover:text-white"
            }`}
          >
            컨텐츠
          </button>
        </div>
      </section>

      {/* Category Filter */}
      {filteredCategories.length > 1 && (
        <section className="pb-4 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => handleCategoryClick("all")}
                className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${
                  activeCategory === "all"
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white btn-glow"
                    : "border border-white/10 text-white/40 hover:text-white btn-glow-outline"
                }`}
              >
                All
              </button>
              {filteredCategories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryClick(cat.slug)}
                  className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${
                    activeCategory === cat.slug
                      ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white btn-glow"
                      : "border border-white/10 text-white/40 hover:text-white btn-glow-outline"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] animate-pulse">
                  <div className="h-56 bg-white/[0.04]" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 w-20 bg-white/[0.06] rounded" />
                    <div className="h-5 w-3/4 bg-white/[0.06] rounded" />
                    <div className="h-3 w-full bg-white/[0.04] rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 text-white/20">등록된 프로젝트가 없습니다.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleItems.map((item, i) => (
                  <div key={item.id} className="animate-[fadeInUp_0.4s_ease-out_both]" style={{ animationDelay: `${(i % PAGE_SIZE) * 60}ms` }}>
                    <Link
                      href={`/portfolio/${item.id}`}
                      className="group block relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(139,92,246,0.08)]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-pink-500/0 group-hover:from-purple-500/[0.04] group-hover:to-pink-500/[0.04] transition-all duration-500 z-0" />

                      <div className="relative h-56 overflow-hidden bg-white/[0.02]">
                        {(() => {
                          const thumb = (item.image ? item.image.split(",")[0].trim() : "") || "/images/default-portfolio.svg";
                          return thumb.endsWith(".webm") ? (
                            <video src={thumb} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" autoPlay loop muted playsInline />
                          ) : (
                            <img src={thumb} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).src = "/images/default-portfolio.svg"; }} />
                          );
                        })()}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 text-[10px] tracking-[0.15em] uppercase text-white/80 bg-black/50 backdrop-blur-md rounded-full font-bold border border-white/10">
                            {item.category_name}
                          </span>
                        </div>

                        <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <svg className="w-3.5 h-3.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                          </svg>
                        </div>
                      </div>

                      <div className="relative p-6 h-[140px] flex flex-col">
                        <p className="text-white/40 text-xs font-bold tracking-wide mb-1.5 truncate">
                          {item.client}
                        </p>
                        <h3 className="text-lg font-black text-white tracking-tight mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-white/25 text-sm leading-relaxed line-clamp-2 mt-auto">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Sentinel for infinite scroll */}
              {hasMore && (
                <div ref={sentinelRef} className="flex justify-center py-12">
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
