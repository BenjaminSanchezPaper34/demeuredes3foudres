import type { Lang } from "@/lib/site";
import { SITE } from "@/lib/site";
import { route } from "@/lib/routes";
import { LOGEMENTS } from "@/content/logements";
import { LIBELLES, UI } from "@/content/ui";
import { Section, Kicker, Titre } from "@/components/Bloc";
import { Bouton } from "@/components/Bouton";
import { BoutonReserver } from "@/components/Reservation";
import { PrixDirect } from "@/components/Reassurance";
import { LienTelephone } from "@/components/Traces";
import { JsonLd, filAriane } from "@/components/JsonLd";

/**
 * Page de réservation. Le moteur Smoobu s'y ouvre en tiroir, comme partout
 * ailleurs : un seul chemin de code, un seul comportement à maintenir.
 */
export default function Reserver({ lang }: { lang: Lang }) {
  return (
    <>
      <JsonLd
        data={filAriane([
          [LIBELLES.accueil[lang], route("accueil", lang)],
          [LIBELLES.reserver[lang], route("reserver", lang)],
        ])}
      />

      <Section classe="!pt-36 md:!pt-44">
        <Kicker>{LIBELLES.reserver[lang]}</Kicker>
        <Titre>
          {lang === "fr"
            ? "Choisissez vos dates, et votre logement"
            : "Choose your dates, and where you'll stay"}
        </Titre>

        <div className="mt-10">
          <BoutonReserver lang={lang} libelle={UI.voirDisponibilites[lang]} />
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {LOGEMENTS.map((l) => (
            <div key={l.id} className="border-t border-sauge/50 pt-5">
              <h2 className="font-display text-xl">{l.nom[lang]}</h2>
              <p className="mt-2 text-sm text-taupe">
                {l.surface} m² · {l.capacite}{" "}
                {l.capacite > 1 ? UI.personnes[lang] : UI.personne[lang]}
              </p>
              <div className="mt-4">
                <BoutonReserver
                  lang={lang}
                  smoobuId={l.smoobuId}
                  variante="ligne"
                  libelle={lang === "fr" ? "Ce logement" : "This one"}
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section fond="chaux">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <PrixDirect lang={lang} />
          <div className="md:justify-self-end">
            <p className="mesure text-base leading-relaxed text-taupe">
              {lang === "fr"
                ? "Une question avant de réserver, une arrivée tardive, un séjour un peu particulier ? Appelez-nous, c'est plus simple."
                : "A question before booking, a late arrival, an unusual request? Call us, it is simpler."}
            </p>
            <LienTelephone
              depuis="reserver"
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-bouton border border-chene/25 px-6 text-base transition-colors hover:border-lie hover:text-lie"
            >
              {SITE.telephoneAffiche}
            </LienTelephone>
          </div>
        </div>
        <div className="mt-10">
          <Bouton href={route("tarifs", lang)} variante="ligne">
            {LIBELLES.tarifs[lang]}
          </Bouton>
        </div>
      </Section>
    </>
  );
}
