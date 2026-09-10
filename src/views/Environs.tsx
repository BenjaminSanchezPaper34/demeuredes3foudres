import Image from "next/image";
import type { Lang } from "@/lib/site";
import { route } from "@/lib/routes";
import { ENVIRONS } from "@/content/pages";
import { LIBELLES, UI } from "@/content/ui";
import Hero from "@/components/Hero";
import { Section, Kicker, Titre, Prose, Essentiel } from "@/components/Bloc";
import { Icone } from "@/components/Icone";
import { Bouton } from "@/components/Bouton";
import { JsonLd, filAriane } from "@/components/JsonLd";

/**
 * Caux et ses environs. Réécrit intégralement : l'ancienne page recopiait
 * Wikipédia mot pour mot (Béziers, Sète, Hauts Cantons), ce qui n'apportait
 * rien en SEO et exposait au contenu dupliqué.
 */
export default function Environs({ lang }: { lang: Lang }) {
  return (
    <>
      <JsonLd
        data={filAriane([
          [LIBELLES.accueil[lang], route("accueil", lang)],
          [LIBELLES.environs[lang], route("environs", lang)],
        ])}
      />

      <Hero
        hauteur="reduit"
        image="/images/demeure-exterieur.jpg"
        alt={
          lang === "fr"
            ? "La Demeure des Trois Foudres vue de l'extérieur, à Caux"
            : "Demeure des Trois Foudres seen from outside, in Caux"
        }
        kicker={lang === "fr" ? "Autour de la demeure" : "Around the house"}
        titre={ENVIRONS.titre[lang]}
        sousTitre={ENVIRONS.sousTitre[lang]}
      />

      <Section fond="chaux" classe="!py-14">
        <Essentiel items={ENVIRONS.essentiel[lang]} lang={lang} />
      </Section>

      <Section>
        <Kicker>{lang === "fr" ? "Le village" : "The village"}</Kicker>
        <Titre>{lang === "fr" ? "Caux, une circulade au cœur des vignes" : "Caux, a circulade in the heart of the vines"}</Titre>
        <div className="mt-6">
          <Prose paragraphes={ENVIRONS.village[lang]} />
        </div>
        <Liens liens={ENVIRONS.villageLiens} />
        <div className="relative mt-10 aspect-[21/9] overflow-hidden bg-chaux" data-reveal>
          <Image
            src={ENVIRONS.villageImage}
            alt={ENVIRONS.villageAlt[lang]}
            fill
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover"
          />
        </div>
      </Section>

      <Section fond="chaux">
        <Kicker>{lang === "fr" ? "Nos coups de cœur" : "Our favourites"}</Kicker>
        <Titre className="mb-12">
          {lang === "fr" ? "À moins d'une heure de la maison" : "Less than an hour from the house"}
        </Titre>

        <div className="space-y-16 md:space-y-20">
          {ENVIRONS.lieux.map((lieu, i) => (
            <article
              key={lieu.id}
              className={`grid gap-8 md:items-center md:gap-12 ${lieu.image ? "md:grid-cols-2" : ""}`}
              data-reveal
            >
              {lieu.image && (
                <div
                  className={`relative aspect-[2/1] overflow-hidden bg-pierre ${
                    i % 2 ? "md:order-2" : ""
                  }`}
                >
                  <Image
                    src={lieu.image}
                    alt={lieu.alt?.[lang] ?? lieu.titre[lang]}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className={i % 2 && lieu.image ? "md:order-1" : ""}>
                <p className="text-sm uppercase tracking-[0.14em] text-sauge">
                  {lieu.distance[lang]}
                </p>
                <h3 className="mt-2 font-display text-3xl">{lieu.titre[lang]}</h3>
                <p className="mesure mt-4 text-lg leading-[1.7] text-taupe">{lieu.texte[lang]}</p>
                <Liens liens={lieu.liens} />
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section fond="ardoise">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <Titre className="text-pierre">
            {lang === "fr"
              ? "Dormir au milieu de tout ça"
              : "Sleep in the middle of all of it"}
          </Titre>
          <div className="flex flex-wrap gap-3 md:justify-end" data-reveal>
            <Bouton href={route("chambres", lang)} variante="clair" fleche>
              {UI.tousLesLogements[lang]}
            </Bouton>
            <Bouton href={route("acces", lang)} variante="voile">
              {LIBELLES.acces[lang]}
            </Bouton>
          </div>
        </div>
      </Section>
    </>
  );
}

/** Adresses recommandées : liens sortants discrets, icône « externe », cible tactile. */
function Liens({ liens }: { liens?: { t: string; u: string }[] }) {
  if (!liens?.length) return null;
  return (
    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-1">
      {liens.map((l) => (
        <li key={l.u}>
          <a
            href={l.u}
            target="_blank"
            rel="noopener noreferrer"
            className="lien inline-flex min-h-11 items-center gap-1.5 text-base text-lie"
          >
            {l.t}
            <Icone nom="externe" taille={14} />
          </a>
        </li>
      ))}
    </ul>
  );
}
