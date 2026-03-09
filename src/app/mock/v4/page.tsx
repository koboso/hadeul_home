"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

/* ─── V4: Minimal Editorial / Magazine ─── */

const IMG = {
  hero: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
  ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
  game: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80",
  dev: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=80",
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
  abstract: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
};

const VIDEO = "https://videos.pexels.com/video-files/3255275/3255275-uhd_2560_1440_25fps.mp4";

/* ─── Design Tokens ─── */
const C = {
  bg: "#faf9f6",
  bgAlt: "#f5f0eb",
  text: "#1a1a1a",
  textMuted: "#6b6560",
  accent: "#c4704b",
  border: "rgba(26,26,26,0.1)",
};

/* ─── Fade-in wrapper ─── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── 1. Hero — Ultra-minimal, large serif ─── */
function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-end"
      style={{ backgroundColor: C.bg }}
    >
      {/* Back link */}
      <Link
        href="/mock"
        className="fixed top-6 left-8 z-50 text-xs tracking-[0.2em] uppercase"
        style={{ color: C.textMuted }}
      >
        &larr; Back
      </Link>

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 w-full z-40 flex items-center justify-between px-8 py-5"
        style={{ backgroundColor: `${C.bg}ee` }}
      >
        <span
          className="font-serif text-lg tracking-wide"
          style={{ color: C.text }}
        >
          Hadeul
        </span>
        <div className="flex gap-8">
          {["Work", "About", "Journal", "Contact"].map((item) => (
            <span
              key={item}
              className="text-xs tracking-[0.15em] uppercase cursor-pointer transition-colors duration-300 hover:opacity-60"
              style={{ color: C.textMuted }}
            >
              {item}
            </span>
          ))}
        </div>
      </nav>

      {/* Hero image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={IMG.hero}
          alt="Modern workspace"
          className="w-full h-full object-cover"
          style={{ filter: "saturate(0.8) brightness(0.95)" }}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${C.bg} 0%, ${C.bg}99 30%, transparent 70%)`,
          }}
        />
      </div>

      {/* Hero text */}
      <div className="relative z-10 px-8 pb-20 md:px-16 lg:px-24 max-w-[1400px]">
        <motion.h1
          className="font-serif leading-[0.9] tracking-tight"
          style={{
            color: C.text,
            fontSize: "clamp(3rem, 8vw, 9rem)",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        >
          Crafting
          <br />
          Digital
          <br />
          <span style={{ color: C.accent, fontStyle: "italic" }}>
            Futures
          </span>
        </motion.h1>

        <motion.p
          className="mt-8 max-w-md text-sm leading-relaxed tracking-wide"
          style={{ color: C.textMuted }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          We are a Seoul-based studio specializing in AI, game development,
          and immersive digital experiences — designing for what comes next.
        </motion.p>

        <motion.div
          className="mt-12 flex items-center gap-3 cursor-pointer group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <span
            className="text-xs tracking-[0.2em] uppercase transition-colors duration-300 group-hover:opacity-60"
            style={{ color: C.text }}
          >
            Explore our work
          </span>
          <motion.span
            className="inline-block"
            style={{ color: C.text }}
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            &rarr;
          </motion.span>
        </motion.div>
      </div>

      {/* Year tag */}
      <motion.div
        className="absolute right-8 bottom-20 z-10 text-right hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
      >
        <p
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: C.textMuted }}
        >
          Established
        </p>
        <p
          className="font-serif text-6xl mt-1"
          style={{ color: C.text, opacity: 0.15 }}
        >
          2024
        </p>
      </motion.div>
    </section>
  );
}

