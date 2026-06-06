import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { getEntry } from "@/lib/content/service";
import { buildEntryMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata({ params }: { params: Promise<{ entry: string }> }): Promise<Metadata> {
  const { entry: slug } = await params;
  const entry = await getEntry("practice_areas", slug);
  if (!entry) return { robots: { index: false, follow: false } };
  return buildEntryMetadata(entry, `/practice-areas/${entry.slug}`, "Explore our corporate finance, audit, tax, and advisory services.");
}

export default async function PracticeAreaDetail({ params }: { params: Promise<{ entry: string }> }) {
  const entry = await getEntry("practice_areas", (await params).entry);
  if (!entry) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/practice-areas" },
    { name: entry.title, url: `/practice-areas/${entry.slug}` },
  ]);

  return (
    <article className="detail-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/practice-areas" }, { label: entry.title }]} />
      <div className="detail-card p-8 md:p-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">Service</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">{entry.title}</h1>
        <p className="detail-body">{entry.body}</p>
      </div>
    </article>
  );
}
