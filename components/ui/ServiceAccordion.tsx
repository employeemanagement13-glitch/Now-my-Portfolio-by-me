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
    <div className="flex flex-col w-full min-w-0">
      {services.map((service, index) => {
        const isOpen = expandedService === index;

        return (
          <div key={service.title} className="border-b border-[#1e1e1e] min-w-0">
            {/* Row header */}
            <button
              type="button"
              className="w-full flex items-center justify-between py-5 px-1 cursor-pointer text-left bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-lg transition-colors duration-200 max-sm:duration-100 focus:outline-none min-w-0"
              onClick={() => setExpandedService(isOpen ? null : index)}
              aria-expanded={isOpen}
              aria-controls={`service-content-${index}`}
            >
              {/* Left side: icon + title — clamp so it never pushes the chevron off */}
              <div className="flex items-center gap-3 sm:gap-5 min-w-0 flex-1 pr-3">
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full ${service.iconColor} flex items-center justify-center shrink-0`}
                >
                  {service.icon}
                </div>
                <h3
                  id={`service-header-${index}`}
                  className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white leading-tight tracking-tight truncate"
                >
                  {service.title}
                </h3>
              </div>

              {/* Chevron — always shrink-0 so it stays visible */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#17101f] border border-[#2a2a2a] flex items-center justify-center shrink-0">
                <svg
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 transition-transform duration-300 ${
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

            {/*
              Expandable body — CSS Grid trick:
              grid-rows transitions from 0fr → 1fr with no JS height calc,
              no max-h guessing, zero lag, works on all screen sizes.
            */}
            <div
              id={`service-content-${index}`}
              role="region"
              aria-labelledby={`service-header-${index}`}
              style={{
                display: "grid",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                transition: "grid-template-rows 0.3s ease",
              }}
            >
              {/* Inner wrapper must have overflow:hidden to clip during animation */}
              <div className="overflow-hidden min-w-0">
                <div className="pb-5 pl-3 sm:pl-16 pr-1 min-w-0">
                  <p className="text-[#bbb] text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Tags: wrap freely, never overflow, always fully visible */}
                  <div className="flex flex-wrap gap-2 min-w-0">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#17101f] rounded-xl text-xs sm:text-sm text-[#ccc] whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
