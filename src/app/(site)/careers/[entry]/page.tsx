import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getEntry } from "@/lib/content/service";
import { buildEntryMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata({ params }: { params: Promise<{ entry: string }> }): Promise<Metadata> {
  const { entry: slug } = await params;
  const entry = await getEntry("careers", slug);
  if (!entry) return { robots: { index: false, follow: false } };
  return buildEntryMetadata(entry, `/careers/${entry.slug}`, "Career opportunities and insights at Sabs Marks JVS & Co.");
}

export default async function CareerDetail({ params }: { params: Promise<{ entry: string }> }) {
  const entry = await getEntry("careers", (await params).entry);
  if (!entry) notFound();
  const metadata: Record<string, unknown> =
    typeof entry.metadata === "object" && entry.metadata !== null && !Array.isArray(entry.metadata) ? entry.metadata : {};
  const applyUrl = typeof metadata.apply_url === "string" ? metadata.apply_url.trim() : "";
  const shouldShowApplyCta = metadata.show_apply_cta === true && applyUrl.length > 0;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Careers", url: "/careers" },
    { name: entry.title, url: `/careers/${entry.slug}` },
  ]);

  return (
    <article className="detail-shell">
      <JsonLdScript id={`career-breadcrumb-${entry.id}`} data={breadcrumbSchema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers" }, { label: entry.title }]} />
      <div className="detail-card p-8 md:p-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">Career</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink">{entry.title}</h1>
        {shouldShowApplyCta ? (
          <div className="mt-6">
            <Link
              href={applyUrl}
              className="inline-flex items-center rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-700"
            >
              Apply Now
            </Link>
          </div>
        ) : null}
        <p className="detail-body">{entry.body}</p>
      </div>
    </article>
  );
}
