import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getEntry } from "@/lib/content/service";
import { buildAbsoluteUrl, buildEntryMetadata, resolveSeoDescription } from "@/lib/seo";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/seo-schema";
import Image from "next/image";
import { SITE_VISUALS } from "@/lib/site-visuals";

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
    <article className="detail-shell">
      <JsonLdScript id={`insight-article-${insight.id}`} data={articleSchema} />
      <JsonLdScript id={`insight-breadcrumb-${insight.id}`} data={breadcrumbSchema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: insight.title }]} />
      <div className="detail-card p-8 md:p-10">
        <div className="relative mb-8 aspect-[16/7] overflow-hidden rounded-[1.6rem]">
          <Image
            src={insight.image_url ?? insight.og_image_url ?? SITE_VISUALS.insights.fallback}
            alt={insight.title}
            fill
            sizes="(max-width: 1024px) 100vw, 58rem"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,30,0.05),rgba(8,15,30,0.24))]" />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">Insight</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">{insight.title}</h1>
        <p className="detail-body">{insight.body}</p>
      </div>
    </article>
  );
}
