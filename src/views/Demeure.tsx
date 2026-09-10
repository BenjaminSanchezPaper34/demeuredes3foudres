import Image from "next/image";
import type { Lang } from "@/lib/site";
import { route } from "@/lib/routes";
import { ACCUEIL } from "@/content/pages";
import { LIBELLES, UI } from "@/content/ui";
import Hero from "@/components/Hero";
import { Section, Kicker, Titre, Prose, Filet } from "@/components/Bloc";
import { Bouton } from "@/components/Bouton";
import { NoteGoogle } from "@/components/Reassurance";
import { JsonLd, filAriane } from "@/components/JsonLd";
import ListeExtras from "@/components/ListeExtras";
import type { NomIcone } from "@/components/Icone";

const ICONES_EXTRAS: NomIcone[] = ["piscine", "jardin", "petanque", "billard", "velo", "borne"];

export default function Demeure({ lang }: { lang: Lang }) {
  return (
    <>
      <JsonLd
        data={filAriane([
          [LIBELLES.accueil[lang], route("accueil", lang)],
          [LIBELLES.laDemeure[lang], route("laDemeure", lang)],
        ])}
      />

      <Hero
        hauteur="reduit"
        image="/images/cour-pavee.jpg"
        alt={
          lang === "fr"
            ? "La cour pavée de la Demeure des Trois Foudres"
            : "The paved courtyard of Demeure des Trois Foudres"
        }
        kicker={LIBELLES.laDemeure[lang]}
        titre={ACCUEIL.introTitre[lang]}
        sousTitre={ACCUEIL.sousTitre[lang]}
      />

      <Section>
        <Prose paragraphes={ACCUEIL.intro[lang]} />
      </Section>

      <Section fond="chaux">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden bg-pierre md:order-2" data-reveal>
            <Image
              src="/images/salle-petit-dejeuner.jpg"
              alt={
                lang === "fr"
                  ? "La salle des petits-déjeuners de la demeure"
                  : "The breakfast room of the house"
              }
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="md:order-1">
            <Kicker>{lang === "fr" ? "La rénovation" : "The restoration"}</Kicker>
            <Titre>{ACCUEIL.renovationTitre[lang]}</Titre>
            <div className="mt-6">
              <Prose paragraphes={ACCUEIL.renovation[lang]} />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <Kicker>{lang === "fr" ? "Les petits +" : "The extras"}</Kicker>
            <Titre>{lang === "fr" ? "Tout est là, dehors" : "It's all outside"}</Titre>
            <ListeExtras items={ACCUEIL.extras[lang]} icones={ICONES_EXTRAS} />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden bg-chaux" data-reveal>
            <Image
              src="/images/couloir-de-nage-oliviers.jpg"
              alt={
                lang === "fr"
                  ? "Le couloir de nage en pierre de Pompignan, au milieu des oliviers"
                  : "The Pompignan-stone swimming lane among the olive trees"
              }
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section fond="chaux">
        <Filet />
        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <NoteGoogle lang={lang} />
            <p className="mesure mt-4 text-lg leading-[1.7] text-taupe" data-reveal>
              {ACCUEIL.accueilToute[lang]}
            </p>
          </div>
          <Bouton href={route("chambres", lang)} fleche>{UI.tousLesLogements[lang]}</Bouton>
        </div>
      </Section>
    </>
  );
}
