import type { Metadata } from "next";
import {
  LegalPageLayout,
  LegalSection,
  LegalParagraph,
  LegalList,
} from "@/components/ui/LegalPageLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Client Guidelines & Collaboration | Shahzil Shahzad",
  description:
    "A comprehensive guide for clients working with Shahzil Shahzad. Learn about project kick-offs, communication, feedback cycles, and ensuring project success.",
  openGraph: {
    title: "Client Guidelines & Collaboration | Shahzil Shahzad",
    description:
      "Discover how to effectively collaborate with Shahzil Shahzad on your next web or system development project.",
    type: "website",
  },
};

const guidelines = [
  {
    id: "kickoff",
    title: "Project Kick-Off",
    summary: "Setting the right foundation before a single line of code is written.",
    items: [
      "Share a clear brief outlining your goals, target audience, competitors, and any design references or brand assets.",
      "Define your must-have features vs. nice-to-have features upfront — this keeps the scope clean and your budget in control.",
      "Agree on a realistic timeline together. Rushed timelines affect quality; transparent planning benefits everyone.",
      "Provide all required content (text, images, logos, copy) on time. Content delays are one of the most common causes of project delays.",
    ],
  },
  {
    id: "communication",
    title: "Communication",
    summary: "Clear, timely communication leads to better outcomes — for both of us.",
    items: [
      "Primary communication happens via email (officialshahzil@gmail.com) or the agreed platform (WhatsApp, Slack, etc.).",
      "I aim to respond to all messages within 24 hours on business days. Please extend the same courtesy.",
      "Consolidate your feedback into single, clear messages rather than multiple fragmented messages — this keeps iterations efficient.",
    ],
  },
  {
    id: "approvals",
    title: "Approvals & Sign-Off",
    summary: "Moving forward confidently at each stage of the project.",
    items: [
      "Each major milestone (wireframes, design mockups, development staging) requires your written approval before proceeding to the next phase.",
      "Approved stages that are later reverted incur additional charges as the work must be redone.",
      "Final delivery includes a handover session where I walk you through the project, platform credentials, and documentation.",
      "A 7-day post-launch support window is included for bug fixes related to the delivered scope — not new features.",
    ],
  },
  {
    id: "assets",
    title: "Providing Assets",
    summary: "The quality of assets you provide directly affects the quality of the outcome.",
    items: [
      "Provide logos in SVG or high-resolution PNG format (at least 2x). Low-quality assets result in blurry visuals.",
      "Share brand guidelines (colour codes, typography, tone of voice) early in the project.",
      "Images should be high-resolution and properly licensed. I can source stock imagery if needed — just let me know.",
      "Written copy must be final before development starts. Copy changes after development can require layout restructuring.",
    ],
  },
  {
    id: "scope",
    title: "Scope Changes",
    summary: "New ideas are welcome — just understand how they're handled.",
    items: [
      "Any feature or requirement not in the original project agreement is considered out of scope and will be quoted separately.",
      "Small changes (e.g., tweaking a colour, adjusting text) are typically absorbed within revision rounds.",
      "Significant scope additions (new pages, integrations, additional features) are treated as mini-projects with their own quote and timeline.",
      "Scope creep is one of the leading causes of overrun budgets and delayed launches. Let's keep it in check together.",
    ],
  },
];

export default function GuidelinesPage() {
  const quickSummary = (
    <div className="rounded-2xl bg-black border border-[#252525] p-6 mb-10 flex items-start gap-4">
      <p className="text-gray-400 text-sm leading-relaxed">
        I've worked on <strong className="text-white">20+ projects</strong> over
        3+ years and these guidelines reflect what I've learned makes
        collaborations succeed. They're not bureaucratic rules — they're practical
        principles that protect your budget, timeline, and the quality of the
        final product.
      </p>
    </div>
  );

  const cta = (
    <div className="mt-14 rounded-2xl bg-black border border-[#252525] p-8 text-center">
      <h3 className="text-white font-semibold text-lg mb-2">
        Ready to Start Your Project?
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        Let's have a quick discovery call or exchange. The more detail you
        share upfront, the better I can serve you.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href="mailto:officialshahzil@gmail.com"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black border border-black/30 text-red-500 text-sm font-medium hover:bg-red-500/20 transition-colors duration-150"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Send an Email
        </a>
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Use Contact Form
        </Link>
      </div>
    </div>
  );

  return (
    <LegalPageLayout
      title="Client Guidelines"
      description="Getting the most out of our collaboration starts with clear expectations. Here's how I work — and how you can help make every project a success."
      lastUpdated="April 2026"
      quickSummary={quickSummary}
      cta={cta}
    >
      {guidelines.map((guide, i) => (
        <LegalSection key={guide.id} id={guide.id} index={i + 1} title={guide.title}>
          {guide.summary && (
            <LegalParagraph>
              <strong className="text-gray-300 font-medium">Summary:</strong>{" "}
              {guide.summary}
            </LegalParagraph>
          )}

          <LegalList items={guide.items} bulletColor="bg-primary/70" />
        </LegalSection>
      ))}
    </LegalPageLayout>
  );
}
