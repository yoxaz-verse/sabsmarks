import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { getLocationBySlug } from "@/lib/content/service";

export default async function OfficeDetail({ params }: { params: Promise<{ entry: string }> }) {
  const location = await getLocationBySlug((await params).entry);
  if (!location) notFound();

  return (
    <article className="mx-auto max-w-4xl rounded-2xl border border-[var(--glass-border)] bg-surface p-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }, { label: location.city }]} />
      <h1 className="text-4xl font-semibold">{location.office_name}</h1>
      <p className="mt-4 whitespace-pre-wrap text-stone-700">{location.address}</p>
      {location.phone ? <p className="mt-2 text-stone-700">T: {location.phone}</p> : null}
      {location.email ? <p className="text-stone-700">E: {location.email}</p> : null}
      {location.contact_person ? <p className="mt-2 text-sm text-muted">Contact Person: {location.contact_person}</p> : null}
    </article>
  );
}
