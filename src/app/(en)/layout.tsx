import type { Metadata, Viewport } from "next";
import { fraunces } from "../polices";
import "../globals.css";
import Coque from "@/components/Coque";
import AmorceAnimation from "@/components/AmorceAnimation";
import { SITE, EN_LIGNE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.nom} — ${SITE.baseline.en}`,
    template: `%s — ${SITE.nom}`,
  },
  description:
    "Bed & breakfast in Caux, near Pézenas. Two rooms and an apartment in a 19th-century wine-grower's house: swimming lane, Japanese baths, direct booking.",
  robots: EN_LIGNE
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#efe9de",
  width: "device-width",
  initialScale: 1,
};

export default function LayoutEn({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fraunces.variable}>
      <head>
        <AmorceAnimation />
      </head>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-pierre focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <Coque lang="en">{children}</Coque>
      </body>
    </html>
  );
}
