import { SectionRenderer } from "@/components/sections/section-renderer";
import { getPageBySlug } from "@/lib/content/service";

export async function CmsPage({ slug, fallback }: { slug: string; fallback: React.ReactNode }) {
  const page = await getPageBySlug(slug);

  if (!page) {
    return <>{fallback}</>;
  }

  return (
    <div className="space-y-8">
      {page.sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
