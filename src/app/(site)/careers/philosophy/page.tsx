import { PageBanner } from "@/components/layout/page-banner";
import { CmsPage } from "@/components/content/cms-page";

export default async function PhilosophyPage() {
  return (
    <CmsPage
      slug="careers/philosophy"
      fallback={
        <div className="flex flex-col min-h-screen bg-surface">
          <PageBanner title="Philosophy" />
          <section className="mx-auto max-w-7xl px-6 py-16 text-muted">
            <p>Career philosophy content is being migrated to CMS.</p>
          </section>
        </div>
      }
    />
  );
}
