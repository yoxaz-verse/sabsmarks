import Image from "next/image";
import Link from "next/link";

interface ImageFeatureCardProps {
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
  description: string;
  href?: string;
  ctaLabel?: string;
  className?: string;
  priority?: boolean;
}

export function ImageFeatureCard({
  src,
  alt,
  eyebrow,
  title,
  description,
  href,
  ctaLabel = "Learn more",
  className = "",
  priority = false,
}: ImageFeatureCardProps) {
  return (
    <article className={`site-card overflow-hidden rounded-[1.85rem] ${className}`.trim()}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,16,32,0.04),rgba(7,16,32,0.28))]" />
      </div>

      <div className="p-6 md:p-7">
        {eyebrow ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent/80">{eyebrow}</p>
        ) : null}
        <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">{title}</h3>
        <p className="mt-4 text-[15px] leading-7 text-muted">{description}</p>
        {href ? (
          <Link href={href} className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-accent">
            {ctaLabel}
            <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </article>
  );
}
