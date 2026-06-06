import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col w-full">{children}</main>
      <Footer />
    </div>
  );
}
