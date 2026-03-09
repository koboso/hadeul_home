"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "/company", label: "Company" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/news", label: "News" },
  { href: "/careers", label: "Careers" },
  { href: "/inquiry", label: "Inquiry" },
];

export default function Nav({ transparent = true }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  const showBg = !transparent || scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showBg ? "bg-black/70 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 flex items-center justify-between h-16">
        <Link href="/" className="text-white font-black text-xl tracking-tighter">
          HADEUL
        </Link>
        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/40 text-sm tracking-wider hover:text-white transition-colors uppercase"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
