import { PageBanner } from "@/components/layout/page-banner";
import { getSiteSettings } from "@/lib/content/service";
import { getSiteContact } from "@/lib/site-contact";

function ContactLink({ href, label, value }: { href: string; label: string; value: string }) {
  return (
    <a href={href} className="group rounded-2xl border border-[var(--glass-border)] bg-white/85 p-5 transition-colors hover:border-accent hover:bg-white">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-muted">{label}</p>
      <p className="mt-3 text-lg font-semibold text-ink group-hover:text-accent">{value}</p>
    </a>
  );
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const contact = getSiteContact(settings);

  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <PageBanner title="Contact Us" />

      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] bg-accent px-8 py-10 text-white shadow-[0_32px_80px_rgba(18,57,95,0.18)] md:px-10 md:py-12">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-blue-100">Contact</p>
            <h2 className="mt-4 max-w-xl text-4xl font-bold leading-tight">{contact.brandName}</h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-blue-50">
              Reach our head office directly for enquiries, appointments, and location assistance.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <ContactLink href={`tel:${contact.primaryPhone.replace(/\s+/g, "")}`} label="Call Us" value={contact.primaryPhone} />
              <ContactLink href={`mailto:${contact.primaryEmail}`} label="Mail Us" value={contact.primaryEmail} />
            </div>
          </div>

          <div className="rounded-[2rem] border border-[var(--glass-border)] bg-white/90 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-muted">Social Media</p>
            <div className="mt-6 space-y-4">
              <ContactLink href={contact.socialLinks.linkedin} label="LinkedIn" value="sabs-marks-jvs-co" />
              <ContactLink href={contact.socialLinks.instagram} label="Instagram" value="@sabsmarksjvs" />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-[var(--glass-border)] bg-white/90 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-muted">Our Locations</p>
            <h3 className="mt-4 text-2xl font-bold text-ink">{contact.headOfficeLabel}</h3>
            <p className="mt-4 whitespace-pre-line text-[15px] leading-7 text-muted">{contact.headOfficeAddress}</p>
          </div>

          <div className="rounded-[2rem] bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(18,57,95,0.95))] p-8 text-white shadow-[0_32px_80px_rgba(15,23,42,0.24)]">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-blue-100">Also At</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {contact.serviceLocations.map((city) => (
                <div key={city} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-blue-50 backdrop-blur-sm">
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
