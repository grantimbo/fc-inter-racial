import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { Player } from "@/lib/types";
import Header from "../../components/header";
import Footer from "../../components/footer";
import PlayerDetails from "../../components/player-details";
import { siteTitle } from "@/lib/seo";
import { cache } from "react";
import { notFound } from "next/navigation";
import { urlFor } from "@/lib/sanity.image";

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

  if (!player) {
    return { title: `Player Not Found - ${siteTitle}` };
  }

  const ogImage = player.profilePicture
    ? urlFor(player.profilePicture)
        .width(1200)
        .height(630)
        .fit("crop")
        .crop("top")
        .url()
    : `/imgs/og-default.jpg`;

  return {
    title: `${player.name} - ${siteTitle}`,
    description: `Official profile for Inter Racial Football Club player ${player.name}.`,
    openGraph: {
      title: `${player.name} - IRFC Player`,
      description: `Official profile for Inter Racial Football Club player ${player.name}.`,
      type: "profile",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${player.name} profile picture`,
        },
      ],
    },
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
