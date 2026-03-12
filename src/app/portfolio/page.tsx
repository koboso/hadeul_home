"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";
import { PortfolioHeroBg } from "@/components/HeroBackgrounds";

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

export default function PortfolioPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allItems, setAllItems] = useState<PortfolioItem[]>([]);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [activeTab, setActiveTab] = useState<"project" | "contents">("project");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

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
      // Default: show non-game items
      setItems(fetchedItems.filter((i) => i.category_slug !== GAME_SLUG));
      setLoading(false);
    });
  }, []);

  const handleTabChange = (tab: "project" | "contents") => {
    setActiveTab(tab);
    setActiveCategory("all");
    if (tab === "project") {
      setItems(allItems.filter((i) => i.category_slug !== GAME_SLUG));
    } else {
      setItems(allItems.filter((i) => i.category_slug === GAME_SLUG));
    }
  };

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug);
    const tabItems = activeTab === "project"
      ? allItems.filter((i) => i.category_slug !== GAME_SLUG)
      : allItems.filter((i) => i.category_slug === GAME_SLUG);
    if (slug === "all") {
      setItems(tabItems);
    } else {
      setItems(tabItems.filter((i) => i.category_slug === slug));
    }
  };

  const filteredCategories = categories.filter((c) =>
    activeTab === "project" ? c.slug !== GAME_SLUG : c.slug === GAME_SLUG
  );

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-16 overflow-hidden">
        <PortfolioHeroBg />
        <div className="relative z-10 text-center px-6">
          <motion.p
            className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Portfolio
          </motion.p>
          <motion.h1
            className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            OUR
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              WORK
            </span>
          </motion.h1>
          <motion.p
            className="text-white/40 text-lg max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            산업 분야별 대표 프로젝트를 확인하세요.
          </motion.p>
        </div>
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
            <div className="text-center py-20 text-white/20">로딩 중...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 text-white/20">등록된 프로젝트가 없습니다.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/portfolio/${item.id}`}
                    className="group block rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="relative h-52 overflow-hidden bg-white/[0.02]">
                      {(() => {
                        const thumb = (item.image ? item.image.split(",")[0].trim() : "") || "/images/default-portfolio.svg";
                        return thumb.endsWith(".webm") ? (
                          <video src={thumb} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" autoPlay loop muted playsInline />
                        ) : (
                          <img src={thumb} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" onError={(e) => { (e.target as HTMLImageElement).src = "/images/default-portfolio.svg"; }} />
                        );
                      })()}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    </div>
                    <div className="p-6 h-[160px] flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2.5 py-1 text-[10px] tracking-[0.15em] uppercase text-purple-400/80 border border-purple-500/20 rounded-full font-bold">
                          {item.category_name}
                        </span>
                      </div>
                      <p className="text-white/50 text-xs font-bold tracking-wide mb-1 truncate">
                        {item.client}
                      </p>
                      <h3 className="text-lg font-black text-white tracking-tight mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-white/30 text-sm leading-relaxed line-clamp-1 mt-auto">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
