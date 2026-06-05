import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    <article className="brand-card mx-auto max-w-4xl p-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <h1 className="text-4xl font-semibold text-accent">{entry.title}</h1>
      <div className="brand-rule mt-5" />
      <p className="mt-5 whitespace-pre-wrap leading-7 text-muted">{entry.body}</p>
    </article>
  );
}
