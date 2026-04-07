"use client";

import { useState } from "react";
import { AsteriskIcon } from "@/components/Experience";

interface ExperienceItemProps {
  exp: {
    title: string;
    company: string;
    period: string;
    description: string;
    iconColor: string;
    glowColor: string;
    ringColor: string;
  };
}

export function ExperienceItem({ exp }: ExperienceItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      aria-expanded={isHovered}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsHovered(!isHovered);
        }
      }}
      className="relative block rounded-2xl cursor-pointer transition-all duration-300 ease-in-out mx-auto outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 w-full max-w-3xl text-left border-none"
      style={{
        background: isHovered ? "rgba(255,255,255,0.04)" : "transparent",
        padding: "20px 0px",
      }}
    >
      {/* Main row */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 flex-wrap px-4 lg:px-6">
        {/* Left: icon + title/company */}
        <div className="flex items-center gap-4 sm:gap-5 w-full md:w-fit justify-center md:justify-start">
          {/* Icon circle */}
          <div
            className="relative shrink-0 transition-all duration-300 scale-90 sm:scale-100"
            style={{
              filter: isHovered ? `drop-shadow(0 0 14px ${exp.glowColor})` : "none",
            }}
          >
            {/* Ring on hover */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-300"
              style={{
                boxShadow: isHovered
                  ? `0 0 0 3px ${exp.ringColor}`
                  : "0 0 0 0px transparent",
              }}
            />
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 xl:w-20 xl:h-20 rounded-full ${exp.iconColor} flex items-center justify-center`}
            >
              <AsteriskIcon />
            </div>
          </div>

          {/* Title + Company */}
          <div className="min-w-0 text-center md:text-left">
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white leading-tight truncate">
              {exp.title}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm lg:text-base mt-0.5">
              {exp.company}
            </p>
          </div>
        </div>

        <div className="hidden md:block w-8 h-0.5 bg-gray-500 rounded-full shrink-0" />
        {/* Right: dash + period */}
        <div className="flex items-center gap-4 w-full md:w-fit justify-center md:justify-end">
          <span className="text-gray-400 sm:text-white text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap px-3 py-1 bg-white/5 sm:bg-transparent rounded-full border border-white/5 sm:border-0 font-medium">
            {exp.period}
          </span>
        </div>
      </div>

      {/* Expandable description — slides down on hover */}
      <div
        className="overflow-hidden px-4 lg:px-10 transition-all duration-500 ease-in-out"
        style={{
          maxHeight: isHovered ? "180px" : "0px",
          opacity: isHovered ? 1 : 0,
        }}
      >
        <p
          className="text-gray-400 text-sm sm:text-base leading-relaxed pt-4 md:pl-16 lg:pl-20 pr-2 transition-transform duration-500 ease-in-out"
          style={{
            transform: isHovered ? "translateY(0)" : "translateY(-10px)",
          }}
        >
          {exp.description}
        </p>
      </div>
    </button>
  );
}
