import Link from "next/link";
import type { SectionRecord } from "@/types/cms";
import { sanitizeCmsPayload } from "@/lib/content/sanitize";

export function SectionRenderer({ section }: { section: SectionRecord }) {
  const payload = sanitizeCmsPayload(section.payload);

  if (section.section_type === "hero") {
    return (
      <section className="rounded-3xl bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#334155] px-8 py-16 text-white">
        <p className="animate-[fadeIn_.6s_ease] text-xs uppercase tracking-[0.3em] text-stone-300">{String(payload.kicker ?? "Sabs Marks JVS PVT LTD")}</p>
        <h1 className="mt-4 max-w-3xl animate-[fadeIn_.8s_ease] text-4xl font-semibold leading-tight md:text-5xl">{String(payload.headline ?? "Where knowledge meets execution")}</h1>
        <p className="mt-4 max-w-2xl text-stone-200">{String(payload.subtext ?? "A multi-disciplinary firm delivering practical and legally sound solutions.")}</p>
      </section>
    );
  }

  if (section.section_type === "stats") {
    const items = (payload.items as Array<{ label: string; value: string }>) ?? [];
    return (
      <section className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.label} className="rounded-2xl border border-stone-200 bg-white p-6">
            <p className="text-3xl font-semibold text-stone-900">{item.value}</p>
            <p className="mt-2 text-sm text-stone-600">{item.label}</p>
          </article>
        ))}
      </section>
    );
  }

  if (section.section_type === "leadership_grid") {
    const members = (payload.members as Array<{ name: string; role: string; href?: string }>) ?? [];
    return (
      <section>
        <h2 className="text-2xl font-semibold text-stone-900">{String(payload.title ?? "Leadership")}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {members.map((member) => (
            <article key={member.name} className="rounded-2xl border border-stone-200 bg-white p-5">
              <h3 className="font-semibold text-stone-900">{member.name}</h3>
              <p className="mt-1 text-sm text-stone-600">{member.role}</p>
              {member.href ? <Link href={member.href} className="mt-3 inline-block text-sm font-semibold text-stone-900">View profile</Link> : null}
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
        <h2 className="text-2xl font-semibold text-stone-900">Our Locations</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {offices.map((office) => (
            <article key={office.city} className="rounded-2xl border border-stone-200 bg-white p-5">
              <h3 className="font-semibold text-stone-900">{office.city}</h3>
              <p className="mt-2 text-sm text-stone-600">{office.address}</p>
              {office.href ? <Link href={office.href} className="mt-3 inline-block text-sm font-semibold text-stone-900">Contact office</Link> : null}
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
        <h2 className="text-2xl font-semibold text-stone-900">{String(payload.title ?? "Our Capabilities")}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-stone-900">{card.title}</h3>
              <p className="mt-3 text-sm text-stone-600">{card.text}</p>
              {card.href ? (
                <Link href={card.href} className="mt-4 inline-block text-sm font-semibold text-stone-900 underline underline-offset-4">
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
      <section className="rounded-2xl border border-stone-300 bg-stone-100 px-8 py-10">
        <h2 className="text-2xl font-semibold text-stone-900">Stay Updated</h2>
        <p className="mt-2 text-sm text-stone-700">{String(payload.text ?? "Subscribe to insights and updates.")}</p>
      </section>
    );
  }

  if (section.section_type === "cta") {
    return (
      <section className="rounded-2xl border border-stone-300 bg-stone-100 px-8 py-10">
        <h2 className="text-2xl font-semibold text-stone-900">{String(payload.title ?? "Speak with our advisory team")}</h2>
        <p className="mt-2 text-sm text-stone-700">{String(payload.text ?? "Discuss your strategic and regulatory priorities with our experts.")}</p>
        <Link href={String(payload.href ?? "/contact")} className="mt-5 inline-block rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white">
          {String(payload.buttonLabel ?? "Book a consultation")}
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-stone-200 bg-white px-8 py-8">
      <h2 className="text-xl font-semibold text-stone-900">{String(payload.title ?? "Section")}</h2>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-stone-700">{String(payload.content ?? "Content will be managed via CMS.")}</p>
    </section>
  );
}
