import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/page-banner";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/privacy-policy",
  title: "Privacy Policy",
  description: "Privacy policy for how Sabs Marks JVS & Co. collects, uses, shares, and protects personal information.",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <PageBanner
        title="Privacy Policy"
        description="How we collect, use, protect, and share personal information."
      />

      <section className="site-section">
        <div className="site-container">
          <article className="site-prose mx-auto max-w-4xl rounded-[1.5rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_82%,transparent)] px-6 py-8 shadow-sm md:px-10 md:py-12">
            <h2 className="type-prose-heading">Privacy Policy</h2>
            <p>
              Sabs Marks JVS & Co., is dedicated to protecting the confidentiality and privacy of information entrusted to it. As part of this obligation, we are committed to the appropriate protection and use of personal information collected through our website, professional services, communications, events, recruitment, and related activities.
            </p>
            <p>
              This privacy policy explains what personal information we collect, why we need it, how we process and protect it, and the rights available to individuals whose personal information we process.
            </p>

            <h2 className="type-prose-heading mt-10">Why We Need Personal Data</h2>
            <p>
              We process personal data to provide professional advice and deliverables to clients, manage client engagements, promote our professional services, send invitations to events and webinars, personalize relevant communications, administer and secure our systems and websites, authenticate registered users, respond to online requests, manage recruitment, and comply with legal, statutory, regulatory, anti-money laundering, fraud prevention, and professional obligations.
            </p>
            <p>
              We may also process health, safety, incident, and workplace data where necessary to provide a safe environment for employees, clients, visitors, and suppliers.
            </p>

            <h2 className="type-prose-heading mt-10">How We Collect Personal Data</h2>
            <p>
              We may collect personal data directly from individuals when they provide business cards, complete online forms, register for events or webinars, subscribe to newsletters, use our website, apply for roles, or communicate with us.
            </p>
            <p>
              We may also obtain personal data indirectly from clients, recruitment agencies, former employers, credit reference agencies, third-party vendors, public sources, sanctions list, crime prevention agencies, internet searches, and social or professional networking platforms where individuals interact with us through those services.
            </p>

            <h2 className="type-prose-heading mt-10">Categories of Personal Data We Collect</h2>
            <p>
              The personal data we process may include contact details, professional details, identification documents, recruitment information, CCTV images at our sites, adverse information relevant to client or third-party checks, personal information provided during professional engagements, diversity and equal opportunity information voluntarily shared by applicants, and health data where necessary for safety or public-health purposes.
            </p>

            <h2 className="type-prose-heading mt-10">AI and Data Processing</h2>
            <p>
              We may use artificial intelligence tools to enhance our services, generate recommendations based on historical data, support service delivery, personalize experiences, improve offerings, and develop or leverage tools that improve the efficiency of our systems, processes, and deliverables.
            </p>
            <p>
              Where AI tools are used, we apply reasonable safeguards to protect confidentiality, limit access to personal data, and review outputs where they may materially affect service delivery or an individual.
            </p>

            <h2 className="type-prose-heading mt-10">Legal Grounds for Processing</h2>
            <p>
              We process personal data where necessary for contractual and legal obligations, to protect vital interests, to perform a task carried out in the public interest, for legitimate business requirements that do not override individual interests, or where consent has been provided for specified purposes.
            </p>

            <h2 className="type-prose-heading mt-10">Sharing Personal Data with Third Parties</h2>
            <p>
              We may share personal data with trusted third parties who help us deliver efficient and quality services. These may include Sabs Marks JVS & Co., and its associated entities professional advisers, IT and cloud service providers, archiving and document support providers, payment, marketing, recruitment, anti-money laundering, client-conflict and independence-check providers, law enforcement authorities, government or regulatory agencies, health authorities, and other parties where required by applicable law or regulation.
            </p>
            <p>
              We do not transfer the personal information provided to us to third parties for their own direct marketing use.
            </p>

            <h2 className="type-prose-heading mt-10">Your Data Protection Rights</h2>
            <p>
              Depending on applicable law, you may have rights to access information about your personal data, request correction, completion, or updation, withdraw consent, request grievance redressal, request erasure where applicable, nominate another individual to exercise rights in the event of death or incapacity, and approach the relevant data protection authority if you are not satisfied with our response.
            </p>
            <p>
              For privacy questions, requests, consent withdrawal, correction, erasure, or grievance redressal, please contact us at info@sabsmarksjvs.com. We may need to verify your identity before acting on a request and may refuse or limit a request where permitted by applicable law.
            </p>

            <h2 className="type-prose-heading mt-10">Cookies</h2>
            <p>
              Cookies may be placed on your computer or internet-enabled device whenever you visit us online. Cookies help the site remember your browser or device and may support performance, security, site preferences, analytics, feedback tools, and social sharing functionality.
            </p>
            <p>
              Where required, a notification banner may request your consent for non-essential cookies. You can also manage or delete cookies through your browser settings, but some website features may not function fully if cookies are disabled.
            </p>

            <h2 className="type-prose-heading mt-10">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or services. The updated version will be effective when published or otherwise communicated, unless a different effective date is stated.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
