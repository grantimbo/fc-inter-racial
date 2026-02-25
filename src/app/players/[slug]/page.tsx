import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { Player } from "@/lib/types";
import Header from "../../components/header";
import Footer from "../../components/footer";
import PlayerDetails from "../../components/player-details";

// Update the type to reflect that params is a Promise
export type ParamsType = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ParamsType): Promise<Metadata> {
  const { slug } = await params;

  const player = await client.fetch<Player[]>(
    `*[_type == "player" && slug.current == $slug]`,
    { slug },
  );

  if (!player || player.length === 0) {
    return {
      title: "Inter Racial Football Club - Player",
    };
  }

  return {
    title: `Inter Racial Football Club - ${player[0].name}`,
  };
}

export default async function PlayerProfile({ params }: ParamsType) {
  // 1. Unwrapping the params promise
  const { slug } = await params;

  // 2. Using parameterized query (Security: Avoid string interpolation)
  const player = await client.fetch<Player[]>(
    `*[_type == "player" && slug.current == $slug]`,
    { slug },
  );

  if (!player || player.length === 0) return <div>Player not found</div>;

  const playerData = player[0];

  return (
    <div>
      <Header />
      <PlayerDetails player={playerData} />
      <Footer />
    </div>
  );
}
