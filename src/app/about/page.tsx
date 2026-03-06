"use client";

import { motion } from "framer-motion";
import ScrollText from "@/components/ScrollText";
import ScrollReveal from "@/components/ScrollReveal";

const timeline = [
  { year: "2023", title: "회사 설립", desc: "AI와 게임 기술의 융합을 목표로 하들 창립" },
  { year: "2024", title: "첫 AI 솔루션 출시", desc: "자체 개발 AI 엔진 기반 B2B 솔루션 런칭" },
  { year: "2025", title: "게임 사업부 확장", desc: "모바일/PC 크로스플랫폼 게임 개발 착수" },
  { year: "2026", title: "글로벌 진출", desc: "해외 파트너십 체결 및 글로벌 서비스 확대" },
];

const values = [
  {
    icon: "💡",
    title: "Innovation",
    desc: "끊임없는 기술 연구와 실험을 통해 새로운 가능성을 탐구합니다.",
  },
  {
    icon: "🤝",
    title: "Collaboration",
    desc: "팀원, 고객, 파트너와의 긴밀한 협업으로 최고의 결과를 만듭니다.",
  },
  {
    icon: "🎯",
    title: "Excellence",
    desc: "모든 프로젝트에서 최고 수준의 품질과 성과를 추구합니다.",
  },
  {
    icon: "🌏",
    title: "Global Impact",
    desc: "기술을 통해 전 세계에 긍정적인 영향력을 확대합니다.",
  },
];

const team = [
  { role: "CEO", name: "대표이사", desc: "AI 연구 10년+, 전 네이버 AI Lab" },
  { role: "CTO", name: "기술이사", desc: "게임 엔진 아키텍트, 전 넥슨" },
  { role: "CPO", name: "제품총괄", desc: "B2B SaaS 프로덕트 매니저 8년+" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface-light to-surface" />
        <motion.div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.p
            className="text-accent text-sm md:text-base tracking-[0.3em] uppercase mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Us
          </motion.p>
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[0.95]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="gradient-text">기술의 미래를</span>
            <br />
            <span className="text-text-primary">만들어가는 사람들</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            하들은 AI, 게임, 소프트웨어 솔루션 분야에서
            혁신적인 기술로 디지털 세상을 변화시키고 있습니다.
          </motion.p>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-text-secondary/40 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 bg-accent rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Mission Scroll Text */}
      <ScrollText
        text="We Innovate"
        sub="기술과 창의력으로 새로운 가치를 창출합니다."
      />

      {/* Mission Detail */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <ScrollReveal direction="left">
            <div>
              <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4">Our Mission</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                기술과 창의력으로
                <br />새로운 가치를 창출합니다
              </h2>
              <p className="text-text-secondary leading-relaxed text-lg mb-6">
                하들은 인공지능, 게임 개발, 엔터프라이즈 소프트웨어 솔루션을 통해
                고객과 사용자에게 최적의 디지털 경험을 제공하는 것을 목표로 합니다.
              </p>
              <p className="text-text-secondary leading-relaxed text-lg">
                자체 AI 연구소를 운영하며, 최신 기술 트렌드를 선도하고
                실질적인 비즈니스 가치를 만들어내는 데 집중합니다.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="glass-card rounded-3xl p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
              <div className="text-7xl mb-6">🚀</div>
              <h3 className="text-3xl font-bold mb-4">Vision 2030</h3>
              <p className="text-text-secondary text-lg leading-relaxed">
                &ldquo;아시아를 대표하는<br />AI·게임 기술 기업&rdquo;
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values Scroll Text */}
      <ScrollText
        text="Our Values"
        sub="우리가 믿는 가치, 우리가 지키는 원칙"
      />

      {/* Core Values */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <motion.div
                  className="glass-card rounded-3xl p-10 text-center h-full"
                  whileHover={{ y: -8, borderColor: "rgba(99, 102, 241, 0.5)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-6xl mb-6">{v.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{v.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{v.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* History Scroll Text */}
      <ScrollText
        text="Our Journey"
        sub="작은 시작에서 글로벌 기업으로"
      />

      {/* Timeline */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-accent/50 to-transparent -translate-x-1/2" />

            <div className="space-y-20">
              {timeline.map((item, i) => (
                <ScrollReveal key={item.year} delay={0.1}>
                  <div
                    className={`relative flex items-center gap-8 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <motion.div
                      className="absolute left-8 md:left-1/2 w-5 h-5 bg-primary rounded-full -translate-x-1/2 z-10 border-4 border-surface"
                      whileInView={{ scale: [0, 1.3, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    />

                    <div className={`ml-20 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-20 md:text-right" : "md:pl-20"}`}>
                      <span className="text-accent font-mono font-bold text-2xl">{item.year}</span>
                      <h3 className="text-2xl font-bold mt-2">{item.title}</h3>
                      <p className="text-text-secondary mt-3 text-lg">{item.desc}</p>
                    </div>

                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Scroll Text */}
      <ScrollText
        text="Our Team"
        sub="최고의 전문가들이 함께합니다"
      />

      {/* Leadership */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((t, i) => (
              <ScrollReveal key={t.role} delay={i * 0.15}>
                <motion.div
                  className="glass-card rounded-3xl p-10 text-center"
                  whileHover={{ y: -8, borderColor: "rgba(99, 102, 241, 0.5)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-white">
                    {t.role}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{t.name}</h3>
                  <p className="text-text-secondary">{t.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center glass-card rounded-3xl p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">함께 성장할 인재를 찾고 있습니다</h2>
            <p className="text-text-secondary text-lg mb-10 max-w-xl mx-auto">
              AI, 게임, 소프트웨어 분야에서 열정을 가진 분들과 함께하고 싶습니다.
            </p>
            <motion.a
              href="mailto:careers@hadeul.com"
              className="inline-block px-10 py-4 bg-primary hover:bg-primary-dark rounded-xl text-white font-medium text-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              채용 문의
            </motion.a>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
