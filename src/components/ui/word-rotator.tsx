"use client";

import { useState, useEffect } from "react";

const WORDS = ["business", "strategic", "compliance", "regulatory", "growth"];

export function WordRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="relative inline-grid text-left align-baseline shrink-0"
      style={{ gridTemplateColumns: "max-content" }}
    >
      {/* Hidden placeholder to size the container to the maximum word width */}
      <span className="invisible select-none pointer-events-none col-start-1 row-start-1 font-extrabold">
        compliance
      </span>
      {WORDS.map((word, i) => {
        const isActive = i === index;
        const isPrev = i === (index - 1 + WORDS.length) % WORDS.length;

        let transformClass = "translate-y-[80%] opacity-0 invisible pointer-events-none";
        if (isActive) {
          transformClass = "translate-y-0 opacity-100 visible";
        } else if (isPrev) {
          transformClass = "-translate-y-[80%] opacity-0 visible pointer-events-none";
        }

        return (
          <span
            key={word}
            className={`col-start-1 row-start-1 text-gradient font-extrabold transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${transformClass}`}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
}
