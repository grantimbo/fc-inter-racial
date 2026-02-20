import Image from "next/image";
import Header from "./components/header";
import PlayersSection from "./components/players";
import Footer from "./components/footer";
import HeroSlider from "./components/slider";
import OurStory from "./components/our-story";

export default function Home() {
  return (
    <div>
      <Header/>
      <HeroSlider/>
      <PlayersSection/>
      <OurStory/>
      <Footer/>
    </div>
  );
}
