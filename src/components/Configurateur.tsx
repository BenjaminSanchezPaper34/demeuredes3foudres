"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { track } from "@vercel/analytics";
import type { Lang } from "@/lib/site";
import { urlLogement, type LogementId } from "@/lib/routes";
import { LOGEMENTS } from "@/content/logements";
import { QUESTIONS, TEXTES } from "@/content/configurateur";
import { UI } from "@/content/ui";
import { Kicker, Titre } from "./Bloc";
import { Bouton } from "./Bouton";
import { BoutonReserver } from "./Reservation";

const ORDRE: LogementId[] = ["ecurie", "lingerie", "grenier"];
/** Score à partir duquel une seule réponse suffit à suggérer. */
const DECISIF = 10;

/**
 * Configurateur de logement. Vraies cases radio (clavier, lecteur d'écran),
 * stylées en options rectangulaires — pas de pill (DESIGN.md §5). Le résultat
 * est une région `aria-live` : il s'annonce sans qu'on ait à le chercher.
 */
export default function Configurateur({ lang }: { lang: Lang }) {
  const [reponses, setReponses] = useState<Record<string, string>>({});

  const resultat = useMemo(() => {
    const scores: Record<LogementId, number> = { ecurie: 0, lingerie: 0, grenier: 0 };
    const raisons: Record<LogementId, string[]> = { ecurie: [], lingerie: [], grenier: [] };
    for (const q of QUESTIONS) {
      const o = q.options.find((x) => x.id === reponses[q.id]);
      if (!o) continue;
      for (const [id, pts] of Object.entries(o.points) as [LogementId, number][]) {
        scores[id] += pts;
        if (o.raison[lang]) raisons[id].push(o.raison[lang]);
      }
    }
    const [meilleur, second] = [...ORDRE].sort(
      (a, b) => scores[b] - scores[a] || ORDRE.indexOf(a) - ORDRE.indexOf(b),
    );
    // On suggère dès que c'est fondé : les deux premières réponses, ou une
    // seule réponse décisive (« 3 ou 4 personnes » : seul le Grenier convient).
    const deuxPremieres = QUESTIONS.slice(0, 2).every((q) => reponses[q.id]);
    if (!deuxPremieres && scores[meilleur] < DECISIF) return null;
    return { id: meilleur, raisons: raisons[meilleur], autre: scores[second] > 0 ? second : null };
  }, [reponses, lang]);

  const choisir = (question: string, option: string) => {
    const suivant = { ...reponses, [question]: option };
    setReponses(suivant);
    track("configurateur", { ...suivant });
  };

  const logement = resultat ? LOGEMENTS.find((l) => l.id === resultat.id)! : null;

  return (
    <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-14">
      <div>
        <Kicker>{TEXTES.kicker[lang]}</Kicker>
        <Titre>{TEXTES.titre[lang]}</Titre>

        <div className="mt-8 space-y-7">
          {QUESTIONS.map((q) => (
            <fieldset key={q.id}>
              <legend className="mb-3 text-sm font-medium uppercase tracking-[0.14em] text-taupe">
                {q.intitule[lang]}
              </legend>
              <div className="flex flex-wrap gap-2">
                {q.options.map((o) => {
                  const actif = reponses[q.id] === o.id;
                  return (
                    <label
                      key={o.id}
                      className={`inline-flex min-h-11 cursor-pointer items-center rounded-fin border px-4 py-2 text-base transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-lie ${
                        actif
                          ? "border-lie bg-lie text-pierre"
                          : "border-chene/25 bg-pierre text-chene hover:border-lie hover:text-lie"
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={o.id}
                        checked={actif}
                        onChange={() => choisir(q.id, o.id)}
                        className="sr-only"
                      />
                      {o.libelle[lang]}
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </div>

      {/* Suggestion — immobile une fois affichée : c'est une réponse, pas un effet. */}
      <div aria-live="polite" className="md:pt-14">
        {logement && resultat ? (
          <article className="border-l-2 border-lie bg-pierre px-6 py-6 md:px-8">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-taupe">
              {TEXTES.suggestion[lang]}
            </p>
            <h3 className="mt-2 font-display text-3xl">{logement.nom[lang]}</h3>
            <p className="mt-1 text-sm text-taupe">
              {logement.surface} m² · {logement.capacite}{" "}
              {logement.capacite > 1 ? UI.personnes[lang] : UI.personne[lang]}
            </p>
            {resultat.raisons.length > 0 && (
              <p className="mesure mt-4 text-base leading-relaxed text-taupe">
                {TEXTES.pour[lang]}{" "}
                {resultat.raisons.length === 1
                  ? resultat.raisons[0]
                  : `${resultat.raisons.slice(0, -1).join(", ")} ${TEXTES.et[lang]} ${resultat.raisons.at(-1)}`}
                .
              </p>
            )}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <BoutonReserver lang={lang} smoobuId={logement.smoobuId} fleche />
              <Bouton href={urlLogement(logement.id, lang)} variante="ligne">
                {UI.decouvrir[lang]}
              </Bouton>
            </div>
            {resultat.autre && (
              <p className="mt-5 text-sm text-taupe">
                {TEXTES.aussi[lang]}{" "}
                <Link href={urlLogement(resultat.autre, lang)} className="lien text-lie">
                  {LOGEMENTS.find((l) => l.id === resultat.autre)!.nom[lang]}
                </Link>
                .
              </p>
            )}
          </article>
        ) : (
          <p className="border-l-2 border-sauge px-6 py-6 text-base leading-relaxed text-taupe md:px-8">
            {TEXTES.attente[lang]}
          </p>
        )}
      </div>
    </div>
  );
}
