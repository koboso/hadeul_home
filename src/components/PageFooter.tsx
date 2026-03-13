"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleContext";

export default function PageFooter() {
  const { locale, t } = useLocale();

  return (
    <footer className="bg-[#050505] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8">
          {/* Left — Logo + Nav */}
          <div className="md:col-span-4">
            <Link href={`/${locale}`}>
              <h3 className="text-4xl font-black text-white leading-none tracking-tighter mb-6">
                HADEUL
              </h3>
            </Link>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-white/50">
              <Link href={`/${locale}/company`} className="hover:text-white transition-colors">{t.footer.company}</Link>
              <Link href={`/${locale}/services`} className="hover:text-white transition-colors">{t.footer.services}</Link>
              <Link href={`/${locale}/portfolio`} className="hover:text-white transition-colors">{t.footer.portfolio}</Link>
              <Link href={`/${locale}/news`} className="hover:text-white transition-colors">{t.footer.news}</Link>
              <Link href={`/${locale}/careers`} className="hover:text-white transition-colors">{t.footer.careers}</Link>
              <Link href={`/${locale}/inquiry`} className="hover:text-white transition-colors">{t.footer.inquiry}</Link>
            </nav>
          </div>

          {/* Center — Company Info */}
          <div className="md:col-span-5 text-[11px] sm:text-[12px] text-white/40 leading-[1.9] space-y-0">
            <p className="text-white/60 text-[13px] font-semibold mb-2">{t.footer.companyName}</p>
            <p>{t.footer.ceo}</p>
            <p>{t.footer.address}</p>
            <p>{t.footer.bizNumber}</p>
            <p>{t.footer.privacyOfficer}</p>
            <p>
              <a href="mailto:hadeulsoft@gmail.com" className="text-white/50 hover:text-purple-400 transition-colors">
                hadeulsoft@gmail.com
              </a>
            </p>
          </div>

          {/* Right — Policy */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end gap-3">
            <a href="/my/privacy.php" className="text-[12px] text-white/45 hover:text-purple-400 transition-colors">
              {t.footer.privacyPolicy}
            </a>
            <a href="/my/market_privacy.php" className="text-[12px] text-white/45 hover:text-purple-400 transition-colors">
              {t.footer.mobilePrivacyPolicy}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06]">
          <p className="text-white/25 text-[11px] tracking-[0.12em]">
            Copyright 2017. HADEUL SOFT CO. LTD. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
