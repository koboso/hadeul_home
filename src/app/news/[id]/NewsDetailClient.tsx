"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";

interface NewsDetail {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  is_published: number;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export default function NewsDetailClient({ item }: { item: NewsDetail | null }) {
  const router = useRouter();

  if (!item) {
    return (
      <div className="bg-[#0a0a0a] text-white min-h-screen">
        <Nav />
        <div className="flex flex-col items-center justify-center min-h-screen">
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
          <p className="text-white/30 text-lg mb-4">소식을 찾을 수 없습니다.</p>
          <Link href="/news" className="text-purple-400 hover:text-purple-300 transition-colors">
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
              src={item.image.split(",")[0].trim()}
              alt={item.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
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
              {item.category && (
                <span className="px-3 py-1 text-[10px] tracking-[0.15em] uppercase text-purple-400/80 border border-purple-500/20 rounded-full font-bold">
                  {item.category}
                </span>
              )}
              <span className="text-white/20 text-sm font-mono">
                {item.published_at?.slice(0, 10)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] mb-6">
              {item.title}
            </h1>
            <p className="text-white/40 text-lg leading-relaxed mb-12 max-w-2xl">
              {item.summary}
            </p>
          </motion.div>

          {/* Detail Content */}
          {item.content && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-white/5 pt-12 pb-24"
            >
              <div
                className="tiptap max-w-none"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </motion.div>
          )}

          {!item.content && <div className="pb-24" />}
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
