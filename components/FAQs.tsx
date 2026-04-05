import { FAQAccordion } from "@/components/ui/FAQAccordion";

const faqs = [
  {
    question: "How long does a typical web or no-code app take?",
    answer:
      "With more than three years of hands-on experience as a System and Web Developer, most projects take between 4 to 8 weeks from initial consultation to final delivery. Timelines depend on the scope, complexity, and how quickly we receive your feedback and content. During our first call, I’ll provide a clear, realistic schedule tailored to your goals so you know exactly what to expect.",
  },
  {
    question: "What tools and platforms do you use for development?",
    answer:
      "I work with industry-standard tools that deliver the best results for each project. For web and system development I use stacks like MERN, MEAN, PERN and when needed then Vanilla JS, for no-code development I specialize in Webflow, Bubble, Softr, Wordpress and Adalo; and for UI I still prioritize Figma. I always choose the right combination that balances speed, scalability, and your long-term maintenance needs.",
  },
  {
    question: "How many revisions are included, and what if I need more changes?",
    answer:
      "Every package includes up to three rounds of revisions at each major stage so you can feel completely confident in the direction. If you need additional changes after that, we can easily accommodate them at a fair, agreed-upon rate. My goal is to make sure the final result perfectly matches your vision without any surprises.",
  },
  {
    question:
      "I’m not technical at all — will I need to code or manage anything myself?",
    answer:
      "Not at all. That’s the beauty of the no-code and system-focused approach I use. I handle every technical aspect — from building the site or application to making it responsive, secure, and fast. After launch, I’ll show you exactly how to update content yourself if you’d like, or I can continue managing updates for you through a simple maintenance plan.",
  },
  {
    question:
      "What happens after the project is delivered? Does ongoing support offer?",
    answer:
      "Yes delivery is just the beginning. I provide full documentation, training, and a 30-day post-launch support period at no extra cost to ensure everything runs smoothly. For clients who want peace of mind, I offer flexible monthly maintenance packages that include updates, security monitoring, performance optimization, and new feature additions as your business grows.",
  },
  {
    question: "How do you make sure the final product is secure and performs well?",
    answer:
      "Security and performance are non-negotiable in every project I deliver. I implement HTTPS, secure authentication, regular backups, and follow best practices for speed optimization. With over three years of experience building apps for real clients, I test thoroughly across devices and browsers so your digital product is fast, reliable, and protected from day one.",
  },
];

// FAQPage Schema — enables Google rich result expansion in search results
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQ() {
  return (
    <section id="faq" className="relative w-full py-20 px-6 overflow-hidden">
      {/* FAQPage JSON-LD for Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight mb-4">
            FAQs
          </h2>
          <p className="text-[#888] text-sm md:text-base leading-relaxed">
            A few common questions,
            <br />
            answered simply.
          </p>
        </div>

        {/* FAQ Items */}
        <FAQAccordion faqs={faqs} />
      </div>
    </section>
  );
}