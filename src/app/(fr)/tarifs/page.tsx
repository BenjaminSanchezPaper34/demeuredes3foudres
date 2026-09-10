import type { Metadata } from "next";
import Tarifs from "@/views/Tarifs";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "tarifs",
  "fr",
  "Tarifs des chambres d'hôtes — en direct, sans commission",
  "Les tarifs de nos trois logements à Caux, près de Pézenas. En réservant en direct, il n'y a pas de commission d'intermédiaire à payer.",
  "/images/couloir-de-nage-transats.jpg",
);

export default function Page() {
  return <Tarifs lang="fr" />;
}
