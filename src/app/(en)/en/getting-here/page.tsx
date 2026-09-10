import type { Metadata } from "next";
import Acces from "@/views/Acces";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "acces",
  "en",
  "Getting to Caux, near Pézenas in the Hérault",
  "How to reach Demeure des Trois Foudres: 10 avenue de Fontes in Caux, 7 km from Pézenas, 25 km from Cap d'Agde. Parking and EV charging on site.",
  "/images/facade-demeure-caux.jpg",
);

export default function Page() {
  return <Acces lang="en" />;
}
