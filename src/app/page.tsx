import Image from "next/image";
import Header from "./components/header";
import PlayersSection from "./components/players";
import Footer from "./components/footer";
import HeroSlider from "./components/slider";
import OurStory from "./components/our-story";
import FacebookFeed from "./components/facebook-feed";

export default function Home() {
  return (
    <div>
      <Header/>
      <HeroSlider/>
      <FacebookFeed/>
      <PlayersSection/>
      <OurStory/>
      <Footer/>
    </div>
  );
}
