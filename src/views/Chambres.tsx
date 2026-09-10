import type { Lang } from "@/lib/site";
import { route } from "@/lib/routes";
import { LOGEMENTS } from "@/content/logements";
import { LIBELLES, UI } from "@/content/ui";
import Hero from "@/components/Hero";
import { Section, Titre, Essentiel } from "@/components/Bloc";
import CarteLogement from "@/components/CarteLogement";
import { BoutonReserver } from "@/components/Reservation";
import { PrixDirect } from "@/components/Reassurance";
import { JsonLd, listeLogements, filAriane } from "@/components/JsonLd";

export default function Chambres({ lang }: { lang: Lang }) {
  return (
    <>
      <JsonLd data={listeLogements(lang)} />
      <JsonLd
        data={filAriane([
          [LIBELLES.accueil[lang], route("accueil", lang)],
          [LIBELLES.chambres[lang], route("chambres", lang)],
        ])}
      />

      <Hero
        hauteur="reduit"
        image="/images/ecurie-01.jpg"
        alt={
          lang === "fr"
            ? "La chambre Écurie, lit sous les poutres et baignoire en îlot"
            : "The Stable room, bed beneath the beams and freestanding bathtub"
        }
        kicker={LIBELLES.chambres[lang]}
        titre={
          lang === "fr"
            ? "Deux chambres et un appartement, dans les dépendances"
            : "Two rooms and an apartment, in the outbuildings"
        }
        sousTitre={
          lang === "fr"
            ? "Chacun a son entrée, son histoire et son caractère : une écurie, une lingerie, un grenier à grain."
            : "Each has its own entrance, its own history and its own character: a stable, a linen room, a grain attic."
        }
      />

      <Section fond="chaux" classe="!py-14">
        <Essentiel
          lang={lang}
          items={
            lang === "fr"
              ? [
                  "L'Écurie — 35 m², 2 personnes, de plain-pied, avec baignoire et terrasse privative.",
                  "La Lingerie — 24 m², 2 personnes, ambiance 1900, à deux pas du couloir de nage.",
                  "Le Grenier — appartement de 70 m², 4 personnes, deux chambres et cuisine équipée.",
                ]
              : [
                  "The Stable — 35 m², 2 guests, ground floor, with a bathtub and private terrace.",
                  "The Linen Room — 24 m², 2 guests, 1900s feel, steps from the swimming lane.",
                  "The Attic — 70 m² apartment, 4 guests, two bedrooms and a fitted kitchen.",
                ]
          }
        />
      </Section>

      <Section>
        <div className="grid gap-14 md:grid-cols-3 md:gap-8" data-reveal="stagger">
          {LOGEMENTS.map((l, i) => (
            <CarteLogement key={l.id} logement={l} lang={lang} priorite={i === 0} />
          ))}
        </div>
      </Section>

      <Section fond="ardoise">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <Titre className="text-pierre">
              {lang === "fr" ? "Réserver en direct" : "Book direct"}
            </Titre>
            <div className="mt-6">
              <PrixDirect lang={lang} sombre />
            </div>
          </div>
          <div className="md:justify-self-end" data-reveal>
            <BoutonReserver lang={lang} variante="clair" libelle={UI.voirDisponibilites[lang]} />
          </div>
        </div>
      </Section>
    </>
  );
}
