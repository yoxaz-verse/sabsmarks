import Link from "next/link";

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="breadcrumb" className="mb-8 text-sm text-muted">
      <ol className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_72%,transparent)] px-4 py-2">
        {items.map((item, idx) => (
          <li key={`${item.label}-${idx}`} className="flex items-center gap-2">
            {item.href ? <Link href={item.href} className="hover:text-accent">{item.label}</Link> : <span className="text-ink">{item.label}</span>}
            {idx < items.length - 1 ? <span className="text-muted/60">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
