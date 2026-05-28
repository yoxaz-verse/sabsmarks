import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { getLocationBySlug } from "@/lib/content/service";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata({ params }: { params: Promise<{ entry: string }> }): Promise<Metadata> {
  const { entry } = await params;
  const location = await getLocationBySlug(entry);
  if (!location) return { robots: { index: false, follow: false } };

  return buildPageMetadata({
    path: `/contact/${location.slug}`,
    title: `${location.office_name} | Contact`,
    description: `${location.office_name} office details, address, and contact information.`,
  });
}

export default async function OfficeDetail({ params }: { params: Promise<{ entry: string }> }) {
  const location = await getLocationBySlug((await params).entry);
  if (!location) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
    { name: location.city, url: `/contact/${location.slug}` },
  ]);

  return (
    <article className="mx-auto max-w-4xl rounded-2xl border border-[var(--glass-border)] bg-surface p-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }, { label: location.city }]} />
      <h1 className="text-4xl font-semibold">{location.office_name}</h1>
      <p className="mt-4 whitespace-pre-wrap text-stone-700">{location.address}</p>
      {location.phone ? <p className="mt-2 text-stone-700">T: {location.phone}</p> : null}
      {location.email ? <p className="text-stone-700">E: {location.email}</p> : null}
      {location.contact_person ? <p className="mt-2 text-sm text-muted">Contact Person: {location.contact_person}</p> : null}
    </article>
  );
}
