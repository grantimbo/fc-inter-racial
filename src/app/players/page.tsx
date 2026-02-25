import type { Metadata } from "next";
import Header from "../components/header";
import PlayersSection from "../components/players";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "Inter Racial Football Club - Players",
};

export default function PlayersPage() {
  return (
    <div className="pt-16 md:pt-20">
      <Header/>
      <PlayersSection/>
      <Footer/>
    </div>
  );
}
