"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-2">
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;

        return (
          <div
            key={faq.question}
            className={`rounded-2xl transition-all duration-300 bg-transparent`}
          >
            {/* Question Row */}
            <button
              type="button"
              id={`faq-question-${index}`}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              className={`flex items-center justify-between w-full text-left px-5 py-4 cursor-pointer rounded-full transition-all duration-300 ${
                isOpen ? "bg-[#1c1c1c] mb-5" : "bg-transparent"
              }`}
              onClick={() => setActiveIndex(isOpen ? null : index)}
            >
              <h3
                className={`text-lg sm:text-xl font-medium leading-snug transition-colors duration-200`}
              >
                {faq.question}
              </h3>

              {/* Chevron button */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-4 transition-colors duration-200 ${
                  isOpen ? "bg-[#2e2e2e]" : "bg-[#1e1e1e]"
                }`}
              >
                <svg
                  className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </button>

            {/* Answer */}
            <section
              id={`faq-answer-${index}`}
              aria-labelledby={`faq-question-${index}`}
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-[#999] text-sm leading-relaxed px-5 pb-5">
                {faq.answer}
              </p>
            </section>
          </div>
        );
      })}
    </div>
  );
}
