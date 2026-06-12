import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { requireSupabaseEnv } from "@/lib/env";

const redirectMap: Record<string, string> = {
  "/contact-us-chennai": "/contact/chennai",
  "/contact-us-mumbai": "/contact/mumbai",
  "/contact-us-delhi": "/contact/delhi",
  "/tax-regulatory-services": "/practice-areas/tax-regulatory-services",
  "/corporate-finance-advisory-services": "/practice-areas/corporate-finance-advisory-services",
};

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next({ request: { headers: req.headers } });
  const hasAuthCookie = req.cookies.getAll().some((cookie) => cookie.name.startsWith("sb-") && cookie.name.includes("auth-token"));

  if (hasAuthCookie) {
    const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = requireSupabaseEnv();
    const supabase = createServerClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(items) {
          items.forEach(({ name, value, options }) => {
            req.cookies.set(name, value);
            res.cookies.set(name, value, options);
          });
        },
      },
    });

    await supabase.auth.getUser();
  }

  if (redirectMap[pathname]) {
    return NextResponse.redirect(new URL(redirectMap[pathname], req.url), 308);
  }

  if (pathname === "/insights" || pathname.startsWith("/insights/")) {
    const target = req.nextUrl.clone();
    target.pathname = pathname.replace(/^\/insights/, "/blog");
    return NextResponse.redirect(target, 308);
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
