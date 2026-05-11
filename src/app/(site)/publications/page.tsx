import Link from "next/link";
import { getCollection } from "@/lib/content/service";

export default async function PublicationsPage() {
  const entries = await getCollection("publications");

  return (
    <section>
      <h1 className="text-4xl font-semibold">Publications & Insights</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {entries.map((entry) => (
          <Link key={entry.id} href={`/publications/${entry.slug}`} className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="text-xl font-semibold">{entry.title}</h2>
            <p className="mt-2 text-sm text-stone-600">{entry.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
