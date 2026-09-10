import type { Metadata } from "next";
import Demeure from "@/views/Demeure";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "laDemeure",
  "en",
  "A 19th-century wine-grower's house in Caux",
  "The story of Demeure des Trois Foudres in Caux: a year of restoration with the Architecte des Bâtiments de France, a wine hall, a swimming lane and a cabinet of curiosities.",
  "/images/cour-pavee.jpg",
);

export default function Page() {
  return <Demeure lang="en" />;
}
