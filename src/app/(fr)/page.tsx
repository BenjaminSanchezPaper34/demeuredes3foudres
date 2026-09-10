import type { Metadata } from "next";
import Accueil from "@/views/Accueil";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "accueil",
  "fr",
  "Chambres d'hôtes à Caux près de Pézenas — Demeure des Trois Foudres",
  "Chambres d'hôtes à Caux, près de Pézenas. Deux chambres et un appartement dans une demeure vigneronne : couloir de nage, bains japonais, réservation en direct.",
  "/images/facade-demeure-caux.jpg",
  true,
);

export default function Page() {
  return <Accueil lang="fr" />;
}
