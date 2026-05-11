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
    <html lang="en">
      <body className="bg-[#f8f6f2] text-stone-900 antialiased">
        <Header />
        <main className="min-h-[70vh] flex flex-col w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
