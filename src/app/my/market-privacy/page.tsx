"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function MarketPrivacyContent() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") === "ko" ? "ko" : "en";
  const src = `/my/market_privacy_gb_${lang}.html`;

  return (
    <iframe
      src={src}
      className="w-screen h-screen border-0"
      style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 9999 }}
      title="Mobile Privacy Policy"
    />
  );
}

export default function MarketPrivacyPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#0a0a0a] text-white min-h-screen flex items-center justify-center">
          <p className="text-white/30">Loading...</p>
        </div>
      }
    >
      <MarketPrivacyContent />
    </Suspense>
  );
}
