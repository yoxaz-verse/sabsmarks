import { PageBanner } from "@/components/layout/page-banner";
import { Building2, Factory } from "lucide-react";

export default function IndustryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageBanner title="Industry Solutions" />
      
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12 w-full">
        <div className="space-y-6 text-[15px] leading-8 text-[#555] mb-16">
          <p>
            Sabs Marks has been providing knowledge based solutions to its clients, which help clients better understand the fundamentals and complexity of various issues, thereby enabling them to take better strategic decisions.
          </p>
          <p>
            In view of our in-house research, close relationships and constant interactions with our clients from diverse industries, we have built a well-developed and fully updated knowledge center, which enables us to cater to demands from diverse industries for a wide range of services across major functional areas.
          </p>
          <p>
            Our solutions are based on our long-drawn research, experience and expertise in specific industries and business environments. Some select sectors/industries serviced by us include:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* BFSI Card */}
          <div className="bg-[#fdbb30] rounded-[32px] p-10 flex flex-col items-center text-center">
            <Building2 className="w-24 h-24 text-white mb-6" strokeWidth={1.5} />
            <h3 className="text-2xl font-bold text-white mb-4">BFSI</h3>
            <p className="text-white text-[15px] leading-relaxed">
              Banks | Mutual Funds | Insurance Companies | Housing Finance Companies | Non-Banking Financial Companies | Venture Capital Funds | Private Equity Funds | Pension Funds | Stock Brokers | Depository Participants
            </p>
          </div>

          {/* Manufacturing Card */}
          <div className="bg-[#18395f] rounded-[32px] p-10 flex flex-col items-center text-center">
            <Factory className="w-24 h-24 text-white mb-6" strokeWidth={1.5} />
            <h3 className="text-2xl font-bold text-white mb-4">Manufacturing</h3>
            <p className="text-white text-[15px] leading-relaxed">
              Chemicals | Packaging
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
