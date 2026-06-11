import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { buildOrganizationSchema } from "@/lib/seo-schema";
import { ScrollRevealInit } from "@/components/layout/scroll-reveal-init";
import { InitialLoader } from "@/components/initial-loader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = buildOrganizationSchema();

  return (
    <div className="site-shell min-h-screen">
      <InitialLoader />
      <ScrollRevealInit />
      <JsonLdScript id="organization-schema" data={organizationSchema} />
      <Header />
      <main className="flex-1 flex flex-col w-full">{children}</main>
      <Footer />
    </div>
  );
}
