"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ScrollTextProps {
  text: string;
  sub?: string;
  className?: string;
}

export default function ScrollText({ text, sub, className = "" }: ScrollTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0, 1, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.8, 1, 1, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, 0, 0, -80]);

  return (
    <div ref={ref} className={`min-h-screen flex items-center justify-center ${className}`}>
      <motion.div style={{ opacity, scale, y }} className="text-center px-6 max-w-5xl">
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold gradient-text leading-tight">
          {text}
        </h2>
        {sub && (
          <p className="text-lg md:text-2xl text-text-secondary mt-6 max-w-2xl mx-auto">
            {sub}
          </p>
        )}
      </motion.div>
    </div>
  );
}
