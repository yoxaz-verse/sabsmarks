import type { ReactNode } from "react";
import {
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Calculator,
  CheckCircle2,
  Factory,
  FileText,
  ChevronDown,
  Landmark,
  MapPin,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { SiteOrnament } from "@/components/decorative/site-ornament";

interface PageBannerProps {
  title: string;
  eyebrow?: string;
  description?: string;
  variant?: "default" | "contrast";
  actions?: ReactNode;
}

type BannerArtKind = "network" | "firm" | "service" | "career" | "insight" | "industry" | "advisory";

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

function BannerIllustration({ title, isContrast }: { title: string; isContrast: boolean }) {
  const { kind, Icon, SecondaryIcon, TertiaryIcon } = getBannerArt(title);

  return (
    <div
      aria-hidden="true"
      className={`banner-art banner-art--${kind} ${isContrast ? "banner-art--contrast" : ""}`}
    >
      <div className="banner-art__halo"></div>
      <div className="banner-art__rail banner-art__rail--top"></div>
      <div className="banner-art__rail banner-art__rail--bottom"></div>

      <svg className="banner-art__lines" viewBox="0 0 520 360" preserveAspectRatio="none">
        <path d="M72 238 C138 170 190 174 254 206 S370 254 448 124" />
        <path d="M92 112 C166 130 196 74 262 98 S348 166 430 86" />
        <path d="M126 292 H374" />
      </svg>

      <div className="banner-art__panel banner-art__panel--main">
        <span className="banner-art__icon banner-art__icon--main">
          <Icon className="h-10 w-10" strokeWidth={1.8} />
        </span>
        <span className="banner-art__mini banner-art__mini--one">
          <SecondaryIcon className="h-5 w-5" strokeWidth={1.8} />
        </span>
        <span className="banner-art__mini banner-art__mini--two">
          <TertiaryIcon className="h-5 w-5" strokeWidth={1.8} />
        </span>
      </div>

      <div className="banner-art__panel banner-art__panel--metric">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <span className="banner-art__node banner-art__node--a"></span>
      <span className="banner-art__node banner-art__node--b"></span>
      <span className="banner-art__node banner-art__node--c"></span>
      <span className="banner-art__node banner-art__node--d"></span>
      <span className="banner-art__marker"></span>
    </div>
  );
}

export function PageBanner({
  title,
  eyebrow,
  description,
  variant = "default",
  actions,
}: PageBannerProps) {
  const isContrast = variant === "contrast";
  const showHeroOrnament = isContrast;
  const displayEyebrow = eyebrow ?? "Sabs Marks JVS & Co.";

  return (
    <div
      className={`group decorated-panel relative w-full overflow-hidden border-b border-[var(--section-border)] transition-colors duration-500 ${
        isContrast
          ? "bg-[linear-gradient(135deg,#06121d_0%,#063b63_48%,#005c9d_100%)] py-8 text-white sm:py-10 md:py-12"
          : "bg-bg py-8 sm:py-10 md:py-12"
      }`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {showHeroOrnament ? <SiteOrnament mode="hero" contrast className="opacity-55" /> : null}

        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            isContrast
              ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_32%),radial-gradient(circle_at_18%_30%,color-mix(in_srgb,var(--accent)_28%,transparent),transparent_28%),radial-gradient(circle_at_82%_18%,color-mix(in_srgb,var(--accent-secondary)_18%,transparent),transparent_24%)]"
              : "bg-[linear-gradient(135deg,rgba(255,255,255,0.36),transparent_42%),linear-gradient(180deg,color-mix(in_srgb,var(--accent)_5%,transparent),transparent_55%)] dark:bg-[linear-gradient(135deg,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_32%),linear-gradient(180deg,rgba(2,6,23,0.3),transparent_55%)]"
          }`}
        ></div>

        <div
          className={`absolute inset-x-0 bottom-0 h-full transition-opacity duration-500 [mask-image:linear-gradient(to_bottom,transparent,black)] ${
            isContrast ? "opacity-[0.12] sm:opacity-[0.16]" : "opacity-[0.04] sm:opacity-[0.06] dark:opacity-[0.14]"
          }`}
          style={{
            backgroundImage: isContrast
              ? "linear-gradient(color-mix(in srgb, var(--accent) 28%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--accent-secondary) 18%, transparent) 1px, transparent 1px)"
              : "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
            backgroundSize: "58px 58px",
            transform: "perspective(500px) rotateX(60deg) translateY(92px) scale(3)",
            transformOrigin: "bottom",
          }}
        ></div>

        <div
          className={`absolute inset-x-0 bottom-0 h-24 transition-opacity duration-500 ${
            isContrast
              ? "bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.09))]"
              : "bg-[linear-gradient(to_bottom,transparent,color-mix(in_srgb,var(--surface)_82%,transparent))] dark:bg-[linear-gradient(to_bottom,transparent,color-mix(in_srgb,var(--surface)_62%,transparent))]"
          }`}
        ></div>

        {isContrast ? <div
          className="absolute -left-10 top-0 h-64 w-64 animate-blob rounded-full bg-accent/28 opacity-60 blur-[96px] transition-colors duration-500"
        ></div> : null}
        {isContrast ? <div
          className="animation-delay-2000 absolute -right-16 top-2 h-72 w-72 animate-blob rounded-full bg-accent-secondary/22 opacity-60 blur-[110px] transition-colors duration-500"
        ></div> : null}

        <div
          className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] via-transparent to-transparent transition-colors duration-500 ${
            isContrast ? "from-white/10 opacity-80" : "from-white/40 opacity-75 dark:from-white/5 dark:opacity-40"
          }`}
        ></div>

        <div
          className={`absolute inset-0 mix-blend-overlay transition-opacity duration-500 ${
            isContrast ? "opacity-[0.03]" : "opacity-[0.02] dark:opacity-[0.012]"
          }`}
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        ></div>
      </div>

      <div className="relative z-20 mx-auto grid max-w-7xl gap-6 px-6 md:px-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(16rem,0.55fr)] lg:items-center">
        <div className="flex flex-col items-start">
          <div
            className={`mb-3 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 shadow-sm backdrop-blur-md transition-colors duration-500 ${
              isContrast
                ? "border border-white/12 bg-white/8"
                : "border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_78%,transparent)]"
            }`}
          >
            <div className="h-2 w-2 rounded-full bg-accent-secondary"></div>
            <span
              suppressHydrationWarning
              className={`text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ${
                isContrast ? "text-white/90" : "text-ink/80 dark:text-white/95"
              }`}
            >
              {displayEyebrow}
            </span>
          </div>

          <h1
            className={`mb-3 max-w-4xl py-1 text-3xl font-bold tracking-normal transition-colors duration-500 sm:text-4xl md:mb-3 md:text-5xl lg:text-[3.6rem] ${
              isContrast
                ? "text-white [text-shadow:0_16px_40px_rgba(2,6,23,0.35)]"
                : "text-ink dark:text-white"
            }`}
          >
            {title}
          </h1>

          {description ? (
            <p
              className={`max-w-3xl text-[15px] leading-7 md:text-base ${
                isContrast ? "text-white/88" : "text-muted dark:text-white/78"
              }`}
            >
              {description}
            </p>
          ) : null}

          {actions ? <div className="mt-5 flex w-full flex-wrap items-center gap-3">{actions}</div> : null}

          <div className="mt-5 flex items-center gap-3 sm:gap-4">
            <div className={`h-[3px] w-12 rounded-full transition-shadow duration-500 ${isContrast ? "bg-accent-secondary shadow-[0_0_20px_var(--accent-secondary-glow)]" : "bg-accent shadow-[0_0_10px_var(--accent-glow)]"}`}></div>
            <div className={`h-[3px] w-6 rounded-full transition-colors duration-500 ${isContrast ? "bg-white/35" : "bg-accent-secondary/45"}`}></div>
          </div>
        </div>

        <div className="hidden justify-end md:flex">
          <BannerIllustration title={title} isContrast={isContrast} />
        </div>
      </div>

      <div
        aria-hidden="true"
        className={`absolute bottom-3 left-1/2 z-30 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border shadow-sm backdrop-blur-md transition-colors duration-500 ${
          isContrast
            ? "border-white/14 bg-white/10 text-white/82"
            : "border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_82%,transparent)] text-accent"
        }`}
      >
        <ChevronDown className="h-4 w-4" strokeWidth={2.2} />
      </div>
    </div>
  );
}
