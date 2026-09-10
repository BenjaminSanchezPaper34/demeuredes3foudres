import Image from "next/image";
import Link from "next/link";
import { Icone, type NomIcone } from "@/components/Icone";
import ListeExtras from "@/components/ListeExtras";
import type { Lang } from "@/lib/site";
import { route } from "@/lib/routes";
import { LOGEMENTS } from "@/content/logements";
import { ACCUEIL } from "@/content/pages";
import { UI, LIBELLES } from "@/content/ui";
import Hero from "@/components/Hero";
import { Section, Kicker, Titre, Prose, Essentiel, Filet } from "@/components/Bloc";
import { Bouton } from "@/components/Bouton";
import { BoutonReserver } from "@/components/Reservation";
import CarteLogement from "@/components/CarteLogement";
import { NoteGoogle, PrixDirect } from "@/components/Reassurance";
import { JsonLd, ficheEtablissement } from "@/components/JsonLd";

/** Une icône par « petit + », dans l'ordre de ACCUEIL.extras. */
const ICONES_EXTRAS: NomIcone[] = ["piscine", "jardin", "petanque", "billard", "velo", "borne"];

/**
 * Accueil. Elle doit convertir seule : Airbnb ne produit rien et Booking est
 * à l'arrêt (ARCHITECTURE.md §6). D'où l'ordre : où/quoi, la preuve, la photo,
 * ce que personne d'autre n'a, un humain joignable.
 */
