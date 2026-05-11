import Link from "next/link";
import { getInsights } from "@/lib/content/service";

export default async function InsightsPage() {
  const insights = await getInsights({ page: 1 });

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
      <div className="grid gap-8 md:grid-cols-2">
        {insights.data.map((post) => (
          <Link key={post.id} href={`/insights/${post.slug}`} className="rounded-xl border border-stone-200 bg-white p-5 hover:shadow-sm">
            <h2 className="text-2xl font-bold text-[#333]">{post.title}</h2>
            <p className="mt-3 text-sm text-[#555]">{post.excerpt ?? post.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
