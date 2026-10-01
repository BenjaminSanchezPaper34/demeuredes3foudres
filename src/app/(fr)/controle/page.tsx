import type { Metadata } from "next";
import { LOGEMENTS } from "@/content/logements";
import { TARIFS } from "@/content/tarifs";
import { jour, lireTarifs, listerLogements, smoobuConfigure } from "@/lib/smoobu";

/**
 * /controle — page technique, non liée, non indexée.
 *
 * Compare ce que Smoobu applique réellement (API) à la grille validée par
 * Jérôme et Claudie (content/tarifs.ts), jour par jour sur un an. Sert à
 * repérer un paramétrage manqué AVANT qu'un client ne le voie. N'affiche que
 * des informations publiques (prix, durée minimum, disponibilité) — jamais la
 * clé ni le nom d'un voyageur.
 */
export const metadata: Metadata = {
  title: "Contrôle Smoobu",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const NUITS_MINI = 2;

function prixAttendu(logement: (typeof LOGEMENTS)[number]["id"], date: string) {
  const mois = Number(date.slice(5, 7));
  const saison = TARIFS.saisons.find((s) => s.mois.includes(mois));
  return saison ? saison.prix[logement] : null;
}

export default async function Controle() {
  const configure = smoobuConfigure();
  const ids = LOGEMENTS.map((l) => l.smoobuId).filter((i): i is number => i !== null);
  const [logements, tarifs] = configure
    ? await Promise.all([listerLogements(), lireTarifs(ids, jour(), jour(365))])
    : [null, null];

  const lignes = LOGEMENTS.map((l) => {
    const jours = l.smoobuId ? tarifs?.data?.[String(l.smoobuId)] ?? {} : {};
    const dates = Object.keys(jours).sort();
    const ecartsPrix = dates.filter((d) => jours[d].price !== prixAttendu(l.id, d));
    const ecartsNuits = dates.filter((d) => jours[d].min_length_of_stay !== NUITS_MINI);
    const indispo = dates.filter((d) => jours[d].available === 0);
    return { l, dates, ecartsPrix, ecartsNuits, indispo, jours };
  });

  const ok = (v: boolean) => (v ? "✅" : "❌");

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-32 text-ardoise">
      <h1 className="font-display text-3xl">Contrôle Smoobu</h1>
      <p className="mt-2 text-sm text-taupe">
        Grille de référence : {TARIFS.source.auteur}, {TARIFS.source.date} · minimum {NUITS_MINI} nuits ·
        fenêtre {jour()} → {jour(365)} · généré à la demande.
      </p>

      <ul className="mt-8 space-y-1 text-base">
        <li>{ok(configure)} Clé API présente côté serveur</li>
        <li>
          {ok(Boolean(logements?.apartments?.length))} API joignable :{" "}
          {logements?.apartments?.map((a) => `${a.name} (${a.id})`).join(", ") ?? "aucune réponse"}
        </li>
        <li>{ok(Boolean(tarifs?.data))} Tarifs lus</li>
      </ul>

      <table className="mt-8 w-full text-left text-sm">
        <thead className="text-taupe">
          <tr>
            <th className="py-2">Logement</th>
            <th>Jours lus</th>
            <th>Écarts de prix</th>
            <th>Écarts min. nuits</th>
            <th>Nuits indisponibles</th>
          </tr>
        </thead>
        <tbody>
          {lignes.map(({ l, dates, ecartsPrix, ecartsNuits, indispo, jours }) => (
            <tr key={l.id} className="border-t border-ardoise/10 align-top">
              <td className="py-2">
                {l.nom.fr} <span className="text-taupe">({l.smoobuId ?? "—"})</span>
              </td>
              <td>{dates.length}</td>
              <td>
                {ok(dates.length > 0 && ecartsPrix.length === 0)} {ecartsPrix.length}
                {ecartsPrix.slice(0, 5).map((d) => (
                  <div key={d} className="text-taupe">
                    {d} : {jours[d].price ?? "vide"} au lieu de {prixAttendu(l.id, d)}
                  </div>
                ))}
              </td>
              <td>
                {ok(dates.length > 0 && ecartsNuits.length === 0)} {ecartsNuits.length}
              </td>
              <td>
                {indispo.length}
                {indispo.length > 0 && <div className="text-taupe">{indispo.slice(0, 8).join(", ")}</div>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
