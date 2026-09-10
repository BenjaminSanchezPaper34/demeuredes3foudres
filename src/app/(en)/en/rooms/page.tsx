import type { Metadata } from "next";
import Chambres from "@/views/Chambres";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "chambres",
  "en",
  "Guest rooms and apartment in Caux, near Pézenas",
  "Two guest rooms for 2 and a 70 m² apartment for 4, in the outbuildings of a wine-grower's house in Caux, 7 km from Pézenas.",
  "/images/ecurie-01.jpg",
);

export default function Page() {
  return <Chambres lang="en" />;
}
