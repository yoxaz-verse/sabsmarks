import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finovia CFA | Strategic Financial Advisory",
  description: "Enterprise-grade CFA and strategic finance advisory with a modern content-managed platform.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-[#0ea5e9] selection:text-white relative">
        <div className="scanline-overlay"></div>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 flex flex-col w-full">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
