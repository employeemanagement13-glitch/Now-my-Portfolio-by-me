import { ExperienceItem } from "@/components/ui/ExperienceItem";

const experiences = [
  {
    title: "System Developer",
    company: "Freelancer - (Upwork-LinkedIn)",
    period: "Oct 2025 - Current",
    description:
      "Leading vibrant creative communities on Reddit, Upwork, and WhatsApp. Specialized in crafting scalable cloud-based systems, SaaS platforms, hardware-integrated solutions, and enterprise-grade applications. Build many masterpieces like AMS, EMS, ERP, POS, automated stores by overseeing full system architecture strategies, guiding cross-functional teams—all while diving deep into the high-impact development that delivers real, measurable business results and consistently meet your expectations.",
    iconColor: "bg-purple-500",
    glowColor: "rgba(168,85,247,0.35)",
    ringColor: "rgba(168,85,247,0.5)",
  },
  {
    title: "Developer Intern",
    company: "Largify Solutions",
    period: "Jun 2025 – Aug 2025",
    description:
      "As System Developer Lead at Largify Solutions, I collaborated with designers and cross-functional teams on Figma prototypes, rapid DevOps, and client-driven delivery of scalable, SEO-optimized SaaS products. This builds on my Systems Development Internship (pure coding, multi-role handling), where I crafted robust SaaS apps with a great team to meet client expectations.",
    iconColor: "bg-green-500",
    glowColor: "rgba(34,197,94,0.35)",
    ringColor: "rgba(34,197,94,0.5)",
  },
  {
    title: "Web Developer",
    company: "Freelancer (Fiverr)",
    period: "Jul 2023 – Feb 2025",
    description:
      "Designed and developed custom business applications for enterprise clients on Fiverr as a freelancer. Managed full end-to-end process—from in-depth user research and designing to delivering secure, production-ready systems that ensure optimal performance, scalability, and client satisfaction.",
    iconColor: "bg-blue-600",
    glowColor: "rgba(37,99,235,0.35)",
    ringColor: "rgba(37,99,235,0.5)",
  }
];

// Snowflake / asterisk SVG icon
export function AsteriskIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      className="w-7 h-7"
      aria-hidden="true"
    >
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    </svg>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="section relative py-24 overflow-hidden"
    >
      <div className="w-[92%] sm:w-[85%] md:w-[75%] lg:w-[70%] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-3">
            My Experience
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            A year-by-year look at the moments, lessons, and acheivements
            <br className="hidden sm:block" /> that shaped who I am as a
            developer.
          </p>
        </div>

        {/* Experience List */}
        <div className="w-fit">
          {experiences.map((exp, index) => (
            <ExperienceItem key={exp.title} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}