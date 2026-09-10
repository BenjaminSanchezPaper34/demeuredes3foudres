import type { Metadata } from "next";
import Tarifs from "@/views/Tarifs";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "tarifs",
  "en",
  "Rates — direct, commission-free",
  "Rates for our three places to stay in Caux, near Pézenas. Booking direct means no platform commission to pay.",
  "/images/couloir-de-nage-transats.jpg",
);

export default function Page() {
  return <Tarifs lang="en" />;
}