export default function Accueil({ lang }: { lang: Lang }) {
  return (
    <>
      <JsonLd data={ficheEtablissement(lang)} />

      <Hero
        volets
        image="/images/facade-demeure-caux.jpg"
        alt={
          lang === "fr"
            ? "Façade de la Demeure des Trois Foudres à Caux, ses volets verts et sa cour pavée"
            : "Façade of Demeure des Trois Foudres in Caux, green shutters and paved courtyard"
        }
        kicker={ACCUEIL.kicker[lang]}
        titre={ACCUEIL.titre[lang]}
        sousTitre={ACCUEIL.sousTitre[lang]}
        actions={
          <>
            <BoutonReserver lang={lang} variante="clair" fleche />
            <Bouton href={route("chambres", lang)} variante="voile">
              {UI.tousLesLogements[lang]}
            </Bouton>
          </>
        }
      />

      {/* Où, quoi, combien — puis la preuve. Rien ne doit être cherché. */}
      <Section fond="chaux" classe="!py-14 md:!py-16">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr] md:items-start">
          <Essentiel items={ACCUEIL.essentiel[lang]} lang={lang} />
          <div className="md:pt-2">
            <NoteGoogle lang={lang} />
            <p className="mesure mt-4 text-base leading-relaxed text-taupe" data-reveal>
              {lang === "fr"
                ? "Nous vous répondons nous-mêmes, au téléphone comme par écrit."
                : "We answer you ourselves, by phone or in writing."}
            </p>
          </div>
        </div>
      </Section>

      {/* La maison */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Kicker>{LIBELLES.laDemeure[lang]}</Kicker>
            <Titre>{ACCUEIL.introTitre[lang]}</Titre>
            <div className="mt-6">
              <Prose paragraphes={ACCUEIL.intro[lang]} />
            </div>
            <Bouton href={route("laDemeure", lang)} variante="ligne" fleche className="mt-8">
              {UI.enSavoirPlus[lang]}
            </Bouton>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-chaux" data-reveal>
            <Image
              src="/images/cour-pavee.jpg"
              alt={
                lang === "fr"
                  ? "La cour pavée de pierre des Grands Causses de la demeure"
                  : "The courtyard paved in Grands Causses stone"
              }
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Les trois logements */}
      <Section fond="chaux">
        <Kicker>{LIBELLES.chambres[lang]}</Kicker>
        <Titre>
          {lang === "fr"
            ? "Deux chambres et un appartement, indépendants"
            : "Two rooms and an apartment, all independent"}
        </Titre>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8" data-reveal="stagger">
          {LOGEMENTS.map((l) => (
            <CarteLogement key={l.id} logement={l} lang={lang} />
          ))}
        </div>
      </Section>

      {/* Ce que personne d'autre n'a. La rupture sombre du système. */}
      <Section fond="ardoise">
        <Kicker sombre>{lang === "fr" ? "Sur place" : "On site"}</Kicker>
        <Titre className="text-pierre">
          {lang === "fr"
            ? "Ce que vous ne trouverez pas ailleurs"
            : "What you won't find anywhere else"}
        </Titre>

        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8" data-reveal="stagger">
          {[
            {
              icone: "onsen" as NomIcone,
              href: route("bainsJaponais", lang),
              image: "/images/bains-japonais-onsen.jpg",
              titre: LIBELLES.bainsJaponais[lang],
              texte:
                lang === "fr"
                  ? "Deux onsen creusés dans les anciennes cuves à vin : mosaïque, banquette de bois et silence total."
                  : "Two onsen carved into the former wine vats: mosaic, a wooden bench and total silence.",
              alt:
                lang === "fr"
                  ? "Bain japonais aménagé dans une ancienne cuve à vin, mosaïque vert d'eau"
                  : "Japanese bath built inside a former wine vat, sea-green mosaic",
            },
            {
              icone: "foudre" as NomIcone,
              href: route("leChai", lang),
              image: "/images/chai-foudre-centenaire.jpg",
              titre: LIBELLES.leChai[lang],
              texte:
                lang === "fr"
                  ? "Trois foudres en chêne de Russie, un bar, une charpente apparente : la salle de réception."
                  : "Three Russian-oak tuns, a bar, exposed roof timbers: the reception room.",
              alt:
                lang === "fr"
                  ? "Foudre centenaire en chêne de Russie dans le chai de la demeure"
                  : "Century-old Russian-oak tun in the property's wine hall",
            },
            {
              icone: "curiosites" as NomIcone,
              href: route("laDemeure", lang),
              image: "/images/cabinet-de-curiosites.jpg",
              titre:
                lang === "fr" ? "Le cabinet de curiosités" : "The cabinet of curiosities",
              texte:
                lang === "fr"
                  ? "Une bibliothèque et un billard français d'époque Napoléon III, hors du temps."
                  : "A library and a Napoleon III French billiard table, out of time.",
              alt:
                lang === "fr"
                  ? "Le cabinet de curiosités et son billard Napoléon III"
                  : "The cabinet of curiosities and its Napoleon III billiard table",
            },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="group block active:opacity-80">
              <div className="relative aspect-[4/3] overflow-hidden bg-chene">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-feutre)] group-hover:scale-[1.04]"
                />
              </div>
              <Icone nom={c.icone} taille={24} className="mt-5 text-sauge" />
              <h3 className="mt-3 font-display text-2xl text-pierre transition-colors group-hover:text-sauge">
                {c.titre}
              </h3>
              <p className="mesure mt-3 text-base leading-relaxed text-pierre/70">{c.texte}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Les petits + et la rénovation */}
      <Section>
        <div className="grid gap-14 md:grid-cols-2">
          <div>
            <Kicker>{lang === "fr" ? "Les petits +" : "The extras"}</Kicker>
            <Titre>{lang === "fr" ? "Tout est là, dehors" : "It's all outside"}</Titre>
            <ListeExtras items={ACCUEIL.extras[lang]} icones={ICONES_EXTRAS} />
          </div>
          <div>
            <Kicker>{lang === "fr" ? "La rénovation" : "The restoration"}</Kicker>
            <Titre>{ACCUEIL.renovationTitre[lang]}</Titre>
            <div className="mt-6">
              <Prose paragraphes={ACCUEIL.renovation[lang]} />
            </div>
          </div>
        </div>
      </Section>

      {/* Réserver en direct */}
      <Section fond="chaux">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <PrixDirect lang={lang} />
            <p className="mesure mt-6 text-lg leading-[1.7] text-taupe" data-reveal>
              {ACCUEIL.accueilToute[lang]}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end" data-reveal>
            <BoutonReserver lang={lang} fleche />
            <Bouton href={route("tarifs", lang)} variante="ligne">
              {LIBELLES.tarifs[lang]}
            </Bouton>
          </div>
        </div>
        <div className="mt-14">
          <Filet />
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="font-display text-xl">
              {lang === "fr"
                ? "Caux, Pézenas, le Salagou, la mer à vingt minutes"
                : "Caux, Pézenas, Lake Salagou, the sea twenty minutes away"}
            </p>
            <Bouton href={route("environs", lang)} variante="ligne" fleche>
              {LIBELLES.environs[lang]}
            </Bouton>
          </div>
        </div>
      </Section>
    </>
  );
}
