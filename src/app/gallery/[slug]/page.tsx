import { client } from "@/lib/sanity";
import { Album } from "@/lib/types";
import { cache } from "react";
import { Metadata } from "next";
import Header from "../../components/header";
import Footer from "../../components/footer";
import AlbumPictures from "../../components/album-pictures";
import { siteTitle } from "@/lib/seo";
import { notFound } from "next/navigation";

export type ParamsType = {
  params: Promise<{
    slug: string;
  }>;
};

// 1. Wrap the fetch call in React's cache function
const getAlbum = cache(async (slug: string) => {
  const album = await client.fetch<Album[]>(
    `*[_type == "album" && slug.current == $slug]`,
    { slug },
    { next: { tags: ["album"] } },
  );
  return album?.[0] || null;
});

export async function generateMetadata({
  params,
}: ParamsType): Promise<Metadata> {
  const { slug } = await params;
  const album = await getAlbum(slug);

  return {
    title: `${album?.title ?? "Album Not Found"} - ${siteTitle}`,
  };
}

export default async function AlbumDetails({ params }: ParamsType) {
  const { slug } = await params;
  const albumDetails = await getAlbum(slug);

  if (!albumDetails) return notFound();

  return (
    <div>
      <Header />
      <AlbumPictures album={albumDetails} />
      <Footer />
    </div>
  );
}
