"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/site";
import { equivalent } from "@/lib/routes";
import { Icone } from "./Icone";

/**
 * Sélecteur de langue.
 * — `globe` (défaut, décision du 10/09/2026) : icône globe + code de la langue
 *   cible, placé après le CTA de la nav. Un seul lien, vers la page équivalente.
 * — `double` : « FR / EN », la langue courante en texte, l'autre en lien.
 */
export default function SelecteurLangue({
  lang,
  sombre,
  variante = "globe",
}: {
  lang: Lang;
  sombre?: boolean;
  variante?: "globe" | "double";
}) {
  const chemin = usePathname();
  const autre: Lang = lang === "fr" ? "en" : "fr";

  if (variante === "globe") {
    return (
      <Link
        href={equivalent(chemin, autre)}
        hrefLang={autre}
        lang={autre}
        aria-label={lang === "fr" ? "Read in English" : "Lire en français"}
        className={`inline-flex min-h-11 items-center gap-1.5 rounded-fin px-2 text-sm font-medium tracking-[0.14em] transition-colors ${
          sombre ? "text-pierre/85 hover:text-pierre" : "text-chene hover:text-lie"
        }`}
      >
        <Icone nom="langue" taille={18} />
        {autre.toUpperCase()}
      </Link>
    );
  }

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
