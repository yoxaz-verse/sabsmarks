"use client";

import { useState } from "react";
import { PageBanner } from "@/components/layout/page-banner";

type OfficeDetail = {
  label: string;
  address: string;
  email?: string;
};

type ContactLocation = {
  id: string;
  name: string;
  details: OfficeDetail[];
};

const locations: ContactLocation[] = [
  {
    id: "head-office",
    name: "Head Office",
    details: [{ label: "Ettumanoor", address: "Oonnukallel Arcade, MC Road, Ettumanoor, Kottayam 686632", email: "info@sabsmarksjvs.com" }],
  },
  {
    id: "kochi",
    name: "Kochi",
    details: [
      { label: "Branch 1", address: "A3 Pentalakshmi, M A Sajeev Road, Edappally, Kochi 682024", email: "info@sabsmarksjvs.com" },
      { label: "Branch 2", address: "UTRA 8B, Inchiparambu, 1st Avenue, Unichira, Edappally, Kochi 682024" },
    ],
  },
  {
    id: "angamaly",
    name: "Angamaly",
    details: [
      { label: "Branch 1", address: "First Floor, Padayattil Tower, East Nagar, MC Road, Angamaly, Kerala 683572" },
      { label: "Branch 2", address: "First Floor, Padayattil Tower, East Nagar, MC Road, Angamaly, Kerala 683572" },
    ],
  },
  {
    id: "bengaluru",
    name: "Bengaluru",
    details: [
      { label: "Branch 1", address: "A Wing 003, DSMAX Sankalp Manor APTS, Horamavu Agara Main Road, Bengaluru" },
      { label: "Branch 2", address: "A Wing 003, DSMAX Sankalp Manor APTS, Horamavu Agara Main Road, Bengaluru" },
      { label: "Branch 3", address: "No. 1653, 2nd Floor, Main A Block, 2nd Stage, Rajajinagar, Bengaluru, Karnataka 560010" },
    ],
  },
  {
    id: "chennai",
    name: "Chennai",
    details: [{ label: "Office", address: "Flat No. 26, Aarthi Arcade, 3rd Floor, 86 Dr Radhakrishna Salai, Mylapore, Chennai" }],
  },
  {
    id: "tirupati",
    name: "Tirupati",
    details: [{ label: "Office", address: "D4#401 Creekside Residences, Sricity Expressway, Tirupati, Andhra Pradesh 517646" }],
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    details: [{ label: "Office", address: "PL No. 1, 2nd Floor, SY No. 71, Silicon Valley, Near Image Garden, Madhapur, Telangana 500081" }],
  },
  {
    id: "gurgaon",
    name: "Gurgaon",
    details: [{ label: "Office", address: "G-264, Ground Floor, Sushant Lok-I, Sector 57, Gurgaon, Haryana 122003" }],
  },
  {
    id: "chengannur",
    name: "Chengannur",
    details: [{ label: "Office", address: "1382/3, 2nd Floor, Kannara Building, Near South Indian Bank, Court Road, Market Nandavanam Jct Road, Chengannur, Kerala 689121" }],
  },
  {
    id: "thrissur",
    name: "Thrissur",
    details: [{ label: "Office", address: "First Floor, Arfa Complex, Door No. 5, 44/X/ABC, Herbert Road, Kunnamkulam, Thrissur, Kerala 680503" }],
  },
  {
    id: "dubai",
    name: "Dubai",
    details: [{ label: "Office", address: "Growbox Businesses Center, Hamsah Building, Karama, Dubai" }],
  },
  {
    id: "kottayam",
    name: "Kottayam",
    details: [{ label: "Office", address: "Thekkum Gopuram, Kottayam, Kerala 686001" }],
  },
];

export default function ContactPage() {
  const [activeCity, setActiveCity] = useState(locations[0].id);
  const activeLocation = locations.find((loc) => loc.id === activeCity) || locations[0];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageBanner title="Contact Us" />

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 w-full">
        <div className="mb-12">
          <h2 className="text-3xl text-[#18395f] font-bold mb-4">Our Locations</h2>
          <div className="w-48 h-[2px] bg-stone-300"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3 flex flex-col gap-[2px]">
            {locations.map((city) => (
              <button
                key={city.id}
                onClick={() => setActiveCity(city.id)}
                className={`text-left px-6 py-3 text-[17px] font-bold transition-colors ${
                  activeCity === city.id ? "bg-[#df8c20] text-white" : "bg-[#18395f] text-white hover:bg-[#204a7a]"
                }`}
              >
                {city.name}
              </button>
            ))}
          </div>

          <div className="w-full md:w-2/3 bg-[#18395f] text-white p-8 md:p-12 relative overflow-hidden min-h-[500px]">
            <h3 className="text-sm font-bold tracking-wider mb-2 uppercase">{activeLocation.name}</h3>
            <h2 className="text-3xl font-bold mb-10">Sabs Marks JVS & Co</h2>

            <div className="space-y-8 relative z-10">
              {activeLocation.details.map((office, i) => (
                <div key={i} className="border-b border-[#df8c20]/30 pb-8 last:border-0 last:pb-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#dfc28f] mb-2">{office.label}</p>
                  <p className="text-[15px] leading-relaxed mb-2 text-blue-50">{office.address}</p>
                  {office.email ? <p className="text-[15px] text-blue-100"><span className="font-semibold">E :</span> {office.email}</p> : null}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-8">
          <div className="border border-stone-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#18395f] mb-4">Contact (Head)</h3>
            <p className="text-stone-700 mb-2"><span className="font-semibold">Call Us Phone:</span> 8943115500</p>
            <p className="text-stone-700"><span className="font-semibold">Mail Us Email:</span> info@sabsmarksjvs.com</p>
          </div>
          <div className="border border-stone-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#18395f] mb-4">Social Media</h3>
            <p className="text-stone-700 mb-2">
              LinkedIn: <a className="text-[#18395f] font-semibold hover:underline" href="https://www.linkedin.com/company/sabs-marks-jvs-co/" target="_blank" rel="noreferrer">https://www.linkedin.com/company/sabs-marks-jvs-co/</a>
            </p>
            <p className="text-stone-700">
              Instagram: <a className="text-[#18395f] font-semibold hover:underline" href="https://www.instagram.com/sabsmarksjvs?igsh=MW5qeDBsbWN1dzhsaQ==" target="_blank" rel="noreferrer">https://www.instagram.com/sabsmarksjvs?igsh=MW5qeDBsbWN1dzhsaQ==</a>
            </p>
          </div>
        </div>

        <div className="mt-8 border border-stone-200 rounded-xl p-6 bg-stone-50">
          <h3 className="text-lg font-bold text-[#18395f] mb-3">Our Locations</h3>
          <p className="text-stone-700 leading-relaxed">
            H.O: Oonnukallel Arcade, MC Road, Ettumanoor, Kottayam 686632, Kerala. Also at: Kochi | Angamaly | Thrissur | Bengaluru | Chennai | Tirupati | Gurgaon | Ettumanoor | Kottayam | Chengannur | Hyderabad | Dubai.
          </p>
        </div>
      </section>
    </div>
  );
}
