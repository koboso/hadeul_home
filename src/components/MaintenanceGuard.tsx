"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function MaintenanceGuard() {
  const [maintenance, setMaintenance] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Skip check for admin pages and API routes
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    fetch("/api/maintenance")
      .then((r) => r.json())
      .then((d) => setMaintenance(d.maintenance))
      .catch(() => setMaintenance(false));
  }, [pathname]);

  if (!maintenance || pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center px-8">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M11.42 15.17l-5.16-5.16a2.121 2.121 0 113-3l5.16 5.16m0 0l5.16 5.16a2.121 2.121 0 01-3 3l-5.16-5.16zm0 0L9 13.59" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
          점검 중
        </h1>
        <p className="text-white/40 text-lg mb-2">
          더 나은 서비스를 위해 시스템 점검을 진행하고 있습니다.
        </p>
        <p className="text-white/20 text-sm">
          빠른 시일 내에 정상 운영될 예정입니다. 불편을 드려 죄송합니다.
        </p>
        <div className="mt-12">
          <span className="text-purple-400/60 text-xs tracking-[0.3em] uppercase">
            (주)하들소프트
          </span>
        </div>
      </div>
    </div>
  );
}
