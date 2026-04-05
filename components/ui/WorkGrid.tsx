"use client";

import { useState } from "react";
import Image from "next/image";

import { Work } from "@/lib/database.type";

interface WorkGridProps {
  works: Work[];
}

function getColorByCategory(category: string): string {
  const colors: Record<string, string> = {
    "Enterprise Applications": "#ffffff", // blue
    "Business Applications": "#ffffff", // red
    SAAS: "#ffffff", // purple
  };
  return colors[category] || "#64748b"; // default gray
}

export function WorkGrid({ works }: WorkGridProps) {
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const hasMore = works.length > visibleCount;

  const handleLoadMore = () => {
    setIsLoading(true);
    // Fake delay for realistic loading UX
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 4, works.length)); /* loads 4 more at a time */
      setIsLoading(false);
    }, 600);
  };

  return (
    <>
      {/* Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
        {works.slice(0, visibleCount).map((project) => (
          <a
            href={project.link || "#"}
            key={project.id}
            target={project.link ? "_blank" : "_self"}
            rel={project.link ? "noopener noreferrer" : ""}
            className="group block rounded-2xl overflow-hidden bg-transparent hover:scale-[1.01] transition-all duration-300 border border-transparent"
          >
            {/* Image */}
            <div className="relative w-full overflow-hidden rounded-2xl aspect-4/3 sm:h-60">
              <Image
                src={project.image_url || "/placeholder-work.jpg"}
                alt={`${project.title} - ${project.category}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300"></div>
            </div>

            {/* Card body */}
            <div className="pt-5 pb-3 px-2 sm:px-1">
              {/* Icon + Title row */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-lg"
                  dangerouslySetInnerHTML={{ __html: project.icon_svg || "" }}
                  style={{ color: getColorByCategory(project.category) }}
                />
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4 pl-0 line-clamp-2 md:line-clamp-none">
                {project.description}
              </p>

              {/* Category badge */}
              <span
                className="inline-block px-3 py-1 rounded-lg text-[10px] sm:text-xs font-semibold text-gray-400 border border-white/5"
                style={{ background: "#1d1425" }}
              >
                {project.category}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Load More button */}
      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className={`flex items-center gap-2.5 px-5 py-2 rounded-full text-[13px] font-medium transition-colors duration-200 ${
              isLoading ? "text-gray-400 opacity-80 cursor-default" : "text-gray-300 hover:text-white cursor-pointer"
            }`}
            style={{
              background: "#161616",
              border: "1px solid #2a2a2a",
            }}
          >
            <svg
              className={`w-4 h-4 text-gray-400 ${isLoading ? "animate-spin" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.3"
              />
              <path
                d="M12 2C6.47715 2 2 6.47715 2 12"
                stroke="url(#paint0_linear)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="12"
                  y1="2"
                  x2="2"
                  y2="12"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
