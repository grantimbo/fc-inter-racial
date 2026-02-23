"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const scrollToHash = (retries = 20) => {
  const hash = window.location.hash;
  if (!hash) return;
  const id = hash.slice(1);
  const target = document.getElementById(id);
  if (!target) {
    if (retries > 0) {
      setTimeout(() => scrollToHash(retries - 1), 100);
    }
    return;
  }
  requestAnimationFrame(() => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
};

export default function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    scrollToHash();
    const handleHashChange = () => scrollToHash();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    scrollToHash();
  }, [pathname]);

  return null;
}
