import { PageBanner } from "@/components/layout/page-banner";
import Link from "next/link";

export default function TeamPage() {
  const team = [
    {
      name: "Gautam Nayak",
      role: "Managing Partner",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop",
      linkedin: "#",
    },
    {
      name: "Hiren Shah",
      role: "Senior Partner, Audit & Assurance",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2000&auto=format&fit=crop",
      linkedin: "#",
    },
    {
      name: "Manish Sampat",
      role: "Partner, Indirect Tax",
      location: "Ahmedabad",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2000&auto=format&fit=crop",
      linkedin: "#",
    },
    {
      name: "Nehal Shah",
      role: "Partner, Corporate Finance",
      location: "Dubai",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop",
      linkedin: "#",
    },
    {
      name: "Pareen Shah",
      role: "Partner, Risk Advisory",
      location: "GIFT City",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop",
      linkedin: "#",
    },
    {
      name: "Suresh P.",
      role: "Partner, Direct Tax",
      location: "Bengaluru",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000&auto=format&fit=crop",
      linkedin: "#",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageBanner title="Leadership" />
      
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 w-full">
        <div className="mb-12">
          <h2 className="text-3xl text-[#18395f] font-bold mb-4">Our Partners</h2>
          <div className="w-24 h-[2px] bg-[#df8c20]"></div>
          <p className="mt-6 text-[15px] leading-7 text-stone-600 max-w-3xl">
            Our leadership team brings decades of combined experience across diverse financial and advisory disciplines. Partner-led teams ensure deep domain expertise and exceptional service delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div key={i} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/5] overflow-hidden relative">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18395f]/90 via-[#18395f]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <a 
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1076b4] text-white shadow-md hover:bg-[#0b5c8f] transition-colors mb-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <p className="text-white text-sm font-medium">Read Full Profile</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#18395f] mb-1 group-hover:text-[#df8c20] transition-colors">{member.name}</h3>
                <p className="text-sm font-medium text-stone-500 mb-3">{member.role}</p>
                <div className="flex items-center text-xs font-bold uppercase tracking-wider text-stone-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {member.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
