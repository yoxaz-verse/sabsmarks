import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { getEntry } from "@/lib/content/service";

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const insight = await getEntry("publications", (await params).slug);
  if (!insight) notFound();

  return (
    <article className="mx-auto max-w-4xl">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: insight.title }]} />
      <h1 className="text-4xl font-semibold">{insight.title}</h1>
      <p className="mt-5 whitespace-pre-wrap rounded-2xl border border-[var(--glass-border)] bg-surface p-8 leading-7 text-stone-700">{insight.body}</p>
    </article>
  );
}
