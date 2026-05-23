import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroller } from "@/components/smooth-scroller";
import NextTopLoader from "nextjs-toploader";
import { InitialLoader } from "@/components/initial-loader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finovia CFA | Strategic Financial Advisory",
  description: "Enterprise-grade CFA and strategic finance advisory with a modern content-managed platform.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-[#0ea5e9] selection:text-white relative">
        <NextTopLoader color="#20a447" height={3} showSpinner={false} shadow="0 0 10px #20a447,0 0 5px #20a447" zIndex={100000} />
        <InitialLoader />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SmoothScroller>
            <div className="scanline-overlay"></div>
            <div className="relative z-10 flex flex-col min-h-screen">
              <Header />
              <main className="flex-1 flex flex-col w-full">{children}</main>
              <Footer />
            </div>
          </SmoothScroller>
        </ThemeProvider>
      </body>
    </html>
  );
}
