import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { getEntry } from "@/lib/content/service";
import { buildEntryMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata({ params }: { params: Promise<{ entry: string }> }): Promise<Metadata> {
  const { entry: slug } = await params;
  const entry = await getEntry("careers", slug);
  if (!entry) return { robots: { index: false, follow: false } };
  return buildEntryMetadata(entry, `/careers/${entry.slug}`, "Career opportunities and insights at Sabs Marks JVS PVT LTD.");
}

export default async function CareerDetail({ params }: { params: Promise<{ entry: string }> }) {
  const entry = await getEntry("careers", (await params).entry);
  if (!entry) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Careers", url: "/careers" },
    { name: entry.title, url: `/careers/${entry.slug}` },
  ]);

  return (
    <article className="detail-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers" }, { label: entry.title }]} />
      <div className="detail-card p-8 md:p-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">Career</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">{entry.title}</h1>
        <p className="detail-body">{entry.body}</p>
      </div>
    </article>
  );
}
