"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { SITE, type Lang } from "@/lib/site";
import { UI } from "@/content/ui";
import { useReservation } from "./Reservation";
import { BoutonAction } from "./Bouton";
import { Icone } from "./Icone";

/**
 * Barre de réservation fixe, mobile uniquement.
 *
 * Elle apparaît une fois le hero passé et garde à portée de pouce les deux
 * actions qui comptent : voir les disponibilités, appeler. Elle s'efface
 * quand le tiroir Smoobu est ouvert (le menu et la lightbox, en z-50 plein
 * écran, la recouvrent d'eux-mêmes).
 *
 * Fond Ardoise, donc CTA inversé en Pierre — l'accent ne va jamais sur du
 * sombre (DESIGN.md §1). Safe area respectée pour la barre d'accueil iOS.
 */
export default function BarreReservation({ lang }: { lang: Lang }) {
  const { ouvrir, ouvert } = useReservation();
  const [passeLeHero, setPasseLeHero] = useState(false);

  useEffect(() => {
    const auScroll = () => setPasseLeHero(window.scrollY > window.innerHeight * 0.6);
    auScroll();
    window.addEventListener("scroll", auScroll, { passive: true });
    return () => window.removeEventListener("scroll", auScroll);
  }, []);

  const visible = passeLeHero && !ouvert;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-30 transition-transform duration-500 ease-[var(--ease-feutre)] lg:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-3 mb-3 flex gap-2 rounded-bloc bg-ardoise p-2 shadow-leve sur-ardoise">
        <BoutonAction
          variante="clair"
          pleineLargeur
          fleche
          onClick={() => ouvrir()}
          tabIndex={visible ? 0 : -1}
        >
          {UI.voirDisponibilites[lang]}
        </BoutonAction>
        <a
          href={`tel:${SITE.telephone}`}
          aria-label={UI.appeler[lang]}
          onClick={() => track("tel", { depuis: "barre" })}
          tabIndex={visible ? 0 : -1}
          className="flex h-13 w-13 shrink-0 items-center justify-center rounded-bouton border border-pierre/30 text-pierre transition-colors active:bg-pierre/10"
        >
          <Icone nom="telephone" taille={22} />
        </a>
      </div>
    </div>
  );
}
