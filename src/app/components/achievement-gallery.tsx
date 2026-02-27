"use client";

import { useState, useEffect, useCallback } from "react";
import { urlFor } from "@/lib/sanity.image";
import { SanityImage } from "@/lib/types";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

interface AchievementGalleryProps {
  images: SanityImage[];
  title: string;
}

export default function AchievementGallery({ images, title }: AchievementGalleryProps) {
  // Track index to enable math-based looping
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedIndex((prev) =>
        prev !== null ? (prev + 1) % images.length : 0,
      );
    },
    [images.length],
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
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

  // Keyboard navigation
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

  if (!images || images.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Gallery</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className="group relative h-64 w-full cursor-pointer overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-all hover:ring-2 hover:ring-[#CC6A4B]"
          >
            <Image
              src={urlFor(img).width(600).height(400).fit("crop").url()}
              alt={`${title} image ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 z-50 cursor-pointer rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-4 z-50 cursor-pointer rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:left-10"
            onClick={handlePrev}
          >
            <ChevronLeft size={48} />
          </button>

          {/* Image Container */}
          <div
            className="relative flex h-full w-full items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlFor(images[selectedIndex]).url()}
              className="max-h-full max-w-full rounded shadow-2xl transition-all duration-300"
              alt={`${title} - Gallery item ${selectedIndex + 1}`}
            />
            
            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-medium tracking-widest text-white/70">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>

          {/* Next Button */}
          <button
            className="absolute right-4 z-50 cursor-pointer rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:right-10"
            onClick={handleNext}
          >
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </div>
  );
}
