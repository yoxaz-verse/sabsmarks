interface PageBannerProps {
  title: string;
}

export function PageBanner({ title }: PageBannerProps) {
  return (
    <div className="w-full border-b border-[var(--border)] bg-[var(--surface)] py-16 sm:py-20 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-start px-6 md:px-12">
        <p className="brand-kicker mb-6">Sabs Marks JVS &amp; Co.</p>
        <h1 className="mb-5 text-4xl font-bold tracking-[-0.04em] text-accent sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <div className="brand-rule" />
      </div>
    </div>
  );
}
