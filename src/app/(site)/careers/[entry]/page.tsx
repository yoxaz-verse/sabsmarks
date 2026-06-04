import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    <article className="mx-auto max-w-4xl rounded-2xl border border-[var(--glass-border)] bg-surface p-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <h1 className="text-4xl font-semibold">{entry.title}</h1>
      <p className="mt-5 whitespace-pre-wrap leading-7 text-stone-700">{entry.body}</p>
    </article>
  );
}
