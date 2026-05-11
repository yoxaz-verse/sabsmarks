import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { getInsights } from "@/lib/content/service";

export default async function InsightCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const insights = await getInsights({ category: slug });

  return (
    <section>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: slug }]} />
      <h1 className="text-4xl font-semibold">Category: {slug}</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {insights.data.map((item) => (
          <Link key={item.id} href={`/insights/${item.slug}`} className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p className="mt-2 text-sm text-stone-600">{item.excerpt ?? item.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
