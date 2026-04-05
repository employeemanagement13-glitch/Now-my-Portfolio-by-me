"use client";

import { useState } from "react";
import React from "react";

interface ServiceItem {
  title: string;
  description: string;
  tags: string[];
  iconColor: string;
  icon: React.ReactNode;
}

export function ServiceAccordion({ services }: { services: ServiceItem[] }) {
  const [expandedService, setExpandedService] = useState<number | null>(0);

  return (
    <div className="flex flex-col">
      {services.map((service, index) => (
        <div key={service.title} className="border-b border-[#1e1e1e]">
          {/* Row header */}
          <button
            type="button"
            className="w-full flex items-center justify-between py-5 px-1 cursor-pointer text-left border-none bg-transparent outline-none ring-offset-0 focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg transition-all focus:outline-none"
            onClick={() =>
              setExpandedService(expandedService === index ? null : index)
            }
            aria-expanded={expandedService === index}
            aria-controls={`service-content-${index}`}
          >
            <div className="flex items-center gap-5">
              <div
                className={`w-11 h-11 rounded-full ${service.iconColor} flex items-center justify-center shrink-0`}
              >
                {service.icon}
              </div>
              <h3
                id={`service-header-${index}`}
                className="text-2xl sm:text-3xl font-semibold text-white leading-tight tracking-tight"
              >
                {service.title}
              </h3>
            </div>

            {/* Chevron button */}
            <div className="w-9 h-9 rounded-full bg-[#17101f] border border-[#2a2a2a] flex items-center justify-center shrink-0">
              <svg
                className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                  expandedService === index ? "rotate-180" : ""
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

          {/* Expandable body */}
          <section
            id={`service-content-${index}`}
            aria-labelledby={`service-header-${index}`}
            className={`overflow-hidden transition-all duration-400 ease-in-out ${
              expandedService === index
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="pb-5 pl-4 sm:pl-16 pr-1">
              <p className="text-[#bbb] text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-[#17101f] rounded-xl text-sm text-[#ccc]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
}
