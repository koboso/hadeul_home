import type { Metadata } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";
import MaintenanceGuard from "@/components/MaintenanceGuard";

export const metadata: Metadata = {
  title: {
    default: "HADEUL - AI & Software Solutions | 주식회사 하들소프트",
    template: "%s | HADEUL",
  },
  description:
    "AI, IoT, 게임, 웹 플랫폼, 로보틱스, 국방, 해양 등 산업 전 분야 소프트웨어 개발 전문 기업 (주)하들소프트. DevOps 기반 맞춤형 솔루션을 제공합니다.",
  keywords: [
    "하들소프트", "HADEUL", "소프트웨어 개발", "AI", "IoT", "게임 개발",
    "웹 개발", "모바일 앱", "스마트팩토리", "로보틱스", "대전 IT기업",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "HADEUL - 주식회사 하들소프트",
    title: "HADEUL - AI & Software Solutions",
    description: "AI, IoT, 게임, 웹 플랫폼 등 산업 전 분야 소프트웨어 개발 전문 기업",
    url: "https://www.hadeul.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "HADEUL - AI & Software Solutions",
    description: "AI, IoT, 게임, 웹 플랫폼 등 산업 전 분야 소프트웨어 개발 전문 기업",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://www.hadeul.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-[#0a0a0a] text-white antialiased">
        <MaintenanceGuard />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
