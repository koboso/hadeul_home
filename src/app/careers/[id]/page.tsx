import type { Metadata } from "next";
import getDb from "@/lib/db";
import CareerDetailClient from "./CareerDetailClient";

interface JobRow {
  id: string;
  title: string;
  department: string;
  job_type: string;
  location: string;
  description: string;
  requirements: string;
  is_active: number;
  created_at: string;
}

function getJob(id: string): JobRow | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM job_postings WHERE id = ?").get(id) as JobRow | undefined;
  return row || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const job = getJob(id);

  if (!job) {
    return { title: "채용 공고를 찾을 수 없습니다 | HADEUL" };
  }

  return {
    title: `${job.title} | HADEUL 채용`,
    description: job.description || `${job.title} - ${job.department} | 하들소프트 채용`,
    openGraph: {
      title: `${job.title} — HADEUL 채용`,
      description: job.description || `${job.title} 채용 공고`,
      type: "article",
      siteName: "HADEUL - 주식회사 하들소프트",
    },
  };
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = getJob(id);

  const jsonLd = job
    ? {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: job.title,
        description: job.description,
        employmentType: job.job_type || "FULL_TIME",
        jobLocation: {
          "@type": "Place",
          address: job.location,
        },
        hiringOrganization: {
          "@type": "Organization",
          name: "주식회사 하들소프트",
          sameAs: "https://www.hadeul.com",
        },
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
      <CareerDetailClient job={job} />
    </>
  );
}
