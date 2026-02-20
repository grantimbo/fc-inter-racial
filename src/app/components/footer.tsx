import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const partners = [
    { name: 'T-Mobile', logo: 'T' }, // Replace with SVG or Image
    { name: 'Adidas', logo: '/adidas.svg' },
    { name: 'Allianz', logo: 'Allianz' },
    { name: 'Audi', logo: 'Audi' },
  ];

  return (
    <footer className="bg-black text-white py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Partners Section */}
        <section className="mb-24 w-full">
          <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">
            Partners
          </h2>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-90">
            {/* Using text/div placeholders for logos; swap with <img> tags for production */}
            <div className="text-5xl font-bold tracking-tighter">T</div>
            <div className="w-16 h-10 bg-white/20 rounded-sm"></div> {/* Adidas Placeholder */}
            <div className="text-3xl font-semibold tracking-tight">Allianz (II)</div>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 border-2 border-white rounded-full -ml-2 first:ml-0" />
              ))}
            </div> {/* Audi Placeholder */}
          </div>
        </section>

        {/* Social Icons */}
        <div className="flex gap-8 mb-10">
          <a href="#" className="hover:opacity-70 transition-opacity p-2 border border-white rounded-full">
            <Facebook size={24} strokeWidth={1.5} />
          </a>
          <a href="#" className="hover:opacity-70 transition-opacity p-2 border border-white rounded-full">
            <Instagram size={24} strokeWidth={1.5} />
          </a>
          <a href="#" className="hover:opacity-70 transition-opacity p-2 border border-white rounded-full">
            <Youtube size={24} strokeWidth={1.5} />
          </a>
        </div>

        {/* Legal & Credits */}
        <div className="text-center space-y-4">
          <p className="text-lg font-medium text-gray-300">
            Copyright @ 2026.
          </p>
          <p className="text-sm text-gray-500 tracking-wide font-light">
            This website is built by <span className="text-gray-300">Grant Imbo</span> and <span className="text-gray-300">John Rey Bautista</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;