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
      <main className="relative min-h-screen bg-dark pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background glows matching privacy page */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-[0.07] blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, #c8102e 0%, #7a0018 50%, transparent 80%)",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-[0.05] blur-[80px]"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="mb-14 text-center">
            {headerBadge}
            <h1 className="mainheadingfont text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto">
              {description}
            </p>
            <p className="text-gray-600 text-xs mt-4">Last updated: {lastUpdated}</p>
          </div>

          {quickSummary}

          {/* Sections Wrapper */}
          <div className="flex flex-col gap-0">{children}</div>

          {cta}
        </div>
      </main>
      <Footer />
    </>
  );
}

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
    <div id={id} className="border-b border-[#1e1e1e] py-8 group">
      <h2 className="text-lg font-semibold text-white mb-5 flex items-start gap-3">
        <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-black/10 border border-white/20 flex items-center justify-center text-red-500 text-[10px] font-bold">
          {index}
        </span>
        <span>{title}</span>
      </h2>
      <div className="pl-9 flex flex-col gap-4">{children}</div>
    </div>
  );
}

export function LegalParagraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
      {children}
    </p>
  );
}

export function LegalList({
  items,
  bulletColor = "bg-primary/70",
}: {
  items: Array<{ label?: string; desc: string } | string>;
  bulletColor?: string;
}) {
  return (
    <ul className="flex flex-col gap-2 mt-1">
      {items.map((item, idx) => {
        const isStr = typeof item === "string";
        const label = isStr ? undefined : item.label;
        const desc = isStr ? item : item.desc;

        return (
          <li key={idx} className="flex items-start gap-3">
            <span className={`shrink-0 mt-2 w-1.5 h-1.5 rounded-full ${bulletColor}`} />
            <p className="text-gray-400 text-sm leading-relaxed">
              {label ? (
                <>
                  <span className="text-gray-200 font-medium">{label}</span> — {desc}
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
