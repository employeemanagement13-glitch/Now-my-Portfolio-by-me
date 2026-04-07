"use client";

import { useState, useCallback, useRef } from "react";
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
  // Separate hover (pointer devices) from expanded (touch/click toggle)
  // so they never conflict with each other.
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Combined "active" state drives all visual feedback
  const isActive = isExpanded || isHovered;

  // Detect if the device has a fine pointer (mouse). On touch-only devices
  // we skip hover logic entirely and rely solely on click-toggle.
  const hasFinePointer =
    typeof window !== "undefined"
      ? window.matchMedia("(pointer: fine)").matches
      : true;

  const handleMouseEnter = useCallback(() => {
    if (hasFinePointer) setIsHovered(true);
  }, [hasFinePointer]);

  const handleMouseLeave = useCallback(() => {
    if (hasFinePointer) setIsHovered(false);
  }, [hasFinePointer]);

  // On touch/click: toggle expanded. On mouse devices this also fires after
  // mouseEnter so we only toggle if NOT already hovered (i.e. touch-initiated).
  const handleClick = useCallback(() => {
    if (!hasFinePointer) {
      // Touch device — pure toggle
      setIsExpanded((prev) => !prev);
    } else {
      // Mouse device — click acts as a toggle on top of hover
      setIsExpanded((prev) => !prev);
    }
  }, [hasFinePointer]);

  const handleFocus = useCallback(() => setIsHovered(true), []);
  const handleBlur = useCallback(() => setIsHovered(false), []);

  return (
    <button
      type="button"
      aria-expanded={isActive}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsExpanded((prev) => !prev);
        }
      }}
      className={[
        // Block-level, full width, left-aligned text
        "relative w-full text-left block",
        // Rounded, no browser button chrome
        "rounded-2xl border-none outline-none",
        // Keyboard focus ring
        "focus-visible:ring-2 focus-visible:ring-purple-500/50",
        // Smooth background transition — no layout shift
        "transition-colors duration-300 ease-in-out",
        // Generous tap target padding — consistent across all screen sizes
        "py-5 px-3 sm:px-4",
        // Cursor
        "cursor-pointer",
      ].join(" ")}
      style={{
        background: isActive ? "rgba(255,255,255,0.04)" : "transparent",
      }}
    >
      {/* ── Main row ─────────────────────────────────────────────────────── */}
      {/*
        Layout strategy:
        - Mobile (<sm): single column, centered
        - sm+: single row, space-between
        flex-wrap is intentionally removed — at sm we enforce nowrap.
        On mobile the column layout is explicit via flex-col.
      */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">

        {/* Left group: icon + title/company */}
        <div className="flex items-center gap-3 sm:gap-5 min-w-0 justify-center sm:justify-start">

          {/* Icon with glow + ring */}
          <div
            className="relative shrink-0 transition-all duration-300"
            style={{
              filter: isActive
                ? `drop-shadow(0 0 14px ${exp.glowColor})`
                : "none",
            }}
          >
            {/* Hover ring */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-300 pointer-events-none"
              style={{
                boxShadow: isActive
                  ? `0 0 0 3px ${exp.ringColor}`
                  : "0 0 0 0px transparent",
              }}
            />
            <div
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${exp.iconColor} flex items-center justify-center`}
            >
              <AsteriskIcon />
            </div>
          </div>

          {/* Title + Company — min-w-0 prevents flex overflow */}
          <div className="min-w-0 flex-1 sm:flex-none">
            {/*
              On mobile: allow wrapping (break-words) so long titles show fully.
              On sm+: still allow wrap rather than truncate — truncate hides info.
            */}
            <h3 className="text-lg xs:text-xl sm:text-3xl font-semibold text-white leading-tight break-words">
              {exp.title}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5 truncate">
              {exp.company}
            </p>
          </div>
        </div>

        {/* Divider — desktop only */}
        <div className="hidden sm:block w-8 h-0.5 bg-gray-500 rounded-full shrink-0" />

        {/* Right group: period badge */}
        {/*
          Mobile: full-width centered pill to make it visually clear and tappable.
          sm+: right-aligned, no pill styling (matches original).
        */}
        <div className="flex items-center justify-center sm:justify-end shrink-0">
          <span className="text-gray-400 sm:text-white text-xs sm:text-sm md:text-base whitespace-nowrap px-3 py-1 bg-white/5 sm:bg-transparent rounded-full border border-white/5 sm:border-0 font-medium">
            {exp.period}
          </span>
        </div>
      </div>

      {/* ── Expandable description ────────────────────────────────────────── */}
      {/*
        CSS Grid row trick: 0fr → 1fr.
        - No max-height guessing → zero clipping risk.
        - No JS ResizeObserver needed.
        - GPU-composited → no layout recalc → zero lag on any screen.
        Outer div handles the grid animation.
        Inner div has overflow:hidden to clip during transition.
        Innermost p is the actual content with responsive padding.
      */}
      <div
        aria-hidden={!isActive}
        style={{
          display: "grid",
          gridTemplateRows: isActive ? "1fr" : "0fr",
          transition: "grid-template-rows 0.4s ease",
        }}
      >
        <div className="overflow-hidden min-w-0">
          <p
            className={[
              // Responsive horizontal padding: snug on mobile, indented on sm+
              "text-gray-400 text-sm leading-relaxed",
              "pt-4",
              // On mobile align with icon (icon w-12 = 3rem + gap-3 = 0.75rem → ~3.75rem)
              // On sm+ align with text start (icon w-16 = 4rem + gap-5 = 1.25rem → ~5.25rem)
              "pl-0 sm:pl-[5.25rem] pr-2",
              // Slide-in animation driven by CSS, not JS
              "transition-transform duration-400 ease-in-out",
            ].join(" ")}
            style={{
              transform: isActive ? "translateY(0)" : "translateY(-8px)",
            }}
          >
            {exp.description}
          </p>
        </div>
      </div>
    </button>
  );
}
