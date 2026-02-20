'use client';

import React from 'react';
import Link from 'next/link';

// --- Types & Interfaces ---

type Position = 'COACHING' | 'FORWARDS' | 'MIDFIELDERS' | 'DEFENDERS' | 'GOALKEEPERS';

interface Player {
  id: number;
  name: string;
  position: Position;
  image?: string; // Optional if not all players have images yet
}

interface Category {
  label: string;
  id: string;
  filter: Position;
}

// --- Sub-Components ---

const PlayerCard: React.FC<{ player: Player }> = ({ player }) => (
  <div className="relative aspect-[4/5] overflow-hidden bg-gray-200 group">
    <div className="w-full h-full bg-gradient-to-br from-blue-900 via-red-900 to-blue-800 flex items-end">
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
      <p className="text-white p-4 font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
        {player.name}
      </p>
    </div>
  </div>
);

interface PlayerGroupProps {
  title: string;
  id: string;
  players: Player[];
}

const PlayerGroup: React.FC<PlayerGroupProps> = ({ title, id, players }) => {
  if (players.length === 0) return null;
  
  return (
    <div className="mb-16">
      <h3 id={id} className="text-2xl font-bold mb-8 tracking-widest text-gray-800 uppercase">
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-4">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
};

// --- Data ---

const categories: Category[] = [
  { label: 'COACHING STAFF', id: 'coaching', filter: 'COACHING' },
  { label: 'FORWARDS', id: 'forwards', filter: 'FORWARDS' },
  { label: 'MIDFIELDERS', id: 'midfielders', filter: 'MIDFIELDERS' },
  { label: 'DEFENDERS', id: 'defenders', filter: 'DEFENDERS' },
  { label: 'GOALKEEPERS', id: 'goalkeepers', filter: 'GOALKEEPERS' },
];

const players: Player[] = [
  { id: 1, name: 'João Cancelo', position: 'FORWARDS' },
  { id: 2, name: 'Alejandro Balde', position: 'FORWARDS' },
  { id: 3, name: 'Ronald Araújo', position: 'FORWARDS' },
  { id: 4, name: 'Ronald Jethro', position: 'DEFENDERS' },
  { id: 5, name: 'Grant Imbo', position: 'DEFENDERS' },
  { id: 6, name: 'Danilo Webber', position: 'DEFENDERS' },
  { id: 7, name: 'Froilan Araújo', position: 'DEFENDERS' },
  { id: 8, name: 'John Rey Bautista', position: 'MIDFIELDERS' },
  { id: 9, name: 'Jem Rey', position: 'MIDFIELDERS' },
  { id: 10, name: 'Flo Griez', position: 'MIDFIELDERS' },
  { id: 11, name: 'Nathaniel', position: 'MIDFIELDERS' },
  { id: 12, name: 'Jeddia', position: 'MIDFIELDERS' },
  { id: 13, name: 'Araújo', position: 'DEFENDERS' },
  { id: 14, name: 'Jem Rey', position: 'GOALKEEPERS' },
  { id: 15, name: 'Flo Griez', position: 'GOALKEEPERS' },
  { id: 16, name: 'Nathaniel', position: 'GOALKEEPERS' },
  { id: 17, name: 'Jeddia', position: 'GOALKEEPERS' },
  { id: 18, name: 'Araújo', position: 'COACHING' },
];

// --- Main Component ---

export default function PlayersSection() {
  return (
    <section className="bg-white py-16 px-4 font-sans" id="players">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-6xl font-black mb-12 tracking-tight text-black">
          Players
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <Link
              href={`#${cat.id}`}
              key={cat.id}
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-bold tracking-widest transition-all text-black hover:bg-gray-100"
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {categories.map((cat) => (
          <PlayerGroup
            key={cat.id}
            id={cat.id}
            title={cat.label}
            players={players.filter((p) => p.position === cat.filter)}
          />
        ))}
      </div>
    </section>
  );
}