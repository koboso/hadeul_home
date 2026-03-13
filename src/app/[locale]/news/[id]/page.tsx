import type { Metadata } from "next";
import { redirect } from "next/navigation";
import getDb from "@/lib/db";
import NewsDetailClient from "./NewsDetailClient";

interface NewsRow {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image: string;
  source_url: string;
  source_name: string;
  is_published: number;
  published_at: string;
  created_at: string;
  updated_at: string;
}

function getNewsItem(id: string): NewsRow | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM news WHERE id = ?").get(id) as NewsRow | undefined;
  return row || null;
}

/* ─── SEO: Dynamic Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const item = getNewsItem(id);

  if (!item) {
    return {
      title: "소식을 찾을 수 없습니다 | HADEUL",
    };
  }

  const cleanContent = item.content
    ? item.content.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 300)
    : "";
  const seoDescription = `${item.summary}${cleanContent ? ` — ${cleanContent}` : ""}`.slice(0, 300);

  const keywords = [
    item.category,
    "하들소프트",
    "HADEUL",
    "소식",
    "뉴스",
  ].filter(Boolean);

  return {
    title: `${item.title} | HADEUL News`,
    description: seoDescription,
    keywords: keywords.join(", "),
    openGraph: {
      title: item.title,
      description: item.summary,
      type: "article",
      siteName: "HADEUL - 주식회사 하들소프트",
      images: item.image
        ? [{ url: item.image.split(",")[0].trim(), width: 1200, height: 630, alt: item.title }]
        : [],
      url: `/${locale}/news/${item.id}`,
      publishedTime: item.published_at,
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.summary,
      images: item.image ? [item.image.split(",")[0].trim()] : [],
    },
    alternates: {
      canonical: `/${locale}/news/${item.id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "article:section": item.category || "",
    },
  };
}

/* ─── Page Component ─── */
export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const item = getNewsItem(id);

  // source_url이 있으면 외부 기사로 리다이렉트
  if (item?.source_url) {
    redirect(item.source_url);
  }

  // JSON-LD structured data for news article
  const jsonLd = item
    ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: item.title,
        description: item.summary,
        image: item.image ? item.image.split(",")[0].trim() : undefined,
        datePublished: item.published_at,
        dateModified: item.updated_at || item.published_at,
        articleSection: item.category || undefined,
        author: {
          "@type": "Organization",
          name: "주식회사 하들소프트",
          url: "https://www.hadeul.com",
        },
        publisher: {
          "@type": "Organization",
          name: "주식회사 하들소프트",
          url: "https://www.hadeul.com",
        },
        url: `https://www.hadeul.com/${locale}/news/${item.id}`,
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <NewsDetailClient item={item} />
    </>
  );
}
