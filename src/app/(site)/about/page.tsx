import { PageBanner } from "@/components/layout/page-banner";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageBanner title="The Firm" />
      
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-32 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#18395f] mb-6">A Legacy of Trust and Excellence.</h2>
            <div className="h-1 w-24 bg-[#df8c20] mb-8"></div>
            <p className="text-lg text-stone-600 mb-6 leading-relaxed">
              Sabs Marks JVS & Co. LLP is a premier chartered accountancy firm established to provide a comprehensive suite of professional services under one roof. 
            </p>
            <p className="text-stone-600 mb-8 leading-relaxed">
              With a deep understanding of the evolving regulatory landscape, our team of seasoned professionals brings decades of experience to help organizations navigate complex business challenges, ensure compliance, and drive sustainable growth across domestic and multinational sectors.
            </p>
            <div className="flex gap-4">
              <Link href="/about/team" className="px-8 py-3 bg-[#18395f] text-white font-bold rounded-sm hover:bg-[#122b48] transition-colors">
                Meet Our Leadership
              </Link>
              <Link href="/about/locations" className="px-8 py-3 bg-stone-100 text-[#18395f] font-bold rounded-sm hover:bg-stone-200 transition-colors">
                View Global Offices
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all">
              <span className="text-5xl font-black text-[#df8c20] mb-2">35+</span>
              <span className="text-sm font-bold text-stone-500 uppercase tracking-widest">Years of Trust</span>
            </div>
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all translate-y-8">
              <span className="text-5xl font-black text-[#df8c20] mb-2">15+</span>
              <span className="text-sm font-bold text-stone-500 uppercase tracking-widest">Partners</span>
            </div>
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all">
              <span className="text-5xl font-black text-[#df8c20] mb-2">250+</span>
              <span className="text-sm font-bold text-stone-500 uppercase tracking-widest">Professionals</span>
            </div>
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 flex flex-col items-center justify-center text-center hover:shadow-lg transition-all translate-y-8">
              <span className="text-5xl font-black text-[#df8c20] mb-2">8</span>
              <span className="text-sm font-bold text-stone-500 uppercase tracking-widest">Global Locations</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
