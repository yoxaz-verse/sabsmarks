"use client";

import { useState } from "react";
import { PageBanner } from "@/components/layout/page-banner";

const locations = [
  { id: "abu-dhabi", name: "Abu Dhabi" },
  { id: "ahmedabad", name: "Ahmedabad" },
  { id: "bengaluru", name: "Bengaluru" },
  { id: "chennai", name: "Chennai" },
  { id: "delhi", name: "Delhi" },
  { id: "dubai", name: "Dubai" },
  { id: "gift-city", name: "GIFT City" },
  { id: "gurgaon", name: "Gurgaon" },
  { id: "kolkata", name: "Kolkata" },
  { 
    id: "mumbai", 
    name: "Mumbai",
    details: [
      {
        address: "Mistry Bhavan, 3rd Floor,\nDinshaw Vachha Road,\nChurchgate, Mumbai 400 020.",
        phone: "+91 22 6623 0600",
        email: "manish@sabsmarks.com"
      },
      {
        address: "501-502, Narain Chambers, M.G. Road,\nVile Parle (E), Mumbai 400 057.",
        phone: "+91 22 6250 7600",
        email: "himanshu@sabsmarks.com"
      },
      {
        address: "Takshashila,\n3rd Floor, Samant Estate,\nGoregaon (East),\nMumbai-400063",
        phone: "+91 22 6307 2500",
        email: "hiren@sabsmarks.com"
      }
    ]
  },
];

export default function ContactPage() {
  const [activeCity, setActiveCity] = useState("mumbai");

  const activeLocation = locations.find(loc => loc.id === activeCity) || locations[0];

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <PageBanner title="Contact Us" />
      
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 w-full">
        <div className="mb-12">
          <h2 className="text-3xl text-ink font-bold mb-4">Our Locations</h2>
          <div className="w-48 h-[2px] bg-stone-300"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side: City Tabs */}
          <div className="w-full md:w-1/3 flex flex-col gap-[2px]">
            {locations.map((city) => (
              <button
                key={city.id}
                onClick={() => setActiveCity(city.id)}
                className={`text-left px-6 py-3 text-[17px] font-bold transition-colors ${
                  activeCity === city.id
                    ? "bg-accent-secondary text-white"
                    : "bg-accent text-white hover:bg-accent-secondary"
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>

          {/* Right Side: Location Details */}
          <div className="w-full md:w-2/3 bg-accent text-white p-8 md:p-12 relative overflow-hidden min-h-[500px]">
            <h3 className="text-sm font-bold tracking-wider mb-2 uppercase">{activeLocation.name}</h3>
            <h2 className="text-3xl font-bold mb-10">Sabs Marks & Associates LLP</h2>
            
            {activeLocation.details ? (
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 space-y-8 relative z-10">
                  {activeLocation.details.map((office, i) => (
                    <div key={i} className="border-b border-[#df8c20]/30 pb-8 last:border-0 last:pb-0">
                      <p className="text-[15px] leading-relaxed mb-4 whitespace-pre-line text-blue-50">
                        {office.address}
                      </p>
                      <p className="text-[15px] text-blue-100">
                        <span className="font-semibold">T :</span> {office.phone}
                      </p>
                      <p className="text-[15px] text-blue-100">
                        <span className="font-semibold">E :</span> {office.email}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Map Image Placeholder for Mumbai layout */}
                <div className="w-full md:w-1/2 relative z-10 hidden md:block">
                  <div className="bg-stone-200 w-full aspect-square rounded-sm overflow-hidden border-4 border-white shadow-lg">
                    {/* Placeholder map image. In a real scenario, use Google Maps iframe */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
                      alt="Map Location" 
                      className="w-full h-full object-cover opacity-80 mix-blend-luminosity" 
                    />
                    <div className="absolute top-4 left-4 bg-surface text-ink text-xs font-bold px-3 py-1.5 rounded-sm shadow-sm">
                      Open in Maps ↗
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-blue-100 text-[15px]">
                <p>Office details for {activeLocation.name} will be updated soon.</p>
              </div>
            )}
            
            {/* Subtle bridge background decoration (mimicking the screenshot) */}
            <div className="absolute bottom-0 right-0 w-2/3 opacity-10 pointer-events-none">
              <svg viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="0.5">
                <path d="M0 30 L20 20 L40 30 L60 10 L80 30 L100 20" />
                <path d="M20 20 L20 40 M60 10 L60 40" />
                <path d="M20 20 L10 40 M20 20 L30 40 M60 10 L45 40 M60 10 L75 40" />
                <line x1="0" y1="40" x2="100" y2="40" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
