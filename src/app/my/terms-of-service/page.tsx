"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function TermsContent() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") === "en" ? "en" : "ko";
  const src = `/my/terms_of_service_gb_${lang}.html`;

  return (
    <iframe
      src={src}
      className="w-screen h-screen border-0"
      style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 9999 }}
      title="Terms of Service"
    />
  );
}

export default function TermsOfServicePage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#0a0a0a] text-white min-h-screen flex items-center justify-center">
          <p className="text-white/30">Loading...</p>
        </div>
      }
    >
      <TermsContent />
    </Suspense>
  );
}
