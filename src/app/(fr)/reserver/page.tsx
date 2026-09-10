import type { Metadata } from "next";
import Reserver from "@/views/Reserver";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "reserver",
  "fr",
  "Réserver en direct à la Demeure des Trois Foudres",
  "Vérifiez les disponibilités et réservez en direct l'une des deux chambres ou l'appartement de la Demeure des Trois Foudres, à Caux près de Pézenas.",
  "/images/facade-demeure-caux.jpg",
);

export default function Page() {
  return <Reserver lang="fr" />;
}
