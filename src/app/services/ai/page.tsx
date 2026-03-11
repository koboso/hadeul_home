"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import PageFooter from "@/components/PageFooter";

const AI_PROJECTS = [
  {
    id: "kolabshop-aigents",
    num: "01",
    title: "AI Kolabshop Aigents",
    subtitle: "이화학 특수 도메인 E커머스 AI 에이전트",
    headline: "390,000개 시약 데이터를\nAI가 상담합니다",
    desc: "이화학·시약 전문 B2B 커머스에 특화된 AI 상담 에이전트입니다. CAS 번호, 순도, 제조사 등 고도로 전문적인 도메인 지식을 AI가 학습하여, 복잡한 시약 구매 상담을 사람처럼 자연스럽게 수행합니다. 단순 키워드 검색이 아닌, 고객의 의도를 파악하고 역질문을 통해 최적의 상품을 추천하는 지능형 시스템입니다.",
    features: [
      { title: "하이브리드 검색 엔진", desc: "키워드 검색과 의미 기반 검색을 결합한 하이브리드 방식으로 390,000+ 상품에서 고객 의도에 가장 부합하는 결과를 정확하게 찾아냅니다." },
      { title: "도메인 특화 역질문", desc: "시약 상담 시 순도, CAS 번호, 용량, 제조사를 자동으로 역질문하여 전문 상담원 수준의 정확한 상담을 수행합니다." },
      { title: "멀티턴 맥락 유지", desc: "대화 흐름을 기억하는 자연스러운 멀티턴 대화로, 복잡한 시약 구매 상담이나 견적 요청도 끊김 없이 처리합니다." },
      { title: "상담 유형 자동 감지", desc: "구매 대행, 견적 요청, 서류 발급, 특수 주문 등 상담 유형을 AI가 자동으로 감지하고 최적의 상담 플로우를 제공합니다." },
      { title: "멀티 LLM 아키텍처", desc: "여러 AI 모델을 상황에 맞게 자동 전환하는 구조로, 장애 상황에서도 무중단 서비스를 보장합니다." },
      { title: "보안 & 안정성", desc: "프롬프트 인젝션 탐지, 남용 방지, 일일 사용량 제한 등 엔터프라이즈급 보안 체계를 갖추고 있습니다." },
      { title: "당일배송 상품 추천", desc: "재고 현황을 실시간으로 파악하여 긴급 구매 고객에게 당일배송 가능한 대체 상품을 자동으로 추천합니다." },
      { title: "관리자 대시보드", desc: "상담 패턴 분석, 상품 수요 예측, 검색 성능 모니터링 등 비즈니스 인사이트를 실시간으로 제공합니다." },
    ],
    stats: [
      { num: "390K+", label: "상품 데이터" },
      { num: "83%+", label: "QA 정확도" },
      { num: "24/7", label: "무중단 상담" },
    ],
    tags: ["LLM", "RAG", "Hybrid Search", "Vector DB", "멀티턴 대화", "도메인 특화 AI", "상담 자동화", "E커머스"],
    accent: "from-purple-500 to-violet-500",
    accentColor: "purple",
    portfolioId: "81d01d6c-dba4-4921-bab9-576fd323d9b1",
  },
  {
    id: "mission-codeison",
    num: "02",
    title: "Mission 코드이썬",
    subtitle: "AI 코드 리뷰 & 품질 분석 솔루션",
    headline: "AI가 코드를 읽고\n품질을 책임집니다",
    desc: "Mission 코드이썬은 AI 기반 코드 리뷰 자동화 솔루션입니다. 코드 품질 분석, 보안 취약점 탐지, 리팩토링 제안까지 — 개발팀의 코드 품질을 한 단계 끌어올립니다.",
    features: [
      { title: "자동 코드 리뷰", desc: "PR이 올라오면 AI가 자동으로 코드를 분석하고 개선 사항을 댓글로 제안합니다." },
      { title: "보안 취약점 탐지", desc: "OWASP Top 10 기반 보안 패턴을 실시간으로 스캔하고 경고합니다." },
      { title: "코드 품질 점수", desc: "가독성, 유지보수성, 성능을 종합 평가하여 정량적 점수를 제공합니다." },
      { title: "팀 학습 리포트", desc: "반복되는 코드 패턴을 분석하여 팀 전체의 코드 문화를 개선합니다." },
    ],
    stats: [],
    tags: ["Code Analysis", "AST", "LLM", "Security Scan", "CI/CD Integration", "Git"],
    accent: "from-cyan-500 to-blue-500",
    accentColor: "cyan",
    portfolioId: "mission-codeison",
  },
];

