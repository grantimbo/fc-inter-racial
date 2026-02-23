import { client } from "@/lib/sanity";
import HeroSliderClient from "./heroslider";
import { HeroSlide } from "@/lib/types";

export default async function HeroSlider() {
  // Fetch data on the server
  const slides = await client.fetch<HeroSlide[]>(`
    *[_type == "slide"] | order(_createdAt asc) {
      _id,
      title,
      description,
      image
    }
  `);

  return <HeroSliderClient slides={slides} />;
}
