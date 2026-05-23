"use client";

import { useState } from "react";
import { PageBanner } from "@/components/layout/page-banner";

export default function LocationsPage() {
  const locations = [
    {
      id: "mumbai",
      city: "Mumbai (Headquarters)",
      address: "Nariman Point, Mumbai 400021, Maharashtra, India",
      phone: "+91 22 1234 5678",
      email: "mumbai@sabsmarksjvs.com",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120763.50422960613!2d72.74836695279626!3d18.938834925761356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c73a0d5cad%3A0xc70a25a7209c733c!2sNariman%20Point%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
    },
    {
      id: "delhi",
      city: "New Delhi",
      address: "Connaught Place, New Delhi 110001, India",
      phone: "+91 11 9876 5432",
      email: "delhi@sabsmarksjvs.com",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114827184497!2d77.2064115!3d28.6326126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
    },
    {
      id: "bengaluru",
      city: "Bengaluru",
      address: "UB City, Vittal Mallya Road, Bengaluru 560001, Karnataka, India",
      phone: "+91 80 4567 8901",
      email: "bengaluru@sabsmarksjvs.com",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0055106263595!2d77.59379631482199!3d12.971501990855845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167baebf6701%3A0xcf9530419266e5f8!2sUB%20City!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
    },
    {
      id: "ahmedabad",
      city: "Ahmedabad",
      address: "SG Highway, Ahmedabad 380015, Gujarat, India",
      phone: "+91 79 3456 7890",
      email: "ahmedabad@sabsmarksjvs.com",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.326207869634!2d72.50285641496825!3d23.048473784939763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b5eb02804b7%3A0x6280b18fa90ee0fc!2sSarkhej%20-%20Gandhinagar%20Hwy%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
    },
    {
      id: "gift-city",
      city: "GIFT City",
      address: "IFSC, GIFT City, Gandhinagar 382355, Gujarat, India",
      phone: "+91 79 8765 4321",
      email: "giftcity@sabsmarksjvs.com",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.653198305886!2d72.67965411497066!3d23.182885984872223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8061c0f16f31%3A0xf6d62a40498a442e!2sGIFT%20City%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
    },
    {
      id: "dubai",
      city: "Dubai (UAE)",
      address: "Dubai International Financial Centre (DIFC), Dubai, UAE",
      phone: "+971 4 123 4567",
      email: "dubai@sabsmarksjvs.com",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.914285817758!2d55.27962461501062!3d25.206126683891783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f4284d72856c9%3A0x6b4fbac27a46fa8c!2sDubai%20International%20Financial%20Centre!5e0!3m2!1sen!2ae!4v1700000000000!5m2!1sen!2ae"
    }
  ];

  const [activeId, setActiveId] = useState(locations[0].id);
  const activeLocation = locations.find(l => l.id === activeId) || locations[0];

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <PageBanner title="Locations" />
      
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-32 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-6">Global Presence</h2>
          <div className="h-1 w-24 bg-accent-secondary mx-auto mb-8"></div>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            With offices across major Indian business hubs and international operations in the UAE, we are strategically positioned to serve domestic and multinational clients.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* List Menu */}
          <div className="w-full lg:w-1/3 flex flex-col gap-[2px]">
            {locations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setActiveId(loc.id)}
                className={`text-left px-6 py-4 text-[17px] font-bold transition-all duration-300 flex justify-between items-center ${
                  activeId === loc.id
                    ? "bg-accent-secondary text-white shadow-md scale-[1.02] origin-left"
                    : "bg-surface text-ink hover:bg-surface-raised border border-[var(--glass-border)]"
                }`}
              >
                {loc.city}
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${activeId === loc.id ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>

          {/* Map and Details Area */}
          <div className="w-full lg:w-2/3 flex flex-col bg-surface rounded-2xl shadow-xl overflow-hidden border border-[var(--glass-border)]">
            {/* Embedded Google Map */}
            <div className="w-full h-[400px] bg-stone-200">
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

            {/* Location Details Panel */}
            <div className="p-8 md:p-12 bg-accent text-white relative">
              <div className="absolute top-0 right-12 transform -translate-y-1/2 flex items-center justify-center w-16 h-16 bg-accent-secondary rounded-full shadow-lg border-4 border-[#18395f]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-6">{activeLocation.city}</h3>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-secondary mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-[16px] text-blue-50 leading-relaxed max-w-md">{activeLocation.address}</p>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <p className="text-[16px] text-blue-50 font-medium">{activeLocation.phone}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-secondary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href={`mailto:${activeLocation.email}`} className="text-[16px] text-blue-50 font-medium hover:text-white transition-colors">{activeLocation.email}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
