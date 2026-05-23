import { Breadcrumbs } from "@/components/navigation/breadcrumbs";

export default function OurApproachPage() {
  return (
    <section className="space-y-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Our Approach" }]} />
      <h1 className="text-4xl font-semibold">Our Approach</h1>
      <article className="rounded-2xl border border-[var(--glass-border)] bg-surface p-8 text-stone-700">
        <p>We combine partner-led judgement with execution depth across service lines, delivering legally sound and practical outcomes tailored to each business context.</p>
      </article>
    </section>
  );
}
