"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";

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

export default function PortfolioPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => setCategories(d.data || []));
  }, []);

  useEffect(() => {
    setLoading(true);
    const url =
      activeCategory === "all" ? "/api/portfolio" : `/api/portfolio?category=${activeCategory}`;
    fetch(url)
      .then((r) => r.json())
      .then((d) => {
        setItems(d.data || []);
        setLoading(false);
      });
  }, [activeCategory]);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-16 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-purple-500/8 rounded-full blur-[160px]"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
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

      {/* Filters */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                  : "border border-white/10 text-white/40 hover:text-white hover:border-white/30"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-5 py-2 rounded-full text-sm font-bold tracking-wide transition-all ${
                  activeCategory === cat.slug
                    ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                    : "border border-white/10 text-white/40 hover:text-white hover:border-white/30"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>
      </section>

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
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/10 text-6xl font-black">
                          {String(i + 1).padStart(2, "0")}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2.5 py-1 text-[10px] tracking-[0.15em] uppercase text-purple-400/80 border border-purple-500/20 rounded-full font-bold">
                          {item.category_name}
                        </span>
                      </div>
                      <p className="text-white/50 text-xs font-bold tracking-wide mb-1">
                        {item.client}
                      </p>
                      <h3 className="text-lg font-black text-white tracking-tight mb-2 group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-white/30 text-sm leading-relaxed line-clamp-1">
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
