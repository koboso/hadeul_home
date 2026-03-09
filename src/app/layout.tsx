import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HADEUL - AI & Game Solutions",
  description: "AI 기반 기술, 게임, 소프트웨어 솔루션 전문 기업 하들",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-[#0a0a0a] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
