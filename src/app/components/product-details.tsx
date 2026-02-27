"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "@/lib/sanity.image";
import { Product } from "@/lib/types";
import Breadcrumbs from "./breadcrumbs";
import { formatValueToTitle } from "@/lib/utils";

export default function ProductDetails({ product }: { product: Product }) {
  // 1. Combine images into a single array
  const allImages = [product.mainImage, ...(product.images || [])];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // 2. Loop Logic for Arrows
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  // 3. Swipe Logic
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    // Threshold of 50px to trigger swipe
    if (distance > 50) nextImage(); // Swipe Left -> Next
    if (distance < -50) prevImage(); // Swipe Right -> Prev
    setTouchStart(null);
  };

  return (
    <div className="scroll-mt-36 bg-white px-4 py-20 font-sans md:scroll-mt-20 md:py-36">
      <div className="mx-auto max-w-6xl">
        {/* 1. Breadcrumb Component (from your 1st image) */}
        <Breadcrumbs
          parentPage="Shop"
          parentPageLink="/shop"
          parentPage2={formatValueToTitle(product.category)}
          parentPageLink2={`/shop/${product.category}`}
          currentPage={product.name}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* 2. Left: Thumbnail Sidebar */}
          <div className="hidden flex-col space-y-3 lg:col-span-1 lg:flex">
            {allImages.map((img, i) => (
              <div
                key={img.asset._ref || i}
                onClick={() => setCurrentIndex(i)} // Thumbnail Click Function
                className={`aspect-square w-full cursor-pointer overflow-hidden rounded-sm bg-gray-100 transition-all ${
                  currentIndex === i
                    ? "ring-2 ring-black"
                    : "ring-gray-400 hover:ring-1"
                }`}
              >
                <Image
                  src={urlFor(img).width(100).height(100).fit("crop").url()}
                  alt={`${product.name} thumb ${i}`}
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* 3. Center: Main Image Gallery */}
          <div
            className="group relative overflow-hidden bg-gray-100 lg:col-span-6"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={urlFor(allImages[currentIndex]).width(800).url()}
                alt={product.name}
                fill
                priority
                className="object-cover transition-opacity duration-300"
              />
            </div>

            {/* Navigation Arrows */}
            <div className="absolute right-6 bottom-6 flex space-x-2">
              <button
                onClick={prevImage}
                className="rounded-full bg-white p-3 shadow-md transition-transform hover:bg-gray-100 active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="rounded-full bg-white p-3 shadow-md transition-transform hover:bg-gray-100 active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* 4. Right: Product Info */}
          <div className="flex flex-col lg:col-span-5">
            <span className="text-sm font-medium text-orange-700">
              {formatValueToTitle(product.status)}
            </span>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              {product.name}
            </h1>
            <p className="text-gray-600">
              Inter Racial {formatValueToTitle(product.category)}
            </p>
            <p className="mt-4 text-xl font-bold">₱{product.price}</p>

            {/* Description */}
            <div className="mt-8 space-y-6 leading-relaxed text-gray-800">
              <p className="text-sm">{product.description}</p>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <a
                href={product.buttonLink}
                className={`block w-full rounded-md bg-black py-5 text-center text-lg font-bold text-white transition-colors hover:bg-zinc-800 ${product.buttonLink ? "cursor-pointer" : "cursor-not-allowed"}`}
              >
                {product.button}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
