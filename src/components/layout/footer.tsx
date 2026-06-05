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
    <footer className="mt-20 w-full border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="flex flex-col items-start lg:col-span-4">
            <div className="mb-8">
              <Logo className="origin-top-left scale-90" />
            </div>
            <p className="pr-4 text-[14px] leading-7 text-muted">
              Sabs Marks JVS & Co. is a multidisciplinary professional services firm offering a comprehensive range of solutions under one roof to leading domestic and multinational organizations across diverse industries.
            </p>
          </div>

          <div className="lg:col-span-5">
            <p className="brand-kicker mb-4">Publications</p>
            <h4 className="mb-3 text-2xl font-bold text-accent">Stay Updated.</h4>
            <p className="mb-6 text-[14px] leading-7 text-muted">Subscribe to our newsletter to get the latest insights and firm updates.</p>
            <NewsletterForm />
          </div>

          <div className="grid grid-cols-2 gap-6 lg:col-span-3">
            <div>
              <h4 className="mb-6 text-base font-bold text-accent">About Us</h4>
              <div className="flex flex-col gap-4 text-[14px] font-medium text-muted">
                <Link href="/practice-areas" className="footer-link">Services</Link>
                <Link href="/expertise/our-approach" className="footer-link">Our Approach</Link>
                <Link href="/insights" className="footer-link">Publications</Link>
              </div>
            </div>
            <div>
              <h4 className="mb-6 text-base font-bold text-accent">Connect</h4>
              <div className="flex flex-col gap-4 text-[14px] font-medium text-muted">
                <Link href="/careers" className="footer-link">Join Us</Link>
                <Link href="/contact" className="footer-link">Contact Us</Link>
                <Link href="#" className="footer-link">Terms & Conditions</Link>
                <Link href="#" className="footer-link">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-xl border border-[var(--border)] bg-[var(--cloud)] px-8 py-8">
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-[var(--border-strong)] bg-[var(--surface)] text-accent">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-muted">Call Us</p>
                <a href={`tel:${contact.primaryPhone.replace(/\s+/g, "")}`} className="text-lg font-bold text-accent transition-colors hover:text-accent-secondary md:text-xl">
                  {contact.primaryPhone}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-sm border border-[var(--border-strong)] bg-[var(--surface)] text-accent">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-muted">Email Us</p>
                <a href={`mailto:${contact.primaryEmail}`} className="text-lg font-bold text-accent transition-colors hover:text-accent-secondary md:text-xl">
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
                className="group/link flex h-12 w-12 items-center justify-center rounded-sm border border-[var(--border-strong)] bg-[var(--surface)] text-accent transition-colors hover:border-[var(--accent-secondary)] hover:text-accent-secondary"
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
                className="group/link flex h-12 w-12 items-center justify-center rounded-sm border border-[var(--border-strong)] bg-[var(--surface)] text-accent transition-colors hover:border-[var(--accent-secondary)] hover:text-accent-secondary"
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

      <div className="border-t border-[var(--border)] bg-[var(--cloud)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row md:px-12">
          <p className="text-sm font-medium text-muted">Copyright © {new Date().getFullYear()} {brand}. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-bold uppercase tracking-[0.14em] text-muted">
            <Link href="#" className="footer-link">Privacy</Link>
            <Link href="#" className="footer-link">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
