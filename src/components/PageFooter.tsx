import Link from "next/link";

export default function PageFooter() {
  return (
    <footer className="bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <Link href="/">
              <h3
                className="text-3xl md:text-5xl font-black text-transparent leading-none tracking-tighter mb-4"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
              >
                HADEUL
              </h3>
            </Link>
            <p className="text-white/15 text-sm">
              AI &middot; Game &middot; Software Engineering
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/10 text-xs tracking-[0.3em] uppercase">
              &copy; 2026 Hadeul Corp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
