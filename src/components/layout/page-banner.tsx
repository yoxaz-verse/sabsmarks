import type { ReactNode } from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Calculator,
  CheckCircle2,
  Factory,
  FileText,
  Landmark,
  MapPin,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

interface PageBannerProps {
  title: string;
  eyebrow?: string;
  description?: string;
  variant?: "default" | "contrast";
  backgroundImage?: string;
  backgroundPosition?: string;
  actions?: ReactNode;
}

type BannerArtKind = "network" | "firm" | "service" | "career" | "insight" | "industry" | "advisory";

const BANNER_BACKGROUNDS: Record<BannerArtKind, { image: string; position: string }> = {
  advisory: { image: "/banner-backgrounds/page-our-services.png", position: "center 48%" },
  career: { image: "/banner-backgrounds/page-careers.png", position: "center 46%" },
  firm: { image: "/banner-backgrounds/page-the-firm.png", position: "center 48%" },
  industry: { image: "/banner-backgrounds/page-industry-solutions.png", position: "center 48%" },
  insight: { image: "/banner-backgrounds/page-blog.png", position: "center 50%" },
  network: { image: "/banner-backgrounds/page-locations.png", position: "center 46%" },
  service: { image: "/banner-backgrounds/page-our-services.png", position: "center 46%" },
};

const PAGE_BANNER_BACKGROUNDS: Record<string, { image: string; position: string }> = {
  alumni: { image: "/banner-backgrounds/page-alumni.png", position: "center 48%" },
  blog: { image: "/banner-backgrounds/page-blog.png", position: "center 50%" },
  careers: { image: "/banner-backgrounds/page-careers.png", position: "center 46%" },
  "contact-us": { image: "/banner-backgrounds/page-contact-us.png", position: "center 48%" },
  "industry-solutions": { image: "/banner-backgrounds/page-industry-solutions.png", position: "center 48%" },
  leadership: { image: "/banner-backgrounds/page-leadership.png", position: "center 46%" },
  legacy: { image: "/banner-backgrounds/page-legacy.png", position: "center 48%" },
  locations: { image: "/banner-backgrounds/page-locations.png", position: "center 46%" },
  "our-approach": { image: "/banner-backgrounds/page-our-approach.png", position: "center 48%" },
  "our-services": { image: "/banner-backgrounds/page-our-services.png", position: "center 46%" },
  philosophy: { image: "/banner-backgrounds/page-philosophy.png", position: "center 50%" },
  "privacy-policy": { image: "/banner-backgrounds/page-privacy-policy.png", position: "center 48%" },
  publications: { image: "/banner-backgrounds/page-publications.png", position: "center 50%" },
  "services-in-ifsc-gift-city": { image: "/banner-backgrounds/page-services-ifsc-gift-city.png", position: "center 47%" },
  "services-in-uae": { image: "/banner-backgrounds/page-services-uae.png", position: "center 48%" },
  "terms-and-conditions": { image: "/banner-backgrounds/page-terms-and-conditions.png", position: "center 48%" },
  "the-firm": { image: "/banner-backgrounds/page-the-firm.png", position: "center 48%" },
};

interface BannerArtConfig {
  kind: BannerArtKind;
  Icon: LucideIcon;
  SecondaryIcon: LucideIcon;
  TertiaryIcon: LucideIcon;
}

