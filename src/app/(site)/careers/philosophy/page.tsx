import { PageBanner } from "@/components/layout/page-banner";
import { CmsPage } from "@/components/content/cms-page";

export default async function PhilosophyPage() {
  return (
    <CmsPage
      slug="careers/philosophy"
      fallback={
        <div className="flex flex-col min-h-screen bg-surface">
          <PageBanner title="Philosophy" />
          <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold text-ink md:text-4xl">Philosophy</h2>
              <p className="mt-6 text-base leading-8 text-muted md:text-lg">
                We believe that the future lies in individuals capable of making bold decisions. We nurture the talents of tomorrow&apos;s decision makers. Every individual at Sabs Marks JVS &amp; Co. is in pursuit of bold and better decisions.
              </p>
              <blockquote className="mt-8 border-l-4 border-accent bg-surface-raised px-6 py-5 text-lg font-medium leading-8 text-ink shadow-sm">
                &ldquo;Independent decision makers led the world so far; they were not just born with it, they developed it.&rdquo;
              </blockquote>
            </div>
          </section>
        </div>
      }
    />
  );
}
