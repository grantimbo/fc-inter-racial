import { client } from '@/lib/sanity'
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/lib/sanity.image';
import { Player, SanityImage } from '@/lib/types';
import Header from '../../components/header';

// Update the type to reflect that params is a Promise
export type ParamsType = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PlayerProfile({ params }: ParamsType) {
  // 1. Unwrapping the params promise
  const { slug } = await params;

  // 2. Using parameterized query (Security: Avoid string interpolation)
  const player = await client.fetch<Player[]>(
    `*[_type == "player" && slug.current == $slug]`,
    { slug }
  );

  if (!player || player.length === 0) return <div>Player not found</div>;

  const playerData = player[0];

  return (

    <div>
      <Header/>
      {/* // TODO: make a player card */}
      <h1>{playerData.name}</h1>
    </div>
  );
}