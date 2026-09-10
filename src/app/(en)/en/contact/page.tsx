import type { Metadata } from "next";
import Contact from "@/views/Contact";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "contact",
  "en",
  "Contact — Demeure des Trois Foudres in Caux",
  "A question about a stay, a special request, or hiring the wine hall? Write to us or call +33 7 77 23 46 80. We answer in person.",
  "/images/demeure-exterieur.jpg",
);

export default function Page() {
  return <Contact lang="en" />;
}
