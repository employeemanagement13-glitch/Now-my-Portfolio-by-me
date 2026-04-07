import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";

interface LegalPageLayoutProps {
  title: string;
  description: string;
  lastUpdated: string;
  headerBadge?: React.ReactNode;
  quickSummary?: React.ReactNode;
  children: React.ReactNode;
  cta?: React.ReactNode;
}

export function LegalPageLayout({
  title,
  description,
  lastUpdated,
  headerBadge,
  quickSummary,
  children,
  cta,
}: LegalPageLayoutProps) {
  return (
    <>
      <Header />

      <main
        className={[
          "relative min-h-screen bg-dark",
          // Top padding: smaller on mobile (header is shorter / content needs to breathe less)
          // pt-24 = 96px mobile, pt-32 = 128px sm+
          "pt-24 sm:pt-32",
          // Bottom padding: compact on mobile, generous on desktop
          "pb-12 sm:pb-20",
          // Horizontal padding: 16px mobile → 24px sm → 32px lg
          "px-4 sm:px-6 lg:px-8",
          // Prevent the oversized glow divs from causing horizontal scroll
          "overflow-x-hidden",
        ].join(" ")}
      >
        {/* ── Background glows ─────────────────────────────────────────── */}
        {/*
          Original w-[700px] was wider than any phone screen and caused
          horizontal overflow. Clamped to max(100vw, 700px) via w-full max-w-[700px]
          so it never exceeds the viewport width on small screens.
        */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[300px] sm:h-[400px] rounded-full opacity-[0.07] blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, #c8102e 0%, #7a0018 50%, transparent 80%)",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full opacity-[0.05] blur-[80px]"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
          }}
        />

        {/* ── Content ──────────────────────────────────────────────────── */}
        <div className="relative z-10 max-w-3xl mx-auto w-full">

          {/* Page header */}
          <div className="mb-10 sm:mb-14 text-center">
            {headerBadge && <div className="mb-4">{headerBadge}</div>}

            <h1
              className={[
                "font-semibold text-white leading-tight",
                // Fluid title size: 28px mobile → 36px sm → 48px md+
                "text-[1.75rem] sm:text-4xl md:text-5xl",
                "mb-3 sm:mb-4",
                // Allow wrapping so long titles never overflow on small screens
                "break-words",
              ].join(" ")}
            >
              {title}
            </h1>

            <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto px-2 sm:px-0">
              {description}
            </p>

            <p className="text-gray-600 text-xs mt-3 sm:mt-4">
              Last updated: {lastUpdated}
            </p>
          </div>

          {quickSummary && <div className="mb-0">{quickSummary}</div>}

          {/* Sections wrapper */}
          <div className="flex flex-col gap-0">{children}</div>

          {cta && <div className="mt-10 sm:mt-14">{cta}</div>}
        </div>
      </main>

      <Footer />
    </>
  );
}


// ─── LegalSection ─────────────────────────────────────────────────────────────

export function LegalSection({
  id,
  index,
  title,
  children,
}: {
  id?: string;
  index: string | number;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="border-b border-[#1e1e1e] py-6 sm:py-8 group">

      {/* Heading row: badge + title */}
      <h2
        className={[
          "text-base sm:text-lg font-semibold text-white mb-4 sm:mb-5",
          "flex items-start gap-2 sm:gap-3",
        ].join(" ")}
      >
        {/* Index badge — shrink-0 prevents it from squishing on narrow screens */}
        <span
          className={[
            "shrink-0 mt-0.5",
            // Slightly smaller on mobile so the title gets more room
            "w-5 h-5 sm:w-6 sm:h-6",
            "rounded-full bg-black/10 border border-white/20",
            "flex items-center justify-center",
            "text-red-500 text-[9px] sm:text-[10px] font-bold",
          ].join(" ")}
        >
          {index}
        </span>

        {/* Title — min-w-0 lets it wrap instead of overflowing */}
        <span className="min-w-0 break-words">{title}</span>
      </h2>

      {/*
        Body indent:
        - Mobile: pl-7 (badge w-5=20px + gap-2=8px → 28px, rounded to 28px)
        - sm+:    pl-9 (badge w-6=24px + gap-3=12px → 36px)
        This keeps body text aligned under the title text, not the badge.
      */}
      <div className="pl-7 sm:pl-9 flex flex-col gap-3 sm:gap-4">
        {children}
      </div>
    </div>
  );
}


// ─── LegalParagraph ───────────────────────────────────────────────────────────

export function LegalParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
      {children}
    </p>
  );
}


// ─── LegalList ────────────────────────────────────────────────────────────────

export function LegalList({
  items,
  bulletColor = "bg-primary/70",
}: {
  items: Array<{ label?: string; desc: string } | string>;
  bulletColor?: string;
}) {
  return (
    <ul className="flex flex-col gap-2 sm:gap-2.5 mt-1">
      {items.map((item, idx) => {
        const isStr = typeof item === "string";
        const label = isStr ? undefined : item.label;
        const desc = isStr ? item : item.desc;

        return (
          <li key={idx} className="flex items-start gap-2 sm:gap-3">
            {/*
              Bullet dot:
              - mt-[0.4rem] (≈6.4px) aligns the dot to the cap-height of
                14px (text-sm) body text on both single and wrapped lines.
              - Using a fixed fractional offset is more reliable than mt-2
                which overshoots when line-height is 1.625 (leading-relaxed).
            */}
            <span
              className={`shrink-0 mt-[0.4rem] w-1.5 h-1.5 rounded-full ${bulletColor}`}
            />

            <p className="text-gray-400 text-sm leading-relaxed min-w-0 flex-1">
              {label ? (
                <>
                  <span className="text-gray-200 font-medium">{label}</span>
                  {" — "}
                  {desc}
                </>
              ) : (
                desc
              )}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
