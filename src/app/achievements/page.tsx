import AchievementsSection from "../components/achievements";
import Header from "../components/header";
import Footer from "../components/footer";
import { Metadata } from "next";
import { siteTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Achievements - ${siteTitle}`,
};

export default function AchievementsPage() {
  return (
    <>
      <Header />
      <AchievementsSection />
      <Footer />
    </>
  );
}