/* ─── 2. Asymmetric Image + Text ─── */
function AsymmetricSection() {
  return (
    <section
      className="relative py-32 md:py-40 px-8 md:px-16 lg:px-24"
      style={{ backgroundColor: C.bg }}
    >
      <div
        className="grid gap-8"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
          gridTemplateRows: "auto auto",
        }}
      >
        {/* Large image — spans 7 columns, offset by 1 */}
        <Reveal
          className="col-start-1 col-end-8 row-start-1 row-end-3"
        >
          <div className="overflow-hidden" style={{ aspectRatio: "4/5" }}>
            <motion.img
              src={IMG.ai}
              alt="AI Technology"
              className="w-full h-full object-cover"
              style={{ filter: "saturate(0.7) contrast(1.05)" }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </div>
        </Reveal>

        {/* Text — offset to the right, vertically centered */}
        <div className="col-start-9 col-end-13 row-start-1 row-end-3 flex flex-col justify-center pl-4">
          <Reveal delay={0.15}>
            <p
              className="text-xs tracking-[0.25em] uppercase mb-6"
              style={{ color: C.accent }}
            >
              Our Philosophy
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <h2
              className="font-serif leading-[1.1] mb-8"
              style={{
                color: C.text,
                fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)",
              }}
            >
              Technology
              <br />
              should feel
              <br />
              <em style={{ color: C.accent }}>invisible</em>
            </h2>
          </Reveal>
          <Reveal delay={0.35}>
            <p
              className="text-sm leading-[1.9] max-w-sm"
              style={{ color: C.textMuted }}
            >
              We believe the best digital experiences are those where technology
              dissolves into the background, leaving only meaning, emotion, and
              purpose. Every project begins with a question: what does this need
              to feel like?
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div
              className="mt-10 pt-6"
              style={{ borderTop: `1px solid ${C.border}` }}
            >
              <div className="flex gap-12">
                <div>
                  <p className="font-serif text-3xl" style={{ color: C.text }}>
                    47
                  </p>
                  <p
                    className="text-xs tracking-[0.15em] uppercase mt-1"
                    style={{ color: C.textMuted }}
                  >
                    Projects
                  </p>
                </div>
                <div>
                  <p className="font-serif text-3xl" style={{ color: C.text }}>
                    12
                  </p>
                  <p
                    className="text-xs tracking-[0.15em] uppercase mt-1"
                    style={{ color: C.textMuted }}
                  >
                    Awards
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── 3. Full-Bleed Parallax Image ─── */
function ParallaxImage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative h-[70vh] overflow-hidden"
      style={{ backgroundColor: C.text }}
    >
      <motion.img
        src={IMG.abstract}
        alt="Abstract"
        className="absolute inset-0 w-full h-[120%] object-cover"
        style={{ y, filter: "saturate(0.6) brightness(0.7)" }}
      />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <Reveal>
          <p
            className="font-serif text-center leading-[1.2] tracking-tight"
            style={{
              color: "#faf9f6",
              fontSize: "clamp(1.5rem, 4vw, 4rem)",
              maxWidth: "700px",
            }}
          >
            Where craft meets
            <br />
            <em>conviction</em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── 4. Staggered Projects ─── */
