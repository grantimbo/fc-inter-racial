import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { Player } from "@/lib/types";
import Header from "../../components/header";
import Footer from "../../components/footer";
import PlayerDetails from "../../components/player-details";
import { siteTitle } from "@/lib/seo";
import { cache } from "react";
import { notFound } from "next/navigation";

// Update the type to reflect that params is a Promise
export type ParamsType = {
  params: Promise<{
    slug: string;
  }>;
};

// 1. Wrap the fetch call in React's cache function
const getPlayer = cache(async (slug: string) => {
  const player = await client.fetch<Player[]>(
    `*[_type == "player" && slug.current == $slug]`,
    { slug },
  );
  return player?.[0] || null;
});

export async function generateMetadata({
  params,
}: ParamsType): Promise<Metadata> {
  const { slug } = await params;
  const player = await getPlayer(slug);

  return {
    title: `${player?.name ?? "Player Not Found"} - ${siteTitle}`,
  };
}

export default async function PlayerProfile({ params }: ParamsType) {
  const { slug } = await params;
  const playerData = await getPlayer(slug);

  if (!playerData) return notFound();

  return (
    <>
      <Header />
      <PlayerDetails player={playerData} />
      <Footer />
    </>
  );
}
