import Image from "next/image";
import Link from "next/link";
import type { SectionRecord } from "@/types/cms";
import { sanitizeCmsPayload } from "@/lib/content/sanitize";

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function splitParagraphs(value: string) {
  return value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function SectionRenderer({ section }: { section: SectionRecord }) {
  const payload = sanitizeCmsPayload(section.payload);

  if (section.section_type === "hero") {
    const image = optionalString(payload.image);
    const imageAlt = optionalString(payload.imageAlt) || String(payload.headline ?? "Sabs Marks JVS & Co. visual");

    return (
      <section className="site-card overflow-hidden rounded-[2rem] text-ink">
        <div className={`grid gap-8 p-8 py-14 ${image ? "lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)] lg:items-center" : ""}`}>
          <div>
            <div className="section-kicker">{String(payload.kicker ?? "Sabs Marks JVS & Co.")}</div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight md:text-5xl">{String(payload.headline ?? "Where knowledge meets execution")}</h1>
            <p className="mt-4 max-w-2xl text-muted">{String(payload.subtext ?? "A multi-disciplinary firm delivering practical and legally sound solutions.")}</p>
          </div>

          {image ? (
            <div className="relative aspect-[16/11] overflow-hidden rounded-[1.5rem] border border-[var(--glass-border)] shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,30,0.04),rgba(8,15,30,0.24))]" />
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  if (section.section_type === "stats") {
    const items = (payload.items as Array<{ label: string; value: string }>) ?? [];
    return (
      <section className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.label} className="site-card rounded-3xl p-6">
            <p className="text-3xl font-semibold text-ink">{item.value}</p>
            <p className="mt-2 text-sm text-muted">{item.label}</p>
          </article>
        ))}
      </section>
    );
  }

  if (section.section_type === "leadership_grid") {
    const members = (payload.members as Array<{ name: string; role: string; href?: string }>) ?? [];
    return (
      <section>
        <h2 className="text-2xl font-semibold text-ink">{String(payload.title ?? "Leadership")}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {members.map((member) => (
            <article key={member.name} className="site-card rounded-3xl p-5">
              <h3 className="font-semibold text-ink">{member.name}</h3>
              <p className="mt-1 text-sm text-muted">{member.role}</p>
              {member.href ? <Link href={member.href} className="mt-3 inline-block text-sm font-semibold text-accent">View profile</Link> : null}
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
        <h2 className="text-2xl font-semibold text-ink">Our Locations</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {offices.map((office) => (
            <article key={office.city} className="site-card rounded-3xl p-5">
              <h3 className="font-semibold text-ink">{office.city}</h3>
              <p className="mt-2 text-sm text-muted">{office.address}</p>
              {office.href ? <Link href={office.href} className="mt-3 inline-block text-sm font-semibold text-accent">Contact office</Link> : null}
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (section.section_type === "card_grid") {
    const cards = (payload.cards as Array<{ title: string; text: string; href?: string; image?: string; imageAlt?: string }>) ?? [];
    return (
      <section>
        <h2 className="text-2xl font-semibold text-ink">{String(payload.title ?? "Our Capabilities")}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="site-card interactive-card overflow-hidden rounded-3xl">
              {optionalString(card.image) ? (
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={optionalString(card.image)}
                    alt={optionalString(card.imageAlt) || card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,30,0.03),rgba(8,15,30,0.28))]" />
                </div>
              ) : null}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-ink">{card.title}</h3>
                <p className="mt-3 text-sm text-muted">{card.text}</p>
                {card.href ? (
                  <Link href={card.href} className="mt-4 inline-block text-sm font-semibold text-accent underline underline-offset-4">
                    Explore
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (section.section_type === "rich_text") {
    const image = optionalString(payload.image);
    const imageAlt = optionalString(payload.imageAlt) || String(payload.title ?? "Section visual");
    const imageAlign = optionalString(payload.imageAlign) === "left" ? "left" : "right";
    const content = String(payload.content ?? "Content will be managed via CMS.");

    return (
      <section className="site-card overflow-hidden rounded-3xl">
        <div className={`grid gap-8 p-8 ${image ? "lg:grid-cols-2 lg:items-center" : ""}`}>
          {image && imageAlign === "left" ? (
            <div className="relative aspect-[16/11] overflow-hidden rounded-[1.35rem] border border-[var(--glass-border)]">
              <Image src={image} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,30,0.03),rgba(8,15,30,0.24))]" />
            </div>
          ) : null}

          <div>
            <h2 className="text-xl font-semibold text-ink">{String(payload.title ?? "Section")}</h2>
            <div className="mt-3 space-y-4 text-sm leading-7 text-muted">
              {splitParagraphs(content).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          {image && imageAlign !== "left" ? (
            <div className="relative aspect-[16/11] overflow-hidden rounded-[1.35rem] border border-[var(--glass-border)]">
              <Image src={image} alt={imageAlt} fill sizes="(max-width: 1024px) 100vw, 46vw" className="object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,30,0.03),rgba(8,15,30,0.24))]" />
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  if (section.section_type === "newsletter_cta") {
    return (
      <section className="site-card rounded-3xl px-8 py-10">
        <h2 className="text-2xl font-semibold text-ink">Stay Updated</h2>
        <p className="mt-2 text-sm text-muted">{String(payload.text ?? "Subscribe to blog articles and updates.")}</p>
      </section>
    );
  }

  if (section.section_type === "cta") {
    const image = optionalString(payload.image);
    const imageAlt = optionalString(payload.imageAlt) || String(payload.title ?? "Advisory conversation visual");

    return (
      <section className={`site-card relative overflow-hidden rounded-3xl px-8 py-10 ${image ? "text-white" : ""}`}>
        {image ? (
          <>
            <Image src={image} alt={imageAlt} fill sizes="(max-width: 1280px) 100vw, 1200px" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,18,29,0.92)_0%,rgba(6,18,29,0.78)_60%,rgba(0,92,157,0.42)_100%)]" />
          </>
        ) : null}
        <div className="relative z-10">
          <h2 className={`text-2xl font-semibold ${image ? "text-white" : "text-ink"}`}>{String(payload.title ?? "Speak with our advisory team")}</h2>
          <p className={`mt-2 max-w-2xl text-sm ${image ? "text-white/82" : "text-muted"}`}>{String(payload.text ?? "Discuss your strategic and regulatory priorities with our experts.")}</p>
          <Link href={String(payload.href ?? "/contact")} className="mt-5 inline-block rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white">
            {String(payload.buttonLabel ?? "Book a consultation")}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="site-card rounded-3xl px-8 py-8">
      <h2 className="text-xl font-semibold text-ink">{String(payload.title ?? "Section")}</h2>
      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-muted">{String(payload.content ?? "Content will be managed via CMS.")}</p>
    </section>
  );
}
