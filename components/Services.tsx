import { ServiceAccordion } from "@/components/ui/ServiceAccordion";

const services = [
  {
    title: "Web Development",
    description:
      "Build clean, modern, and high-performing websites tailored to your brand that combine stunning visuals with seamless functionality — from initial sketches to fully responsive, production-ready prototypes that engage users and drive measurable business growth.",
    tags: [
      "Responsive Web Design",
      "E-Commerce Website Development",
      "SaaS Development",
    ],
    iconColor: "bg-[#8B5CF6]",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-globe-lock-icon lucide-globe-lock"
      >
        <path d="M15.686 15A14.5 14.5 0 0 1 12 22a14.5 14.5 0 0 1 0-20 10 10 0 1 0 9.542 13" />
        <path d="M2 12h8.5" />
        <path d="M20 6V4a2 2 0 1 0-4 0v2" />
        <rect width="8" height="5" x="14" y="6" rx="1" />
      </svg>
    ),
  },
  {
    title: "No-Code Development",
    description:
      "Transform your vision into fully functional websites and applications without writing a single line of code. Using leading no-code platforms like Webflow, Bubble, Softr, Adalo and Wordpress, I deliver fast, scalable, and cost-effective solutions perfectly aligned with your business goals.",
    tags: [
      "Webflow Development",
      "Bubble.io Development",
      "Softr No-Code Apps",
      "Wordpress",
    ],
    iconColor: "bg-[#3B82F6]",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    title: "System Development",
    description:
      "I develop comprehensive cloud-based systems, hardware-integrated solutions, SaaS platforms, and enterprise-grade applications tailored to your exact business needs. From scalable architectures to seamless hardware-software integration, I create secure, high-performance digital systems that automate workflows and deliver consistent, intuitive user experiences that drive long-term business growth while ensuring accessibility across all devices and compatible platforms.",
    tags: [
      "Cloud-Based System Development",
      "SaaS Platform Development",
      "Enterprise Application Development",
      "Hardware-Software Integration",
    ],
    iconColor: "bg-[#10B981]",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-monitor-cog-icon lucide-monitor-cog"
      >
        <path d="M12 17v4" />
        <path d="m14.305 7.53.923-.382" />
        <path d="m15.228 4.852-.923-.383" />
        <path d="m16.852 3.228-.383-.924" />
        <path d="m16.852 8.772-.383.923" />
        <path d="m19.148 3.228.383-.924" />
        <path d="m19.53 9.696-.382-.924" />
        <path d="m20.772 4.852.924-.383" />
        <path d="m20.772 7.148.924.383" />
        <path d="M22 13v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
        <path d="M8 21h8" />
        <circle cx="18" cy="6" r="3" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full py-20 px-6 overflow-hidden"
    >
      {/* Bottom-right red glow */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 w-120 h-120 rounded-full opacity-[0.13] blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, #c8102e 0%, #7a0018 50%, transparent 80%)",
          transform: "translateY(0%)",
        }}
      />

      {/* Bottom-left subtle glow */}
      <div
        className="pointer-events-none absolute -left-20 bottom-10 w-[360px] h-[360px] rounded-full opacity-[0.07] blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(160,9,42,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight mb-3">
            My Services
          </h2>
          <p className="text-[#888] text-sm md:text-base leading-relaxed">
            Here&apos;s how I can help turn your ideas into <br /> something
            real—and really good.
          </p>
        </div>

        {/* Accordion List */}
        <ServiceAccordion services={services} />
      </div>
    </section>
  );
}