import Link from 'next/link';
import { client } from '@/lib/sanity'
import { urlFor } from '@/lib/sanity.image';
import { Player , SanityImage} from '@/lib/types';

// --- Types ---
type Position = 'CH' | 'FW' | 'MF' | 'DF' | 'GK';


interface Category {
  label: string;
  id: string;
  filter: Position;
}


interface PlayerProps {
  profilePicture: SanityImage;
  name: string;
}

const PlayerThumbnail = ({ profilePicture, name }: PlayerProps) => {
  return (
    <img 
      src={urlFor(profilePicture)
        .width(600) // Increase this if it looks blurry
        .auto('format') // Let Sanity decide the best format automatically
        .url()}
      // TS now knows image.alt exists or might be undefined
      alt={profilePicture.alt || name} 
      loading="lazy"
      className='object-cover'
    />
  );
};

// --- Sub-Components ---
const PlayerCard = ({ player }: { player: Player }) => (
  <a href={`/players/${player.slug.current}`} className="relative aspect-4/5 overflow-hidden bg-gray-200 group rounded-md">
    <div className="w-full h-full bg-linear-to-br from-gray-100 via-gray-300 to-gray-100 flex items-end">
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
     
      <p className="text-white p-3 font-bold uppercase tracking-tighter absolute w-full bg-linear-to-t from-gray-500 to-transparent">
        {player.name}
      </p>
       {player.profilePicture && (
          <PlayerThumbnail profilePicture={player.profilePicture} name={player.name} />
      )}
    </div>
  </a>
);

const PlayerGroup = ({ title, id, players }: { title: string; id: string; players: Player[] }) => {
  if (players.length === 0) return null;
  return (
    <div className="mb-16">
      <h3 id={id} className="text-xl md:text-2xl font-bold mb-8 tracking-widest text-gray-800 uppercase">
        {title}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {players.map((player) => (
          <PlayerCard key={player._id} player={player} />
        ))}
      </div>
    </div>
  );
};

// --- Config ---
const categories: Category[] = [
  { label: 'COACHING STAFF', id: 'coaching', filter: 'CH' },
  { label: 'FORWARDS', id: 'forwards', filter: 'FW' },
  { label: 'MIDFIELDERS', id: 'midfielders', filter: 'MF' },
  { label: 'DEFENDERS', id: 'defenders', filter: 'DF' },
  { label: 'GOALKEEPERS', id: 'goalkeepers', filter: 'GK' },
];

// --- Main Server Component ---
export default async function PlayersSection() {
  // Fetch data directly in the component
  const players = await client.fetch<Player[]>(
    `*[_type == "player"] | order(name asc)`
  );



  return (
    <section className="bg-white py-16 px-4 font-sans" id="players">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tight text-black">
          Players
        </h2>

        {/* Navigation Links */}
        <div className="hidden flex-md flex-wrap justify-center gap-3 mb-16">
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

        {/* Render Groups */}
        {categories.map((cat) => {
          // Filter players by position (case-insensitive for safety)
          const filteredPlayers = players.filter(
            (p) => p.position === cat.filter
          );


          return (
            <PlayerGroup
              key={cat.id}
              id={cat.id}
              title={cat.label}
              players={filteredPlayers}
            />
          );
        })}
      </div>
    </section>
  );
}