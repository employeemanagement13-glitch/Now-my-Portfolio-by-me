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
  const isTouchRef = useRef(false);

  const handleTouchStart = useCallback(() => {
    isTouchRef.current = true;
  }, []);

  const handleMouseEnter = useCallback(() => {
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
    setIsOpen((prev) => !prev);
    isTouchRef.current = false;
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    }
  }, []);

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
        "relative w-full text-left block",
        "rounded-2xl border-none outline-none cursor-pointer",
        "focus-visible:ring-2 focus-visible:ring-purple-500/50",
        "transition-colors duration-300 ease-in-out",
        // Unified padding — no inner div fighting outer padding
        "py-5 px-4 sm:px-5",
      ].join(" ")}
      style={{
        background: isOpen ? "rgba(255,255,255,0.04)" : "transparent",
      }}
    >
      {/* ── Main row ────────────────────────────────────────────────────── */}
      {/*
        Two layouts controlled by a single CSS class swap:

        < 500px  → flex-col: icon+title on row 1, period badge on row 2
                   This prevents any horizontal overflow on narrow phones.

        ≥ 500px  → flex-row items-center justify-between: identical to desktop.
                   Period badge stays inline to the right.

        Tailwind doesn't have a built-in 500px breakpoint, so we add
        `[@media(min-width:500px)]:flex-row` etc. inline via arbitrary values.
        This is standard Tailwind v3 arbitrary-variant syntax.
      */}
      <div
        className={[
          // Shared
          "flex w-full gap-3",
          // < 500px: stack vertically, left-align everything
          "flex-col items-start",
          // ≥ 500px: single row like desktop
          "[@media(min-width:500px)]:flex-row",
          "[@media(min-width:500px)]:items-center",
          "[@media(min-width:500px)]:justify-between",
          "[@media(min-width:500px)]:gap-4",
        ].join(" ")}
      >
        {/* Left: icon + title/company ────────────────────────────────── */}
        {/*
          On all widths this is a flex-row.
          min-w-0 + flex-1 lets it compress so the period badge always fits
          on ≥500px without overflow.
        */}
        <div className="flex flex-row items-center gap-3 sm:gap-5 min-w-0 flex-1 w-full [@media(min-width:500px)]:w-auto">

          {/* Icon with glow + ring */}
          <div
            className="relative shrink-0 transition-all duration-300"
            style={{
              filter: isOpen
                ? `drop-shadow(0 0 14px ${exp.glowColor})`
                : "none",
            }}
          >
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
                "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16",
                exp.iconColor,
              ].join(" ")}
            >
              <AsteriskIcon />
            </div>
          </div>

          {/* Title + Company */}
          <div className="min-w-0 flex-1">
            <h3 className="text-[1.05rem] [@media(min-width:500px)]:text-xl md:text-3xl font-semibold text-white leading-tight break-words">
              {exp.title}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm mt-0.5 truncate">
              {exp.company}
            </p>
          </div>
        </div>

        {/* Divider — only visible ≥ 500px (same as original sm:block) */}
        <div className="hidden [@media(min-width:500px)]:block w-8 h-0.5 bg-gray-500 rounded-full shrink-0" />

        {/* Period badge ───────────────────────────────────────────────── */}
        {/*
          < 500px: sits on its own line, left-aligned under the icon+title row.
                   Uses pill styling (bg-white/5, border, rounded-full) so it
                   reads as a distinct metadata tag — visually clean, not floating.
                   Left-aligned (not centered) per your requirement.

          ≥ 500px: right-aligned, transparent background — exactly as desktop.
        */}
        <div className="shrink-0 flex items-center pl-[3.75rem] [@media(min-width:500px)]:pl-0">
          <span
            className={[
              "font-medium whitespace-nowrap",
              "text-xs [@media(min-width:500px)]:text-sm md:text-base",
              // Always show pill on < 500px; transparent on ≥ 500px (sm+)
              "px-3 py-1 rounded-full",
              "text-gray-400 bg-white/5 border border-white/5",
              "[@media(min-width:500px)]:text-white",
              "[@media(min-width:500px)]:bg-transparent",
              "[@media(min-width:500px)]:border-0",
              "[@media(min-width:500px)]:px-0",
              "[@media(min-width:500px)]:py-0",
              "[@media(min-width:500px)]:rounded-none",
            ].join(" ")}
          >
            {exp.period}
          </span>
        </div>
      </div>

      {/* ── Expandable description — CSS Grid 0fr → 1fr ─────────────────── */}
      {/*
        Behavior is 100% identical on all screen sizes — the isOpen state
        is shared, so hover on desktop and tap on mobile both use the same
        expand/collapse logic.

        Description indent aligns under title text (icon width + gap):
        - < 500px / mobile: pl-[3.75rem]  (w-12=48px + gap-3=12px = 60px)
        - sm:               pl-[4.75rem]  (w-14=56px + gap-5=20px = 76px)
        - md:               pl-[5.25rem]  (w-16=64px + gap-5=20px = 84px)
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
              "pl-[3.75rem] sm:pl-[4.75rem] md:pl-[5.25rem]",
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
