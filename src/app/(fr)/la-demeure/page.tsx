import type { Metadata } from "next";
import Demeure from "@/views/Demeure";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "laDemeure",
  "fr",
  "Une maison vigneronne du XIXᵉ siècle à Caux",
  "L'histoire de la Demeure des Trois Foudres à Caux : un an de rénovation avec l'architecte des Bâtiments de France, un chai, un couloir de nage et un cabinet de curiosités.",
  "/images/cour-pavee.jpg",
);

export default function Page() {
  return <Demeure lang="fr" />;
}
