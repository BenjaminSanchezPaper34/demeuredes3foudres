import type { Metadata } from "next";
import { BainsJaponais } from "@/views/Simple";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "bainsJaponais",
  "en",
  "Japanese baths inside former wine vats — Hérault",
  "Two onsen carved into the property's former wine vats, in Caux near Pézenas. A wellness space with no equivalent in the Hérault, open to guests all year.",
  "/images/bains-japonais-onsen.jpg",
);

export default function Page() {
  return <BainsJaponais lang="en" />;
}
