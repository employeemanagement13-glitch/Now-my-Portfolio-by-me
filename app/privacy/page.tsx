import type { Metadata } from "next";
import {
  LegalPageLayout,
  LegalSection,
  LegalParagraph,
  LegalList,
} from "@/components/ui/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Shahzil Shahzad - Full Stack Developer",
  description:
    "Review the privacy policy of Shahzil Shahzad. Learn how your data is collected, used, and protected during our freelance web & system development engagements.",
  keywords: [
    "Privacy Policy",
    "Data Protection",
    "Shahzil Shahzad",
    "Freelance Developer Privacy",
    "Client Data Security",
  ],
  openGraph: {
    title: "Privacy Policy | Shahzil Shahzad",
    description:
      "Learn how your data is collected, used, and protected during our freelance web & system development engagements.",
    type: "website",
  },
};

const sections = [
  {
    id: "overview",
    title: "Overview",
    content: [
      "This Privacy Policy describes how I collects, uses, and protects information obtained from visitors to this portfolio (shahzilshahzad.com) and from Clients who engage my freelance services.",
      "I am committed to ensuring your privacy is protected. I handle personal data with care and do not sell, trade, or rent your personal information to any third party.",
    ],
  },
  {
    id: "collect",
    title: "Information I Collect",
    subsections: [
      {
        heading: "Information You Provide",
        items: [
          "Contact form submissions: your name, email address, and message content.",
          "Project enquiries: business context, project requirements, and any files or documents you share.",
          "Testimonials: if you voluntarily provide a review or testimonial, your name and review content are stored.",
          "Email correspondence: messages exchanged for project communication.",
        ],
      },
      {
        heading: "Information Collected Automatically",
        items: [
          "Basic usage data collected via analytics (e.g., pages visited, session duration, device type) to understand how visitors use the site.",
          "IP address and browser type — used solely for security monitoring and aggregate analytics.",
          "Cookies and local storage for site functionality (e.g., theme preferences, session state). No advertising cookies are used.",
        ],
      },
    ],
  },
  {
    id: "use",
    title: "How I Use Your Information",
    content: [
      "To respond to enquiries, provide quotes, and deliver agreed freelance services.",
      "To send project updates, invoices, and delivery notifications relevant to your project.",
      "To improve the performance and user experience of this website using aggregated, anonymised analytics data.",
      "To comply with legal obligations if required by applicable law.",
      "I do not use your information for unsolicited marketing. If you receive a follow-up email, it will be directly relevant to a project enquiry you initiated.",
    ],
  },
  {
    id: "storage",
    title: "Data Storage & Security",
    content: [
      "Project-related communications and files are stored securely using industry-standard cloud services (e.g., Google Workspace). These services maintain their own robust security and compliance standards.",
      "Access to client data is restricted to me only. I do not share access to client files or communications with any unauthorised third party.",
      "While I take all reasonable precautions to protect your data, no method of electronic storage or transmission over the internet is 100% secure. I cannot guarantee absolute security.",
      "Data retained during an active project includes correspondence, project files, and invoices. After project completion, data may be retained for up to 2 years for record-keeping purposes, after which it is securely deleted unless you request earlier deletion.",
    ],
  },
  {
    id: "third-party",
    title: "Third-Party Services",
    content: [
      "This website and my service delivery may involve third-party tools and platforms, each with their own privacy policies. These include but may not be limited to:",
    ],
    list: [
      { label: "SendGrid / Resend / Email Service", desc: "For sending confirmation emails and project notifications." },
      { label: "Google Analytics", desc: "Anonymised website analytics. Data is aggregated and not personally identifiable." },
      { label: "Google Workspace", desc: "Used for meetings, project development and minimally demos sharing." },
      { label: "Webflow / Bubble.io / no-code platforms", desc: "Used for client project delivery; governed by their respective privacy policies." },
    ],
    postContent:
      "I encourage you to review the privacy policies of these third-party services as I am not responsible for their data practices.",
  },
  {
    id: "rights",
    title: "Your Rights",
    content: [
      "You have the following rights regarding your personal data:",
    ],
    list: [
      { label: "Access", desc: "Request a copy of the personal data I hold about you." },
      { label: "Correction", desc: "Ask me to correct inaccurate or incomplete data." },
      { label: "Deletion", desc: "Request that I delete your personal data, subject to legal retention requirements." },
      { label: "Portability", desc: "Request your data in a portable, machine-readable format." },
    ],
    postContent:
      "To exercise any of these rights, contact me at officialshahzil@gmail.com. I will respond within 30 days.",
  },
  {
    id: "cookies",
    title: "Cookies",
    content: [
      "This site uses minimal, essential cookies to support site functionality. These are not used for advertising or cross-site tracking.",
      "You can manage or disable cookies through your browser settings. Disabling cookies may affect certain site functionality (e.g., form submissions or session state).",
      "No third-party advertising networks or tracking pixels are installed on this site.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: [
      "This Privacy Policy may be updated periodically to reflect changes in my services or applicable law. The 'Last Updated' date at the top of this page will reflect the most recent revision.",
      "Continued use of this website or my services after a policy update constitutes acceptance of the revised policy.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    content: [
      "For any privacy-related questions, data requests, or concerns, please contact me directly:",
      "officialshahzil@gmail.com\n (+92) 371 0720726",
    ],
  },
];

export default function PrivacyPage() {
  const quickSummary = (
    <div className="rounded-2xl bg-black border border-[#252525] p-6 mb-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: "🔒",
            label: "Your data is never sold",
            desc: "No third-party advertising or data brokering.",
          },
          {
            icon: "📬",
            label: "Minimal collection",
            desc: "Only what's needed to respond and deliver services.",
          },
          {
            icon: "🛡️",
            label: "Secure storage",
            desc: "Industry-standard cloud security practices.",
          },
        ].map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <div>
              <p className="text-red-500 text-sm font-medium">{item.label}</p>
              <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <LegalPageLayout
      title="Privacy Policy"
      description="Your privacy matters. This policy explains what data is collected, why it's collected, and how it's protected when you visit this site or work with me."
      lastUpdated="April 2026"
      quickSummary={quickSummary}
    >
      {sections.map((section, i) => (
        <LegalSection key={section.id} id={section.id} index={i + 1} title={section.title}>
          {section.content?.map((para, j) => (
            <LegalParagraph key={j}>{para}</LegalParagraph>
          ))}

          {section.subsections?.map((sub) => (
            <div key={sub.heading} className="mt-2">
              <p className="text-gray-300 text-sm font-medium mb-2">{sub.heading}</p>
              <LegalList items={sub.items} bulletColor="bg-red-500/70" />
            </div>
          ))}

          {section.list && <LegalList items={section.list} bulletColor="bg-primary/70" />}

          {section.postContent && <LegalParagraph>{section.postContent}</LegalParagraph>}
        </LegalSection>
      ))}
    </LegalPageLayout>
  );
}
