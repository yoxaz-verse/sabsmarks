"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface FadeInBannerImageProps {
  src: string;
  position: string;
}

export function FadeInBannerImage({ src, position }: FadeInBannerImageProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (imageRef.current?.complete) setIsLoaded(true);
  }, [src]);

  return (
    <Image
      ref={imageRef}
      src={src}
      alt=""
      aria-hidden="true"
      fill
      preload
      sizes="100vw"
      data-loaded={isLoaded}
      onLoad={() => setIsLoaded(true)}
      className="page-banner__image"
      style={{ objectPosition: position }}
    />
  );
}
