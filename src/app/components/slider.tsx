import { client } from '@/lib/sanity';
import HeroSliderClient from './heroslider';


export interface Slide {
  _id: string;
  title: string;
  subtitle: string;
  image?: string;
}

export default async function HeroSlider() {
  // Fetch data on the server
  const slides = await client.fetch<Slide[]>(`
    *[_type == "slide"] | order(_createdAt asc) {
      _id,
      title,
      description,
      image
    }
  `);

  return <HeroSliderClient slides={slides} />;
}