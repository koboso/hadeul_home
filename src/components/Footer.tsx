import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">HADEUL</h3>
            <p className="text-text-secondary max-w-md">
              AI 기반 기술과 게임, 소프트웨어 솔루션으로 더 나은 디지털 경험을 만들어갑니다.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">바로가기</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-text-secondary hover:text-text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-text-secondary hover:text-text-primary transition-colors">About</Link></li>
              <li><Link href="#services" className="text-text-secondary hover:text-text-primary transition-colors">Services</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4">연락처</h4>
            <ul className="space-y-2 text-text-secondary">
              <li>info@hadeul.com</li>
              <li>서울특별시</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-text-secondary text-sm">
          &copy; {new Date().getFullYear()} HADEUL. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
