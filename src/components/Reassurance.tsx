import { Star } from "lucide-react";
import { SITE, type Lang } from "@/lib/site";
import { UI } from "@/content/ui";

/**
 * Bloc d'avis. Sans notoriété de plateforme en amont, c'est la seule preuve
 * dont dispose l'accueil — il remonte donc haut, jamais en pied de page
 * (ARCHITECTURE.md §6).
 *
 * Les chiffres viennent de SITE.avis, à réactualiser à chaque revue mensuelle.
 */
export function NoteGoogle({ lang, sombre }: { lang: Lang; sombre?: boolean }) {
  const { note, nombre } = SITE.avis;
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1" data-reveal>
      <span
        className={`font-display text-3xl leading-none ${sombre ? "text-pierre" : "text-chene"}`}
      >
        {note.toLocaleString(lang === "fr" ? "fr-FR" : "en-GB")}
      </span>
      <span className="flex gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < Math.round(note) ? "fill-lie text-lie" : "text-sauge"}
          />
        ))}
      </span>
      <span className={`text-base ${sombre ? "text-pierre/75" : "text-taupe"}`}>
        <span className="sr-only">
          {lang === "fr" ? `Note de ${note} sur 5` : `Rated ${note} out of 5`} —{" "}
        </span>
        {nombre} {UI.avis[lang]} {UI.avisGoogle[lang]}
      </span>
    </div>
  );
}

/**
 * Argument du direct.
 * On affiche le MÉCANISME, jamais un prix barré fabriqué : comparer à un
 * tarif de plateforme qu'on ne contrôle pas serait une pratique trompeuse
 * (ARCHITECTURE.md §4). Et pas de « garanti », qui crée une obligation.
 */
export function PrixDirect({ lang, sombre }: { lang: Lang; sombre?: boolean }) {
  return (
    <div
      className={`border-l-2 border-lie py-1 pl-5 ${sombre ? "border-sauge" : ""}`}
      data-reveal
    >
      <p className={`font-display text-xl ${sombre ? "text-pierre" : "text-chene"}`}>
        {UI.prixDirectTitre[lang]}
      </p>
      <p className={`mesure mt-2 text-base leading-relaxed ${sombre ? "text-pierre/75" : "text-taupe"}`}>
        {UI.prixDirectTexte[lang]}
      </p>
    </div>
  );
}
