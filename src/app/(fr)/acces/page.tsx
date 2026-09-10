import type { Metadata } from "next";
import Acces from "@/views/Acces";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "acces",
  "fr",
  "Venir à Caux, près de Pézenas dans l'Hérault",
  "Comment rejoindre la Demeure des Trois Foudres : 10 avenue de Fontes à Caux, à 7 km de Pézenas, 25 km du Cap d'Agde. Parking et borne de recharge sur place.",
  "/images/facade-demeure-caux.jpg",
);

export default function Page() {
  return <Acces lang="fr" />;
}
