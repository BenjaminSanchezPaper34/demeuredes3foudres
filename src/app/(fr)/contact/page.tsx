import type { Metadata } from "next";
import Contact from "@/views/Contact";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "contact",
  "fr",
  "Contact — Demeure des Trois Foudres à Caux",
  "Une question sur un séjour, une demande particulière ou la location du chai ? Écrivez-nous ou appelez le 07 77 23 46 80. Nous répondons nous-mêmes.",
  "/images/demeure-exterieur.jpg",
);

export default function Page() {
  return <Contact lang="fr" />;
}
