import Script from "next/script";

function serializeJsonLd(data: Record<string, unknown> | unknown[]) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLdScript({ id, data }: { id: string; data: Record<string, unknown> | unknown[] }) {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
