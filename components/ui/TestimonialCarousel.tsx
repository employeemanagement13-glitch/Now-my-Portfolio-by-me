"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Testimonial } from "@/lib/database.type";

const CARD_W = 252;
const CARD_H = 338;
const GAP = 32;

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Detect which card is centred on scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const cards = Array.from(
        container.querySelectorAll<HTMLElement>("[data-card]")
      );
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2 - scrollLeft;
        const dist = Math.abs(cardCenter - containerWidth / 2);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount so activeIndex is correct from the start
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [testimonials]);

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-card]")
    );
    const card = cards[index];
    if (!card) return;
    const containerWidth = container.clientWidth;
    const targetScrollLeft = card.offsetLeft - (containerWidth - CARD_W) / 2;
    container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Horizontal scroll track ── */}
      <div
        ref={scrollRef}
        className="flex items-center overflow-x-scroll testimonials-scroll"
        style={{
          gap: GAP,
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE
          // Centre-pad so the first/last card can snap to the middle
          paddingLeft: `calc(50vw - ${CARD_W / 2}px)`,
          paddingRight: `calc(50vw - ${CARD_W / 2}px)`,
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        {/* Hide webkit scrollbar */}
        <style>{`
          .testimonials-scroll::-webkit-scrollbar { display: none; }
        `}</style>

        {testimonials.map((t, i) => {
          const isActive = i === activeIndex;

          return (
            <button
              key={t.id}
              type="button"
              data-card
              onClick={() => !isActive && scrollToIndex(i)}
              aria-label={`View testimonial from ${t.name}`}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                textAlign: "inherit",
                font: "inherit",
                scrollSnapAlign: "center",
                flexShrink: 0,
                width: CARD_W,
                height: CARD_H,
                transition: "opacity 0.45s ease, transform 0.45s ease",
                opacity: isActive ? 1 : 0.18,
                transform: isActive ? "scale(1)" : "scale(0.92)",
                cursor: isActive ? "default" : "pointer",
              }}
            >
              {isActive ? (
                // ─── ACTIVE: full phone-frame card ───
                <div
                  className="w-full h-full relative overflow-hidden"
                  style={{
                    borderRadius: 20,
                    border: "2px solid rgba(255,255,255,0.55)",
                    background: "#0d0d0d",
                  }}
                >
                  {/* Status-bar — 3 thin pill segments */}
                  <div
                    className="absolute left-0 right-0 flex justify-center"
                    style={{
                      top: 12,
                      gap: 4,
                      paddingLeft: 24,
                      paddingRight: 24,
                      zIndex: 10,
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: 3,
                        borderRadius: 99,
                        background: "rgba(255,255,255,0.18)",
                      }}
                    />
                    <div
                      style={{
                        flex: 1,
                        height: 3,
                        borderRadius: 99,
                        background: "rgba(255,255,255,0.8)",
                      }}
                    />
                    <div
                      style={{
                        flex: 1,
                        height: 3,
                        borderRadius: 99,
                        background: "rgba(255,255,255,0.18)",
                      }}
                    />
                  </div>

                  {/* Vivid red → magenta radial glow */}
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      width: 260,
                      height: 230,
                      top: "20%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      borderRadius: "10px",
                      background:
                        "radial-gradient(ellipse at 50% 45%, rgba(220,30,80,0.75) 0%, rgba(218, 22, 40, 0.5) 32%, rgba(160,9,42,0.15) 60%, transparent 78%)",
                      filter: "blur(10px)",
                    }}
                  />

                  {/* Card body */}
                  <div
                    className="absolute inset-0 flex flex-col justify-between"
                    style={{ padding: "36px 24px 24px 20px" }}
                  >
                    {/* Overlapping avatars */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Image
                        src={t.profile_image_url || "/avatar-placeholder.png"}
                        alt={t.name}
                        width={32}
                        height={32}
                        style={{
                          borderRadius: "50%",
                          border: "1.5px solid black",
                          background: "#4b5563",
                          position: "relative",
                          zIndex: 2,
                          objectFit: "cover",
                        }}
                      />
                      <Image
                        src={t.logo_image_url || "/company-placeholder.png"}
                        alt={t.company}
                        width={32}
                        height={32}
                        style={{
                          borderRadius: "50%",
                          border: "1.5px solid black",
                          background: "#6b7280",
                          marginLeft: -10,
                          position: "relative",
                          zIndex: 1,
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    {/* Quote */}
                    <p
                      style={{
                        color: "white",
                        fontWeight: 300,
                        fontSize: 14,
                        lineHeight: 1.45,
                        fontStyle: "",
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        marginTop: 45,
                      }}
                    >
                      "{t.description}"
                    </p>

                    {/* Name + role */}
                    <div style={{ marginTop: 12 }}>
                      <div
                        style={{
                          color: "white",
                          fontWeight: 700,
                          fontSize: 17,
                        }}
                      >
                        {t.name}
                      </div>
                      <div
                        style={{
                          color: "#9ca3af",
                          fontSize: 11,
                          marginTop: 2,
                        }}
                      >
                        {t.company}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // ─── INACTIVE: no frame, just faint raw text ───
                <div
                  className="w-full h-full flex flex-col justify-between"
                  style={{ padding: "36px 8px 16px 8px" }}
                >
                  {/* Faint overlapping avatars */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Image
                      src={t.profile_image_url || "/avatar-placeholder.png"}
                      alt={t.name}
                      width={28}
                      height={28}
                      style={{
                        borderRadius: "50%",
                        background: "#374151",
                        position: "relative",
                        zIndex: 2,
                        objectFit: "cover",
                      }}
                    />
                    <Image
                      src={t.logo_image_url || "/company-placeholder.png"}
                      alt={t.company}
                      width={28}
                      height={28}
                      style={{
                        borderRadius: "50%",
                        background: "#4b5563",
                        marginLeft: -8,
                        position: "relative",
                        zIndex: 1,
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Faint quote */}
                  <p
                    style={{
                      color: "white",
                      fontSize: 12,
                      lineHeight: 1.45,
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      marginTop: 44,
                    }}
                  >
                    "{t.description}"
                  </p>

                  {/* Faint name + role */}
                  <div style={{ marginTop: 10 }}>
                     <div
                      style={{ color: "white", fontWeight: 600, fontSize: 17 }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{ color: "#6b7280", fontSize: 13, marginTop: 2 }}
                    >
                      {t.company}
                    </div>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Dot indicators ── */}
      <div className="flex justify-center mt-6" style={{ gap: 6 }}>
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            onClick={() => scrollToIndex(i)}
            style={{
              width: i === activeIndex ? 20 : 6,
              height: 6,
              borderRadius: 99,
              background:
                i === activeIndex ? "white" : "rgba(255,255,255,0.2)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width 0.3s ease, background 0.3s ease",
            }}
          />
        ))}
      </div>
    </>
  );
}
