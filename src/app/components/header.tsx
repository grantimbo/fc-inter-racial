"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);

      // Active section logic for home page
      if (pathname === "/") {
        const sections = ["news", "our-story"];
        let currentSection = "";
        
        // Add a buffer for the fixed header
        const scrollPosition = window.scrollY + 150;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;
            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              currentSection = section;
            }
          }
        }
        setActiveSection(currentSection);
      } else {
        setActiveSection("");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const headerClasses = [
    "fixed top-0 left-0 right-0 z-50 w-full",
    scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-white",
  ].join(" ");

  const getLinkClass = (path: string, hash?: string) => {
    const baseClass = "text-base font-medium transition-colors";
    let isActive = false;

    if (path === "/players") {
       isActive = pathname.startsWith("/players");
    } else if (path === "/achievements") {
       isActive = pathname.startsWith("/achievements");
    } else if (path === "/gallery") {
       isActive = pathname.startsWith("/gallery");
    } else if (path === "/contact") {
       isActive = pathname === "/contact";
    } else if (path === "/" && hash) {
       isActive = pathname === "/" && activeSection === hash;
    }

    return `${baseClass} ${isActive ? "text-[#CC6A4B] font-bold" : "text-black hover:text-gray-600"}`;
  };

  const smoothScrollToId = (id: string, retries = 20) => {
    const target = document.getElementById(id);
    if (!target) {
      if (retries > 0) {
        setTimeout(() => smoothScrollToId(id, retries - 1), 100);
      }
      return;
    }
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSectionClick = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setOpen(false);
    if (pathname === "/") {
      smoothScrollToId(id);
      window.history.replaceState(null, "", `/#${id}`);
      return;
    }
    router.push(`/#${id}`);
    setTimeout(() => smoothScrollToId(id), 100);
  };

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
            <Link
              href="/#news"
              className={getLinkClass("/", "news")}
              onClick={handleSectionClick("news")}
            >
              News
            </Link>
            <Link href="/players" className={getLinkClass("/players")}>
              Players
            </Link>
            <Link href="/achievements" className={getLinkClass("/achievements")}>
              Achievements
            </Link>
            <Link href="/gallery" className={getLinkClass("/gallery")}>
              Gallery
            </Link>
            <Link
              href="/#our-story"
              className={getLinkClass("/", "our-story")}
              onClick={handleSectionClick("our-story")}
            >
              Our Story
            </Link>
            <Link href="/shop" className={getLinkClass("/shop")}>
              Shop
            </Link>
            <Link href="/contact" className={getLinkClass("/contact")}>
              Contact
            </Link>
          </nav>
        </div>

        {open && (
          <div className="lg:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/#news"
                className={`py-2 ${getLinkClass("/", "news")}`}
                onClick={handleSectionClick("news")}
              >
                News
              </Link>
              <Link
                href="/players"
                className={`py-2 ${getLinkClass("/players")}`}
                onClick={() => setOpen(false)}
              >
                Players
              </Link>
              <Link
                href="/achievements"
                className={`py-2 ${getLinkClass("/achievements")}`}
                onClick={() => setOpen(false)}
              >
                Achievements
              </Link>
              <Link
                href="/gallery"
                className={`py-2 ${getLinkClass("/gallery")}`}
                onClick={() => setOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="/#our-story"
                className={`py-2 ${getLinkClass("/", "our-story")}`}
                onClick={handleSectionClick("our-story")}
              >
                Our Story
              </Link>
              <Link
                href="/shop"
                className={`py-2 ${getLinkClass("/shop")}`}
                onClick={() => setOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/contact"
                className={`py-2 ${getLinkClass("/contact")}`}
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
