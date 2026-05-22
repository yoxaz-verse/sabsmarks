import Link from "next/link";
import { ArrowRight, BarChart3, Building2, Calculator, FileText, Globe2, Briefcase, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative flex items-center justify-center min-h-[85vh] bg-stone-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#18395f]/90 to-[#20a447]/80 z-10" />
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="relative z-20 mx-auto max-w-7xl px-6 py-24 text-center md:text-left md:px-12 w-full flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-3xl">
            <p className="animate-[fadeIn_0.6s_ease-out] text-sm md:text-base font-bold tracking-[0.2em] text-white/90 uppercase mb-4">Strategic Financial Advisory</p>
            <h1 className="animate-[fadeIn_0.8s_ease-out] text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Looking for expert financial and business guidance?
            </h1>
            <p className="animate-[fadeIn_1s_ease-out] text-lg md:text-xl text-stone-100 max-w-2xl mb-4 leading-relaxed">
              Start building your growth strategy today.
            </p>
            <p className="animate-[fadeIn_1.1s_ease-out] text-base md:text-lg text-stone-100/95 max-w-2xl mb-10 leading-relaxed">
              We provide strategic accounting, taxation, audit, compliance, and business advisory services tailored to help businesses grow with confidence.
            </p>
            <div className="animate-[fadeIn_1.2s_ease-out] flex flex-wrap gap-4 justify-center md:justify-start">
              <Link href="/practice-areas" className="rounded-full bg-white px-8 py-4 text-sm font-bold text-[#18395f] hover:bg-stone-100 transition-colors">
                Explore Services
              </Link>
              <Link href="/contact" className="rounded-full border border-white/30 bg-black/20 backdrop-blur-sm px-8 py-4 text-sm font-bold text-white hover:bg-white/10 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-stone-900 mb-6 tracking-tight">About Us</h2>
              <div className="h-1 w-20 bg-[#20a447] mb-8"></div>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                Sabs Marks JVS & Co is a multidisciplinary professional services firm offering a comprehensive range of solutions under one roof to leading domestic and multinational organizations across diverse industries. Established in 1985, the firm has evolved as a trusted third-generation practice, built on a strong legacy of expertise, integrity, and client-centric service.
              </p>
              <p className="text-stone-600 mb-6 leading-relaxed">
                With a special focus on the MSME sector, Sabs Marks JVS & Co caters to businesses of all sizes, delivering tailored solutions that address both routine and complex business requirements. Through its presence across multiple locations and collaboration with associate firms, the organization seamlessly integrates expertise across service lines and geographies to support clients with efficiency and consistency.
              </p>
              <p className="text-stone-600 mb-8 leading-relaxed">
                Driven by the core values of Integrity, Competence, and Professionalism, the firm is backed by a highly motivated team of experienced professionals specializing in their respective domains. We provide strategic, practical, and legally sound solutions designed to help businesses navigate challenges, ensure compliance, and achieve sustainable growth, all delivered with a personalized approach.
              </p>
              <Link href="/about" className="inline-flex items-center text-[#18395f] font-semibold hover:text-[#204a7a] transition-colors group">
                Discover Our Firm <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1965&auto=format&fit=crop')] bg-cover bg-center" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-stone-50">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-stone-900 tracking-tight">Our Expertise</h2>
            <div className="h-1 w-20 bg-[#18395f] mx-auto mt-6 mb-6"></div>
            <p className="text-stone-600 text-lg">Delivering specialized advisory, audit, and tax solutions tailored to your unique business requirements.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Audit & Assurance", desc: "Statutory, internal, and management audits ensuring compliance and transparency.", icon: FileText },
              { title: "Direct Taxation", desc: "Corporate tax planning, compliance, and representation before tax authorities.", icon: Calculator },
              { title: "Indirect Taxation", desc: "GST advisory, compliance, and structuring for optimized tax footprints.", icon: BarChart3 },
              { title: "Corporate Finance", desc: "M&A advisory, valuations, and due diligence for strategic growth.", icon: Briefcase },
              { title: "Risk Advisory", desc: "Enterprise risk management, SOP development, and forensic audits.", icon: Users },
              { title: "Outsourcing Services", desc: "End-to-end accounting, payroll, and compliance outsourcing.", icon: Globe2 },
            ].map((service, i) => (
              <div key={i} className="group bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-14 w-14 rounded-xl bg-[#18395f]/10 flex items-center justify-center mb-6 group-hover:bg-[#18395f] transition-colors duration-300">
                  <service.icon className="h-7 w-7 text-[#18395f] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-3">{service.title}</h3>
                <p className="text-stone-600 mb-6 line-clamp-2">{service.desc}</p>
                <Link href="/practice-areas" className="text-[#20a447] font-semibold text-sm flex items-center group/link">
                  Read More <ArrowRight className="ml-1 h-4 w-4 transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#18395f] text-white">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight mb-6">Industries We Serve</h2>
              <div className="h-1 w-20 bg-[#20a447] mb-6"></div>
              <p className="text-white/80 text-lg">Our industry-focused approach allows us to offer customized solutions that address sector-specific challenges.</p>
            </div>
            <Link href="/industry-solutions" className="rounded-full bg-white text-[#18395f] px-6 py-3 font-semibold hover:bg-stone-100 transition-colors whitespace-nowrap">
              View All Industries
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {["Financial Services", "Manufacturing", "Real Estate & Infra", "IT & ITES", "Healthcare", "Retail & FMCG", "Logistics", "NGOs & Trusts"].map((industry, i) => (
              <div key={i} className="border border-white/20 p-6 rounded-2xl hover:bg-white/10 transition-colors flex flex-col justify-between h-32">
                <Building2 className="h-6 w-6 text-[#20a447]" />
                <span className="font-semibold">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { number: "35+", label: "Years Experience" },
              { number: "15+", label: "Partners" },
              { number: "250+", label: "Professionals" },
              { number: "8", label: "Locations" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-black text-[#20a447] mb-2">{stat.number}</div>
                <div className="text-stone-500 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-stone-50">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Latest Insights</h2>
              <div className="h-1 w-16 bg-[#18395f] mt-4"></div>
            </div>
            <Link href="/insights" className="hidden md:flex items-center text-[#18395f] font-semibold hover:text-[#204a7a]">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 flex flex-col group cursor-pointer hover:shadow-md transition-shadow">
                <div className="h-48 bg-stone-200 overflow-hidden">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105 bg-[url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2026&auto=format&fit=crop')]" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs font-bold text-[#20a447] uppercase tracking-wider mb-2">Tax & Regulatory</div>
                  <h3 className="font-bold text-lg text-stone-900 mb-3 group-hover:text-[#18395f] transition-colors">Key Highlights of the Recent Finance Bill</h3>
                  <p className="text-stone-600 text-sm mb-4 line-clamp-2 flex-1">An in-depth analysis of the recent regulatory changes and their implications on corporate tax structures.</p>
                  <div className="text-[#18395f] font-semibold text-sm">Read Article</div>
                </div>
              </div>
            ))}
          </div>
          <Link href="/insights" className="md:hidden mt-8 w-full flex justify-center items-center text-[#18395f] font-semibold">
            View All Insights <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
