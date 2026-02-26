import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity.image";
import { Player, SanityImage } from "@/lib/types";
import Breadcrumbs from "./breadcrumbs";

// --- Types ---
type Position = "CH" | "FW" | "MF" | "DF" | "GK";

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
        .auto("format") // Let Sanity decide the best format automatically
        .url()}
      // TS now knows image.alt exists or might be undefined
      alt={profilePicture.alt || name}
      loading="lazy"
      className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
};

// --- Sub-Components ---
const PlayerCard = ({ player }: { player: Player }) => (
  <a
    href={`/players/${player.slug.current}`}
    className="group relative aspect-4/5 overflow-hidden rounded-md bg-gray-200 transition-all hover:ring-2 hover:ring-gray-600"
  >
    <div className="flex h-full w-full items-end bg-linear-to-br from-gray-100 via-gray-300 to-gray-100">
      <div className="absolute inset-0 z-10 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />

      <p className="absolute z-20 w-full bg-linear-to-t from-gray-500 to-transparent p-2 pt-5 font-bold tracking-tighter text-white uppercase">
        {player.name}
      </p>

      {player.profilePicture ? (
        <PlayerThumbnail
          profilePicture={player.profilePicture}
          name={player.name}
        />
      ) : (
        <Image
          width={896}
          height={1120}
          alt="Unknown player"
          src="/imgs/profile-placeholder.png"
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </div>
  </a>
);

const PlayerGroup = ({
  title,
  id,
  players,
}: {
  title: string;
  id: string;
  players: Player[];
}) => {
  if (players.length === 0) return null;
  return (
    <div className="mb-16">
      <h3
        id={id}
        className="mb-8 text-xl font-bold tracking-widest text-gray-800 uppercase md:text-2xl"
      >
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {players.map((player) => (
          <PlayerCard key={player._id} player={player} />
        ))}
      </div>
    </div>
  );
};

// --- Config ---
const categories: Category[] = [
  { label: "COACHING STAFF", id: "coaching", filter: "CH" },
  { label: "FORWARDS", id: "forwards", filter: "FW" },
  { label: "MIDFIELDERS", id: "midfielders", filter: "MF" },
  { label: "DEFENDERS", id: "defenders", filter: "DF" },
  { label: "GOALKEEPERS", id: "goalkeepers", filter: "GK" },
];

// --- Main Server Component ---
export default async function PlayersSection({
  showBreadcrumbs = false,
}: {
  showBreadcrumbs?: boolean;
}) {
  // Fetch data directly in the component
  const players = await client.fetch<Player[]>(
    `*[_type == "player"] | order(name asc)`,
  );

  return (
    <section
      className="scroll-mt-36 bg-white px-4 py-20 font-sans md:scroll-mt-20 md:py-36"
      id="players"
    >
      <div className="mx-auto max-w-6xl text-center">
        {showBreadcrumbs && (
          <div className="text-left">
            <Breadcrumbs currentPage="Players" />
          </div>
        )}
        <h2 className="mb-12 text-4xl font-black tracking-tight text-black md:text-6xl">
          Players
        </h2>

        {/* Navigation Links */}
        <div className="flex-md mb-16 hidden flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <Link
              href={`#${cat.id}`}
              key={cat.id}
              className="rounded-md border border-gray-300 px-6 py-2 text-sm font-bold tracking-widest text-black transition-all hover:bg-gray-100"
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {/* Render Groups */}
        {categories.map((cat) => {
          // Filter players by position (case-insensitive for safety)
          const filteredPlayers = players.filter(
            (p) => p.position === cat.filter,
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
