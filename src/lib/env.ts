import { z } from "zod";

const supabaseSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1).optional(),
});

const cloudinarySchema = z.object({
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1).optional(),
  CLOUDINARY_API_SECRET: z.string().min(1).optional(),
});

export function requireSupabaseEnv() {
  const supabaseCandidate = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  };

  const env = supabaseSchema.safeParse(supabaseCandidate);
  if (!env.success) {
    throw new Error(`Supabase environment validation failed: ${env.error.message}`);
  }

  const anonKey = env.data.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? env.data.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!anonKey) {
    throw new Error("Missing Supabase browser key: set NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
  }

  return { ...env.data, NEXT_PUBLIC_SUPABASE_ANON_KEY: anonKey };
}

export function requireCloudinaryEnv() {
  const env = cloudinarySchema.safeParse(process.env);
  if (!env.success) {
    throw new Error(`Cloudinary environment validation failed: ${env.error.message}`);
  }

  const apiKey = env.data.CLOUDINARY_API_KEY;
  const apiSecret = env.data.CLOUDINARY_API_SECRET;
  if (!apiKey || !apiSecret) {
    throw new Error("Missing Cloudinary credentials: set CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET");
  }

  return { ...env.data, CLOUDINARY_API_KEY: apiKey, CLOUDINARY_API_SECRET: apiSecret };
}
