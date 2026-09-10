import type { Metadata } from "next";
import { BainsJaponais } from "@/views/Simple";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "bainsJaponais",
  "fr",
  "Bains japonais dans d'anciennes cuves à vin — Hérault",
  "Deux onsen creusés dans les anciennes cuves à vin de la demeure, à Caux près de Pézenas. Un espace bien-être unique dans l'Hérault, ouvert toute l'année aux hôtes.",
  "/images/bains-japonais-onsen.jpg",
);

export default function Page() {
  return <BainsJaponais lang="fr" />;
}
