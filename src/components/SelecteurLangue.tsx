"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/site";
import { equivalent } from "@/lib/routes";

/**
 * Sélecteur de langue : « FR / EN ». La langue courante est un simple texte,
 * l'autre est le lien — vers la page équivalente, jamais vers l'accueil.
 * Pas d'icône, pas de bouton : un repère de lecture, pas une commande.
 */
export default function SelecteurLangue({ lang, sombre }: { lang: Lang; sombre?: boolean }) {
  const chemin = usePathname();
  const actif = sombre ? "text-pierre" : "text-chene";
  const inactif = sombre ? "text-pierre/55 hover:text-pierre" : "text-taupe hover:text-lie";
  const barre = sombre ? "text-pierre/30" : "text-sauge";

  const langues: Lang[] = ["fr", "en"];
  return (
    <nav
      aria-label={lang === "fr" ? "Langue" : "Language"}
      className="flex min-h-11 items-center gap-2 text-sm font-medium tracking-[0.14em]"
    >
      {langues.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 && (
            <span aria-hidden className={`font-light ${barre}`}>
              /
            </span>
          )}
          {l === lang ? (
            <span aria-current="true" className={actif}>
              {l.toUpperCase()}
            </span>
          ) : (
            <Link
              href={equivalent(chemin, l)}
              hrefLang={l}
              lang={l}
              className={`transition-colors ${inactif}`}
            >
              {l.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