const PROJECTS = [
  {
    title: "Neural Canvas",
    category: "AI / Generative Art",
    image: IMG.ai,
    year: "2025",
    description:
      "A generative AI platform transforming text into living, evolving artworks.",
  },
  {
    title: "Phantom Protocol",
    category: "Game Development",
    image: IMG.game,
    year: "2025",
    description:
      "Tactical stealth game blending narrative depth with emergent gameplay systems.",
  },
  {
    title: "Meridian Platform",
    category: "Web / Full-Stack",
    image: IMG.dev,
    year: "2024",
    description:
      "Enterprise-grade analytics dashboard with real-time data visualization.",
  },
  {
    title: "Collective Studio",
    category: "Brand / Digital",
    image: IMG.team,
    year: "2024",
    description:
      "End-to-end brand identity and digital presence for a creative collective.",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const isLarge = index % 3 === 0;
  const offset = index % 2 === 1;

  return (
    <Reveal
      className={`${isLarge ? "md:col-span-7" : "md:col-span-5"} ${
        offset ? "md:mt-24" : ""
      }`}
      delay={index * 0.1}
    >
      <div
        className="group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <div
          className="overflow-hidden relative"
          style={{ aspectRatio: isLarge ? "16/10" : "4/5" }}
        >
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ filter: "saturate(0.7)" }}
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 flex items-end p-8"
            style={{ backgroundColor: "rgba(26,26,26,0.4)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: "#faf9f6" }}
            >
              {project.description}
            </p>
          </motion.div>
        </div>

        {/* Info */}
        <div className="mt-5 flex items-start justify-between">
          <div>
            <h3
              className="font-serif text-xl md:text-2xl"
              style={{ color: C.text }}
            >
              {project.title}
            </h3>
            <p
              className="text-xs tracking-[0.15em] uppercase mt-1"
              style={{ color: C.textMuted }}
            >
              {project.category}
            </p>
          </div>
          <span
            className="text-xs tracking-[0.15em] mt-1"
            style={{ color: C.textMuted }}
          >
            {project.year}
          </span>
        </div>

        {/* Underline on hover */}
        <motion.div
          className="mt-4 h-px origin-left"
          style={{ backgroundColor: C.text }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </Reveal>
  );
}

function ProjectsSection() {
  return (
    <section
      className="py-32 md:py-40 px-8 md:px-16 lg:px-24"
      style={{ backgroundColor: C.bg }}
    >
      <Reveal>
        <div className="flex items-end justify-between mb-20">
          <div>
            <p
              className="text-xs tracking-[0.25em] uppercase mb-4"
              style={{ color: C.accent }}
            >
              Selected Work
            </p>
            <h2
              className="font-serif"
              style={{
                color: C.text,
                fontSize: "clamp(2rem, 4vw, 4rem)",
              }}
            >
              Recent Projects
            </h2>
          </div>
          <span
            className="text-xs tracking-[0.2em] uppercase hidden md:block cursor-pointer transition-opacity duration-300 hover:opacity-50"
            style={{ color: C.textMuted }}
          >
            View all &rarr;
          </span>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─── 5. Large Quote / Philosophy ─── */
function QuoteSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0.6]);

  return (
    <section
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-24"
      style={{ backgroundColor: C.bgAlt }}
    >
      <motion.div className="max-w-4xl text-center" style={{ opacity }}>
        <p
          className="text-xs tracking-[0.3em] uppercase mb-10"
          style={{ color: C.accent }}
        >
          Our Belief
        </p>
        <blockquote
          className="font-serif leading-[1.3] tracking-tight"
          style={{
            color: C.text,
            fontSize: "clamp(1.6rem, 4vw, 3.8rem)",
          }}
        >
          &ldquo;The details are not the details.
          <br />
          They make the{" "}
          <em style={{ color: C.accent }}>design</em>.&rdquo;
        </blockquote>
        <p
          className="mt-10 text-sm tracking-[0.15em]"
          style={{ color: C.textMuted }}
        >
          &mdash; Charles Eames
        </p>
      </motion.div>
    </section>
  );
}

/* ─── 6. Horizontal Marquee ─── */
function Marquee() {
  const items = [
    "Artificial Intelligence",
    "Game Development",
    "Interactive Design",
    "Brand Strategy",
    "Full-Stack Engineering",
    "Motion Design",
    "UX Research",
    "Creative Direction",
  ];
  const repeated = [...items, ...items, ...items];

  return (
    <section
      className="py-10 overflow-hidden"
      style={{
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
        backgroundColor: C.bg,
      }}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="font-serif text-lg md:text-xl italic mx-8 md:mx-12 shrink-0"
            style={{ color: C.textMuted }}
          >
            {item}
            <span className="mx-8 md:mx-12 not-italic" style={{ color: C.border }}>
              &bull;
            </span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}

/* ─── 7. Video Interlude ─── */
function VideoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <section
      ref={ref}
      className="py-20 px-8 md:px-16 lg:px-24"
      style={{ backgroundColor: C.bg }}
    >
      <motion.div
        className="overflow-hidden relative"
        style={{ scale, aspectRatio: "21/9" }}
      >
        <video
          src={VIDEO}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: "saturate(0.5) brightness(0.85)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Reveal>
            <p
              className="font-serif text-center italic"
              style={{
                color: "#faf9f6",
                fontSize: "clamp(1.2rem, 2.5vw, 2.5rem)",
              }}
            >
              Every pixel, intentional
            </p>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── 8. Services / Capabilities ─── */
const SERVICES = [
  {
    number: "01",
    title: "AI & Machine Learning",
    text: "Custom models, intelligent systems, and generative tools that redefine what's possible.",
  },
  {
    number: "02",
    title: "Game Development",
    text: "Immersive worlds built with narrative depth, technical precision, and artistic vision.",
  },
  {
    number: "03",
    title: "Web & Platforms",
    text: "Performant, accessible, and beautifully engineered digital products at scale.",
  },
  {
    number: "04",
    title: "Brand & Experience",
    text: "Identity systems and experience design that create lasting emotional connections.",
  },
];

function ServicesSection() {
  return (
    <section
      className="py-32 md:py-40 px-8 md:px-16 lg:px-24"
      style={{ backgroundColor: C.bgAlt }}
    >
      <Reveal>
        <p
          className="text-xs tracking-[0.25em] uppercase mb-4"
          style={{ color: C.accent }}
        >
          Capabilities
        </p>
        <h2
          className="font-serif mb-20"
          style={{
            color: C.text,
            fontSize: "clamp(2rem, 4vw, 4rem)",
          }}
        >
          What we do
        </h2>
      </Reveal>

      <div>
        {SERVICES.map((service, i) => (
          <Reveal key={service.number} delay={i * 0.08}>
            <div
              className="group py-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start cursor-pointer transition-colors duration-500"
              style={{ borderTop: `1px solid ${C.border}` }}
            >
              <span
                className="text-xs tracking-[0.15em] md:col-span-1"
                style={{ color: C.textMuted }}
              >
                {service.number}
              </span>
              <h3
                className="font-serif text-2xl md:text-3xl md:col-span-5 transition-colors duration-300 group-hover:text-[#c4704b]"
                style={{ color: C.text }}
              >
                {service.title}
              </h3>
              <p
                className="text-sm leading-[1.8] md:col-span-5 md:col-start-8"
                style={{ color: C.textMuted }}
              >
                {service.text}
              </p>
            </div>
          </Reveal>
        ))}
        <div style={{ borderTop: `1px solid ${C.border}` }} />
      </div>
    </section>
  );
}

/* ─── 9. Contact / CTA ─── */
function ContactSection() {
  return (
    <section
      className="py-32 md:py-48 px-8 md:px-16 lg:px-24 text-center"
      style={{ backgroundColor: C.bg }}
    >
      <Reveal>
        <p
          className="text-xs tracking-[0.25em] uppercase mb-8"
          style={{ color: C.accent }}
        >
          Get in touch
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <h2
          className="font-serif leading-[1.1] mb-8"
          style={{
            color: C.text,
            fontSize: "clamp(2.5rem, 6vw, 6rem)",
          }}
        >
          Let&apos;s build
          <br />
          something{" "}
          <em style={{ color: C.accent }}>remarkable</em>
        </h2>
      </Reveal>
      <Reveal delay={0.3}>
        <p
          className="text-sm leading-relaxed max-w-md mx-auto mb-12"
          style={{ color: C.textMuted }}
        >
          We&apos;re always open to new conversations. Whether you have a project
          in mind or just want to say hello, we&apos;d love to hear from you.
        </p>
      </Reveal>
      <Reveal delay={0.4}>
        <a
          href="mailto:hello@hadeul.com"
          className="inline-block font-serif text-xl md:text-2xl transition-colors duration-300 hover:text-[#c4704b]"
          style={{
            color: C.text,
            borderBottom: `1px solid ${C.border}`,
            paddingBottom: "4px",
          }}
        >
          hello@hadeul.com
        </a>
      </Reveal>
      <Reveal delay={0.5}>
        <div className="mt-16 flex items-center justify-center gap-12">
          {["Instagram", "LinkedIn", "GitHub", "Dribbble"].map((s) => (
            <span
              key={s}
              className="text-xs tracking-[0.15em] uppercase cursor-pointer transition-opacity duration-300 hover:opacity-50"
              style={{ color: C.textMuted }}
            >
              {s}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ─── 10. Footer ─── */
function Footer() {
  return (
    <footer
      className="px-8 md:px-16 lg:px-24 py-10 flex flex-col md:flex-row items-center justify-between gap-4"
      style={{
        backgroundColor: C.bg,
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <span className="text-xs tracking-[0.1em]" style={{ color: C.textMuted }}>
        &copy; 2024 &mdash; Hadeul. All rights reserved.
      </span>
      <span className="font-serif text-sm italic" style={{ color: C.textMuted }}>
        Seoul, South Korea
      </span>
      <span className="text-xs tracking-[0.1em]" style={{ color: C.textMuted }}>
        Design &amp; Development Studio
      </span>
    </footer>
  );
}

/* ─── Page ─── */
export default function V4() {
  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: C.bg, color: C.text }}
    >
      <Hero />
      <AsymmetricSection />
      <ParallaxImage />
      <ProjectsSection />
      <Marquee />
      <QuoteSection />
      <VideoSection />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
