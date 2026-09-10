import type { Metadata } from "next";
import Reserver from "@/views/Reserver";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "reserver",
  "en",
  "Book direct at Demeure des Trois Foudres",
  "Check availability and book one of the two rooms or the apartment at Demeure des Trois Foudres, in Caux near Pézenas, directly.",
  "/images/facade-demeure-caux.jpg",
);

export default function Page() {
  return <Reserver lang="en" />;
}
