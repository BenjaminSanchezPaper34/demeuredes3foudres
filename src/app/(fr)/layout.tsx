import type { Metadata, Viewport } from "next";
import { fraunces } from "../polices";
import "../globals.css";
import Coque from "@/components/Coque";
import { SITE, EN_LIGNE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.nom} — ${SITE.baseline.fr}`,
    template: `%s — ${SITE.nom}`,
  },
  description:
    "Chambres d'hôtes à Caux, près de Pézenas. Deux chambres et un appartement dans une demeure vigneronne : couloir de nage, bains japonais, réservation en direct.",
  robots: EN_LIGNE
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#efe9de",
  width: "device-width",
  initialScale: 1,
};

export default function LayoutFr({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={fraunces.variable}>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-pierre focus:px-4 focus:py-2"
        >
          Aller au contenu
        </a>
        <Coque lang="fr">{children}</Coque>
      </body>
    </html>
  );
}
