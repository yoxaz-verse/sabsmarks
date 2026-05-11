import { notFound } from "next/navigation";
import { getEntry } from "@/lib/content/service";

export default async function IndustryDetail({ params }: { params: Promise<{ entry: string }> }) {
  const entry = await getEntry("industry_solutions", (await params).entry);
  if (!entry) notFound();

  return (
    <article className="mx-auto max-w-4xl rounded-2xl border border-stone-200 bg-white p-8">
      <h1 className="text-4xl font-semibold">{entry.title}</h1>
      <p className="mt-5 whitespace-pre-wrap leading-7 text-stone-700">{entry.body}</p>
    </article>
  );
}
