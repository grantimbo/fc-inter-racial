import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Breadcrumbs from "../../components/breadcrumbs";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity.image";
import { Achievement } from "@/lib/types";
import { PortableText } from "@portabletext/react";
import { formatDate } from "@/lib/utils";
import AchievementGallery from "../../components/achievement-gallery";

export type ParamsType = {
  params: Promise<{
    slug: string;
  }>;
};

async function getAchievement(slug: string) {
  return await client.fetch<Achievement>(
    `*[_type == "achievement" && slug.current == $slug][0]`,
    { slug },
    { next: { tags: ["achievement"] } },
  );
}

export async function generateMetadata({
  params,
}: ParamsType): Promise<Metadata> {
  const { slug } = await params;
  const achievement = await getAchievement(slug);

  return {
    title: `${achievement?.title ?? "Achievement Not Found"} - FC Inter Racial`,
  };
}

export default async function AchievementPage({ params }: ParamsType) {
  const { slug } = await params;
  const achievement = await getAchievement(slug);

  if (!achievement) return notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20 pb-20 md:pt-36">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <Breadcrumbs
              parentPage="Achievements"
              parentPageLink="/achievements"
              currentPage={achievement.title}
            />
          </div>

          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="relative h-64 w-full bg-gray-100 md:h-96">
              {achievement.coverImage && (
                <Image
                  src={urlFor(achievement.coverImage).url()}
                  alt={achievement.title}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              {achievement.rank && (
                <div className="absolute top-4 right-4 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-[#CC6A4B] shadow-md">
                  {achievement.rank}
                </div>
              )}
            </div>
            <div className="p-8 md:p-12">
              <div className="mb-4 text-sm font-bold tracking-wide text-[#CC6A4B] uppercase">
                {formatDate(achievement.date)}
              </div>
              <h1 className="mb-6 text-3xl font-black text-black md:text-5xl">
                {achievement.title}
              </h1>
              <div className="prose prose-lg mb-8 max-w-none text-gray-600">
                {achievement.details ? (
                  <PortableText value={achievement.details} />
                ) : (
                  <p>{achievement.description}</p>
                )}
              </div>

              {achievement.images && achievement.images.length > 0 && (
                <AchievementGallery
                  images={achievement.images}
                  title={achievement.title}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
