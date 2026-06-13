import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms of Use — AfyaTrust",
  description:
    "AfyaTrust Tanzania Privacy Policy and Terms of Use. How we collect, use and protect member data, and the terms governing AfyaTrust membership.",
  alternates: { canonical: "/legal" },
  openGraph: {
    title: "Privacy Policy & Terms of Use — AfyaTrust",
    description:
      "AfyaTrust Tanzania Privacy Policy and Terms of Use. How we collect, use and protect member data, and the terms governing AfyaTrust membership.",
    url: "/legal",
  },
};

// Legal copy is published verbatim as provided by AfyaTrust and is therefore
// not run through the i18n layer — do not edit the wording here.

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h3 className="font-display text-[19px] font-700 text-charcoal">{title}</h3>
      <div className="mt-3 space-y-4 text-[15.5px] leading-relaxed text-charcoal-muted">
        {children}
      </div>
    </section>
  );
}

function List({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-teal">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

const B = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-600 text-charcoal">{children}</strong>
);

export default function LegalPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy & Terms of Use", path: "/legal" },
        ])}
      />
      <Navbar />
      <main className="bg-white">
        <div className="container-page max-w-3xl pb-24 pt-36 sm:pt-44">
          <h1 className="font-display text-[clamp(32px,5vw,52px)] font-700 leading-tight tracking-tight text-charcoal">
            Privacy Policy &amp; Terms of Use
          </h1>
          <p className="mt-4 text-[15px] text-charcoal-muted">
            <B>Effective Date:</B> June 2026 · <B>Organization:</B> AfyaTrust Tanzania
          </p>

          {/* ——— PART 1 ——— */}
          <h2
            id="privacy"
            className="mt-14 scroll-mt-28 border-b border-line pb-4 font-display text-[26px] font-700 tracking-tight text-charcoal sm:text-[30px]"
          >
            Part 1: Privacy Policy
          </h2>

          <Section title="1. Who We Are">
            <p>
              AfyaTrust is a membership-based health access platform connecting informal workers
              in Tanzania to contracted healthcare providers. We are committed to protecting the
              privacy and personal data of every member, visitor, and partner we work with.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect the following information when you register or interact with AfyaTrust:</p>
            <List
              items={[
                <>
                  <B>Personal identification:</B> Full name, date of birth, gender, national ID or
                  voter registration number
                </>,
                <>
                  <B>Contact information:</B> Phone number, physical address, ward/mtaa
                </>,
                <>
                  <B>Health information:</B> Basic health profile collected at enrollment for
                  service matching purposes
                </>,
                <>
                  <B>Financial information:</B> Mobile money number and payment records
                </>,
                <>
                  <B>Usage data:</B> Service utilization records at contracted clinics
                </>,
              ]}
            />
            <p>
              We do not collect information we do not need. We will always tell you why we are
              collecting specific information before we collect it.
            </p>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>Your information is used exclusively to:</p>
            <List
              items={[
                "Process and manage your AfyaTrust membership",
                "Facilitate access to contracted healthcare providers",
                "Process membership fee payments via mobile money",
                "Communicate with you about your membership, services, and updates",
                "Improve our services and platform based on usage patterns",
                "Meet legal and regulatory obligations in Tanzania",
              ]}
            />
            <p>
              We do not use your information for advertising, profiling, or any purpose unrelated
              to your health access and membership management.
            </p>
          </Section>

          <Section title="4. Who We Share Your Information With">
            <p>We share your information only where necessary:</p>
            <List
              items={[
                <>
                  <B>Contracted healthcare providers</B> — to verify your membership and
                  facilitate service delivery
                </>,
                <>
                  <B>Mobile money partners</B> — to process membership fee payments
                </>,
                <>
                  <B>Regulatory authorities</B> — where required by Tanzanian law
                </>,
                <>
                  <B>Research partners</B> — only in anonymized, aggregated form, never
                  individually identifiable
                </>,
              ]}
            />
            <p>
              We do not sell, rent, or trade your personal information to any third party under
              any circumstances.
            </p>
          </Section>

          <Section title="5. How We Protect Your Information">
            <p>AfyaTrust takes data security seriously. We protect your information through:</p>
            <List
              items={[
                "Secure encrypted storage of all personal and health data",
                "Restricted access — only authorized AfyaTrust staff can access member data",
                "Regular security reviews of our systems and processes",
                "Strict confidentiality agreements with all staff and partners",
              ]}
            />
          </Section>

          <Section title="6. Your Rights">
            <p>As an AfyaTrust member or user, you have the right to:</p>
            <List
              items={[
                <>
                  <B>Access</B> your personal information held by AfyaTrust at any time
                </>,
                <>
                  <B>Correct</B> any inaccurate or incomplete information
                </>,
                <>
                  <B>Request deletion</B> of your data when you leave AfyaTrust
                </>,
                <>
                  <B>Withdraw consent</B> for any specific use of your data
                </>,
                <>
                  <B>Raise concerns</B> about how your data is being handled
                </>,
              ]}
            />
            <p>
              To exercise any of these rights, contact us at the details provided at the end of
              this document.
            </p>
          </Section>

          <Section title="7. Health Data">
            <p>
              We treat health information with the highest level of care and confidentiality. Your
              health data is:
            </p>
            <List
              items={[
                "Never shared with employers, family members, or community members without your explicit consent",
                "Only accessible to contracted healthcare providers directly involved in your care",
                "Never used for insurance underwriting, risk profiling, or denial of services",
              ]}
            />
          </Section>

          <Section title="8. Children's Privacy">
            <p>
              AfyaTrust does not knowingly collect personal data from individuals under the age of
              18 without the explicit consent of a parent or guardian. Where a membership covers
              dependent children, the enrolling adult is responsible for consenting on their
              behalf.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify all active
              members of any significant changes via SMS or direct communication before changes
              take effect. Continued use of AfyaTrust services after notification constitutes
              acceptance of the updated policy.
            </p>
          </Section>

          {/* ——— PART 2 ——— */}
          <h2
            id="terms"
            className="mt-16 scroll-mt-28 border-b border-line pb-4 font-display text-[26px] font-700 tracking-tight text-charcoal sm:text-[30px]"
          >
            Part 2: Terms of Use
          </h2>

          <Section title="1. Acceptance of Terms">
            <p>
              By enrolling as an AfyaTrust member or using our platform, website, or services, you
              agree to these Terms of Use. If you do not agree, please do not use our services.
            </p>
          </Section>

          <Section title="2. Membership Eligibility">
            <p>AfyaTrust membership is open to:</p>
            <List
              items={[
                "Informal workers aged 18 and above residing in Tanzania",
                "Dependents of enrolled members where family membership is selected",
                "Any individual who meets enrollment requirements as defined by AfyaTrust from time to time",
              ]}
            />
          </Section>

          <Section title="3. Membership Fees and Payment">
            <List
              items={[
                "Membership fees are payable in advance on the schedule selected at enrollment (daily, weekly, or as otherwise agreed)",
                "Payments are processed via mobile money",
                "AfyaTrust reserves the right to suspend access to services where membership fees are not paid",
                "Fee structures may be revised with a minimum of 30 days notice to active members",
              ]}
            />
          </Section>

          <Section title="4. Services Covered">
            <p>AfyaTrust membership provides access to:</p>
            <List
              items={[
                "Predefined outpatient services at contracted clinics",
                "Services at negotiated prices within agreed usage limits",
                "The specific services covered are outlined in your membership agreement and may vary by membership tier",
              ]}
            />
            <p>
              AfyaTrust membership does <B>not</B> cover:
            </p>
            <List
              items={[
                "Inpatient or hospital admission costs",
                "Emergency ambulance services",
                "Specialist referrals outside the contracted network",
                "Services exceeding defined usage caps",
                "Pre-existing conditions unless otherwise stated in your membership agreement",
              ]}
            />
          </Section>

          <Section title="5. Using AfyaTrust Services">
            <p>As a member, you agree to:</p>
            <List
              items={[
                "Present your AfyaTrust membership card or verification at the point of care",
                "Use services honestly and within the limits of your membership",
                "Not share or transfer your membership to another person",
                "Notify AfyaTrust of any changes to your contact or personal information",
              ]}
            />
          </Section>

          <Section title="6. Fair Use">
            <p>
              AfyaTrust operates on a capped usage model to ensure sustainability and fairness
              across our membership. Members who are found to be abusing the system — including
              fraudulent use, misrepresentation, or exceeding agreed limits through dishonest
              means — may have their membership suspended or terminated without refund.
            </p>
          </Section>

          <Section title="7. Provider Network">
            <p>
              AfyaTrust works with a contracted network of healthcare providers. We make every
              effort to maintain a reliable, quality network but do not guarantee the availability
              of specific providers at all times. In the event that a contracted provider is
              temporarily unavailable, AfyaTrust will communicate alternatives to affected members
              as quickly as possible.
            </p>
            <p>
              AfyaTrust is not liable for the clinical decisions, quality of care, or outcomes
              delivered by contracted healthcare providers. Clinical responsibility rests with the
              provider.
            </p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              AfyaTrust&apos;s liability to any member is limited to the value of membership fees
              paid in the relevant period. We are not liable for:
            </p>
            <List
              items={[
                "Clinical outcomes or medical decisions made by contracted providers",
                "Losses arising from service unavailability due to circumstances beyond our control",
                "Indirect or consequential losses of any kind",
              ]}
            />
          </Section>

          <Section title="9. Termination of Membership">
            <p>
              Members may terminate their AfyaTrust membership at any time by notifying us
              directly. AfyaTrust may terminate a membership where:
            </p>
            <List
              items={[
                "Membership fees remain unpaid for an extended period",
                "A member is found to have misused or fraudulently used services",
                "Circumstances arise that make continued membership provision impossible",
              ]}
            />
          </Section>

          <Section title="10. Dispute Resolution">
            <p>
              AfyaTrust is committed to resolving any member concerns fairly and quickly. If you
              have a complaint or dispute:
            </p>
            <ol className="list-decimal space-y-2 pl-5 marker:text-teal">
              <li>Contact our member support team directly</li>
              <li>If unresolved, escalate to AfyaTrust management</li>
              <li>If still unresolved, disputes will be referred to mediation under Tanzanian law</li>
            </ol>
            <p>
              We do not want any member to feel unheard. We will always try to resolve concerns
              before they become formal disputes.
            </p>
          </Section>

          <Section title="11. Governing Law">
            <p>
              These Terms of Use are governed by the laws of the United Republic of Tanzania. Any
              legal proceedings arising from these terms shall be conducted in Tanzanian courts.
            </p>
          </Section>

          <Section title="12. Updates to These Terms">
            <p>
              AfyaTrust may update these Terms of Use from time to time. Members will be notified
              of significant changes with a minimum of 30 days notice before changes take effect.
            </p>
          </Section>

          {/* ——— Contact ——— */}
          <h2 className="mt-16 scroll-mt-28 border-b border-line pb-4 font-display text-[26px] font-700 tracking-tight text-charcoal sm:text-[30px]">
            Contact Us
          </h2>
          <div className="mt-6 space-y-4 text-[15.5px] leading-relaxed text-charcoal-muted">
            <p>
              For any questions, concerns, or requests related to your privacy or these terms,
              please contact AfyaTrust directly:
            </p>
            <p>
              <B>AfyaTrust Tanzania</B> · Dar es Salaam, Tanzania
              <br />
              📧{" "}
              <a href="mailto:support@afyatrust.com" className="font-600 text-teal hover:text-teal-deep">
                support@afyatrust.com
              </a>
              <br />
              📞{" "}
              <a href="tel:+255687331494" className="font-600 text-teal hover:text-teal-deep">
                +255687331494
              </a>
              <br />
              🌐{" "}
              <a href="https://afyatrust.com" className="font-600 text-teal hover:text-teal-deep">
                www.afyatrust.com
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
