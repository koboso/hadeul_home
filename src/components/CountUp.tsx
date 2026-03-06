"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

interface CountUpProps {
  target: number;
  suffix?: string;
  label: string;
}

export default function CountUp({ target, suffix = "", label }: CountUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      animate(count, target, { duration: 2, ease: "easeOut" });
    }
  }, [isInView, count, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-7xl font-bold gradient-text mb-2">
        <motion.span>{rounded}</motion.span>
        {suffix}
      </div>
      <div className="text-text-secondary text-lg">{label}</div>
    </div>
  );
}
