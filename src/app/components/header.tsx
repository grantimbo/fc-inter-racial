import React from 'react';
import Link from 'next/link';


const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center border-2 border-black rounded-full">
            {/* Replace with <img src="/logo.png" /> for the actual tiger logo */}
            </div>
            <h1 className="text-3xl font-black tracking-tight text-black font-sans uppercase">
              FC Inter Racial
            </h1>
          </div>

          <nav className="hidden md:flex space-x-12">
            <Link href="/news" className="text-xl font-medium text-black hover:text-gray-600 transition-colors">
              News
            </Link>
            <Link href="/players" className="text-xl font-medium text-black hover:text-gray-600 transition-colors">
              Players
            </Link>
            <Link href="/story" className="text-xl font-medium text-black hover:text-gray-600 transition-colors">
              Our Story
            </Link>
          </nav>
        </div>
      </div>

    </header>
  );
};

export default Header;