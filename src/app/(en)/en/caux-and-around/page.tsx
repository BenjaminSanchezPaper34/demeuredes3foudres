import type { Metadata } from "next";
import Environs from "@/views/Environs";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "environs",
  "en",
  "Caux, Pézenas and around — what to see in the Hérault",
  "The village of Caux, Pézenas and its antique dealers, Lake Salagou, the Thau lagoon, Sète and the beaches of Cap d'Agde: our favourites, all within an hour.",
  "/images/demeure-exterieur.jpg",
);

export default function Page() {
  return <Environs lang="en" />;
}
