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
  const [isOpen, setIsOpen] = useState(false);

  // Track whether the last interaction was touch so we never
  // let a synthetic mouseover from iOS fire a ghost hover state.
  const isTouchRef = useRef(false);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleTouchStart = useCallback(() => {
    isTouchRef.current = true;
  }, []);

  const handleMouseEnter = useCallback(() => {
    // Ignore synthetic mouse events that fire after touch on iOS
    if (isTouchRef.current) return;
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isTouchRef.current) return;
    setIsOpen(false);
  }, []);

  const handleFocus = useCallback(() => {
    if (isTouchRef.current) return;
    setIsOpen(true);
  }, []);

  const handleBlur = useCallback(() => {
    if (isTouchRef.current) return;
    setIsOpen(false);
  }, []);

  const handleClick = useCallback(() => {
    // On touch devices this is the only interaction — pure toggle.
    // On mouse devices this is a secondary affordance (clicking pins it open).
    setIsOpen((prev) => !prev);
    // Reset touch flag after click so next mouse interaction works normally
    isTouchRef.current = false;
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    },
    []
  );

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      onTouchStart={handleTouchStart}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={[
        // Full width, left-aligned text, block-level
        "relative w-full text-left block",
        // Shape & chrome reset
        "rounded-2xl border-none outline-none cursor-pointer",
        // Focus ring (keyboard nav)
        "focus-visible:ring-2 focus-visible:ring-purple-500/50",
        // Background fades in — same effect as original
        "transition-colors duration-300 ease-in-out",
        // Padding: consistent horizontal padding on ALL screen sizes.
        // Original had padding:"20px 0px" + inner px-4 fighting each other.
        // Unified here: py-5 vertical, px-4 horizontal (matches inner px-4 intent).
        "py-5 px-4 sm:px-5",
      ].join(" ")}
      style={{
        background: isOpen ? "rgba(255,255,255,0.04)" : "transparent",
      }}
    >
      {/* ── Main row ──────────────────────────────────────────────────────── */}
      {/*
        Layout:
        - All screens: single row, items-center, space-between
        - The original used flex-col on mobile (stacking icon+title above period)
          which broke the "do not change layout" rule between views.
        - Using a single flex-row at all sizes keeps desktop layout on mobile too.
        - flex-nowrap prevents mid-width wrapping chaos.
        - No justify-around (dead zones) — use justify-between instead.
      */}
      <div className="flex flex-row items-center justify-between gap-3 sm:gap-4 w-full">

        {/* Left: icon + title/company ───────────────────────────────────── */}
        {/*
          min-w-0 is critical: without it the flex child refuses to shrink
          below its content size, pushing the period badge off screen on
          narrow viewports.
          flex-1 lets this group take remaining space after the period badge.
        */}
        <div className="flex items-center gap-3 sm:gap-5 min-w-0 flex-1">

          {/* Icon with glow + ring ──────────────────────────────────────── */}
          {/*
            Removed scale-90 sm:scale-100 — transform scale doesn't reclaim
            layout space so it left a phantom gap on mobile. Instead we use
            actual smaller size classes: w-12 h-12 mobile, w-16 h-16 sm+.
            Same visual result, no phantom gap, no layout fight.
          */}
          <div
            className="relative shrink-0 transition-all duration-300"
            style={{
              filter: isOpen
                ? `drop-shadow(0 0 14px ${exp.glowColor})`
                : "none",
            }}
          >
            {/* Hover ring — preserved exactly */}
            <div
              className="absolute inset-0 rounded-full transition-all duration-300 pointer-events-none"
              style={{
                boxShadow: isOpen
                  ? `0 0 0 3px ${exp.ringColor}`
                  : "0 0 0 0px transparent",
              }}
            />
            <div
              className={[
                "rounded-full flex items-center justify-center",
                // Actual size responsive — no transform tricks
                "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16",
                exp.iconColor,
              ].join(" ")}
            >
              <AsteriskIcon />
            </div>
          </div>

          {/* Title + Company ────────────────────────────────────────────── */}
          {/*
            min-w-0 on parent + break-words on h3 instead of truncate:
            truncate silently clips content. break-words shows it all.
            Title scales: 18px mobile → 20px sm → 30px md+
          */}
          <div className="min-w-0">
            <h3 className="text-[1.1rem] sm:text-xl md:text-3xl font-semibold text-white leading-tight break-words">
              {exp.title}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5 truncate">
              {exp.company}
            </p>
          </div>
        </div>

        {/* Divider — desktop only, preserved exactly */}
        <div className="hidden sm:block w-8 h-0.5 bg-gray-500 rounded-full shrink-0" />

        {/* Right: period badge ────────────────────────────────────────────── */}
        {/*
          shrink-0 so it never gets compressed by the title on narrow screens.
          whitespace-nowrap so "Jan 2023 – Present" never wraps mid-phrase.
          Badge styling preserved exactly from original.
        */}
        <div className="shrink-0 flex items-center">
          <span className="text-gray-400 sm:text-white text-xs sm:text-sm md:text-base whitespace-nowrap px-3 py-1 bg-white/5 sm:bg-transparent rounded-full border border-white/5 sm:border-0 font-medium">
            {exp.period}
          </span>
        </div>
      </div>

      {/* ── Expandable description ─────────────────────────────────────────── */}
      {/*
        CSS Grid 0fr → 1fr replaces maxHeight:"180px":
        - No clipping (works for any description length)
        - No JS ResizeObserver needed
        - GPU composited → zero layout recalc lag on any screen

        Horizontal padding:
        Original had px-[40px] on the wrapper (80px total) which on 320px
        phones left only 240px for text. Now responsive:
        - Mobile: pl-[3.75rem] = icon(w-12=48px) + gap(gap-3=12px) = 60px → aligns under title
        - sm:    pl-[4.75rem] = icon(w-14=56px) + gap(gap-5=20px) = 76px
        - md:    pl-[5.25rem] = icon(w-16=64px) + gap(gap-5=20px) = 84px
        Right padding stays pr-4 so text doesn't crowd the edge.
      */}
      <div
        aria-hidden={!isOpen}
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.5s ease",
        }}
      >
        <div className="overflow-hidden min-w-0">
          <p
            className={[
              "text-gray-400 text-sm leading-relaxed",
              "pt-4 pr-4",
              // Aligns description text under the title (not the icon)
              "pl-[3.75rem] sm:pl-[4.75rem] md:pl-[5.25rem]",
              // Slide-in preserved from original
              "transition-transform duration-500 ease-in-out",
            ].join(" ")}
            style={{
              transform: isOpen ? "translateY(0)" : "translateY(-10px)",
            }}
          >
            {exp.description}
          </p>
        </div>
      </div>
    </button>
  );
}
