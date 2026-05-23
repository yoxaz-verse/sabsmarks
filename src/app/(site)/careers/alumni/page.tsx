import { PageBanner } from "@/components/layout/page-banner";
import { CmsPage } from "@/components/content/cms-page";

export default async function AlumniPage() {
  return (
    <CmsPage
      slug="careers/alumni"
      fallback={
        <div className="flex flex-col min-h-screen bg-surface">
          <PageBanner title="Alumni" />
          <section className="mx-auto max-w-7xl px-6 py-16 text-muted">
            <p>Alumni form content is being migrated to CMS.</p>
          </section>
        </div>
      }
    />
  );
}
