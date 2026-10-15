import type { Metadata } from "next";
import { getHeroIndex } from "@/data/hero-profiles";
import HeroDirectory from "./hero-directory";

export const metadata: Metadata = {
  title: "National Heroes · ZimArchive",
  description:
    "Profiles of the patriots, diplomats and leaders honoured as national heroes of Zimbabwe, with dates, careers and key moments.",
};

export default function NationalHeroesPage() {
  return <HeroDirectory heroes={getHeroIndex()} />;
}
