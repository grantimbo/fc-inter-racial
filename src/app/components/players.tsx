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
  <div className="relative aspect-[4/5] overflow-hidden bg-gray-200 group rounded-md">
    <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-300 to-gray-100 flex items-end ">
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
  { id: 1, name: 'Acodesin Adana Archie', position: 'MIDFIELDERS' },
  { id: 2, name: 'Alexander Joaquin Alcantara', position: 'MIDFIELDERS' },
  { id: 3, name: 'Amir Tahmasebi', position: 'GOALKEEPERS' },
  { id: 4, name: 'Andrei Guivencan', position: 'DEFENDERS' },
  { id: 5, name: 'Arriz Acodesin', position: 'MIDFIELDERS' },
  { id: 6, name: 'Bautista Jay Vee', position: 'DEFENDERS' },
  { id: 7, name: 'Charles Andrew Torres', position: 'FORWARDS' },
  { id: 8, name: 'Dael Mapula', position: 'GOALKEEPERS' },
  { id: 9, name: 'Dale Christian', position: 'DEFENDERS' },
  { id: 10, name: 'Danilo Weber', position: 'DEFENDERS' },
  { id: 11, name: 'Das Malindi Snr', position: 'FORWARDS' },
  { id: 12, name: 'Engr Cleo Ed Lumaya', position: 'FORWARDS' },
  { id: 13, name: 'Eric Van Gemert', position: 'FORWARDS' },
  { id: 14, name: 'Flo Gries', position: 'MIDFIELDERS' },
  { id: 15, name: 'Flo Ryan', position: 'DEFENDERS' },
  { id: 16, name: 'Froilan Praise Bendanillo', position: 'DEFENDERS' },
  { id: 17, name: 'Godly Toro', position: 'DEFENDERS' },
  { id: 18, name: 'Grant Imbo', position: 'DEFENDERS' },
  { id: 19, name: 'Gucor Mark Anthony', position: 'GOALKEEPERS' },
  { id: 20, name: 'Jack Dudley', position: 'FORWARDS' },
  { id: 21, name: 'James Clark Villareal', position: 'MIDFIELDERS' },
  { id: 22, name: 'James Rufert Lising', position: 'DEFENDERS' },
  { id: 23, name: 'Jasper Truita Juliano', position: 'DEFENDERS' },
  { id: 24, name: 'Jedidiah Christopher Keleghan', position: 'MIDFIELDERS' },
  { id: 25, name: 'Jerus MatDelfino', position: 'FORWARDS' },
  { id: 26, name: 'Jeth Mike', position: 'FORWARDS' },
  { id: 27, name: 'John Basul', position: 'FORWARDS' },
  { id: 28, name: 'John Gustav Bjørgan', position: 'COACHING' },
  { id: 29, name: 'John Kenneth Chavez', position: 'FORWARDS' },
  { id: 30, name: 'John Michael', position: 'DEFENDERS' },
  { id: 31, name: 'John Rey Bautista', position: 'MIDFIELDERS' },
  { id: 32, name: 'John Rey Bauyan', position: 'GOALKEEPERS' },
  { id: 33, name: 'Josean Paolo Kilakiga', position: 'DEFENDERS' },
  { id: 34, name: 'Kazushi Nagata', position: 'FORWARDS' },
  { id: 35, name: 'Kent Angelo Jabonillo', position: 'DEFENDERS' },
  { id: 36, name: 'Kyle Pabes', position: 'FORWARDS' },
  { id: 37, name: 'Larry Zhou', position: 'DEFENDERS' },
  { id: 38, name: 'Mark Gil Huang', position: 'MIDFIELDERS' },
  { id: 39, name: 'Matéo Linzee', position: 'COACHING' },
  { id: 40, name: 'Mattchooh Matty Senerpsz', position: 'DEFENDERS' },
  { id: 41, name: 'Maurice Alabado', position: 'MIDFIELDERS' },
  { id: 42, name: 'Nathaniel Cabilao', position: 'MIDFIELDERS' },
  { id: 43, name: 'Nicol Eltanal', position: 'FORWARDS' },
  { id: 44, name: 'Nilonick Narciso', position: 'GOALKEEPERS' },
  { id: 45, name: 'Rafael Vito Baga Lagahit', position: 'DEFENDERS' },
  { id: 46, name: 'Ramses', position: 'FORWARDS' },
  { id: 47, name: 'Reiden Lopez', position: 'MIDFIELDERS' },
  { id: 48, name: 'Reigh Jem', position: 'MIDFIELDERS' },
  { id: 49, name: 'Robert Cole', position: 'GOALKEEPERS' },
  { id: 50, name: 'Robert Son', position: 'FORWARDS' },
  { id: 51, name: 'Romeo Leal', position: 'FORWARDS' },
  { id: 52, name: 'Ronald Jethro Campos Grio', position: 'DEFENDERS' },
  { id: 53, name: 'Sebastian Parcon', position: 'FORWARDS' },
  { id: 54, name: 'Steven Bruce', position: 'FORWARDS' },
  { id: 55, name: 'Sunao Ito', position: 'DEFENDERS' },
  { id: 56, name: 'Sunday Albina Buling', position: 'DEFENDERS' },
  { id: 57, name: 'Tal Solal', position: 'DEFENDERS' },
  { id: 58, name: 'Tyler Mariano', position: 'GOALKEEPERS' },
  { id: 59, name: 'Yan Xian Ming', position: 'DEFENDERS' },
  { id: 60, name: 'Zynch Saguidan', position: 'DEFENDERS' }
]




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