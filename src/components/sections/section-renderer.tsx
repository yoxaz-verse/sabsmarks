import Link from "next/link";
import type { SectionRecord } from "@/types/cms";
import { sanitizeCmsPayload } from "@/lib/content/sanitize";

export function SectionRenderer({ section }: { section: SectionRecord }) {
  const payload = sanitizeCmsPayload(section.payload);

  if (section.section_type === "hero") {
    return (
      <section className="brand-card px-8 py-14 md:px-12 md:py-16">
        <p className="brand-kicker">{String(payload.kicker ?? "Sabs Marks JVS PVT LTD")}</p>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-accent md:text-5xl">{String(payload.headline ?? "Where knowledge meets execution")}</h1>
        <div className="brand-rule mt-6" />
        <p className="mt-6 max-w-2xl text-[15px] leading-7 text-muted">{String(payload.subtext ?? "A multi-disciplinary firm delivering practical and legally sound solutions.")}</p>
      </section>
    );
  }

  if (section.section_type === "stats") {
    const items = (payload.items as Array<{ label: string; value: string }>) ?? [];
    return (
      <section className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.label} className="brand-card p-6">
            <p className="data-number text-3xl font-semibold text-accent">{item.value}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.12em] text-muted">{item.label}</p>
          </article>
        ))}
      </section>
    );
  }

  if (section.section_type === "leadership_grid") {
    const members = (payload.members as Array<{ name: string; role: string; href?: string }>) ?? [];
    return (
      <section>
        <h2 className="text-2xl font-semibold text-accent">{String(payload.title ?? "Leadership")}</h2>
        <div className="brand-rule mt-4" />
        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {members.map((member) => (
            <article key={member.name} className="brand-card p-5">
              <h3 className="font-semibold text-accent">{member.name}</h3>
              <p className="mt-1 text-sm text-muted">{member.role}</p>
              {member.href ? <Link href={member.href} className="brand-link mt-3 inline-block text-sm font-semibold">View profile</Link> : null}
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (section.section_type === "office_cards") {
    const offices = (payload.offices as Array<{ city: string; address: string; href?: string }>) ?? [];
    return (
      <section>
        <h2 className="text-2xl font-semibold text-accent">Our Locations</h2>
        <div className="brand-rule mt-4" />
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {offices.map((office) => (
            <article key={office.city} className="brand-card p-5">
              <h3 className="font-semibold text-accent">{office.city}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{office.address}</p>
              {office.href ? <Link href={office.href} className="brand-link mt-3 inline-block text-sm font-semibold">Contact office</Link> : null}
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (section.section_type === "card_grid") {
    const cards = (payload.cards as Array<{ title: string; text: string; href?: string }>) ?? [];
    return (
      <section>
        <h2 className="text-2xl font-semibold text-accent">{String(payload.title ?? "Our Capabilities")}</h2>
        <div className="brand-rule mt-4" />
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="brand-card p-6">
              <h3 className="text-lg font-semibold text-accent">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{card.text}</p>
              {card.href ? (
                <Link href={card.href} className="brand-link mt-4 inline-block text-sm font-semibold underline underline-offset-4">
                  Explore
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (section.section_type === "newsletter_cta") {
    return (
      <section className="brand-card px-8 py-10">
        <p className="brand-kicker">Insights</p>
        <h2 className="mt-4 text-2xl font-semibold text-accent">Stay Updated</h2>
        <p className="mt-3 text-sm leading-7 text-muted">{String(payload.text ?? "Subscribe to insights and updates.")}</p>
      </section>
    );
  }

  if (section.section_type === "cta") {
    return (
      <section className="brand-card px-8 py-10">
        <p className="brand-kicker">Contact</p>
        <h2 className="mt-4 text-2xl font-semibold text-accent">{String(payload.title ?? "Speak with our advisory team")}</h2>
        <p className="mt-3 text-sm leading-7 text-muted">{String(payload.text ?? "Discuss your strategic and regulatory priorities with our experts.")}</p>
        <Link href={String(payload.href ?? "/contact")} className="brand-button mt-6">
          {String(payload.buttonLabel ?? "Book a consultation")}
        </Link>
      </section>
    );
  }

  return (
    <section className="brand-card px-8 py-8">
      <h2 className="text-xl font-semibold text-accent">{String(payload.title ?? "Section")}</h2>
      <div className="brand-rule mt-4" />
      <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-muted">{String(payload.content ?? "Content will be managed via CMS.")}</p>
    </section>
  );
}
