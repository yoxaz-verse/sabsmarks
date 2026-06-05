import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { InitialLoader } from "@/components/initial-loader";
import { buildOpenGraph, buildTwitter, SITE_NAME, SITE_URL } from "@/lib/seo";
import { buildOrganizationSchema } from "@/lib/seo-schema";
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
  const organizationSchema = buildOrganizationSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased relative brand-shell">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <NextTopLoader color="#18395f" height={2} showSpinner={false} shadow="0 0 0 transparent" zIndex={100000} />
        <InitialLoader />
        <div className="relative z-10 flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
