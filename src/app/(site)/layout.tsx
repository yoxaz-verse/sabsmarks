import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { buildOrganizationSchema } from "@/lib/seo-schema";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = buildOrganizationSchema();

  return (
    <div className="site-shell min-h-screen">
      <JsonLdScript id="organization-schema" data={organizationSchema} />
      <Header />
      <main className="flex-1 flex flex-col w-full">{children}</main>
      <Footer />
    </div>
  );
}
