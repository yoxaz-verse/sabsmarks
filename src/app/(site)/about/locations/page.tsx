"use client";

import { useState } from "react";
import { PageBanner } from "@/components/layout/page-banner";

type BranchDetail = {
  label: string;
  address: string;
  email?: string;
};

type LocationItem = {
  id: string;
  city: string;
  mapUrl: string;
  details: BranchDetail[];
};

const locations: LocationItem[] = [
  {
    id: "ettumanoor",
    city: "Ettumanoor (Head Office)",
    mapUrl: "https://www.google.com/maps?q=Ettumanoor+Kottayam+Kerala&output=embed",
    details: [
      {
        label: "Head Office",
        address: "Oonnukallel Arcade, MC Road, Ettumanoor, Kottayam 686632",
        email: "info@sabsmarksjvs.com",
      },
    ],
  },
  {
    id: "kochi",
    city: "Kochi",
    mapUrl: "https://www.google.com/maps?q=Edappally+Kochi&output=embed",
    details: [
      {
        label: "Branch 1",
        address: "A3 Pentalakshmi, M A Sajeev Road, Edappally, Kochi 682024",
        email: "info@sabsmarksjvs.com",
      },
      {
        label: "Branch 2",
        address: "UTRA 8B, Inchiparambu, 1st Avenue, Unichira, Edappally, Kochi 682024",
      },
    ],
  },
  {
    id: "angamaly",
    city: "Angamaly",
    mapUrl: "https://www.google.com/maps?q=Angamaly+Kerala&output=embed",
    details: [
      {
        label: "Branch 1",
        address: "First Floor, Padayattil Tower, East Nagar, MC Road, Angamaly, Kerala 683572",
      },
      {
        label: "Branch 2",
        address: "First Floor, Padayattil Tower, East Nagar, MC Road, Angamaly, Kerala 683572",
      },
    ],
  },
  {
    id: "bengaluru",
    city: "Bengaluru",
    mapUrl: "https://www.google.com/maps?q=Rajajinagar+Bengaluru&output=embed",
    details: [
      {
        label: "Branch 1",
        address: "A Wing 003, DSMAX Sankalp Manor APTS, Horamavu Agara Main Road, Bengaluru",
      },
      {
        label: "Branch 2",
        address: "A Wing 003, DSMAX Sankalp Manor APTS, Horamavu Agara Main Road, Bengaluru",
      },
      {
        label: "Branch 3",
        address: "No. 1653, 2nd Floor, Main A Block, 2nd Stage, Rajajinagar, Bengaluru, Karnataka 560010",
      },
    ],
  },
  {
    id: "chennai",
    city: "Chennai",
    mapUrl: "https://www.google.com/maps?q=Mylapore+Chennai&output=embed",
    details: [
      {
        label: "Office",
        address: "Flat No. 26, Aarthi Arcade, 3rd Floor, 86 Dr Radhakrishna Salai, Mylapore, Chennai",
      },
    ],
  },
  {
    id: "tirupati",
    city: "Tirupati",
    mapUrl: "https://www.google.com/maps?q=Tirupati+Andhra+Pradesh&output=embed",
    details: [
      {
        label: "Office",
        address: "D4#401 Creekside Residences, Sricity Expressway, Tirupati, Andhra Pradesh 517646",
      },
    ],
  },
  {
    id: "hyderabad",
    city: "Hyderabad",
    mapUrl: "https://www.google.com/maps?q=Madhapur+Hyderabad&output=embed",
    details: [
      {
        label: "Office",
        address: "PL No. 1, 2nd Floor, SY No. 71, Silicon Valley, Near Image Garden, Madhapur, Telangana 500081",
      },
    ],
  },
  {
    id: "gurgaon",
    city: "Gurgaon",
    mapUrl: "https://www.google.com/maps?q=Sector+57+Gurgaon&output=embed",
    details: [
      {
        label: "Office",
        address: "G-264, Ground Floor, Sushant Lok-I, Sector 57, Gurgaon, Haryana 122003",
      },
    ],
  },
  {
    id: "chengannur",
    city: "Chengannur",
    mapUrl: "https://www.google.com/maps?q=Chengannur+Kerala&output=embed",
    details: [
      {
        label: "Office",
        address: "1382/3, 2nd Floor, Kannara Building, Near South Indian Bank, Court Road, Market Nandavanam Jct Road, Chengannur, Kerala 689121",
      },
    ],
  },
  {
    id: "thrissur",
    city: "Thrissur",
    mapUrl: "https://www.google.com/maps?q=Kunnamkulam+Thrissur&output=embed",
    details: [
      {
        label: "Office",
        address: "First Floor, Arfa Complex, Door No. 5, 44/X/ABC, Herbert Road, Kunnamkulam, Thrissur, Kerala 680503",
      },
    ],
  },
  {
    id: "dubai",
    city: "Dubai",
    mapUrl: "https://www.google.com/maps?q=Karama+Dubai&output=embed",
    details: [
      {
        label: "Office",
        address: "Growbox Businesses Center, Hamsah Building, Karama, Dubai",
      },
    ],
  },
  {
    id: "kottayam",
    city: "Kottayam",
    mapUrl: "https://www.google.com/maps?q=Kottayam+Kerala&output=embed",
    details: [
      {
        label: "Office",
        address: "Thekkum Gopuram, Kottayam, Kerala 686001",
      },
    ],
  },
];

export default function LocationsPage() {
  const [activeId, setActiveId] = useState(locations[0].id);
  const activeLocation = locations.find((l) => l.id === activeId) || locations[0];

  return (
    <div className="flex flex-col min-h-screen bg-stone-50">
      <PageBanner title="Locations" />

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-32 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#18395f] mb-6">Our Locations</h2>
          <div className="h-1 w-24 bg-[#df8c20] mx-auto mb-8"></div>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            We support clients through a multi-location presence across India and Dubai, with integrated delivery across service lines.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 flex flex-col gap-[2px]">
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActiveId(loc.id)}
                className={`text-left px-6 py-4 text-[17px] font-bold transition-all duration-300 flex justify-between items-center ${
                  activeId === loc.id ? "bg-[#df8c20] text-white shadow-md scale-[1.02] origin-left" : "bg-white text-[#18395f] hover:bg-stone-100 border border-stone-100"
                }`}
              >
                {loc.city}
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${activeId === loc.id ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>

          <div className="w-full lg:w-2/3 flex flex-col bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-100">
            <div className="w-full h-[320px] bg-stone-200">
              <iframe
                src={activeLocation.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[20%] contrast-[1.1]"
              ></iframe>
            </div>

            <div className="p-8 md:p-12 bg-[#18395f] text-white relative">
              <h3 className="text-2xl md:text-3xl font-bold mb-8">{activeLocation.city}</h3>

              <div className="space-y-6">
                {activeLocation.details.map((office, idx) => (
                  <div key={idx} className="border-b border-white/20 pb-5 last:border-0 last:pb-0">
                    <p className="text-sm uppercase tracking-wider text-[#dfc28f] font-bold mb-2">{office.label}</p>
                    <p className="text-[16px] text-blue-50 leading-relaxed">{office.address}</p>
                    {office.email ? <p className="text-[15px] mt-2 text-blue-100">Email: {office.email}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
