import Link from "next/link";

export default function PageFooter() {
  return (
    <footer className="bg-[#050505] border-t border-white/[0.04]">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

          {/* Left — Logo + Nav */}
          <div className="md:col-span-4">
            <Link href="/">
              <h3
                className="text-4xl font-black text-transparent leading-none tracking-tighter mb-6"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.12)" }}
              >
                HADEUL
              </h3>
            </Link>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-white/25">
              <Link href="/company" className="hover:text-white/60 transition-colors">회사소개</Link>
              <Link href="/services" className="hover:text-white/60 transition-colors">서비스</Link>
              <Link href="/portfolio" className="hover:text-white/60 transition-colors">포트폴리오</Link>
              <Link href="/news" className="hover:text-white/60 transition-colors">뉴스</Link>
              <Link href="/inquiry" className="hover:text-white/60 transition-colors">문의</Link>
            </nav>
          </div>

          {/* Center — Company Info */}
          <div className="md:col-span-5 text-[12px] text-white/20 leading-[1.9] space-y-0">
            <p className="text-white/35 text-[13px] font-semibold mb-2">주식회사 하들소프트</p>
            <p>대표 : 김재식</p>
            <p>대전시 유성구 대학로 31, 2118호(봉명동, 한진리조트)</p>
            <p>사업자등록번호 : 244-81-01030</p>
            <p>개인정보책임관리자 : 김재식</p>
            <p>
              <a href="mailto:hadeulsoft@gmail.com" className="text-white/30 hover:text-purple-400 transition-colors">
                hadeulsoft@gmail.com
              </a>
            </p>
          </div>

          {/* Right — Policy */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end gap-3">
            <a
              href="/my/privacy.php"
              className="text-[12px] text-white/25 hover:text-purple-400 transition-colors"
            >
              개인정보처리방침
            </a>
            <a
              href="/my/market_privacy.php"
              className="text-[12px] text-white/25 hover:text-purple-400 transition-colors"
            >
              Mobile Privacy Policy
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.04]">
          <p className="text-white/10 text-[11px] tracking-[0.12em]">
            Copyright 2017. HADEUL SOFT CO. LTD. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
