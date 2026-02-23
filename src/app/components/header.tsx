"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClasses = [
    "fixed top-0 left-0 right-0 z-50 w-full",
    scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white",
  ].join(" ");

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16 md:h-20 pr-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 md:w-14 md:h-14 flex overflow-hidden items-center justify-center rounded-full">
              <Image alt="Inter Racial" src="/imgs/logo.jpg" fill sizes="56px" className="object-cover" />
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-black">
              FC Inter Racial
            </h1>
          </Link>

          <button
            type="button"
            aria-label="Toggle navigation"
            className="absolute right-0 top-1/2 -translate-y-1/2 flex lg:hidden items-center justify-center w-10 h-10 text-black z-10"
            onClick={() => setOpen((prev) => !prev)}
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <nav className="hidden lg:flex ml-auto space-x-10">
            <Link href="#news" className="text-base font-medium text-black hover:text-gray-600 transition-colors">
              News
            </Link>
            <Link href="/players" className="text-xl font-medium text-black hover:text-gray-600 transition-colors">
              Players
            </Link>
            <Link href="#our-story" className="text-base font-medium text-black hover:text-gray-600 transition-colors">
              Our Story
            </Link>
          </nav>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <Link
                href="#news"
                className="py-2 text-base font-medium text-black hover:text-gray-600 transition-colors"
                onClick={() => setOpen(false)}
              >
                News
              </Link>
              <Link
                href="#players"
                className="py-2 text-base font-medium text-black hover:text-gray-600 transition-colors"
                onClick={() => setOpen(false)}
              >
                Players
              </Link>
              <Link
                href="#our-story"
                className="py-2 text-base font-medium text-black hover:text-gray-600 transition-colors"
                onClick={() => setOpen(false)}
              >
                Our Story
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
