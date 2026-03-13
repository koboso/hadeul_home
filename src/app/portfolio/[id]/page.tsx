import type { Metadata } from "next";
import getDb from "@/lib/db";
import PortfolioDetailClient from "./PortfolioDetailClient";

interface PortfolioRow {
  id: string;
  client: string;
  title: string;
  description: string;
  detail: string;
  image: string;
  video: string;
  tech_stack: string;
  architecture: string;
  target_device: string;
  category_name: string;
  category_slug: string;
}

function getPortfolioItem(id: string): PortfolioRow | null {
  const db = getDb();
  const row = db.prepare(`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM portfolio p
    JOIN categories c ON p.category_id = c.id
    WHERE p.id = ?
  `).get(id) as PortfolioRow | undefined;
  return row || null;
}

/* ─── SEO: Dynamic Metadata ─── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = getPortfolioItem(id);

  if (!item) {
    return {
      title: "프로젝트를 찾을 수 없습니다 | HADEUL",
    };
  }

  const techTags = item.tech_stack ? item.tech_stack.split(",").filter(Boolean) : [];
  const keywords = [
    item.category_name,
    item.client,
    ...techTags,
    "하들소프트",
    "HADEUL",
    "소프트웨어 개발",
    "포트폴리오",
  ];

  // Strip HTML for clean description
  const cleanDetail = item.detail
    ? item.detail.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim().slice(0, 300)
    : "";
  const seoDescription = `${item.description}${cleanDetail ? ` — ${cleanDetail}` : ""}`.slice(0, 300);

  return {
    title: `${item.title} | ${item.client} | HADEUL Portfolio`,
    description: seoDescription,
    keywords: keywords.join(", "),
    openGraph: {
      title: `${item.title} — ${item.client}`,
      description: item.description,
      type: "article",
      siteName: "HADEUL - 주식회사 하들소프트",
      images: item.image
        ? [{ url: item.image.split(",")[0].trim(), width: 1200, height: 630, alt: item.title }]
        : [],
      url: `/portfolio/${item.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} — ${item.client}`,
      description: item.description,
      images: item.image ? [item.image.split(",")[0].trim()] : [],
    },
    alternates: {
      canonical: `/portfolio/${item.id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      "article:section": item.category_name,
      "article:tag": techTags.join(", "),
    },
  };
}

/* ─── Page Component ─── */
export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getPortfolioItem(id);

  // JSON-LD structured data for SEO/AEO
  const jsonLd = item
    ? {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: item.title,
        description: item.description,
        creator: {
          "@type": "Organization",
          name: "주식회사 하들소프트",
          url: "https://www.hadeul.com",
        },
        about: {
          "@type": "Thing",
          name: item.category_name,
        },
        provider: {
          "@type": "Organization",
          name: item.client,
        },
        image: item.image ? item.image.split(",")[0].trim() : undefined,
        keywords: item.tech_stack || undefined,
        url: `https://www.hadeul.com/portfolio/${item.id}`,
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
      <PortfolioDetailClient item={item} />
    </>
  );
}
