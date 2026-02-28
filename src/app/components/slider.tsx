import { client } from "@/lib/sanity";
import HeroSliderClient from "./heroslider";
import { HeroSlide } from "@/lib/types";

export default async function HeroSlider() {
  // Fetch data on the server
  const slides = await client.fetch<HeroSlide[]>(`
    *[_type == "slide"] | order(date desc) {
      _id,
      title,
      button,
      buttonLink,
      description,
      image
    }
  `);

  return <HeroSliderClient slides={slides} />;
}
