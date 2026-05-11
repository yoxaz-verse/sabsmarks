import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { requireCloudinaryEnv } from "@/lib/env";

export async function POST(req: Request) {
  const body = (await req.json()) as { timestamp: number };
  const { CLOUDINARY_API_SECRET: apiSecret, CLOUDINARY_API_KEY: apiKey, NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: cloudName } =
    requireCloudinaryEnv();

  const toSign = `timestamp=${body.timestamp}${apiSecret}`;
  const signature = createHash("sha1").update(toSign).digest("hex");

  return NextResponse.json({ signature, timestamp: body.timestamp, apiKey, cloudName });
}
