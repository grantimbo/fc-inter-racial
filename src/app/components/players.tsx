'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const categories = [
  'COACHING STAFF', 'FORWARDS', 'MIDFIELDERS', 'DEFENDERS', 'GOALKEEPERS'
];

const players = [
  { id: 1, name: 'João Cancelo', position: 'DEFENDERS', image: '/cancelo.jpg' },
  { id: 2, name: 'Alejandro Balde', position: 'DEFENDERS', image: '/balde.jpg' },
  { id: 3, name: 'Ronald Araújo', position: 'DEFENDERS', image: '/araujo.jpg' },
];

export default function PlayersSection() {
  const [activeTab, setActiveTab] = useState('DEFENDERS');

  return (
    <section className="bg-white py-16 px-4 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        {/* Main Title */}
        <h2 className="text-6xl font-black mb-12 tracking-tight text-black">
          Players
        </h2>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 border border-gray-300 rounded-md text-sm font-bold tracking-widest transition-all
                ${activeTab === cat ? 'bg-black text-white border-black' : 'text-black hover:bg-gray-100'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Active Category Heading */}
        <h3 className="text-2xl font-bold mb-8 tracking-widest text-gray-800 uppercase italic">
          {activeTab}
        </h3>

        {/* Player Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {players.map((player) => (
            <div key={player.id} className="relative aspect-[4/5] overflow-hidden bg-gray-200 group">
              {/* Replace with actual Next.js Image component when you have the files */}
              <div className="w-full h-full bg-gradient-to-br from-blue-900 via-red-900 to-blue-800 flex items-end">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <p className="text-white p-4 font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                  {player.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}