import Image from "next/image";
import type { Lang } from "@/lib/site";
import { route } from "@/lib/routes";
import { BAINS, CHAI } from "@/content/pages";
import { LIBELLES, UI } from "@/content/ui";
import Hero from "@/components/Hero";
import { Section, Kicker, Titre, Prose, Essentiel } from "@/components/Bloc";
import { Bouton } from "@/components/Bouton";
import { BoutonReserver } from "@/components/Reservation";
import { JsonLd, ficheChai, filAriane } from "@/components/JsonLd";

/* ------------------------------------------------------------ BAINS JAPONAIS */

export function BainsJaponais({ lang }: { lang: Lang }) {
  return (
    <>
      <JsonLd
        data={filAriane([
          [LIBELLES.accueil[lang], route("accueil", lang)],
          [LIBELLES.bainsJaponais[lang], route("bainsJaponais", lang)],
        ])}
      />

      <Hero
        hauteur="reduit"
        image="/images/bains-japonais-onsen.jpg"
        alt={
          lang === "fr"
            ? "Bain japonais aménagé dans une ancienne cuve à vin : mosaïque vert d'eau et banquette en bois"
            : "Japanese bath built inside a former wine vat: sea-green mosaic and wooden bench"
        }
        kicker={lang === "fr" ? "Espace bien-être" : "Wellness"}
        titre={BAINS.titre[lang]}
        sousTitre={BAINS.sousTitre[lang]}
      />

      <Section fond="chaux" classe="!py-14">
        <Essentiel items={BAINS.essentiel[lang]} lang={lang} />
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <Kicker>{lang === "fr" ? "Deux anciennes cuves" : "Two former vats"}</Kicker>
            <Titre>
              {lang === "fr"
                ? "Une pièce sans fenêtre où la température ne bouge pas"
                : "A windowless room where the temperature never moves"}
            </Titre>
            <div className="mt-6">
              <Prose paragraphes={BAINS.corps[lang]} />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <BoutonReserver lang={lang} />
              <Bouton href={route("chambres", lang)} variante="ligne">
                {UI.tousLesLogements[lang]}
              </Bouton>
            </div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden bg-chaux" data-reveal>
            <Image
              src="/images/bains-japonais-acces.jpg"
              alt={
                lang === "fr"
                  ? "Accès aux bains japonais, plafond en bois et vasque en pierre"
                  : "Way through to the Japanese baths, timber ceiling and stone basin"
              }
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Section>

      <Section fond="ardoise">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <Titre className="text-pierre">
            {lang === "fr"
              ? "L'équipement d'hiver de la maison, quand la piscine est fermée"
              : "The winter counterpart to the pool"}
          </Titre>
          <div className="md:justify-self-end" data-reveal>
            <BoutonReserver lang={lang} variante="clair" />
          </div>
        </div>
      </Section>
    </>
  );
}

/* -------------------------------------------------------------------- LE CHAI */

export function LeChai({ lang }: { lang: Lang }) {
  return (
    <>
      <JsonLd data={ficheChai(lang)} />
      <JsonLd
        data={filAriane([
          [LIBELLES.accueil[lang], route("accueil", lang)],
          [LIBELLES.leChai[lang], route("leChai", lang)],
        ])}
      />

      <Hero
        hauteur="reduit"
        image="/images/chai-foudre-centenaire.jpg"
        alt={
          lang === "fr"
            ? "Le chai et son foudre centenaire en chêne de Russie, sous charpente apparente"
            : "The wine hall and its century-old Russian-oak tun, under exposed roof timbers"
        }
        kicker={lang === "fr" ? "Salle de réception · Caux, près de Pézenas" : "Reception room · Caux, near Pézenas"}
        titre={CHAI.titre[lang]}
        sousTitre={CHAI.sousTitre[lang]}
      />

      <Section fond="chaux" classe="!py-14">
        <Essentiel items={CHAI.essentiel[lang]} lang={lang} />
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/5] overflow-hidden bg-chaux md:order-2" data-reveal>
            <Image
              src="/images/chai-fresque-petanque.jpg"
              alt={
                lang === "fr"
                  ? "Le couloir du chai, sa fresque murale et le terrain de pétanque intérieur"
                  : "The wine hall corridor, its mural and the indoor pétanque court"
              }
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="md:order-1">
            <Kicker>{lang === "fr" ? "Trois foudres" : "Three tuns"}</Kicker>
            <Titre>
              {lang === "fr"
                ? "La pièce qui a donné son nom à la maison"
                : "The room that gave the house its name"}
            </Titre>
            <div className="mt-6">
              <Prose paragraphes={CHAI.corps[lang]} />
            </div>
          </div>
        </div>
      </Section>

      {/* Tarifs et conditions du chai en attente du client : on ne les invente pas. */}
      <Section fond="ardoise">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <Titre className="text-pierre">
              {lang === "fr" ? "Parlons de votre événement" : "Tell us about your event"}
            </Titre>
            <p className="mesure mt-5 text-lg leading-[1.7] text-pierre/80" data-reveal>
              {lang === "fr"
                ? "Chaque demande est étudiée au cas par cas : la date, le nombre de personnes, la formule et l'hébergement des invités sur place. Écrivez-nous, nous vous répondons avec une proposition chiffrée."
                : "We look at every enquiry case by case: the date, the number of guests, the format, and rooms on site for those staying over. Write to us and we will come back with a quote."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end" data-reveal>
            <Bouton href={`${route("contact", lang)}?sujet=chai`} variante="clair">
              {lang === "fr" ? "Demander une proposition" : "Request a quote"}
            </Bouton>
          </div>
        </div>
      </Section>
    </>
  );
}