function getBannerArt(title: string): BannerArtConfig {
  const normalizedTitle = title.toLowerCase();

  if (/(location|contact|office|branch)/.test(normalizedTitle)) {
    return { kind: "network", Icon: MapPin, SecondaryIcon: Building2, TertiaryIcon: Landmark };
  }

  if (/(firm|legacy|leadership|team|approach)/.test(normalizedTitle)) {
    return { kind: "firm", Icon: ShieldCheck, SecondaryIcon: FileText, TertiaryIcon: Landmark };
  }

  if (/(service|expertise|practice|ifsc|uae)/.test(normalizedTitle)) {
    return { kind: "service", Icon: Calculator, SecondaryIcon: CheckCircle2, TertiaryIcon: FileText };
  }

  if (/(career|alumni|join|philosophy)/.test(normalizedTitle)) {
    return { kind: "career", Icon: BriefcaseBusiness, SecondaryIcon: TrendingUp, TertiaryIcon: CheckCircle2 };
  }

  if (/(blog|insight|knowledge|publication|article|news)/.test(normalizedTitle)) {
    return { kind: "insight", Icon: BookOpen, SecondaryIcon: FileText, TertiaryIcon: CheckCircle2 };
  }

  if (/(industry|solution|sector)/.test(normalizedTitle)) {
    return { kind: "industry", Icon: Factory, SecondaryIcon: Building2, TertiaryIcon: TrendingUp };
  }

  return { kind: "advisory", Icon: Landmark, SecondaryIcon: FileText, TertiaryIcon: TrendingUp };
}

function getBannerEyebrow(title: string) {
  const normalizedTitle = title.toLowerCase();

  if (/(location|office|branch)/.test(normalizedTitle)) return "Locations";
  if (/(contact)/.test(normalizedTitle)) return "Contact";
  if (/(service|expertise|practice|ifsc|uae)/.test(normalizedTitle)) return "Expertise";
  if (/(career|alumni|join|philosophy)/.test(normalizedTitle)) return "Career";
  if (/(blog|insight|knowledge|publication|article|news)/.test(normalizedTitle)) return "Insights";
  if (/(industry|solution|sector)/.test(normalizedTitle)) return "Industry";
  if (/(firm|legacy|leadership|team|approach)/.test(normalizedTitle)) return "About";

  return "Sabs Marks JVS & Co.";
}

function normalizeBannerTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getBannerBackground(artKind: BannerArtKind, title: string) {
  const exactBackground = PAGE_BANNER_BACKGROUNDS[normalizeBannerTitle(title)];

  return exactBackground?.image ?? BANNER_BACKGROUNDS[artKind].image;
}

function getBannerBackgroundPosition(artKind: BannerArtKind, title: string) {
  const exactBackground = PAGE_BANNER_BACKGROUNDS[normalizeBannerTitle(title)];

  return exactBackground?.position ?? BANNER_BACKGROUNDS[artKind].position;
}

