"use client";

import { useState, useEffect, useCallback } from "react";
import { urlFor } from "@/lib/sanity.image";
import { Album } from "@/lib/types";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Breadcrumbs from "./breadcrumbs";
import Image from "next/image";

interface AlbumDetailsProps {
  album: Album;
}

export default function AlbumPictures({ album }: AlbumDetailsProps) {
  // Track index to enable math-based looping
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const images = album.images || [];

  const handleNext = useCallback(
    (e?: React.MouseEvent | React.TouchEvent) => {
      e?.stopPropagation();
      setSelectedIndex((prev) =>
        prev !== null ? (prev + 1) % images.length : 0,
      );
    },
    [images.length],
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent | React.TouchEvent) => {
      e?.stopPropagation();
      setSelectedIndex((prev) =>
        prev !== null
          ? (prev - 1 + images.length) % images.length
          : images.length - 1,
      );
    },
    [images.length],
  );

  const closeLightbox = () => setSelectedIndex(null);

  // 1. Swipe Logic for Modal
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (distance > 50) handleNext(); // Swipe Left -> Next
    if (distance < -50) handlePrev(); // Swipe Right -> Prev
    setTouchStart(null);
  };

  // 2. Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  return (
    <section className="scroll-mt-36 bg-white px-4 py-20 font-sans md:scroll-mt-20 md:py-36">
      <div className="mx-auto max-w-6xl text-center">
        <Breadcrumbs
          currentPage={album.title}
          parentPage="Gallery"
          parentPageLink="/gallery"
        />
        <h2 className="mb-4 text-4xl font-black tracking-tight text-black md:text-6xl">
          {album.title}
        </h2>
        <p className="mb-16">{album.description}</p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className="group relative cursor-pointer overflow-hidden rounded bg-gray-200 shadow-lg transition-all hover:ring-2 hover:ring-black"
            >
              <Image
                width={400}
                height={400}
                src={urlFor(img).width(400).height(400).fit("crop").url()}
                alt={`Gallery item ${idx + 1}`}
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10"
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 z-60 cursor-pointer rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white hover:text-black"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-4 z-60 cursor-pointer rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white hover:text-black md:left-10"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              <ChevronLeft size={48} />
            </button>

            {/* Image Container */}
            <div
              className="pointer-events-none relative flex h-full w-full items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={urlFor(images[selectedIndex]).url()}
                className="pointer-events-auto max-h-full max-w-full rounded shadow-2xl transition-all duration-300 select-none"
                alt="Enlarged gallery item"
              />

              {/* Counter */}
              <div className="absolute -bottom-10 text-sm font-medium tracking-widest text-white/50">
                {selectedIndex + 1} / {images.length}
              </div>
            </div>

            {/* Next Button */}
            <button
              className="absolute right-4 z-60 cursor-pointer rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white hover:text-black md:right-10"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <ChevronRight size={48} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
