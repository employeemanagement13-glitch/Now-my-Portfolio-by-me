"use client";

import { useState, useEffect } from "react";
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Handle both hover and click interactions
  const handleInteraction = () => {
    setIsExpanded(!isExpanded);
  };

  // Reset expanded state on mobile when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <button
      type="button"
      aria-expanded={isExpanded || isHovered}
      aria-label={`${exp.title} at ${exp.company}. Click to ${isExpanded ? 'collapse' : 'expand'} description`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={handleInteraction}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }
      }}
      className="relative rounded-2xl cursor-pointer transition-all duration-300 ease-in-out mx-auto outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 w-full text-left border-none block"
      style={{
        background: (isExpanded || isHovered) ? "rgba(255,255,255,0.04)" : "transparent",
        padding: "20px 0px",
      }}
    >
      {/* Main row */}
      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 sm:gap-4 flex-wrap sm:flex-nowrap px-4 sm:px-0">
        {/* Left: icon + title/company */}
        <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-fit justify-center sm:justify-start">
          {/* Icon circle */}
          <div
            className="relative shrink-0 transition-all duration-300 scale-90 sm:scale-100"
            style={{
              filter: (isExpanded || isHovered) ? `drop-shadow(0 0 14px ${exp.glowColor})` : "none",
            }}
          >
            {/* Ring on hover/expansion */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-300"
              style={{
                boxShadow: (isExpanded || isHovered)
                  ? `0 0 0 3px ${exp.ringColor}`
                  : "0 0 0 0px transparent",
              }}
            />
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full ${exp.iconColor} flex items-center justify-center`}
            >
              <AsteriskIcon />
            </div>
          </div>

          {/* Title + Company */}
          <div className="min-w-0">
            <h3 className="text-xl sm:text-3xl font-semibold text-white leading-tight truncate">
              {exp.title}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
              {exp.company}
            </p>
          </div>
        </div>

        <div className="hidden sm:block w-8 h-0.5 bg-gray-500 rounded-full shrink-0" />
        {/* Right: dash + period */}
        <div className="flex items-center gap-4 w-full sm:w-fit justify-center sm:justify-end">
          <span className="text-gray-400 sm:text-white text-xs sm:text-sm md:text-base whitespace-nowrap px-3 py-1 bg-white/5 sm:bg-transparent rounded-full border border-white/5 sm:border-0 font-medium">
            {exp.period}
          </span>
        </div>
      </div>

      {/* Expandable description - Always visible on mobile, hover on desktop */}
      <div
        className="overflow-hidden px-[40px] transition-all duration-500 ease-in-out sm:px-[40px]"
        style={{
          maxHeight: (isExpanded || isHovered || window.innerWidth < 640) ? "300px" : "0px",
          opacity: (isExpanded || isHovered || window.innerWidth < 640) ? 1 : 0,
        }}
      >
        <p
          className="text-gray-400 text-sm leading-relaxed pt-4 sm:pl-20 pr-2 transition-transform duration-500 ease-in-out"
          style={{
            transform: (isExpanded || isHovered || window.innerWidth < 640) ? "translateY(0)" : "translateY(-10px)",
          }}
        >
          {exp.description}
        </p>
      </div>
    </button>
  );
}
