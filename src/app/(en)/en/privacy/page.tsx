import type { Metadata } from "next";
import { Confidentialite } from "@/views/Legal";
import { metaRoute } from "@/lib/seo";

export const metadata: Metadata = metaRoute(
  "confidentialite",
  "en",
  "Privacy and personal data",
  "How Demeure des Trois Foudres handles your personal data: contact form, booking, cookieless analytics and your rights.",
);

export default function Page() {
  return <Confidentialite lang="en" />;
}
