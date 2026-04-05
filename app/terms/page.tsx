import type { Metadata } from "next";
import {
  LegalPageLayout,
  LegalSection,
  LegalParagraph,
} from "@/components/ui/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service | Freelance Web & System Development | Shahzil Shahzad",
  description:
    "Read the terms and conditions for engaging Shahzil Shahzad for freelance web development, system architecture, and no-code solutions. Clear, transparent, and fair policies.",
  openGraph: {
    title: "Terms of Service | Shahzil Shahzad",
    description:
      "Read the terms and conditions for engaging Shahzil Shahzad for freelance web development, system architecture, and no-code solutions.",
    type: "website",
  },
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: [
      "By engaging Shahzil Shahzad for any freelance service — including web development, no-code development, system development, SaaS platform development, or any related consultation — you ('the Client') agree to be fully bound by these Terms of Service.",
      "If you do not agree with any part of these terms, you must not engage my services. These terms may be updated from time to time; continued engagement after changes constitutes acceptance of the revised terms.",
    ],
  },
  {
    id: "services",
    title: "2. Scope of Services",
    content: [
      "Services offered include but are not limited to: responsive web development, e-commerce website development, SaaS platform development, no-code application development (Webflow, Bubble.io, Softr, WordPress, Adalo), cloud-based system development, enterprise application development, and hardware-software integration.",
      "All project scopes, deliverables, timelines, and pricing will be defined in a written project agreement or contract before any work begins. Any additions or changes to agreed scope may require a revised quote and timeline.",
    ],
  },
  {
    id: "payment",
    title: "3. Payment Terms",
    content: [
      "Projects typically require a 50% upfront deposit before work commences, with the remaining balance due upon project completion and before final delivery of files or handover of access credentials. Exact payment terms will be outlined per project.",
      "Payments are non-refundable once work has been completed for the corresponding phase. Late payments (beyond 7 days of invoice due date) may be paused your work until outstanding invoices are settled.",
      "Pricing is quoted in USD unless otherwise agreed. Bank transfers, PayPal, or other mutually agreed payment methods are accepted.",
    ],
  },
  {
    id: "revisions",
    title: "4. Revisions & Changes",
    content: [
      "Each project includes a defined number of revision rounds as specified in the project agreement. Revisions are interpreted as refinements to the agreed scope — not new features or fundamental redesigns.",
      "Additional revision requests beyond the agreed number, or changes that constitute new scope, will be billed at my standard hourly or per-feature rate, which will be communicated before the work begins.",
    ],
  },
  {
    id: "ip",
    title: "5. Intellectual Property & Ownership",
    content: [
      "Upon full and final payment, the Client receives full ownership of the final deliverables, including source code, design assets, and project files specifically created for their project.",
      "I retain the right to showcase the completed work in my portfolio, case studies, and promotional materials unless the Client explicitly requests confidentiality in writing at the time of project initiation.",
      "Any third-party libraries, frameworks, or tools (e.g., Next.js, Tailwind CSS, Webflow, Bubble.io) remain subject to their respective open-source or proprietary licenses. The Client is responsible for maintaining valid licenses for any premium third-party tools required for their project.",
    ],
  },
  {
    id: "confidentiality",
    title: "6. Confidentiality",
    content: [
      "I treat all Client information including business plans, data, credentials, and internal processes as strictly confidential. I will not disclose any sensitive information to third parties without the Client's explicit written consent.",
      "Clients are equally expected to keep any proprietary development methodologies, internal processes, or pricing structures disclosed during the project relationship confidential.",
    ],
  },
  {
    id: "warranties",
    title: "7. Warranties & Liability",
    content: [
      "I warrant that all work will be completed professionally, to industry standards, and to the best of my ability within the agreed specifications. However, I cannot guarantee specific business outcomes (e.g., conversion rates, SEO rankings, or revenue growth) as these depend on factors beyond my control.",
      "My liability is limited to the total amount paid for the specific project in question. I am not liable for indirect, incidental, or consequential damages arising from the use or inability to use delivered work.",
      "I am not responsible for third-party service outages (e.g., hosting providers, payment gateways, no-code platform downtime) that affect the functioning of delivered projects.",
    ],
  },
  {
    id: "termination",
    title: "8. Termination",
    content: [
      "Either party may terminate the project with written notice. If the Client terminates mid-project, payment is owed for all work completed up to the termination date. The upfront deposit is non-refundable.",
      "I reserve the right to terminate an engagement if the Client's requests are illegal, unethical, or in breach of these terms. In such cases, compensation for completed work remains owed.",
    ],
  },
  {
    id: "governing",
    title: "9. Governing Law",
    content: [
      "These Terms of Service are governed by the laws applicable to freelance service agreements. Any disputes will first be attempted to be resolved through good-faith negotiation. If resolution cannot be reached within 30 days, the matter may be escalated through appropriate legal channels.",
    ],
  },
  {
    id: "contact",
    title: "10. Contact",
    content: [
      "For any questions about these Terms of Service, please reach out directly:",
      "officialshahzil@gmail.com\n (+92) 371 0720726",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      description="These terms govern all freelance engagements between you and Shahzil Shahzad. Please read them carefully before commissioning any project."
      lastUpdated="April 2026"
    >
      {sections.map((section, i) => (
        <LegalSection
          key={section.id}
          id={section.id}
          index={i + 1}
          title={section.title.replace(/^\d+\.\s/, "")}
        >
          {section.content.map((para, j) => (
            <LegalParagraph key={j}>{para}</LegalParagraph>
          ))}
        </LegalSection>
      ))}
    </LegalPageLayout>
  );
}
