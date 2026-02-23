'use client'; // This allows hooks

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { urlFor } from '@/lib/sanity.image';
import {  SanityImage} from '@/lib/types';

export interface Slide {
  _id: string;
  title: string;
  description: string;
  image?: SanityImage;
}

export default function HeroSliderClient({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides?.length) return null;

  return (
    <section className="relative w-full h-150 overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${slide.image ? urlFor(slide.image).width(1920).url() : ''})` 
            }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-black via-black/40 to-red-900/40" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-8 flex flex-col justify-center z-20">
   
            <h2 className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              {slide.title?.split(' ')[0]} <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>
                {slide.title?.split(' ').slice(1).join(' ')}
              </span>
            </h2>
            <p className='mt-5 ml-2'>{slide.description}</p>

          </div>
        </div>
      ))}

      {/* Controls - Added z-index to stay on top */}
      <div className="absolute bottom-10 right-10 flex gap-4 z-30">
        <button onClick={prevSlide} className="p-3 border border-white/30 text-white hover:bg-white hover:text-black transition-colors rounded-full">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="p-3 bg-white text-black hover:bg-red-600 hover:text-white transition-colors rounded-full">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
