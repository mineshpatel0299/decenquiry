"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Logo from "./Logo";

const navLinks = [
  { label: "Projects", href: "https://www.decofice.com/project" },
  { label: "Real Estate Solution", href: "https://www.decofice.com/realestate-solution" },
  { label: "About Us", href: "https://www.decofice.com/about" },
  { label: "Start Your Project", href: "https://www.decofice.com/project-booking" },
  { label: "Resorts", href: "https://resort.decofice.com" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("hasSeenPreloader");
    const delay = hasSeen ? 0 : 2.5;

    gsap.fromTo(
      headerRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className="relative z-30 w-full mx-auto max-w-[1800px] bg-white px-8 py-6 opacity-0 sm:px-12"
    >
      <div className="flex items-center justify-between w-full">
        <a href="/" className="shrink-0 text-[#105E3F] transition-opacity hover:opacity-90">
          <Logo className="w-[50px] h-[48px]" />
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-opensans text-[18px] font-medium leading-none tracking-normal text-neutral-700 transition-colors hover:text-black"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="https://www.decofice.com/contact"
          className="hidden shrink-0 items-center justify-center gap-[10px] rounded-full px-8 py-3.5 h-13 border border-black font-opensans text-[18px] font-medium leading-6 tracking-normal text-black transition-colors hover:bg-neutral-800 hover:text-white lg:inline-flex"
        >
          Contact Us
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="relative z-30 flex h-10 w-10 shrink-0 items-center justify-center text-black lg:hidden"
        >
          <span className="relative block h-4 w-5.5">
            <span
              className={`absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300 ${menuOpen ? "top-1.75 rotate-45" : "top-0 rotate-0"}`}
            />
            <span
              className={`absolute left-0 top-1.75 h-0.5 w-full rounded-full bg-current transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 h-0.5 w-full rounded-full bg-current transition-all duration-300 ${menuOpen ? "top-1.75 -rotate-45" : "top-3.5 rotate-0"}`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav-menu"
        className={`absolute inset-x-4 top-full z-20 origin-top overflow-hidden rounded-2xl border border-neutral-200 bg-white/95 backdrop-blur-sm shadow-xl transition-all duration-300 ease-out lg:hidden ${menuOpen ? "mt-3 max-h-100 opacity-100" : "mt-0 max-h-0 opacity-0"}`}
      >
        <nav className="flex flex-col items-center gap-6 px-6 py-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-opensans text-[18px] font-medium leading-none tracking-normal text-neutral-700 transition-colors hover:text-black"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.decofice.com/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 flex w-full max-w-60 items-center justify-center gap-[10px] rounded-full bg-black px-8 py-3.5 h-13 font-opensans text-[18px] font-medium leading-6 tracking-normal text-white transition-colors hover:bg-neutral-800"
          >
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  );
}
