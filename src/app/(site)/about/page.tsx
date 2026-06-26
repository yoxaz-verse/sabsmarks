import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/page-banner";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, Briefcase, CheckCircle2, Handshake, RefreshCw, ShieldCheck, TrendingUp } from "lucide-react";
import { InteriorIntroSection } from "@/components/sections/interior-intro-section";
import { ImageFeatureCard } from "@/components/media/image-feature-card";
import { SiteOrnament } from "@/components/decorative/site-ornament";
import { GlowCard } from "@/components/ui/glow-card";
import { SITE_VISUALS } from "@/lib/site-visuals";

export const metadata: Metadata = buildPageMetadata({
  path: "/about",
  title: "About",
  description: "Learn about Sabs Marks JVS & Co., our legacy, leadership, and advisory philosophy.",
});

const valuePrinciples = [
  {
    icon: ShieldCheck,
    title: "Integrity Before Everything",
    text: "We do what is right, not what is easy. Trust, transparency, and ethical conduct form the foundation of every relationship we build.",
  },
  {
    icon: Briefcase,
    title: "Business First, Compliance Always",
    text: "We recognize compliance as essential, but growth as the ultimate objective. Our solutions are designed to strengthen businesses, create value, and support sustainable success.",
  },
  {
    icon: CheckCircle2,
    title: "Practical Over Theoretical",
    text: "We believe advice creates value only when it can be implemented. Our recommendations are practical, actionable, and tailored to real-world business challenges.",
  },
  {
    icon: Handshake,
    title: "Ownership and Accountability",
    text: "We take responsibility for every engagement as if it were our own. Commitment, responsiveness, and professionalism define the way we serve our clients.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Excellence",
    text: "We pursue excellence through continuous learning, innovation, and improvement, ensuring that our clients benefit from the highest standards of expertise and service.",
  },
  {
    icon: TrendingUp,
    title: "Partnership for Growth",
    text: "We aspire to be more than advisors. By understanding our clients' ambitions and challenges, we become trusted partners in their journey towards long-term growth and success.",
  },
];

const PrincipleCard = ({ item, index }: { item: typeof valuePrinciples[0]; index: number }) => {
  const Icon = item.icon;

  return (
    <div className="break-inside-avoid reveal reveal-up" style={{ transitionDelay: `${index * 50}ms` }}>
      <GlowCard className="value-card creative-card decorated-panel group h-full overflow-hidden rounded-[1.35rem]">
        <div className="p-6 md:p-8">
          <SiteOrnament mode="card" className="opacity-15 transition-opacity group-hover:opacity-35" />
          <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <Icon className="h-6 w-6" />
          </span>
          <div className="relative z-10 mt-6 text-sm font-bold uppercase tracking-[0.14em] text-ink transition-colors group-hover:text-accent dark:text-white">{item.title}</div>
          <p className="relative z-10 mt-4 text-sm leading-relaxed text-muted">{item.text}</p>
        </div>
      </GlowCard>
    </div>
  );
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <PageBanner title="The Firm" />

      <InteriorIntroSection
        compact
        title="A Legacy of Trust and Excellence."
        description="Sabs Marks JVS & Co. is a multidisciplinary professional services firm offering a comprehensive range of solutions under one roof to leading domestic and multinational organizations across diverse industries."
        body={
          <>
            <p>
              Established in 1985, the firm has grown into a trusted third-generation practice built on a legacy of expertise, integrity, and client-centric service. With a strong focus on the MSME sector, we support businesses of all sizes with tailored solutions that address both routine and complex business requirements.
            </p>
            <p>
              Guided by the values of Integrity, Competence, and Professionalism, our experienced team delivers strategic, practical, and legally sound advice to help clients navigate challenges, ensure compliance, and achieve sustainable growth through a personalized approach.
            </p>
          </>
        }
        actions={
          <>
            <Link href="/about/team" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-accent">
              Meet Our Leadership <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about/locations"
              className="inline-flex items-center justify-center rounded-2xl border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface)_74%,transparent)] px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-ink hover:border-accent hover:text-accent"
            >
              Explore Our Locations
            </Link>
          </>
        }
        stats={[
          { value: "35+", label: "Years of Trust", text: "A long operating memory across business cycles, sectors, and regulatory change." },
          { value: "18+", label: "Partners", text: "Senior attention for decisions where accuracy, judgement, and timing matter." },
          { value: "250+", label: "Professionals", text: "Specialist depth across tax, assurance, advisory, systems, and controls." },
          { value: "10", label: "Global Locations", text: "Connected presence for domestic, cross-border, and multinational priorities." },
        ]}
      />

      <section className="site-section pt-0 pb-14 md:pb-18">
        <div className="site-container">
          <div className="section-header mx-auto max-w-3xl text-center reveal reveal-up">
            <div className="section-kicker mx-auto justify-center">Our Values</div>
            <h2 className="section-title">Principles that shape every engagement.</h2>
            <div className="section-rule mx-auto"></div>
          </div>

          <div className="mt-12 columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3">
            {valuePrinciples.map((item, index) => (
              <PrincipleCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="site-section pt-0 pb-16 md:pb-20">
        <div className="site-container">
          <div className="grid gap-6 lg:grid-cols-2">
            <ImageFeatureCard
              src={SITE_VISUALS.about.legacy}
              alt="Professional review meeting with financial documents and planning materials."
              eyebrow="Legacy"
              title="Built over decades, applied to present-day decisions."
              description="The firm’s growth has come from long-term client trust, partner visibility, and advice that remains grounded in execution."
            />
            <ImageFeatureCard
              src={SITE_VISUALS.about.team}
              alt="Leadership team collaborating across a conference table."
              eyebrow="Partner-led"
              title="Senior involvement where judgement matters most."
              description="Our engagement model keeps leadership close to the work, especially when decisions carry regulatory, financial, or governance weight."
              href="/about/team"
              ctaLabel="Meet leadership"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
