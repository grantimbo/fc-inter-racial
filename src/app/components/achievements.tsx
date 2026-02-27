import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "./breadcrumbs";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanity.image";
import { Achievement } from "@/lib/types";
import { formatDate } from "@/lib/utils";

async function getAchievements() {
  return await client.fetch<Achievement[]>(
    `*[_type == "achievement"] | order(date desc)`
  );
}

const AchievementsSection = async () => {
  const achievements = await getAchievements();

  return (
    <section className="scroll-mt-36 bg-white px-4 md:py-36 py-20 font-sans md:scroll-mt-20">
      <div className="mx-auto max-w-6xl text-center">
        <div className="text-left">
          <Breadcrumbs
            currentPage="Achievements"
          />
        </div>
        <h2 className="mb-12 text-4xl font-black tracking-tight text-black md:text-6xl">
          Achievements
        </h2>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <Link key={achievement._id} href={`/achievements/${achievement.slug.current}`} className="block group">
              <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-md h-full">
                <div className="relative h-48 w-full bg-gray-100">
                  {achievement.coverImage && (
                    <Image
                      src={urlFor(achievement.coverImage).url()}
                      alt={achievement.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  {achievement.rank && (
                    <div className="absolute top-2 right-2 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-[#CC6A4B] shadow-sm">
                      {achievement.rank}
                    </div>
                  )}
                </div>
                <div className="p-6 text-left">
                  <div className="mb-2 text-sm font-bold text-[#CC6A4B]">{formatDate(achievement.date)}</div>
                  <h3 className="mb-2 text-xl font-bold text-black group-hover:text-[#CC6A4B] transition-colors">{achievement.title}</h3>
                  <p className="text-gray-600 line-clamp-3">{achievement.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
