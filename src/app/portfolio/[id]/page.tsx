"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";

interface PortfolioDetail {
  id: string;
  client: string;
  title: string;
  description: string;
  detail: string;
  image: string;
  category_name: string;
  category_slug: string;
}

export default function PortfolioDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState<PortfolioDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/portfolio/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("not found");
        return r.json();
      })
      .then((d) => {
        setItem(d.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#0a0a0a] text-white min-h-screen">
        <Nav />
        <div className="flex items-center justify-center min-h-screen text-white/20">로딩 중...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="bg-[#0a0a0a] text-white min-h-screen">
        <Nav />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-white/30 text-lg mb-4">프로젝트를 찾을 수 없습니다.</p>
          <Link href="/portfolio" className="text-purple-400 hover:text-purple-300 transition-colors">
            &larr; 목록으로
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <Nav />

      {/* Hero Image */}
      <section className="relative pt-16">
        {item.image ? (
          <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
          </div>
        ) : (
          <div className="h-32" />
        )}
      </section>

      {/* Content */}
      <section className={`relative px-6 ${item.image ? "-mt-32" : "pt-16"}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Back */}
            <button
              onClick={() => router.back()}
              className="text-white/30 text-sm hover:text-purple-400 transition-colors mb-8 inline-block"
            >
              &larr; 목록으로
            </button>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 text-[10px] tracking-[0.15em] uppercase text-purple-400/80 border border-purple-500/20 rounded-full font-bold">
                {item.category_name}
              </span>
            </div>

            {/* Client & Title */}
            <p className="text-purple-400/60 text-sm font-bold tracking-wide mb-2">
              {item.client}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] mb-6">
              {item.title}
            </h1>
            <p className="text-white/40 text-lg leading-relaxed mb-12 max-w-2xl">
              {item.description}
            </p>
          </motion.div>

          {/* Detail Content */}
          {item.detail && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-white/5 pt-12 pb-24"
            >
              <div
                className="tiptap max-w-none"
                dangerouslySetInnerHTML={{ __html: item.detail }}
              />
            </motion.div>
          )}

          {!item.detail && <div className="pb-24" />}
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
