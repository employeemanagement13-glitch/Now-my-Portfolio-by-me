"use client"

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const navLinks = [
  { label: "ABOUT US", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "SERVICES", href: "/#services" },
  { label: "MY WORK", href: "/#work" },
  { label: "TESTIMONIAL", href: "/#testimonials" },
  { label: "FAQs", href: "/#faq" },
];

export default function Header() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      globalThis.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;

        if (Math.abs(delta) > 4) {
          if (delta > 0 && currentScrollY > 80) {
            setCollapsed(true);
          } else if (delta < 0) {
            setCollapsed(false);
          }
          lastScrollY.current = currentScrollY;
        }

        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="h-5" aria-hidden="true" />

      {/* ── DESKTOP NAVBAR ── */}
      <div className="hidden md:flex items-center justify-center w-full px-6">

        {/*
          THE FIX:
          - NO overflow:hidden on the pill — so Contact Us is NEVER clipped
          - The pill's width is driven by its contents naturally (no fixed width)
          - We animate the NAV LINKS wrapper width: 0 ↔ large px value
          - Pill shrinks/grows organically as the nav links expand/collapse
          - Centered via parent flex justify-center — shrinks symmetrically
        */}
        <div
          className="bg-[#151517] border border-[#252525] rounded-full flex items-center gap-2"
          style={{
            height: '60px',
            padding: '6px',
            // Smooth the pill border-radius and spacing, not the width
            transition: 'padding 600ms cubic-bezier(0.77, 0, 0.175, 1)',
          }}
        >
          {/* Logo — always visible */}
          <Link href="/" className="flex items-center shrink-0 ml-0.5">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-900 via-red-500 to-red-400 flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shrimp-icon lucide-shrimp"><path d="M11 12h.01" /><path d="M13 22c.5-.5 1.12-1 2.5-1-1.38 0-2-.5-2.5-1" /><path d="M14 2a3.28 3.28 0 0 1-3.227 1.798l-6.17-.561A2.387 2.387 0 1 0 4.387 8H15.5a1 1 0 0 1 0 13 1 1 0 0 0 0-5H12a7 7 0 0 1-7-7V8" /><path d="M14 8a8.5 8.5 0 0 1 0 8" /><path d="M16 16c2 0 4.5-4 4-6" /></svg>
            </div>
          </Link>

          {/*
            NAV LINKS WRAPPER
            This is the ONLY thing that animates width.
            overflow:hidden here clips only the links — never the Contact Us button.
          */}
          <div
            style={{
              overflow: 'hidden',
              // Animate between explicit px values — browser interpolates smoothly
              width: collapsed ? '0px' : 'min(640px, 80vw)',
              opacity: collapsed ? 0 : 1,
              // Collapse: width shrinks fast, opacity gone instantly
              // Expand: width opens first, then text fades in with delay
              transition: collapsed
                ? 'width 580ms cubic-bezier(0.77, 0, 0.175, 1), opacity 120ms ease 0ms'
                : 'width 580ms cubic-bezier(0.77, 0, 0.175, 1), opacity 280ms ease 280ms',
              pointerEvents: collapsed ? 'none' : 'auto',
              flexShrink: 0,
            }}
          >
            <ul className="flex items-center gap-0.5 text-xs font-medium whitespace-nowrap px-3">
              {navLinks.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setActiveIndex(index)}
                    className={`relative flex items-center gap-1.5 px-3 py-2 rounded-full transition-colors duration-200
                      ${activeIndex === index
                        ? 'text-white font-semibold'
                        : 'text-gray-400 hover:text-white hover:bg-[#252525]'
                      }`}
                  >
                    {activeIndex === index && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    )}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Gap between nav links and Contact Us — shrinks away when collapsed */}
          <div
            style={{
              width: collapsed ? '0px' : '12px',
              flexShrink: 0,
              transition: 'width 580ms cubic-bezier(0.77, 0, 0.175, 1)',
            }}
          />

          {/*
            CONTACT US — completely outside the overflow:hidden container.
            Always fully visible. Never clipped. Never hidden.
          */}
          <Link
            href="/#contact"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e1e1e] border border-[#2e2e2e]
                       hover:bg-[#252525] transition-colors duration-200 shrink-0
                       text-sm text-white font-medium mr-0.5 whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 shrink-0 animate-pulse" />Contact Us
          </Link>
        </div>
      </div>

      {/* ── MOBILE NAVBAR ── */}
      <nav className="md:hidden w-[92%] sm:w-[80%] mx-auto">
        <div className="bg-[#151517] border border-[#252525] rounded-full flex items-center justify-between px-3 py-2.5">
          <Link href="/" className="w-10 h-10 rounded-full bg-linear-to-br from-purple-900 via-red-500 to-red-400 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shrimp-icon lucide-shrimp"><path d="M11 12h.01" /><path d="M13 22c.5-.5 1.12-1 2.5-1-1.38 0-2-.5-2.5-1" /><path d="M14 2a3.28 3.28 0 0 1-3.227 1.798l-6.17-.561A2.387 2.387 0 1 0 4.387 8H15.5a1 1 0 0 1 0 13 1 1 0 0 0 0-5H12a7 7 0 0 1-7-7V8" /><path d="M14 8a8.5 8.5 0 0 1 0 8" /><path d="M16 16c2 0 4.5-4 4-6" /></svg>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1e1e1e] border border-[#2e2e2e] text-xs text-white font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Contact Us
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 rounded-full bg-[#1e1e1e] border border-[#2e2e2e] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          style={{
            overflow: 'hidden',
            maxHeight: mobileOpen ? '400px' : '0px',
            opacity: mobileOpen ? 1 : 0,
            marginTop: mobileOpen ? '8px' : '0px',
            transition: mobileOpen
              ? 'max-height 400ms cubic-bezier(0.65, 0, 0.35, 1), opacity 300ms ease 80ms, margin-top 400ms ease'
              : 'max-height 350ms cubic-bezier(0.65, 0, 0.35, 1), opacity 180ms ease, margin-top 350ms ease',
          }}
        >
          <div className="bg-[#151517] border border-[#252525] rounded-2xl p-2">
            {navLinks.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => { setActiveIndex(index); setMobileOpen(false); }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-colors duration-150
                  ${activeIndex === index
                    ? 'text-white bg-[#252525] font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-[#1e1e1e]'
                  }`}
              >
                {activeIndex === index && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                )}
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
