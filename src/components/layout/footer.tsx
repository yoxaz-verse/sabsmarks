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
    <footer className="w-full bg-stone-50 border-t border-stone-200 mt-20">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          
          {/* Brand & Description */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="mb-8">
              <Logo className="scale-90 origin-top-left" />
            </div>
            <p className="text-[14px] leading-relaxed text-stone-600 pr-4">
              {brand} is an all services firm specializing in providing a wide spectrum of professional services under one roof to leading domestic and multinational corporations, spread across virtually all sectors.
            </p>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-5">
            <h4 className="text-2xl font-bold text-[#18395f] mb-3">Stay Updated.</h4>
            <p className="text-[14px] text-stone-600 mb-6">Subscribe to our newsletter to get the latest insights and firm updates.</p>
            <NewsletterForm />
          </div>

          {/* Links */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-base font-bold text-stone-900 mb-6">About Us</h4>
              <div className="flex flex-col gap-4 text-[14px] font-medium text-stone-600">
                <Link href="/practice-areas" className="hover:text-[#18395f] transition-colors">Practice Areas</Link>
                <Link href="/industry-solutions" className="hover:text-[#18395f] transition-colors">Industry Solutions</Link>
                <Link href="/expertise/our-approach" className="hover:text-[#18395f] transition-colors">Our Approach</Link>
                <Link href="/insights" className="hover:text-[#18395f] transition-colors">Publications</Link>
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold text-stone-900 mb-6">Connect</h4>
              <div className="flex flex-col gap-4 text-[14px] font-medium text-stone-600">
                <Link href="/careers" className="hover:text-[#18395f] transition-colors">Join Us</Link>
                <Link href="/contact" className="hover:text-[#18395f] transition-colors">Contact Us</Link>
                <Link href="#" className="hover:text-[#18395f] transition-colors">Terms & Conditions</Link>
                <Link href="#" className="hover:text-[#18395f] transition-colors">Privacy Policy</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Banner */}
        <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#df8c20] text-white shadow-md">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">Email Us</p>
              <a href={`mailto:${contactEmail}`} className="text-xl md:text-2xl font-bold text-stone-800 hover:text-[#18395f] transition-colors">
                {contactEmail}
              </a>
            </div>
          </div>
          
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#18395f] text-white shadow-md hover:bg-[#204a7a] transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-6 w-6 group-hover:scale-110 transition-transform"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-white border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-6 py-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-stone-500">
            Copyright © {new Date().getFullYear()} {brand}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-bold text-stone-400">
            <Link href="#" className="hover:text-[#18395f] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[#18395f] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
