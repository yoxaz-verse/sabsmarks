"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedNumber({ text, duration = 2000 }: { text: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  
  // Extract number and suffix/prefix
  const match = text.match(/^(\D*)(\d+)(\D*)$/);
  const prefix = match ? match[1] : "";
  const numValue = match ? parseInt(match[2], 10) : 0;
  const suffix = match ? match[3] : "";
  
  // Keep leading zeros length if present in original
  const numberStr = match ? match[2] : "";
  const hasLeadingZero = numberStr.startsWith("0") && numberStr.length > 1;

  useEffect(() => {
    if (!numValue) return;

    const element = elementRef.current;
    if (!element) return;

    let startTime: number | null = null;
    let animationFrameId: number;
    let hasAnimated = false;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Easing function: easeOutQuart
      const easeOutQuart = 1 - Math.pow(1 - Math.min(progress / duration, 1), 4);
      const currentCount = Math.floor(easeOutQuart * numValue);
      
      setCount(currentCount);

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(numValue);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 } // Start animation when 10% of the element is visible
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [numValue, duration]);

  if (!numValue) return <span>{text}</span>;

  let displayCount = count.toString();
  if (hasLeadingZero && displayCount.length < numberStr.length) {
    displayCount = displayCount.padStart(numberStr.length, "0");
  }

  return (
    <span ref={elementRef} className="inline-block">
      {prefix}{displayCount}{suffix}
    </span>
  );
}
