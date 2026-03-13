"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/LocaleContext";
import type { Locale } from "@/i18n/config";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav({ transparent = true }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, t } = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const showBg = !transparent || scrolled;

  const links = [
    { href: `/${locale}/company`, label: t.nav.company },
    { href: `/${locale}/services`, label: t.nav.services },
    { href: `/${locale}/portfolio`, label: t.nav.portfolio },
    { href: `/${locale}/news`, label: t.nav.news },
    { href: `/${locale}/careers`, label: t.nav.careers },
    { href: `/${locale}/inquiry`, label: t.nav.inquiry },
  ];

  const switchLocale = (target: Locale) => {
    const rest = pathname.replace(/^\/(ko|en)/, "");
    return `/${target}${rest}`;
  };
  const otherLocale: Locale = locale === "ko" ? "en" : "ko";

  const isActive = useCallback((href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showBg || menuOpen ? "bg-black/70 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 flex items-center justify-between h-16">
          <Link href={`/${locale}`} className={`text-white font-black text-xl tracking-tighter relative z-[60] transition-opacity ${menuOpen ? "opacity-0 md:opacity-100" : ""}`}>
            HADEUL
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm tracking-wider hover:text-white transition-colors uppercase ${
                  isActive(l.href) ? "text-purple-400 font-bold" : "text-white/40"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={switchLocale(otherLocale)}
              className="ml-2 px-3.5 py-1.5 text-[11px] font-extrabold tracking-wider text-white/70 border border-white/20 rounded-lg hover:text-white hover:bg-white/10 hover:border-white/30 transition-all uppercase"
            >
              {otherLocale === "en" ? "EN" : "KR"}
            </Link>
          </div>

          {/* Mobile: language switcher + hamburger */}
          <div className="md:hidden flex items-center gap-2 relative z-[60]">
            <Link
              href={switchLocale(otherLocale)}
              className="px-3 py-1.5 text-[11px] font-extrabold tracking-wider text-white/70 border border-white/20 rounded-lg hover:text-white hover:bg-white/10 hover:border-white/30 transition-all uppercase"
            >
              {otherLocale === "en" ? "EN" : "KR"}
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
                <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[55] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" />

            {/* Close button */}
            <motion.button
              onClick={() => setMenuOpen(false)}
              className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              aria-label="Close menu"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Menu content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-8 -mt-8">
              <nav className="flex flex-col items-center gap-1 w-full max-w-xs">
                {links.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="w-full"
                  >
                    <Link
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block w-full text-center py-3.5 text-lg font-bold tracking-wider uppercase rounded-xl transition-all ${
                        isActive(l.href)
                          ? "text-purple-400 bg-purple-500/10"
                          : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-safe-b text-center pb-8"
              >
                <p className="text-white/15 text-[10px] tracking-[0.3em] uppercase">
                  HADEUL SOFT CO. LTD.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
