export function getPublicMapUrl(mapUrl: string | null) {
  if (!mapUrl) return null;

  try {
    const parsed = new URL(mapUrl);
    if (!["http:", "https:"].includes(parsed.protocol)) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

export function getEmbeddableMapUrl(mapUrl: string | null) {
  const publicMapUrl = getPublicMapUrl(mapUrl);
  if (!publicMapUrl) return null;

  try {
    const parsed = new URL(publicMapUrl);
    const host = parsed.hostname.toLowerCase();
    const isGoogleMapsHost =
      host === "google.com" ||
      host.endsWith(".google.com") ||
      host === "google.co.in" ||
      host.endsWith(".google.co.in");

    if (!isGoogleMapsHost) return null;

    if (parsed.pathname.includes("/maps/embed")) {
      return parsed.toString();
    }

    const query =
      parsed.searchParams.get("q") ??
      parsed.searchParams.get("query") ??
      parsed.searchParams.get("destination") ??
      parsed.searchParams.get("daddr");

    if (query) {
      return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
    }

    if (parsed.pathname.startsWith("/maps/")) {
      parsed.searchParams.set("output", "embed");
      return parsed.toString();
    }

    return null;
  } catch {
    return null;
  }
}
