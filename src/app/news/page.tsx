"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";
import { NewsHeroBg } from "@/components/HeroBackgrounds";

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  is_published: number;
  published_at: string;
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/news?published=1")
      .then((r) => r.json())
      .then((d) => {
        setNews(d.data || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Dynamically extract categories from fetched news items
  const categories = [
    "All",
    ...Array.from(new Set(news.map((n) => n.category).filter(Boolean))),
  ];

  const filtered =
    activeCategory === "All"
      ? news
      : news.filter((n) => n.category === activeCategory);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <NewsHeroBg />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.p
            className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            News
          </motion.p>
          <motion.h1
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            새로운 소식
          </motion.h1>
        </div>
      </section>

      {/* Category filter */}
      <section className="px-6 pb-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex gap-6 overflow-x-auto">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm tracking-wider uppercase whitespace-nowrap pb-3 border-b-2 transition-colors ${
                activeCategory === cat
                  ? "text-white border-purple-500"
                  : "text-white/30 border-transparent hover:text-white/60"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </section>

      {/* News grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20 text-white/20">로딩 중...</div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <svg
                className="w-16 h-16 text-white/10 mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              <p className="text-white/30 text-lg">아직 등록된 소식이 없습니다.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/news/${item.id}`}
                    className="group block rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/30 transition-all duration-300"
                  >
                    {item.image && (
                      <div className="relative h-52 overflow-hidden bg-white/[0.02]">
                        <img
                          src={item.image.split(",")[0].trim()}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        {item.category && (
                          <span className="px-2.5 py-1 text-[10px] tracking-[0.15em] uppercase text-purple-400/80 border border-purple-500/20 rounded-full font-bold">
                            {item.category}
                          </span>
                        )}
                        <span className="text-white/20 text-xs font-mono">
                          {item.published_at?.slice(0, 10)}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-white tracking-tight mb-2 group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-white/30 text-sm leading-relaxed line-clamp-2">
                        {item.summary}
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
