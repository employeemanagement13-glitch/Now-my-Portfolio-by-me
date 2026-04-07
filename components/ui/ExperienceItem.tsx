"use client";

import { useState, useCallback } from "react";
import { AsteriskIcon } from "@/components/Experience";

interface Exp {
  title: string;
  company: string;
  period: string;
  description: string;
  iconColor: string;
  glowColor: string;
  ringColor: string;
}

// ─── ExperienceItem (controlled) ─────────────────────────────────────────────
// `id`         — unique key for this card (e.g. index or slug)
// `activeId`   — which card is currently open (owned by parent)
// `onActivate` — parent setter; pass null to close all
interface ExperienceItemProps {
  exp: Exp;
  id: string;
  activeId: string | null;
  onActivate: (id: string | null) => void;
}

export function ExperienceItem({
  exp,
  id,
  activeId,
  onActivate,
}: ExperienceItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isExpanded = activeId === id;
  // Visual "active" = open OR mouse-hovered (desktop only)
  const isActive = isExpanded || isHovered;

  // Only apply hover styles on fine-pointer (mouse) devices.
  // On touch devices hover events are unreliable — skip them.
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

  // Single click/tap: toggle this card (parent closes all others automatically)
  const handleClick = useCallback(() => {
    onActivate(isExpanded ? null : id);
  }, [id, isExpanded, onActivate]);

  const handleFocus = useCallback(() => {
    if (hasFinePointer) setIsHovered(true);
  }, [hasFinePointer]);

  const handleBlur = useCallback(() => {
    if (hasFinePointer) setIsHovered(false);
  }, [hasFinePointer]);

  return (
    <button
      type="button"
      aria-expanded={isExpanded}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate(isExpanded ? null : id);
        }
      }}
      className={[
        "relative w-full text-left block",
        "rounded-2xl border-none outline-none",
        "focus-visible:ring-2 focus-visible:ring-purple-500/50",
        "transition-colors duration-300 ease-in-out",
        // Consistent generous tap target on all screen sizes
        "py-5 px-3 sm:px-4",
        "cursor-pointer",
      ].join(" ")}
      style={{
        background: isActive ? "rgba(255,255,255,0.04)" : "transparent",
      }}
    >
      {/* ── Main row ───────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">

        {/* Left: icon + title/company */}
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

          {/* Title + Company */}
          <div className="min-w-0 flex-1 sm:flex-none">
            <h3 className="text-lg sm:text-3xl font-semibold text-white leading-tight break-words">
              {exp.title}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5 truncate">
              {exp.company}
            </p>
          </div>
        </div>

        {/* Divider — desktop only */}
        <div className="hidden sm:block w-8 h-0.5 bg-gray-500 rounded-full shrink-0" />

        {/* Right: period badge */}
        <div className="flex items-center justify-start sm:justify-end shrink-0">
          <span className="text-gray-400 sm:text-white text-xs sm:text-sm md:text-base whitespace-nowrap px-3 py-1 bg-white/5 sm:bg-transparent rounded-full border border-white/5 sm:border-0 font-medium">
            {exp.period}
          </span>
        </div>
      </div>

      {/* ── Expandable description — CSS Grid 0fr → 1fr ────────────────── */}
      <div
        aria-hidden={!isExpanded}
        style={{
          display: "grid",
          gridTemplateRows: isActive ? "1fr" : "0fr",
          transition: "grid-template-rows 0.4s ease",
        }}
      >
        <div className="overflow-hidden min-w-0">
          <p
            className="text-gray-400 text-sm leading-relaxed pt-4 pl-0 sm:pl-[5.25rem] pr-2"
            style={{
              transform: isActive ? "translateY(0)" : "translateY(-8px)",
              transition: "transform 0.4s ease",
            }}
          >
            {exp.description}
          </p>
        </div>
      </div>
    </button>
  );
}


// ─── ExperienceList ───────────────────────────────────────────────────────────
// Owns the single `activeId`. Only one card can be open at a time.
// On mobile: tapping a new card collapses the previous one instantly.
// On desktop: hover expands without affecting the clicked-open state.
//
// Usage:
//   <ExperienceList experiences={experiencesArray} />

interface ExperienceListProps {
  experiences: Exp[];
}

export function ExperienceList({ experiences }: ExperienceListProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    /*
      gap-2  (8px)  on mobile  — cards are full-width so visual separation
                                 is clear without too much wasted space
      gap-3  (12px) on sm+     — slightly more breathing room at larger sizes

      If you want more space, bump to gap-3 / gap-4 respectively.
    */
    <div className="flex flex-col gap-2 sm:gap-3 w-full">
      {experiences.map((exp, i) => {
        const id = `${i}-${exp.company}`;
        return (
          <ExperienceItem
            key={id}
            id={id}
            exp={exp}
            activeId={activeId}
            onActivate={setActiveId}
          />
        );
      })}
    </div>
  );
}
