import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { NewsletterForm } from "@/components/footer/newsletter-form";
import { Logo } from "@/components/layout/logo";
import { getSiteSettings } from "@/lib/content/service";
import { getSiteContact } from "@/lib/site-contact";

export async function Footer() {
  const settings = await getSiteSettings();
  const contact = getSiteContact(settings);
  const brand = contact.brandName;

  return (
    <footer className="mt-20 w-full border-t border-[var(--glass-border)] bg-surface-raised">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col items-start lg:col-span-4">
            <div className="mb-8">
              <Logo className="origin-top-left scale-90" />
            </div>
            <p className="pr-4 text-[14px] leading-relaxed text-muted">
              Sabs Marks JVS & Co. is a multidisciplinary professional services firm offering a comprehensive range of solutions under one roof to leading domestic and multinational organizations across diverse industries.
            </p>
          </div>

          <div className="lg:col-span-5">
            <h4 className="mb-3 text-2xl font-bold text-ink drop-shadow-sm">Stay Updated.</h4>
            <p className="mb-6 text-[14px] text-muted">Subscribe to our newsletter to get the latest insights and firm updates.</p>
            <NewsletterForm />
          </div>

          <div className="grid grid-cols-2 gap-6 lg:col-span-3">
            <div>
              <h4 className="mb-6 text-base font-bold text-ink drop-shadow-sm">About Us</h4>
              <div className="flex flex-col gap-4 text-[14px] font-medium text-muted">
                <Link href="/practice-areas" className="hover:text-accent transition-colors">Services</Link>
                <Link href="/expertise/our-approach" className="hover:text-accent transition-colors">Our Approach</Link>
                <Link href="/insights" className="hover:text-accent transition-colors">Publications</Link>
              </div>
            </div>
            <div>
              <h4 className="mb-6 text-base font-bold text-ink drop-shadow-sm">Connect</h4>
              <div className="flex flex-col gap-4 text-[14px] font-medium text-muted">
                <Link href="/careers" className="hover:text-accent transition-colors">Join Us</Link>
                <Link href="/contact" className="hover:text-accent transition-colors">Contact Us</Link>
                <Link href="#" className="hover:text-accent transition-colors">Terms & Conditions</Link>
                <Link href="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel group relative mt-16 flex flex-col gap-6 overflow-hidden rounded-2xl bg-surface p-8 transition-colors hover:border-accent">
          <div className="pointer-events-none absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-[0.03]" />

          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_15px_var(--accent-glow)]">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-muted">Call Us</p>
                <a href={`tel:${contact.primaryPhone.replace(/\s+/g, "")}`} className="text-lg font-bold text-ink transition-colors hover:text-accent md:text-xl">
                  {contact.primaryPhone}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_15px_var(--accent-glow)]">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-muted">Email Us</p>
                <a href={`mailto:${contact.primaryEmail}`} className="text-lg font-bold text-ink transition-colors hover:text-accent md:text-xl">
                  {contact.primaryEmail}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={contact.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="group/link flex h-14 w-14 items-center justify-center rounded-full bg-[#0077b5] text-white shadow-[0_0_15px_rgba(0,119,181,0.3)] transition-colors hover:bg-[#005582]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 transition-transform group-hover/link:scale-110"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>

              <a
                href={contact.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="group/link flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f58529,#dd2a7b,#8134af,#515bd4)] text-white shadow-[0_0_15px_rgba(221,42,123,0.28)] transition-transform hover:scale-[1.02]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 transition-transform group-hover/link:scale-110"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37a4 4 0 1 1-7.75 1.26 4 4 0 0 1 7.75-1.26z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--glass-border)] bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row md:px-12">
          <p className="text-sm font-medium text-muted">Copyright © {new Date().getFullYear()} {brand}. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-bold uppercase tracking-widest text-muted">
            <Link href="#" className="hover:text-accent transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-accent transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
