import React from 'react';
import Image from 'next/image';

const OurStory = () => {
  return (
    <section className="bg-white py-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Section Title */}
        <h2 className="text-6xl md:text-7xl font-black mb-16 tracking-tight text-black">
          Our Story
        </h2>

        {/* Story Image Container */}
        <div className="relative w-full aspect-[4/3] md:aspect-video mb-12 overflow-hidden rounded-sm shadow-sm">
          {/* Replace src with your actual uploaded image path */}
          <Image
            src="/imgs/humble-beginnings.png" 
            alt="FC Inter Racial team in their early days"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Sub-heading */}
        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-black">
          Humble Beginnings
        </h3>

        {/* Narrative Description */}
        <p className="text-lg md:text-xl text-gray-800 leading-relaxed max-w-2xl mx-auto font-medium">
          No fancy kits. No perfect pitch. Just passion, unity, and 
          commitment to become better. From a small club people 
          laughed about, to a family of champions.
        </p>
      </div>
    </section>
  );
};

export default OurStory;