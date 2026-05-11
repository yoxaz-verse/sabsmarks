import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const redirectMap: Record<string, string> = {
  "/contact-us-chennai": "/contact/chennai",
  "/contact-us-mumbai": "/contact/mumbai",
  "/contact-us-delhi": "/contact/delhi",
  "/tax-regulatory-services": "/practice-areas/tax-regulatory-services",
  "/corporate-finance-advisory-services": "/practice-areas/corporate-finance-advisory-services",
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (redirectMap[pathname]) {
    return NextResponse.redirect(new URL(redirectMap[pathname], req.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
