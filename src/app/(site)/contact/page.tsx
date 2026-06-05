import { PageBanner } from "@/components/layout/page-banner";
import { getSiteSettings } from "@/lib/content/service";
import { getSiteContact } from "@/lib/site-contact";

function ContactLink({ href, label, value }: { href: string; label: string; value: string }) {
  return (
    <a href={href} className="block rounded-sm border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:border-[var(--accent-secondary)]">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">{label}</p>
      <p className="mt-3 text-lg font-semibold text-accent">{value}</p>
    </a>
  );
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const contact = getSiteContact(settings);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--bg)]">
      <PageBanner title="Contact Us" />

      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-8 py-10 md:px-10 md:py-12">
            <p className="brand-kicker">Contact</p>
            <h2 className="mt-4 max-w-xl text-4xl font-bold leading-tight text-accent">{contact.brandName}</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-muted">
              Reach our head office directly for enquiries, appointments, and location assistance.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <ContactLink href={`tel:${contact.primaryPhone.replace(/\s+/g, "")}`} label="Call Us" value={contact.primaryPhone} />
              <ContactLink href={`mailto:${contact.primaryEmail}`} label="Mail Us" value={contact.primaryEmail} />
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--cloud)] p-8">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-muted">Social Media</p>
            <div className="mt-6 space-y-4">
              <ContactLink href={contact.socialLinks.linkedin} label="LinkedIn" value="sabs-marks-jvs-co" />
              <ContactLink href={contact.socialLinks.instagram} label="Instagram" value="@sabsmarksjvs" />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-muted">Our Locations</p>
            <h3 className="mt-4 text-2xl font-bold text-accent">{contact.headOfficeLabel}</h3>
            <p className="mt-4 whitespace-pre-line text-[15px] leading-7 text-muted">{contact.headOfficeAddress}</p>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-muted">Also At</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {contact.serviceLocations.map((city) => (
                <div key={city} className="rounded-sm border border-[var(--border)] bg-[var(--cloud)] px-4 py-3 text-sm font-medium text-accent">
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
