import type { Metadata } from "next";
import { MentionsLegales } from "@/views/Legal";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "mentionsLegales",
  "en",
  "Legal notice",
  "Legal notice for the Demeure des Trois Foudres website, a guest house in Caux, Hérault.",
);

export default function Page() {
  return <MentionsLegales lang="en" />;
}
