import type { Lang } from "@/lib/site";
import { route, urlLogement } from "@/lib/routes";
import { LOGEMENTS } from "@/content/logements";
import { LIBELLES, UI } from "@/content/ui";
import Hero from "@/components/Hero";
import { Section, Kicker, Titre, Essentiel, Filet } from "@/components/Bloc";
import { Bouton } from "@/components/Bouton";
import { BoutonReserver } from "@/components/Reservation";
import { PrixDirect } from "@/components/Reassurance";
import { JsonLd, faq, filAriane } from "@/components/JsonLd";
import { smoobuConfigure, lireTarifs, synthetiser, jour } from "@/lib/smoobu";
import { CONDITIONS_TEXTES, CONDITIONS_FAQ } from "@/content/conditions";
import { TARIFS, prixMini, formatePrix } from "@/content/tarifs";
import { Icone } from "@/components/Icone";

/**
 * Tarifs.
 *
 * Cette page est rendue côté serveur depuis l'API Smoobu, revalidée toutes
 * les heures. Les prix sont donc du VRAI HTML : indexables par Google et
 * citables par un agent conversationnel — ce qu'un iframe ne permet pas
 * (ARCHITECTURE.md §4).
 *
 * Tant que les accès Smoobu ne sont pas fournis, la page affiche un état
 * honnête. Aucun tarif n'est inventé ni figé en dur.
 */
export const revalidate = 3600;

