import React from 'react';
import Image from 'next/image';
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
  
            <Image alt='Kebab Kings' src="/imgs/kebabkings.png" width={812/2} height={193/2} />
            <Image alt='Breakroom Cafe' src="/imgs/breakroom.png" width={507/2} height={351/2}/>
   
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