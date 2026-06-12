import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, UserRoundCheck } from "lucide-react";
import { CareerApplicationForm } from "@/components/careers/career-application-form";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { getEntry } from "@/lib/content/service";
import { buildEntryMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/seo-schema";

export async function generateMetadata({ params }: { params: Promise<{ entry: string }> }): Promise<Metadata> {
  const { entry: slug } = await params;
  const entry = await getEntry("careers", slug);
  if (!entry) return { robots: { index: false, follow: false } };
  return buildEntryMetadata(entry, `/careers/${entry.slug}`, "Career opportunities and insights at Sabs Marks JVS & Co.");
}

export default async function CareerDetail({ params }: { params: Promise<{ entry: string }> }) {
  const entry = await getEntry("careers", (await params).entry);
  if (!entry) notFound();
  const metadata: Record<string, unknown> =
    typeof entry.metadata === "object" && entry.metadata !== null && !Array.isArray(entry.metadata) ? entry.metadata : {};
  const jobDetails = [
    { label: "Location", value: metadata.location, icon: MapPin },
    { label: "Type", value: metadata.job_type, icon: UserRoundCheck },
    { label: "Experience", value: metadata.experience, icon: UserRoundCheck },
    { label: "Department", value: metadata.department, icon: UserRoundCheck },
    { label: "Deadline", value: metadata.application_deadline, icon: CalendarDays },
  ].filter((item): item is { label: string; value: string; icon: typeof MapPin } => typeof item.value === "string" && item.value.trim().length > 0);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Careers", url: "/careers" },
    { name: entry.title, url: `/careers/${entry.slug}` },
  ]);

  return (
    <article className="detail-shell">
      <JsonLdScript id={`career-breadcrumb-${entry.id}`} data={breadcrumbSchema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Careers", href: "/careers" }, { label: entry.title }]} />
      <div className="detail-card p-8 md:p-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">Career</p>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-ink">{entry.title}</h1>
            {entry.summary ? <p className="mt-4 max-w-3xl text-[16px] leading-8 text-muted">{entry.summary}</p> : null}
          </div>
          <a
            href="#apply"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            Apply Now
          </a>
        </div>

        {jobDetails.length ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {jobDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <div key={detail.label} className="rounded-2xl border border-[var(--glass-border)] bg-surface-raised p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-muted">
                    <Icon className="h-4 w-4 text-accent" strokeWidth={1.7} />
                    {detail.label}
                  </div>
                  <p className="mt-2 text-sm font-semibold text-ink">{detail.value}</p>
                </div>
              );
            })}
          </div>
        ) : null}

        <section className="mt-10 border-t border-[var(--glass-border)] pt-8">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Role overview</h2>
          <p className="detail-body">{entry.body ?? entry.excerpt ?? "Details for this opening will be shared during the application process."}</p>
        </section>

        <section id="apply" className="mt-12 scroll-mt-28 border-t border-[var(--glass-border)] pt-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-muted">Apply</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">Submit your application</h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
            Share your contact details and resume. The hiring team will review your application from the admin workspace.
          </p>
          <CareerApplicationForm careerId={entry.id} careerTitle={entry.title} />
        </section>
      </div>
    </article>
  );
}
