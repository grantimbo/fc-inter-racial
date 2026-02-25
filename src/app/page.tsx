import type { Metadata } from "next";
import Header from "./components/header";
import PlayersSection from "./components/players";
import Footer from "./components/footer";
import HeroSlider from "./components/slider";
import OurStory from "./components/our-story";
import News from "./components/news";

export const metadata: Metadata = {
  title: "Inter Racial Football Club - Home",
};

export default function Home() {
  return (
    <div className="pt-16 md:pt-20">
      <Header/>
      <HeroSlider/>
      <PlayersSection/>
      <News/>
      <OurStory/>
      <Footer/>
    </div>
  );
}
