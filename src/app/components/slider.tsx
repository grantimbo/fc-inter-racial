'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Champions' Spirit",
    subtitle: "SEASON 2025/26",
    image: "/imgs/slide-1.png", // Replace with your uploaded squad image
  },
  {
    id: 2,
    title: "Unity in Diversity",
    subtitle: "OUR STORY",
    image: "/imgs/slide-2.jpg",
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="relative w-full h-[600px] overflow-hidden bg-black">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image with Gradient Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-red-900/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-8 flex flex-col justify-center">
            <p className="text-red-600 font-black tracking-[0.3em] mb-2 text-sm md:text-base">
              {slide.subtitle}
            </p>
            <h2 className="text-white text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
              {slide.title.split(' ')[0]} <br />
              <span className="text-transparent stroke-white" style={{ WebkitTextStroke: '1px white' }}>
                {slide.title.split(' ')[1]}
              </span>
            </h2>
            <button className="mt-8 w-fit bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 transition-transform hover:scale-105 uppercase tracking-widest text-sm">
              View Squad
            </button>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="absolute bottom-10 right-10 flex gap-4">
        <button 
          onClick={prevSlide}
          className="p-3 border border-white/30 text-white hover:bg-white hover:text-black transition-colors rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="p-3 bg-white text-black hover:bg-red-600 hover:text-white transition-colors rounded-full"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-10 flex gap-2">
        {slides.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 transition-all duration-300 ${i === current ? 'w-12 bg-red-600' : 'w-6 bg-white/30'}`} 
          />
        ))}
      </div>
    </section>
  );
}