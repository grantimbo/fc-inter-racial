import { client } from "@/lib/sanity";
import { Album } from "@/lib/types";
import { Metadata } from "next";
import Albums from "../components/albums";
import Header from "../components/header";
import Footer from "../components/footer";
import { siteTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Gallery - ${siteTitle}`,
};

export default async function GalleryPage() {
  const albums = await client.fetch<Album[]>(
    `*[_type == "album"]{ _id, title, slug, coverImage }`,
  );

  return (
    <>
      <Header />
      <Albums albums={albums} />
      <Footer />
    </>
  );
}
