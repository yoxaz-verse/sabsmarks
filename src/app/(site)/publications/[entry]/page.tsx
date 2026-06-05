import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    <article className="brand-card mx-auto max-w-4xl p-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <h1 className="text-4xl font-semibold text-accent">{entry.title}</h1>
      <div className="brand-rule mt-5" />
      <p className="mt-5 whitespace-pre-wrap leading-7 text-muted">{entry.body}</p>
    </article>
  );
}
