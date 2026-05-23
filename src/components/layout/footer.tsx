import Link from "next/link";
import { NewsletterForm } from "@/components/footer/newsletter-form";
import { getSiteSettings } from "@/lib/content/service";
import { Logo } from "@/components/layout/logo";
import { Mail } from "lucide-react";

export async function Footer() {
  const settings = await getSiteSettings();
  const brand = settings?.brand_name ?? "Sabs Marks JVS & Co LLP";
  const contactEmail = settings?.primary_email ?? "info@sabsmarksjvs.com";

  return (
    <footer className="w-full bg-surface-raised border-t border-[var(--glass-border)] mt-20">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          
          {/* Brand & Description */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="mb-8">
              <Logo className="scale-90 origin-top-left" />
            </div>
            <p className="text-[14px] leading-relaxed text-muted pr-4">
              {brand} is an all services firm specializing in providing a wide spectrum of professional services under one roof to leading domestic and multinational corporations, spread across virtually all sectors.
            </p>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-5">
            <h4 className="text-2xl font-bold text-ink mb-3 drop-shadow-sm">Stay Updated.</h4>
            <p className="text-[14px] text-muted mb-6">Subscribe to our newsletter to get the latest insights and firm updates.</p>
            <NewsletterForm />
          </div>

          {/* Links */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-base font-bold text-ink mb-6 drop-shadow-sm">About Us</h4>
              <div className="flex flex-col gap-4 text-[14px] font-medium text-muted">
                <Link href="/practice-areas" className="hover:text-accent transition-colors">Practice Areas</Link>
                <Link href="/industry-solutions" className="hover:text-accent transition-colors">Industry Solutions</Link>
                <Link href="/expertise/our-approach" className="hover:text-accent transition-colors">Our Approach</Link>
                <Link href="/insights" className="hover:text-accent transition-colors">Publications</Link>
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold text-ink mb-6 drop-shadow-sm">Connect</h4>
              <div className="flex flex-col gap-4 text-[14px] font-medium text-muted">
                <Link href="/careers" className="hover:text-accent transition-colors">Join Us</Link>
                <Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link>
                <Link href="#" className="hover:text-accent transition-colors">Terms & Conditions</Link>
                <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="mt-16 glass-panel bg-surface p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group hover:border-accent transition-colors">
          {/* subtle glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-5 relative z-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_15px_var(--accent-glow)]">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted mb-1">Email Us</p>
              <a href={`mailto:${contactEmail}`} className="text-xl md:text-2xl font-bold text-ink hover:text-accent transition-colors">
                {contactEmail}
              </a>
            </div>
          </div>
          
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="group/link flex h-14 w-14 items-center justify-center rounded-full bg-[#0077b5] text-white shadow-[0_0_15px_rgba(0,119,181,0.3)] hover:bg-[#005582] transition-colors relative z-10"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-6 w-6 group-hover/link:scale-110 transition-transform"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-surface border-t border-[var(--glass-border)]">
        <div className="mx-auto max-w-7xl px-6 py-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-muted">
            Copyright © {new Date().getFullYear()} {brand}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-bold text-muted uppercase tracking-widest">
            <Link href="#" className="hover:text-accent transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-accent transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
