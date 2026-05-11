import { notFound } from "next/navigation";

export default async function DynamicPage({ params }: { params: Promise<{ slug: string[] }> }) {
  await params;
  notFound();
}
