"use client";

import { useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";

type OrnamentMode = "hero" | "section" | "card";

interface SiteOrnamentProps {
  mode: OrnamentMode;
  interactive?: boolean;
  contrast?: boolean;
  className?: string;
}

const idlePosition = { x: 0, y: 0 };

export function SiteOrnament({
  mode,
  interactive = false,
  contrast = false,
  className = "",
}: SiteOrnamentProps) {
  const [offset, setOffset] = useState(idlePosition);

  const style = {
    "--ornament-x": `${offset.x}px`,
    "--ornament-y": `${offset.y}px`,
  } as CSSProperties;

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!interactive) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;
    setOffset({ x, y });
  }

  function handlePointerLeave() {
    if (!interactive) return;
    setOffset(idlePosition);
  }

  return (
    <div
      aria-hidden="true"
      className={`site-ornament site-ornament--${mode} ${contrast ? "site-ornament--contrast" : ""} ${interactive ? "site-ornament--interactive" : ""} ${className}`.trim()}
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="site-ornament__glow site-ornament__glow--primary" />
      <div className="site-ornament__glow site-ornament__glow--secondary" />

      <svg
        className="site-ornament__svg site-ornament__svg--frame"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <path d="M84 108 H332" className="site-ornament__stroke site-ornament__stroke--soft" />
        <path d="M84 108 V304" className="site-ornament__stroke site-ornament__stroke--soft" />
        <path d="M1116 692 H868" className="site-ornament__stroke site-ornament__stroke--soft" />
        <path d="M1116 692 V496" className="site-ornament__stroke site-ornament__stroke--soft" />
        <path d="M170 168 H258" className="site-ornament__stroke site-ornament__stroke--strong" />
        <path d="M942 632 H1030" className="site-ornament__stroke site-ornament__stroke--strong" />
      </svg>

      <svg
        className="site-ornament__svg site-ornament__svg--grid"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <path d="M0 640 H1200" className="site-ornament__stroke site-ornament__stroke--grid" />
        <path d="M0 704 H1200" className="site-ornament__stroke site-ornament__stroke--grid" />
        <path d="M840 0 V800" className="site-ornament__stroke site-ornament__stroke--grid" />
        <path d="M920 0 V800" className="site-ornament__stroke site-ornament__stroke--grid" />
      </svg>

      <svg
        className="site-ornament__svg site-ornament__svg--orbits"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <circle cx="920" cy="170" r="112" className="site-ornament__stroke site-ornament__stroke--soft" />
        <circle cx="920" cy="170" r="152" className="site-ornament__stroke site-ornament__stroke--grid" />
        <circle cx="288" cy="620" r="76" className="site-ornament__stroke site-ornament__stroke--soft" />
        <path d="M206 620 H370" className="site-ornament__stroke site-ornament__stroke--strong" />
        <path d="M920 18 V322" className="site-ornament__stroke site-ornament__stroke--grid" />
      </svg>

      <svg
        className="site-ornament__svg site-ornament__svg--dots"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <circle cx="920" cy="170" r="6" className="site-ornament__dot" />
        <circle cx="288" cy="620" r="5" className="site-ornament__dot site-ornament__dot--muted" />
        <circle cx="170" cy="168" r="4" className="site-ornament__dot site-ornament__dot--muted" />
      </svg>
    </div>
  );
}
