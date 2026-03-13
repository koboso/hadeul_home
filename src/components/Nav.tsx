"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/LocaleContext";
import type { Locale } from "@/i18n/config";

export default function Nav({ transparent = true }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const { locale, t } = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  const showBg = !transparent || scrolled;

  const links = [
    { href: `/${locale}/company`, label: t.nav.company },
    { href: `/${locale}/services`, label: t.nav.services },
    { href: `/${locale}/portfolio`, label: t.nav.portfolio },
    { href: `/${locale}/news`, label: t.nav.news },
    { href: `/${locale}/careers`, label: t.nav.careers },
    { href: `/${locale}/inquiry`, label: t.nav.inquiry },
  ];

  // Build the alternate locale URL by swapping the locale prefix
  const switchLocale = (target: Locale) => {
    const rest = pathname.replace(/^\/(ko|en)/, "");
    return `/${target}${rest}`;
  };
  const otherLocale: Locale = locale === "ko" ? "en" : "ko";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showBg ? "bg-black/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-16 flex items-center justify-between h-16">
        <Link href={`/${locale}`} className="text-white font-black text-xl tracking-tighter">
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

          {/* Language Switcher */}
          <Link
            href={switchLocale(otherLocale)}
            className="ml-2 px-3.5 py-1.5 text-[11px] font-extrabold tracking-wider text-white/70 border border-white/20 rounded-lg hover:text-white hover:bg-white/10 hover:border-white/30 transition-all uppercase"
          >
            {otherLocale === "en" ? "EN" : "KR"}
          </Link>
        </div>

        {/* Mobile: language switcher */}
        <div className="md:hidden flex items-center gap-3">
          <Link
            href={switchLocale(otherLocale)}
            className="px-3.5 py-1.5 text-[11px] font-extrabold tracking-wider text-white/70 border border-white/20 rounded-lg hover:text-white hover:bg-white/10 hover:border-white/30 transition-all uppercase"
          >
            {otherLocale === "en" ? "EN" : "KR"}
          </Link>
        </div>
      </div>
    </nav>
  );
}
