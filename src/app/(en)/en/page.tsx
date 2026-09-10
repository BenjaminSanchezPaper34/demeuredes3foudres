import type { Metadata } from "next";
import Accueil from "@/views/Accueil";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "accueil",
  "en",
  "Bed & breakfast in Caux near Pézenas — Demeure des Trois Foudres",
  "Bed and breakfast in Caux, near Pézenas. Two rooms and an apartment in a wine-grower's house: swimming lane, Japanese baths, direct booking.",
  "/images/facade-demeure-caux.jpg",
  true,
);

export default function Page() {
  return <Accueil lang="en" />;
}
