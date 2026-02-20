import Image from "next/image";
import Header from "./components/header";
import PlayersSection from "./components/players";
import Footer from "./components/footer";
import HeroSlider from "./components/slider";

export default function Home() {
  return (
    <div>
      <Header/>
      <HeroSlider/>
      <PlayersSection/>
      <Footer/>
    </div>
  );
}