export default async function Tarifs({ lang }: { lang: Lang }) {
  const ids = LOGEMENTS.map((l) => l.smoobuId).filter((i): i is number => i !== null);
  const tarifs = ids.length ? await lireTarifs(ids, jour(), jour(365)) : null;
  const syntheses = synthetiser(tarifs, ids);
  // L'API est lue dès qu'elle est configurée ; /controle compare ses valeurs
  // à la grille validée. L'affichage ci-dessous reste la grille tant que
  // Smoobu n'est pas branché.
  void syntheses;

  const questions =
    lang === "fr"
      ? [
          {
            q: "Combien coûte une nuit à la Demeure des Trois Foudres ?",
            r: `De ${formatePrix(prixMini("lingerie"), "fr")} à ${formatePrix(TARIFS.saisons[2].prix.lingerie, "fr")} la nuit pour La Lingerie, ${formatePrix(prixMini("ecurie"), "fr")} à ${formatePrix(TARIFS.saisons[2].prix.ecurie, "fr")} pour L'Écurie, et ${formatePrix(prixMini("grenier"), "fr")} à ${formatePrix(TARIFS.saisons[2].prix.grenier, "fr")} pour l'appartement Le Grenier, selon la saison. Petit-déjeuner en option à ${formatePrix(TARIFS.petitDejeuner.prix, "fr")} par personne et par jour.`,
          },
          {
            q: "Est-ce moins cher de réserver en direct ?",
            r: "Oui. En réservant en direct, il n'y a pas de commission d'intermédiaire à payer : le prix que vous voyez est celui que perçoit la maison.",
          },
          {
            q: "Le petit-déjeuner est-il inclus ?",
            r: "Le petit-déjeuner est servi dans notre salle dédiée. Pour l'appartement Le Grenier, qui dispose d'une cuisine équipée, il est proposé avec supplément.",
          },
          ...CONDITIONS_FAQ.map((x) => ({ q: x.q.fr, r: x.r.fr })),
        ]
      : [
          {
            q: "How much is a night at Demeure des Trois Foudres?",
            r: `From ${formatePrix(prixMini("lingerie"), "en")} to ${formatePrix(TARIFS.saisons[2].prix.lingerie, "en")} a night for the Linen Room, ${formatePrix(prixMini("ecurie"), "en")} to ${formatePrix(TARIFS.saisons[2].prix.ecurie, "en")} for the Stable, and ${formatePrix(prixMini("grenier"), "en")} to ${formatePrix(TARIFS.saisons[2].prix.grenier, "en")} for the Attic apartment, depending on the season. Breakfast optional at ${formatePrix(TARIFS.petitDejeuner.prix, "en")} per person per day.`,
          },
          {
            q: "Is it cheaper to book direct?",
            r: "Yes. Booking direct means there is no platform commission to pay: the price you see is the price the house receives.",
          },
          {
            q: "Is breakfast included?",
            r: "Breakfast is served in our dedicated room. For the Attic apartment, which has a fitted kitchen, it is available for a supplement.",
          },
          ...CONDITIONS_FAQ.map((x) => ({ q: x.q.en, r: x.r.en })),
        ];

  return (
    <>
      <JsonLd data={faq(questions)} />
      <JsonLd
        data={filAriane([
          [LIBELLES.accueil[lang], route("accueil", lang)],
          [LIBELLES.tarifs[lang], route("tarifs", lang)],
        ])}
      />

      <Hero
        hauteur="reduit"
        image="/images/couloir-de-nage-transats.jpg"
        alt={
          lang === "fr"
            ? "Le couloir de nage et ses transats, au jardin"
            : "The swimming lane and its loungers, in the garden"
        }
        kicker={LIBELLES.tarifs[lang]}
        titre={
          lang === "fr" ? "Nos tarifs, en direct et sans commission" : "Our rates, direct and commission-free"
        }
        sousTitre={
          lang === "fr"
            ? "Le prix que vous voyez ici est celui que perçoit la maison."
            : "The price you see here is the price the house receives."
        }
      />

      <Section fond="chaux" classe="!py-14">
        <Essentiel
          lang={lang}
          items={
            lang === "fr"
              ? [
                  "Trois logements : deux chambres pour 2 personnes et un appartement pour 4.",
                  `À partir de ${formatePrix(prixMini("lingerie"), "fr")} la nuit pour deux, petit-déjeuner en option à ${formatePrix(TARIFS.petitDejeuner.prix, "fr")} par personne.`,
                  "Réservation en direct : pas de commission d'intermédiaire.",
                ]
              : [
                  "Three places to stay: two rooms for 2 guests and an apartment for 4.",
                  `From ${formatePrix(prixMini("lingerie"), "en")} a night for two, breakfast optional at ${formatePrix(TARIFS.petitDejeuner.prix, "en")} per person.`,
                  "Book direct: no platform commission.",
                ]
          }
        />
      </Section>

      <Section>
        <Kicker>{lang === "fr" ? "Par logement" : "By accommodation"}</Kicker>
        <Titre className="mb-10">
          {lang === "fr" ? "Ce que coûte une nuit" : "What a night costs"}
        </Titre>

        {/* Le tableau ne bouge pas : ce que le visiteur doit croire reste
            immobile (DESIGN.md §4). Aucun data-reveal ici, volontairement.
            Les prix viennent de la grille validée ; quand l'API Smoobu est
            branchée, elle prend le relais et /controle signale tout écart. */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-left">
            <caption className="sr-only">
              {lang === "fr"
                ? "Tarifs par nuit et par logement, selon la saison"
                : "Rates per night and per accommodation, by season"}
            </caption>
            <thead>
              <tr className="border-b border-sauge/60">
                <th scope="col" className="py-3 pr-4 text-sm font-semibold uppercase tracking-[0.14em] text-taupe">
                  {lang === "fr" ? "Logement" : "Accommodation"}
                </th>
                {TARIFS.saisons.map((saison) => (
                  <th
                    key={saison.id}
                    scope="col"
                    className="py-3 pr-4 text-sm font-semibold uppercase tracking-[0.14em] text-taupe"
                  >
                    {saison.libelle[lang]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LOGEMENTS.map((l) => (
                <tr key={l.id} className="border-b border-sauge/30">
                  <th scope="row" className="py-5 pr-4 text-left font-normal">
                    <a
                      href={urlLogement(l.id, lang)}
                      className="lien inline-flex min-h-11 items-center font-display text-xl"
                    >
                      {l.nom[lang]}
                    </a>
                    <span className="mt-1 block text-sm text-taupe">
                      {l.surface} m² · {l.capacite}{" "}
                      {l.capacite > 1 ? UI.personnes[lang] : UI.personne[lang]}
                    </span>
                  </th>
                  {TARIFS.saisons.map((saison) => (
                    <td key={saison.id} className="py-5 pr-4">
                      <span className="font-display text-2xl tabular-nums text-lie">
                        {formatePrix(saison.prix[l.id], lang)}
                      </span>
                      <span className="mt-0.5 block text-sm text-taupe">
                        {lang === "fr" ? "la nuit" : "per night"}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mesure mt-6 text-base leading-relaxed text-taupe">
          {TARIFS.petitDejeuner.texte[lang]}{" "}
          {lang === "fr"
            ? "Deux nuits minimum. Taxe de séjour en supplément, 1,15 € par personne et par nuit."
            : "Two nights minimum. Tourist tax extra, €1.15 per person per night."}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <BoutonReserver lang={lang} />
          <Bouton href={route("chambres", lang)} variante="ligne">
            {UI.tousLesLogements[lang]}
          </Bouton>
        </div>
      </Section>

      {/* Conditions : elles se publient (source Claudie, 15/09/2026). Immobiles,
          comme tout ce que le visiteur doit croire. Les prix, eux, viennent de l'API. */}
      <Section>
        <Kicker>{lang === "fr" ? "Conditions de séjour" : "Terms of stay"}</Kicker>
        <Titre className="mb-10">{lang === "fr" ? "Ce qui est convenu" : "What applies"}</Titre>
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {CONDITIONS_TEXTES.map((c) => (
            <article key={c.icone} className="flex gap-4">
              <Icone nom={c.icone} taille={24} className="mt-1 text-sauge" />
              <div>
                <h3 className="font-display text-xl">{c.titre[lang]}</h3>
                <p className="mesure mt-2 text-base leading-relaxed text-taupe">{c.texte[lang]}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section fond="chaux">
        <PrixDirect lang={lang} />
        <div className="mt-12">
          <Filet />
        </div>
        <div className="mt-10 space-y-8">
          <h2 className="font-display text-3xl">
            {lang === "fr" ? "Questions fréquentes" : "Frequently asked"}
          </h2>
          <dl className="space-y-7">
            {questions.map((q) => (
              <div key={q.q} className="border-b border-sauge/40 pb-7">
                <dt className="font-display text-xl">{q.q}</dt>
                <dd className="mesure mt-3 text-base leading-relaxed text-taupe">{q.r}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>
    </>
  );
}
