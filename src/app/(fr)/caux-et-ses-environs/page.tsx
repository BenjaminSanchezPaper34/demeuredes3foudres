import type { Metadata } from "next";
import Environs from "@/views/Environs";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "environs",
  "fr",
  "Caux, Pézenas et les environs — que faire dans l'Hérault",
  "Le village de Caux, Pézenas et ses antiquaires, le lac du Salagou, le bassin de Thau, Sète et les plages du Cap d'Agde : nos coups de cœur à moins d'une heure.",
  "/images/demeure-exterieur.jpg",
);

export default function Page() {
  return <Environs lang="fr" />;
}
