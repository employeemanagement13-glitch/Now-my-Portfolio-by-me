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

  // Handle both hover and click interactions appropriately
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
    <div className="relative w-full mb-6 last:mb-0">
      {/* Vertical timeline connector */}
      <div className="absolute left-7 top-16 bottom-0 w-0.5 bg-gray-700 hidden sm:block"></div>
      
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-label={`${exp.title} at ${exp.company}. Click to ${isExpanded ? 'collapse' : 'expand'} description`}
        onClick={handleInteraction}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        className="relative w-full rounded-2xl cursor-pointer transition-all duration-300 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 border-none block text-left p-6 sm:p-8 bg-gray-900/50 hover:bg-gray-900/80 border border-gray-800 hover:border-gray-700"
      >
        {/* Main content area */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Icon section - always visible and large enough */}
          <div 
            className="relative flex-shrink-0 transition-all duration-300"
            style={{
              filter: (isHovered || isExpanded) ? `drop-shadow(0 0 14px ${exp.glowColor})` : "none",
            }}
          >
            <div
              className="absolute inset-0 rounded-full transition-all duration-300"
              style={{
                boxShadow: (isHovered || isExpanded)
                  ? `0 0 0 3px ${exp.ringColor}`
                  : "0 0 0 0px transparent",
              }}
            />
            <div className={`w-16 h-16 rounded-full ${exp.iconColor} flex items-center justify-center`}>
              <AsteriskIcon />
            </div>
          </div>

          {/* Content section */}
          <div className="flex-grow w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6 mb-4">
              <div className="min-w-0">
                <h3 className="text-xl sm:text-2xl font-semibold text-white leading-tight mb-1">
                  {exp.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">
                  {exp.company}
                </p>
              </div>
              
              <div className="shrink-0">
                <span className="inline-block text-xs sm:text-sm px-3 py-1.5 bg-gray-800 text-gray-300 rounded-full whitespace-nowrap">
                  {exp.period}
                </span>
              </div>
            </div>

            {/* Description - collapsible on mobile, always visible on desktop */}
            <div 
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight: isExpanded ? "300px" : "0px",
                opacity: isExpanded ? 1 : 0,
              }}
            >
              <p className="text-gray-400 text-sm leading-relaxed pt-2 transition-transform duration-500 ease-in-out"
                 style={{
                   transform: isExpanded ? "translateY(0)" : "translateY(-10px)",
                 }}>
                {exp.description}
              </p>
            </div>

            {/* Expand indicator for mobile */}
            <div className="sm:hidden mt-3">
              <span className="text-xs text-gray-500 flex items-center gap-1">
                {isExpanded ? 'Tap to collapse' : 'Tap for details'}
                <svg 
                  className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
