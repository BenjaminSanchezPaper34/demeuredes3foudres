import type { Metadata } from "next";
import Chambres from "@/views/Chambres";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "chambres",
  "fr",
  "Chambres d'hôtes et appartement à Caux, près de Pézenas",
  "Deux chambres d'hôtes de 2 personnes et un appartement de 70 m² pour 4, dans les dépendances d'une demeure vigneronne à Caux, à 7 km de Pézenas.",
  "/images/ecurie-01.jpg",
);

export default function Page() {
  return <Chambres lang="fr" />;
}
