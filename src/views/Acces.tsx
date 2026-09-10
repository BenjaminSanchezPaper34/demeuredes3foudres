import { Icone } from "@/components/Icone";
import type { Lang } from "@/lib/site";
import { SITE, adresseUneLigne } from "@/lib/site";
import { route } from "@/lib/routes";
import { ACCES } from "@/content/pages";
import { LIBELLES, UI } from "@/content/ui";
import Hero from "@/components/Hero";
import { Section, Kicker, Titre, Essentiel, Filet } from "@/components/Bloc";
import { Bouton } from "@/components/Bouton";
import { LienTelephone, LienItineraire } from "@/components/Traces";
import { JsonLd, faq, filAriane } from "@/components/JsonLd";

export default function Acces({ lang }: { lang: Lang }) {
  const questions =
    lang === "fr"
      ? [
          {
            q: "Où se trouve la Demeure des Trois Foudres ?",
            r: `Au ${adresseUneLigne}, au centre du village de Caux dans l'Hérault, à 7 km de Pézenas.`,
          },
          {
            q: "Y a-t-il un parking ?",
            r: "Oui, le stationnement se fait dans la cour de la demeure. Une borne de chargement pour voiture électrique est à disposition des hôtes.",
          },
          {
            q: "Quelle est la gare la plus proche ?",
            r: "Les gares d'Agde et de Béziers, à une trentaine de minutes de route chacune.",
          },
        ]
      : [
          {
            q: "Where is Demeure des Trois Foudres?",
            r: `At ${adresseUneLigne}, in the centre of the village of Caux in the Hérault, 7 km from Pézenas.`,
          },
          {
            q: "Is there parking?",
            r: "Yes, parking is in the courtyard of the house. An EV charging point is available to guests.",
          },
          {
            q: "What is the nearest station?",
            r: "Agde and Béziers, each around thirty minutes' drive away.",
          },
        ];

  return (
    <>
      <JsonLd data={faq(questions)} />
      <JsonLd
        data={filAriane([
          [LIBELLES.accueil[lang], route("accueil", lang)],
          [LIBELLES.acces[lang], route("acces", lang)],
        ])}
      />

      <Hero
        hauteur="reduit"
        image="/images/facade-demeure-caux.jpg"
        alt={
          lang === "fr"
            ? "La façade de la demeure, au 10 avenue de Fontes à Caux"
            : "The façade of the house, 10 avenue de Fontes in Caux"
        }
        kicker={LIBELLES.acces[lang]}
        titre={ACCES.titre[lang]}
        sousTitre={ACCES.sousTitre[lang]}
      />

      <Section fond="chaux" classe="!py-14">
        <Essentiel items={ACCES.essentiel[lang]} lang={lang} />
      </Section>

      <Section>
        {/* L'adresse et le téléphone ne bougent jamais : pas de data-reveal. */}
        <div className="grid gap-10 md:grid-cols-2">
          <address className="not-italic">
            <Kicker>{lang === "fr" ? "L'adresse" : "The address"}</Kicker>
            <p className="font-display text-3xl leading-snug">
              {SITE.adresse.rue}
              <br />
              {SITE.adresse.codePostal} {SITE.adresse.ville}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <LienItineraire className="inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-fin bg-lie px-6 text-base font-medium text-pierre transition-all duration-300 hover:bg-lie-clair hover:shadow-leve active:scale-[0.98] sm:min-h-11 sm:w-auto">
                <Icone nom="itineraire" taille={18} /> {UI.itineraire[lang]}
              </LienItineraire>
              <LienTelephone
                depuis="acces"
                className="inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-fin border border-chene/25 px-6 text-base transition-colors hover:border-lie hover:text-lie active:scale-[0.98] sm:min-h-11 sm:w-auto"
              >
                <Icone nom="telephone" taille={18} /> {SITE.telephoneAffiche}
              </LienTelephone>
            </div>
          </address>

          <div className="border-l-2 border-sauge py-1 pl-6">
            <p className="flex items-center gap-2 font-display text-xl">
              <Icone nom="borne" taille={22} className="text-sauge" />
              {lang === "fr" ? "Voiture électrique" : "Electric vehicle"}
            </p>
            <p className="mesure mt-3 text-base leading-relaxed text-taupe">
              {lang === "fr"
                ? "Une borne de chargement est installée dans la cour, à disposition des hôtes pendant leur séjour."
                : "A charging point is installed in the courtyard, available to guests throughout their stay."}
            </p>
          </div>
        </div>
      </Section>

      <Section fond="chaux">
        <Titre className="mb-10">{lang === "fr" ? "Comment venir" : "How to get here"}</Titre>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8" data-reveal="stagger">
          {ACCES.moyens.map((m) => (
            <article key={m.titre.fr}>
              <h3 className="font-display text-2xl">{m.titre[lang]}</h3>
              <p className="mesure mt-3 text-base leading-relaxed text-taupe">{m.texte[lang]}</p>
            </article>
          ))}
        </div>

        <div className="mt-14">
          <Filet />
          <dl className="mt-10 space-y-7">
            {questions.map((q) => (
              <div key={q.q} className="border-b border-sauge/40 pb-7">
                <dt className="font-display text-xl">{q.q}</dt>
                <dd className="mesure mt-3 text-base leading-relaxed text-taupe">{q.r}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Bouton href={route("environs", lang)} variante="ligne">
            {LIBELLES.environs[lang]}
          </Bouton>
          <Bouton href={route("contact", lang)} variante="ligne">
            {LIBELLES.contact[lang]}
          </Bouton>
        </div>
      </Section>
    </>
  );
}
