import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/page-banner";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/terms-and-conditions",
  title: "Terms & Conditions",
  description: "Terms of use for accessing and using the Sabs Marks JVS & Co. website.",
});

export default function TermsAndConditionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <PageBanner
        title="Terms & Conditions"
        description="Terms of use for accessing and using this website."
      />

      <section className="site-section">
        <div className="site-container">
          <article className="site-prose mx-auto max-w-4xl rounded-[1.5rem] border border-[var(--glass-border)] bg-[color-mix(in_srgb,var(--surface-raised)_82%,transparent)] px-6 py-8 shadow-sm md:px-10 md:py-12">
            <h2 className="type-prose-heading">Terms & Conditions</h2>
            <p>
              We may revise these Terms of Use at any time in our sole discretion. Revised Terms of Use will be posted at the Terms of Use link or elsewhere in this Website. The revised Terms of Use will be effective when posted, unless we explicitly state otherwise. Your continued access to and use of this Website following any changes to these Terms of Use constitutes your agreement to the revisions. You are responsible for being aware of any revisions to our Terms of Use through checking this webpage.
            </p>

            <h2 className="type-prose-heading mt-10">About Sabs Marks JVS & Co.</h2>
            <p>
              “Sabs Marks JVS & Co.”, “us”, “our” and “we” as used on this Website refer to Sabs Marks JVS & Co., and its associated entities. The entities within the Sabs Marks JVS & Co., organisation are separate and independent. Each entity is liable only for its own acts and omissions and not for those of any other entity.
            </p>
            <p>
              By using this Website, you agree to be bound by these Terms of Use and your agreement will be deemed to be in writing and legally enforceable. If you do not agree to these Terms of Use, then you are not allowed to use this Website and should immediately stop using the Website.
            </p>

            <h2 className="type-prose-heading mt-10">Use of Content</h2>
            <p>
              This Website (including without limitation any content or other part thereof) contains general information only and by making this Website available, Sabs Marks JVS & Co., is not rendering professional advice or services. Before making any decision or taking action that might affect your finances or business, you should consult a qualified professional advisor.
            </p>
            <p>
              You are authorised to view, copy, print and distribute (but not modify) the content on this Website if (i) the content does not state that copying, printing or distribution is not permissible, (ii) your use is for informational, non-commercial purposes only, (iii) any copy of the content that you make includes the copyright notice or other attribution associated with the content and (iv) you comply with all of your obligations under these Terms of Use.
            </p>

            <h2 className="type-prose-heading mt-10">Restrictions</h2>
            <p>You are not authorised to copy or use any software, proprietary processes or technology embodied or described in this Website.</p>
            <p>You agree to comply with all applicable laws in accessing and using this Website.</p>

            <h2 className="type-prose-heading mt-10">Intellectual Property Rights</h2>
            <p>No use of Sabs Marks JVS & Co., names or logos is permitted.</p>
            <p>Unless otherwise indicated, the content on this Website is provided by us or another entity within the Sabs Marks JVS & Co.</p>
            <p>
              This Website and its contents are protected by copyright, trademark, and other applicable intellectual property laws. We and our licensors reserve all rights not expressly granted under these Terms of Use.
            </p>
            <p>
              References to other parties’ trademarks on this Website are for identification purposes only and do not indicate that such parties have approved this Website or any of its contents. These Terms of Use do not grant you any right to use the trademarks of other parties.
            </p>

            <h2 className="type-prose-heading mt-10">Privacy Statement</h2>
            <p>
              Please review the Privacy Statement for more information regarding the ways in which your personal information is collected in connection with your use of this Website, the purposes for which your personal information is used and how it is shared.
            </p>

            <h2 className="type-prose-heading mt-10">Termination</h2>
            <p>
              We may, in our sole discretion, suspend, restrict or terminate your use of this Website at any time, without notice to you, for any reason, including for violation of these Terms of Use. We will have no responsibility to notify any third party, including any third-party providers of services, merchandise or information, of any suspension, restriction or termination of your access to this Website.
            </p>

            <h2 className="type-prose-heading mt-10">Links</h2>
            <p>
              Certain links on this Website may lead to websites, resources or tools maintained by third parties over whom we have no control, including, without limitation, those maintained by other entities within the Sabs Marks JVS & Co., organisation or individual personnel of such entities. We do not bear any responsibility for the content, accuracy or security of any websites that are linked to this Website. Any links to any such websites, resources and tools should not be construed as an endorsement of them or their content by us.
            </p>

            <h2 className="type-prose-heading mt-10">Disclaimer and Limitations of Liability</h2>
            <p>
              This Website is provided as is and we make no express or implied representations or warranties regarding it. To the extent permitted by law, we expressly disclaim all implied warranties, including, without limitation, warranties of merchantability, title, fitness for a particular purpose, non-infringement, compatibility, security and accuracy.
            </p>
            <p>
              We will not be liable for any direct, indirect, special, incidental, consequential or punitive damages or any other damages whatsoever, whether in action of contract, statute, tort (including without limitation, negligence) or otherwise, relating to or arising out of the use of this Website, even if we knew or should have known, of the possibility of such damages.
            </p>
            <p>The above Disclaimer and Limitation of Liability apply not only to us but also to each other entity within the Sabs Marks JVS & Co., organisation and to our and their respective personnel.</p>
            <p>The above Disclaimer and Limitation of Liability apply to the fullest extent permitted by law, whether in contract, statute, tort (including, without limitation, negligence) or otherwise.</p>

            <h2 className="type-prose-heading mt-10">Additional Terms</h2>
            <p>
              If any portion of these Terms of Use is invalid or unenforceable in any jurisdiction, then (i) in that jurisdiction it will be re-construed to the maximum effect permitted by law in order to effect its intent as nearly as possible and the remainder of these Terms of Use will remain in full force and effect and (ii) in every other jurisdiction, all of these Terms of Use will remain in full force and effect.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
