import type { Metadata } from "next";
import { LeChai } from "@/views/Simple";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "leChai",
  "fr",
  "Salle de réception près de Pézenas — le chai",
  "Un ancien chai viticole réaménagé en salle de réception à Caux, près de Pézenas : trois foudres centenaires, un bar, et l'hébergement sur place pour vos invités.",
  "/images/chai-foudre-centenaire.jpg",
);

export default function Page() {
  return <LeChai lang="fr" />;
}