function ProjectSection({ project, index }: { project: typeof AI_PROJECTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const hasStats = project.stats && project.stats.length > 0;
  const hasExpandedFeatures = project.features.length > 4;

  return (
    <section
      ref={ref}
      className="relative snap-start overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: bgOpacity }}
      >
        <div className={`absolute top-1/4 ${index % 2 === 0 ? "right-0" : "left-0"} w-[700px] h-[700px] bg-${project.accentColor}-500/[0.05] rounded-full blur-[250px]`} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] opacity-30" />
      </motion.div>

      <div className="max-w-7xl mx-auto w-full px-6 py-24 md:py-32 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className={`text-xs font-mono tracking-wider bg-gradient-to-r ${project.accent} bg-clip-text text-transparent`}>
              PROJECT {project.num}
            </span>
            <div className={`h-px w-16 bg-gradient-to-r ${project.accent} opacity-20`} />
          </div>

          <p className="text-white/40 text-sm font-bold tracking-wide mb-3">{project.subtitle}</p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95] mb-8 whitespace-pre-line">
            {project.headline}
          </h2>

          <p className="text-white/40 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
            {project.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[11px] font-medium text-white/35 border border-white/[0.08] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          {hasStats && (
            <div className="flex flex-wrap justify-center gap-10 mb-10">
              {project.stats.map((stat, si) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + si * 0.1 }}
                >
                  <p className={`text-3xl md:text-4xl font-black bg-gradient-to-r ${project.accent} bg-clip-text text-transparent`}>
                    {stat.num}
                  </p>
                  <p className="text-white/30 text-sm mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Feature Cards */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${hasExpandedFeatures ? "lg:grid-cols-4" : "lg:grid-cols-4"} gap-4 mb-14`}>
          {project.features.map((feat, fi) => (
            <motion.div
              key={feat.title}
              className="group relative rounded-2xl p-6 bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + fi * 0.06 }}
              whileHover={{ y: -2 }}
            >
              <div className={`absolute -top-10 -right-10 w-20 h-20 rounded-full bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-[0.06] blur-[40px] transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${project.accent} p-[1px] mb-4`}>
                  <div className="w-full h-full rounded-lg bg-[#0a0a0a] flex items-center justify-center">
                    <span className="text-xs font-black text-white/50">{String(fi + 1).padStart(2, "0")}</span>
                  </div>
                </div>
                <h4 className="text-sm font-black tracking-tight mb-2 text-white/80 group-hover:text-white transition-colors">
                  {feat.title}
                </h4>
                <p className="text-white/30 text-xs leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href={`/portfolio/${project.portfolioId}`}
            className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${project.accent} rounded-full text-white font-bold btn-glow group`}
          >
            자세히 보기
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default function AIServicesPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen snap-y snap-mandatory">
      <Nav />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center snap-start overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/[0.06] rounded-full blur-[200px]"
            animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/[0.05] rounded-full blur-[200px]"
            animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Link href="/services" className="text-white/25 text-xs tracking-wider hover:text-white/50 transition-colors">
              Services
            </Link>
            <span className="text-white/15 text-xs">/</span>
            <span className="text-purple-400/60 text-xs tracking-wider">AI Solutions</span>
          </motion.div>

          <motion.p
            className="text-purple-400 text-sm tracking-[0.4em] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            AI Solutions
          </motion.p>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            지능형 솔루션으로
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              비즈니스를 혁신
            </span>
          </motion.h1>

          <motion.p
            className="text-white/35 text-lg max-w-2xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            LLM, RAG, 컴퓨터 비전 등 최신 AI 기술을 활용하여
            기업의 복잡한 문제를 해결하는 맞춤형 솔루션을 제공합니다.
          </motion.p>

          {/* Project count indicator */}
          <motion.div
            className="flex items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center">
              <p className="text-2xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">02</p>
              <p className="text-white/20 text-xs mt-1">대표 프로젝트</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">AI</p>
              <p className="text-white/20 text-xs mt-1">에이전트 기반</p>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <span className="text-white/15 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
            />
          </motion.div>
        </div>
      </section>

      {/* Project Sections */}
      {AI_PROJECTS.map((project, i) => (
        <ProjectSection key={project.id} project={project} index={i} />
      ))}

      {/* Back to services + CTA */}
      <section className="py-32 px-6 snap-start">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            AI로 해결하고 싶은
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              문제가 있으신가요?
            </span>
          </h2>
          <p className="text-white/35 text-lg mb-10">
            하들소프트의 AI 전문가가 최적의 솔루션을 제안합니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/inquiry"
              className="inline-block px-10 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full text-white font-bold text-lg btn-glow"
            >
              AI 솔루션 문의
            </a>
            <Link
              href="/services"
              className="inline-block px-8 py-4 rounded-full text-white/50 font-bold border border-white/[0.08] btn-glow-outline"
            >
              서비스 전체 보기
            </Link>
          </div>
        </motion.div>
      </section>

      <PageFooter />
    </div>
  );
}
