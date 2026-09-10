import type { Lang } from "@/lib/site";
import { SITE } from "@/lib/site";
import { route, urlLogement } from "@/lib/routes";
import { LOGEMENTS } from "@/content/logements";
import { LIBELLES, UI } from "@/content/ui";
import Hero from "@/components/Hero";
import { Section, Kicker, Titre, Essentiel, Filet } from "@/components/Bloc";
import { Bouton } from "@/components/Bouton";
import { BoutonReserver } from "@/components/Reservation";
import { PrixDirect } from "@/components/Reassurance";
import { LienTelephone } from "@/components/Traces";
import { JsonLd, faq, filAriane } from "@/components/JsonLd";
import { smoobuConfigure, lireTarifs, synthetiser, jour } from "@/lib/smoobu";

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
  const enLigne = smoobuConfigure() && syntheses.length > 0;

  const questions =
    lang === "fr"
      ? [
          {
            q: "Combien coûte une nuit à la Demeure des Trois Foudres ?",
            r: enLigne
              ? "Les tarifs varient selon le logement et la saison. Le détail par logement et par date est affiché sur cette page et dans le calendrier de réservation."
              : "Les tarifs varient selon le logement et la saison. Contactez-nous au 07 77 23 46 80 pour connaître le tarif de vos dates.",
          },
          {
            q: "Est-ce moins cher de réserver en direct ?",
            r: "Oui. En réservant en direct, il n'y a pas de commission d'intermédiaire à payer : le prix que vous voyez est celui que perçoit la maison.",
          },
          {
            q: "Le petit-déjeuner est-il inclus ?",
            r: "Le petit-déjeuner est servi dans notre salle dédiée. Pour l'appartement Le Grenier, qui dispose d'une cuisine équipée, il est proposé avec supplément.",
          },
        ]
      : [
          {
            q: "How much is a night at Demeure des Trois Foudres?",
            r: enLigne
              ? "Rates vary by accommodation and season. The detail per place and per date is shown on this page and in the booking calendar."
              : "Rates vary by accommodation and season. Call us on +33 7 77 23 46 80 for a rate on your dates.",
          },
          {
            q: "Is it cheaper to book direct?",
            r: "Yes. Booking direct means there is no platform commission to pay: the price you see is the price the house receives.",
          },
          {
            q: "Is breakfast included?",
            r: "Breakfast is served in our dedicated room. For the Attic apartment, which has a fitted kitchen, it is available for a supplement.",
          },
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
                  enLigne
                    ? "Tarifs et durée minimum de séjour affichés ci-dessous, tenus à jour automatiquement."
                    : "Tarifs communiqués par téléphone au 07 77 23 46 80 ou par email — l'affichage en ligne arrive prochainement.",
                  "Réservation en direct : pas de commission d'intermédiaire.",
                ]
              : [
                  "Three places to stay: two rooms for 2 guests and an apartment for 4.",
                  enLigne
                    ? "Rates and minimum stay shown below, kept up to date automatically."
                    : "Rates on request by phone on +33 7 77 23 46 80 or by email — online display coming shortly.",
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
            immobile (DESIGN.md §4). Aucun data-reveal ici, volontairement. */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px] border-collapse text-left">
            <thead>
              <tr className="border-b border-sauge/60">
                <th className="py-3 pr-4 text-sm font-semibold uppercase tracking-[0.14em] text-taupe">
                  {lang === "fr" ? "Logement" : "Accommodation"}
                </th>
                <th className="py-3 pr-4 text-sm font-semibold uppercase tracking-[0.14em] text-taupe">
                  {lang === "fr" ? "Capacité" : "Sleeps"}
                </th>
                <th className="py-3 pr-4 text-sm font-semibold uppercase tracking-[0.14em] text-taupe">
                  {lang === "fr" ? "Nuits minimum" : "Minimum stay"}
                </th>
                <th className="py-3 text-sm font-semibold uppercase tracking-[0.14em] text-taupe">
                  {lang === "fr" ? "À partir de" : "From"}
                </th>
              </tr>
            </thead>
            <tbody>
              {LOGEMENTS.map((l) => {
                const s = syntheses.find((x) => x.id === l.smoobuId);
                return (
                  <tr key={l.id} className="border-b border-sauge/30">
                    <td className="py-5 pr-4">
                      <a href={urlLogement(l.id, lang)} className="lien inline-flex min-h-11 items-center font-display text-xl">
                        {l.nom[lang]}
                      </a>
                      <span className="mt-1 block text-sm text-taupe">{l.surface} m²</span>
                    </td>
                    <td className="py-5 pr-4 text-base text-taupe">
                      {l.capacite} {l.capacite > 1 ? UI.personnes[lang] : UI.personne[lang]}
                    </td>
                    <td className="py-5 pr-4 text-base text-taupe">
                      {s?.nuitsMini
                        ? `${s.nuitsMini} ${lang === "fr" ? "nuits" : "nights"}`
                        : "—"}
                    </td>
                    <td className="py-5">
                      {s?.prixMini ? (
                        <span className="font-display text-2xl text-lie">
                          {s.prixMini.toLocaleString(lang === "fr" ? "fr-FR" : "en-GB", {
                            style: "currency",
                            currency: s.devise,
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      ) : (
                        <span className="text-base text-taupe">
                          {lang === "fr" ? "Sur demande" : "On request"}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {!enLigne && (
          <p className="mesure mt-8 text-base leading-relaxed text-taupe">
            {lang === "fr" ? (
              <>
                L&apos;affichage automatique des tarifs est en cours de branchement. En attendant,
                appelez-nous au{" "}
                <LienTelephone depuis="tarifs" className="lien text-lie">
                  {SITE.telephoneAffiche}
                </LienTelephone>{" "}
                ou écrivez à{" "}
                <a href={`mailto:${SITE.email}`} className="lien text-lie">
                  {SITE.email}
                </a>{" "}
                : nous répondons dans la journée.
              </>
            ) : (
              <>
                Automatic rate display is being connected. In the meantime, call us on{" "}
                <LienTelephone depuis="tarifs" className="lien text-lie">
                  {SITE.telephoneAffiche}
                </LienTelephone>{" "}
                or write to{" "}
                <a href={`mailto:${SITE.email}`} className="lien text-lie">
                  {SITE.email}
                </a>{" "}
                — we reply the same day.
              </>
            )}
          </p>
        )}

        <div className="mt-10 flex flex-wrap gap-3">
          <BoutonReserver lang={lang} />
          <Bouton href={route("chambres", lang)} variante="ligne">
            {UI.tousLesLogements[lang]}
          </Bouton>
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
