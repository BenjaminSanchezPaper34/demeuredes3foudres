import type { Metadata } from "next";
import { MentionsLegales } from "@/views/Legal";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "mentionsLegales",
  "fr",
  "Mentions légales",
  "Mentions légales du site de la Demeure des Trois Foudres, chambres d'hôtes à Caux dans l'Hérault.",
);

export default function Page() {
  return <MentionsLegales lang="fr" />;
}
