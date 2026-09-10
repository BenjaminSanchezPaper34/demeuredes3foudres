import type { Metadata } from "next";
import { Confidentialite } from "@/views/Legal";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "confidentialite",
  "fr",
  "Confidentialité et données personnelles",
  "Comment la Demeure des Trois Foudres traite vos données personnelles : formulaire de contact, réservation, mesure d'audience sans cookie et vos droits.",
);

export default function Page() {
  return <Confidentialite lang="fr" />;
}
