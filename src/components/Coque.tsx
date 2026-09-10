import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";
import type { Lang } from "@/lib/site";
import Nav from "./Nav";
import Pied from "./Pied";
import Cinetique from "./Cinetique";
import { FournisseurReservation } from "./Reservation";
import BarreReservation from "./BarreReservation";

/**
 * Coque commune aux deux langues. Les deux layouts racines (fr et en) ne
 * diffèrent que par l'attribut lang du document — tout le reste est ici,
 * pour qu'aucune divergence ne s'installe entre les deux versions.
 */
export default function Coque({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <FournisseurReservation lang={lang}>
      <Cinetique />
      <Nav lang={lang} />
      <main id="contenu">{children}</main>
      <Pied lang={lang} />
      <BarreReservation lang={lang} />
      <Analytics />
    </FournisseurReservation>
  );
}
