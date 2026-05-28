import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { getEntry } from "@/lib/content/service";
import { buildAbsoluteUrl, buildEntryMetadata, resolveSeoDescription } from "@/lib/seo";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const insight = await getEntry("publications", slug);
  if (!insight) return { robots: { index: false, follow: false } };
  return buildEntryMetadata(insight, `/insights/${insight.slug}`, "Insights, updates, and thought leadership from our advisory teams.");
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const insight = await getEntry("publications", (await params).slug);
  if (!insight) notFound();

  const description = resolveSeoDescription({
    seoDescription: insight.seo_description,
    excerpt: insight.excerpt,
    summary: insight.summary,
    body: insight.body,
  });

  const articleSchema = buildArticleSchema({
    headline: insight.title,
    description,
    url: buildAbsoluteUrl(`/insights/${insight.slug}`),
    image: insight.og_image_url ?? insight.image_url,
    datePublished: insight.published_at,
    dateModified: insight.updated_at,
  });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Insights", url: "/insights" },
    { name: insight.title, url: `/insights/${insight.slug}` },
  ]);

  return (
    <article className="mx-auto max-w-4xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: insight.title }]} />
      <h1 className="text-4xl font-semibold">{insight.title}</h1>
      <p className="mt-5 whitespace-pre-wrap rounded-2xl border border-[var(--glass-border)] bg-surface p-8 leading-7 text-stone-700">{insight.body}</p>
    </article>
  );
}
