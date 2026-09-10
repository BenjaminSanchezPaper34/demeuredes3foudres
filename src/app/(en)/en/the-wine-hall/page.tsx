import type { Metadata } from "next";
import { LeChai } from "@/views/Simple";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "leChai",
  "en",
  "Reception venue near Pézenas — the wine hall",
  "A former wine hall turned reception room in Caux, near Pézenas: three century-old tuns, a bar, and rooms on site for your guests.",
  "/images/chai-foudre-centenaire.jpg",
);

export default function Page() {
  return <LeChai lang="en" />;
}
