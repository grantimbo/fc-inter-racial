import { Album } from "@/lib/types";
import { urlFor } from "@/lib/sanity.image";
import Link from "next/link";
import Breadcrumbs from "./breadcrumbs";

export default async function Albums({ albums }: { albums: Album[] }) {
  return (
    <section className="scroll-mt-36 bg-white px-4 md:py-36 py-20 font-sans md:scroll-mt-20">
      <div className="mx-auto max-w-6xl text-center">
        <div className="text-left">
            <Breadcrumbs currentPage="Gallery" />
        </div>
        <h2 className="mb-12 text-4xl font-black tracking-tight text-black md:text-6xl">
          Gallery
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {albums.map((album) => (
            <Link
              key={album._id}
              href={`/gallery/${album.slug.current}`}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={urlFor(album.coverImage).width(600).url()}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={album.title}
              />
              <div className="absolute inset-0 flex items-end bg-black/40 p-6">
                <h2 className="text-2xl font-bold text-white uppercase">
                  {album.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
