import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getInsights } from "@/lib/content/service";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  return buildPageMetadata({
    path: `/insights/category/${slug}`,
    title: `Insights Category: ${slug}`,
    description: `Browse insights and publications in the ${slug} category.`,
  });
}

export default async function InsightCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const insights = await getInsights({ category: slug });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Insights", url: "/insights" },
    { name: slug, url: `/insights/category/${slug}` },
  ]);

  return (
    <section>
      <JsonLdScript id={`insight-category-breadcrumb-${slug}`} data={breadcrumbSchema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: slug }]} />
      <h1 className="text-4xl font-semibold">Category: {slug}</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {insights.data.map((item) => (
          <Link key={item.id} href={`/insights/${item.slug}`} className="rounded-2xl border border-[var(--glass-border)] bg-surface p-6">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-muted">{item.excerpt ?? item.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
