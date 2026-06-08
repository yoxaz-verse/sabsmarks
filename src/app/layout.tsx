import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import { buildOpenGraph, buildTwitter, SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

const defaultDescription =
  "Sabs Marks JVS PVT LTD delivering audit, tax, advisory, and compliance services.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: defaultDescription,
  applicationName: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: buildOpenGraph({
    title: SITE_NAME,
    description: defaultDescription,
    canonical: SITE_URL,
  }),
  twitter: buildTwitter({
    title: SITE_NAME,
    description: defaultDescription,
  }),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-[#0ea5e9] selection:text-white relative">
        <NextTopLoader color="#20a447" height={3} showSpinner={false} shadow="0 0 10px #20a447,0 0 5px #20a447" zIndex={100000} />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="scanline-overlay"></div>
          <div className="relative z-10 flex flex-col min-h-screen">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
