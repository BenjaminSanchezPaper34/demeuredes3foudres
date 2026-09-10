import type { Lang } from "@/lib/site";
import { route } from "@/lib/routes";
import { LOGEMENTS } from "@/content/logements";
import { LIBELLES, UI } from "@/content/ui";
import Hero from "@/components/Hero";
import { Section, Titre } from "@/components/Bloc";
import Configurateur from "@/components/Configurateur";
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

      {/* Sous la photo : le configurateur. L'encadré « L'essentiel » répétait
          les trois cartes qui suivent — il a été remplacé, pas déplacé. */}
      <Section fond="chaux">
        <Configurateur lang={lang} />
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