export function PageBanner({
  title,
  eyebrow,
  description,
  variant = "default",
  backgroundImage,
  backgroundPosition,
  actions,
}: PageBannerProps) {
  const isContrast = variant === "contrast";
  const isDarkBanner = isContrast;
  const art = getBannerArt(title);
  const resolvedBackgroundImage = backgroundImage ?? getBannerBackground(art.kind, title);
  const resolvedBackgroundPosition = backgroundPosition ?? getBannerBackgroundPosition(art.kind, title);
  const isVisualBanner = Boolean(resolvedBackgroundImage);
  const displayEyebrow = eyebrow ?? getBannerEyebrow(title);

  return (
    <div
      data-kind={art.kind}
      className={`page-banner page-banner--${art.kind} ${isDarkBanner ? "page-banner--dark" : ""} ${
        isVisualBanner ? "page-banner--visual" : ""
      } group decorated-panel relative flex w-full items-center overflow-hidden border-b border-[var(--section-border)] transition-colors duration-500 ${
        isDarkBanner
          ? "bg-[linear-gradient(135deg,#06121d_0%,#063b63_48%,#005c9d_100%)] py-5 text-white sm:py-6 md:py-7"
          : isVisualBanner
            ? "bg-[linear-gradient(135deg,#06121d_0%,#063b63_52%,#005c9d_100%)] py-5 text-white sm:py-6 md:py-7"
            : "py-5 sm:py-6 md:py-7"
      }`}
    >
      <div aria-hidden="true" className="page-banner__background pointer-events-none absolute inset-0 z-0">
        {resolvedBackgroundImage ? (
          <div
            className="page-banner__image absolute inset-0"
            style={{
              backgroundImage: `url("${resolvedBackgroundImage}")`,
              backgroundPosition: resolvedBackgroundPosition,
            }}
          ></div>
        ) : null}
        {isVisualBanner ? (
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,18,0.9)_0%,rgba(4,24,44,0.78)_46%,rgba(0,79,134,0.42)_100%)]"></div>
        ) : null}
        {!isVisualBanner ? (
          <>
            <div className="page-banner__photo-wash absolute inset-0"></div>
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.36),transparent_42%),linear-gradient(180deg,color-mix(in_srgb,var(--accent)_5%,transparent),transparent_55%)] transition-colors duration-500 dark:bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_32%),linear-gradient(180deg,rgba(2,6,23,0.3),transparent_55%)]"></div>
            <div
              className="absolute inset-x-0 bottom-0 h-full opacity-[0.04] transition-opacity duration-500 [mask-image:linear-gradient(to_bottom,transparent,black)] sm:opacity-[0.06] dark:opacity-[0.14]"
              style={{
                backgroundImage: "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
                backgroundSize: "58px 58px",
                transform: "perspective(500px) rotateX(60deg) translateY(92px) scale(3)",
                transformOrigin: "bottom",
              }}
            ></div>
            <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_bottom,transparent,color-mix(in_srgb,var(--surface)_82%,transparent))] transition-opacity duration-500 dark:bg-[linear-gradient(to_bottom,transparent,color-mix(in_srgb,var(--surface)_62%,transparent))]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent opacity-75 transition-colors duration-500 dark:from-white/5 dark:opacity-40"></div>
          </>
        ) : null}

        <div
          className={`absolute inset-0 mix-blend-overlay transition-opacity duration-500 ${
            isDarkBanner ? "opacity-[0.045]" : "opacity-[0.02] dark:opacity-[0.012]"
          }`}
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        ></div>
      </div>

      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 text-left md:px-12">
        <div className="flex flex-col items-start">
          {!isDarkBanner ? (
            <div
              className={`page-banner__eyebrow mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 shadow-sm backdrop-blur-md transition-colors duration-500 ${
                isVisualBanner
                  ? "border border-white/15 bg-white/10"
                  : "border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_78%,transparent)]"
              }`}
            >
              <div className="page-banner__dot h-2 w-2 rounded-full"></div>
              <span
                suppressHydrationWarning
                className={`text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ${
                  isVisualBanner ? "text-white/90" : "text-ink/80 dark:text-white/95"
                }`}
              >
                {displayEyebrow}
              </span>
            </div>
          ) : null}

          <h1
            className={`page-banner__title max-w-4xl py-1 text-3xl font-bold tracking-normal transition-colors duration-500 sm:text-4xl md:text-[2.8rem] lg:text-[3.1rem] ${
              isVisualBanner
                ? "text-white [text-shadow:0_16px_40px_rgba(2,6,23,0.35)]"
                : "text-ink dark:text-white"
            }`}
          >
            {title}
          </h1>

          {description ? (
            <p
              className={`page-banner__description max-w-3xl text-[15px] leading-7 md:text-base ${
                isVisualBanner ? "text-white/88" : "text-muted dark:text-white/78"
              }`}
            >
              {description}
            </p>
          ) : null}

          {actions ? <div className="page-banner__actions mt-4 flex w-full flex-wrap items-center gap-2.5 sm:gap-3">{actions}</div> : null}

          <div className="page-banner__rule mt-3 flex items-center gap-2.5 sm:gap-3">
            <div className={`page-banner__rule-primary h-[3px] w-12 rounded-full transition-shadow duration-500 ${isVisualBanner ? "shadow-[0_0_20px_var(--accent-secondary-glow)]" : "shadow-[0_0_10px_var(--accent-glow)]"}`}></div>
            <div className={`page-banner__rule-secondary h-[3px] w-6 rounded-full transition-colors duration-500 ${isVisualBanner ? "bg-white/35" : ""}`}></div>
          </div>
        </div>

      </div>
    </div>
  );
}
