"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const AUTOPLAY_DELAY_MS = 3600;

const slides = [
  {
    src: "/featured-advisory.jpg",
    alt: "Finance leaders discussing advisory strategy around a boardroom table.",
    eyebrow: "Advisory Focus",
    title: "Clarity for complex financial priorities.",
    description: "Partner-led teams align audit, tax, accounting, and advisory work around the decisions that matter.",
    href: "/about",
    ctaLabel: "Explore our firm",
  },
  {
    src: "/banner-backgrounds/growth-advisory.png",
    alt: "Abstract financial growth advisory dashboard with charts and market signals.",
    eyebrow: "Growth Advisory",
    title: "Direction for ambitious business moves.",
    description: "Structured guidance for expansion, performance improvement, funding readiness, and better leadership decisions.",
    href: "/about",
    ctaLabel: "Explore our firm",
  },
  {
    src: "/banner-backgrounds/tax-document.png",
    alt: "Tax and regulatory documents arranged for professional compliance review.",
    eyebrow: "Tax & Compliance",
    title: "Confidence across regulatory obligations.",
    description: "Audit, tax, accounting, and compliance support shaped around accuracy, timing, and practical execution.",
    href: "/about",
    ctaLabel: "Explore our firm",
  },
];

function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

export function AdvisoryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((index) => (index + 1) % slides.length);
  }, []);

  const previousSlide = useCallback(() => {
    setCurrentIndex((index) => (index - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(nextSlide, AUTOPLAY_DELAY_MS);
    return () => clearInterval(interval);
  }, [nextSlide, prefersReducedMotion]);

  return (
    <article
      className="advisory-carousel featured-advisory-card site-card overflow-hidden"
      aria-roledescription="carousel"
      aria-label="Advisory highlights"
    >
      <div className="advisory-carousel__media" aria-live="polite">
        <div className="advisory-carousel__track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {slides.map((slide, index) => (
            <div
              key={slide.title}
              className="advisory-carousel__slide"
              aria-hidden={index !== currentIndex}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover"
              />
              <div className="advisory-carousel__image-shade" />
            </div>
          ))}
        </div>

        <div className="advisory-carousel__controls" aria-label="Carousel controls">
          <button type="button" onClick={previousSlide} className="advisory-carousel__arrow" aria-label="Previous advisory slide">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={nextSlide} className="advisory-carousel__arrow" aria-label="Next advisory slide">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="advisory-carousel__content">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent/80">{slides[currentIndex].eyebrow}</p>
        <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink dark:text-white">{slides[currentIndex].title}</h3>
        <p className="mt-4 text-[15px] leading-7 text-muted">{slides[currentIndex].description}</p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <Link href={slides[currentIndex].href} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-accent">
            {slides[currentIndex].ctaLabel}
            <span aria-hidden="true">→</span>
          </Link>

          <div className="advisory-carousel__dots" aria-label="Choose advisory slide">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => goToSlide(index)}
                className={`advisory-carousel__dot ${index === currentIndex ? "is-active" : ""}`}
                aria-label={`Go to ${slide.eyebrow} slide`}
                aria-current={index === currentIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
