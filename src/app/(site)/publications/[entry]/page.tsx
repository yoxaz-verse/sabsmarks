import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { getEntry } from "@/lib/content/service";
import { buildAbsoluteUrl, buildEntryMetadata, resolveSeoDescription } from "@/lib/seo";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata({ params }: { params: Promise<{ entry: string }> }): Promise<Metadata> {
  const { entry: slug } = await params;
  const entry = await getEntry("publications", slug);
  if (!entry) return { robots: { index: false, follow: false } };

  return buildEntryMetadata(entry, `/publications/${entry.slug}`, "Read our latest publications and technical updates.");
}

export default async function PublicationDetail({ params }: { params: Promise<{ entry: string }> }) {
  const entry = await getEntry("publications", (await params).entry);
  if (!entry) notFound();

  const description = resolveSeoDescription({
    seoDescription: entry.seo_description,
    excerpt: entry.excerpt,
    summary: entry.summary,
    body: entry.body,
  });

  const articleSchema = buildArticleSchema({
    headline: entry.title,
    description,
    url: buildAbsoluteUrl(`/publications/${entry.slug}`),
    image: entry.og_image_url ?? entry.image_url,
    datePublished: entry.published_at,
    dateModified: entry.updated_at,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Publications", url: "/publications" },
    { name: entry.title, url: `/publications/${entry.slug}` },
  ]);

  return (
    <article className="detail-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Publications", href: "/publications" }, { label: entry.title }]} />
      <div className="detail-card p-8 md:p-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">Publication</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">{entry.title}</h1>
        <p className="detail-body">{entry.body}</p>
      </div>
    </article>
  );
}
