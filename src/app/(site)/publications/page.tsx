import Link from "next/link";
import { getCollection } from "@/lib/content/service";
import { PageBanner } from "@/components/layout/page-banner";
import { FileText, Download } from "lucide-react";

export default async function PublicationsPage() {
  const entries = await getCollection("publications");

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <PageBanner title="Publications" />
      
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 w-full relative">
        {/* Subtle ambient orb in the background */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-accent-secondary opacity-[0.03] rounded-full blur-[100px] pointer-events-none z-0"></div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10 animate-fade-in">
          {entries.map((entry) => (
            <Link 
              key={entry.id} 
              href={`/publications/${entry.slug}`} 
              className="glass-panel group hover-glow relative overflow-hidden transition-all duration-500 hover:-translate-y-2 bg-surface/50 hover:bg-surface rounded-3xl flex flex-col h-full"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-secondary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              {/* Top border highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="p-8 flex flex-col h-full relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 w-12 rounded-xl bg-surface-raised shadow-inner flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-[var(--glass-border)]">
                    <FileText className="w-5 h-5 text-accent-secondary drop-shadow-sm" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-bold text-muted uppercase tracking-wider bg-surface-raised px-3 py-1 rounded-full border border-[var(--glass-border)] group-hover:border-accent-secondary/30 transition-colors">
                    Report
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-ink mb-4 group-hover:text-accent-secondary transition-colors duration-300 line-clamp-2">
                  {entry.title}
                </h2>
                
                <div className="h-px w-12 bg-accent/20 mb-4 group-hover:w-full transition-all duration-500"></div>
                
                <p className="text-[15px] text-muted leading-relaxed flex-grow line-clamp-3 mb-8">
                  {entry.summary}
                </p>
                
                <div className="mt-auto flex items-center text-sm font-bold text-ink group-hover:text-accent-secondary transition-colors duration-300">
                  View Document
                  <Download className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
