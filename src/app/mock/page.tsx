"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const versions = [
  {
    id: "v1",
    title: "Dark Cinematic",
    desc: "다크 테마 + 스크롤 스토리텔링. 중앙 텍스트 전환, 가로 스크롤 서비스 카드, 카운트업 애니메이션.",
    tags: ["Dark", "Scroll Storytelling", "Glassmorphism"],
    gradient: "from-indigo-600 to-violet-600",
    preview: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  },
  {
    id: "v2",
    title: "Clean White Minimal",
    desc: "화이트 기반 미니멀. 넓은 여백, 깔끔한 타이포그래피, Apple/CLOVA 스타일의 세련된 레이아웃.",
    tags: ["Light", "Minimal", "Elegant"],
    gradient: "from-slate-400 to-slate-600",
    preview: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    id: "v3",
    title: "Bold Editorial",
    desc: "대담한 타이포그래피 + 비대칭 레이아웃. 에디토리얼 매거진 스타일, 강렬한 비주얼 임팩트.",
    tags: ["Bold", "Asymmetric", "Editorial"],
    gradient: "from-red-600 to-orange-600",
    preview: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
  },
  {
    id: "v4",
    title: "Futuristic Neon",
    desc: "비디오 히어로 + 네온 UI. 사이버펑크 감성, 그리드 패턴, 기술 중심 기업 이미지 극대화.",
    tags: ["Video", "Neon", "Futuristic"],
    gradient: "from-cyan-500 to-emerald-500",
    preview: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
  },
];

export default function MockIndex() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div>
            <span className="text-lg font-bold tracking-tight">HADEUL</span>
            <span className="text-white/30 text-sm ml-3">Design Mockups</span>
          </div>
          <span className="text-white/40 text-xs tracking-widest uppercase">Internal Preview</span>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.p
            className="text-white/40 text-sm tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Website Renewal 2026
          </motion.p>
          <motion.h1
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            디자인 시안
            <br />
            <span className="text-white/30">4가지 방향성</span>
          </motion.h1>
          <motion.p
            className="text-white/50 text-lg max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            각 버전을 클릭하여 풀 페이지 프리뷰를 확인하세요.
            모든 시안은 반응형으로 모바일에서도 확인 가능합니다.
          </motion.p>
        </div>
      </section>

      {/* Version Cards */}
      <section className="px-8 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {versions.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
            >
              <Link href={`/mock/${v.id}`} className="block group">
                <div className="relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-all duration-500">
                  {/* Preview Image */}
                  <div className="relative h-56 md:h-72 overflow-hidden">
                    <img
                      src={v.preview}
                      alt={v.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${v.gradient} text-xs font-bold tracking-wider uppercase`}>
                      {v.id}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 md:p-8">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors text-white/90">
                      {v.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-4">{v.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {v.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-full border border-white/10 text-white/40">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
