import type { Metadata } from "next";
import Header from "../components/header";
import PlayersSection from "../components/players";
import Footer from "../components/footer";
import { siteTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Players - ${siteTitle}`,
};

export default function PlayersPage() {
  return (
    <>
      <Header/>
      <PlayersSection showBreadcrumbs={true}/>
      <Footer/>
    </>
  );
}
