import Header from "../components/header";
import PlayersSection from "../components/players";
import Footer from "../components/footer";

export default function PlayersPage() {
  return (
    <div className="pt-16 md:pt-20">
      <Header/>
      <PlayersSection/>
      <Footer/>
    </div>
  );
}
