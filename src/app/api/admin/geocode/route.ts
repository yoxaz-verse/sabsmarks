import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApiSession } from "@/lib/admin-auth";

type GeocodeResult = {
  label: string;
  latitude: number;
  longitude: number;
};

const payloadSchema = z.object({
  query: z.string().min(3).max(500),
});

const cache = new Map<string, GeocodeResult>();
let geocodeQueue = Promise.resolve();

function normalizeQuery(query: string) {
  return query.trim().replace(/\s+/g, " ").toLowerCase();
}

async function runQueued<T>(task: () => Promise<T>) {
  const previous = geocodeQueue;
  let release: () => void = () => {};
  geocodeQueue = new Promise<void>((resolve) => {
    release = resolve;
  });

  await previous;
  try {
    return await task();
  } finally {
    release();
  }
}

export async function POST(req: Request) {
  const { error: authError } = await requireAdminApiSession();
  if (authError) return authError;

  const parsed = payloadSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Enter a longer address to search." }, { status: 400 });

  const query = normalizeQuery(parsed.data.query);
  const cached = cache.get(query);
  if (cached) return NextResponse.json({ result: cached });

  try {
    const result = await runQueued(async () => {
      const cachedAfterWait = cache.get(query);
      if (cachedAfterWait) return cachedAfterWait;

      const url = new URL("https://nominatim.openstreetmap.org/search");
      url.searchParams.set("format", "jsonv2");
      url.searchParams.set("limit", "1");
      url.searchParams.set("addressdetails", "0");
      url.searchParams.set("q", parsed.data.query.trim());

      const res = await fetch(url, {
        headers: {
          "User-Agent": "SabsMarksJVS-CMS/1.0 (admin geocoding; https://sabsmarksjvs.com)",
          Accept: "application/json",
        },
      });

      if (!res.ok) throw new Error("Geocoding service is temporarily unavailable.");

      const json = (await res.json()) as Array<{ display_name?: string; lat?: string; lon?: string }>;
      const first = json[0];
      const latitude = Number(first?.lat);
      const longitude = Number(first?.lon);

      if (!first || !Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        throw new Error("No map result found for that address.");
      }

      const value = {
        label: first.display_name ?? parsed.data.query.trim(),
        latitude,
        longitude,
      };
      cache.set(query, value);
      return value;
    });

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Geocoding failed." }, { status: 400 });
  }
}
