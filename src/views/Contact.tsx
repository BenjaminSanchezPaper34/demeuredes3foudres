import { Suspense } from "react";
import { Icone } from "@/components/Icone";
import type { Lang } from "@/lib/site";
import { SITE } from "@/lib/site";
import { route } from "@/lib/routes";
import { CONTACT } from "@/content/pages";
import { LIBELLES, UI } from "@/content/ui";
import Hero from "@/components/Hero";
import { Section, Kicker } from "@/components/Bloc";
import Formulaire from "@/components/Formulaire";
import { LienTelephone, LienItineraire } from "@/components/Traces";
import { NoteGoogle } from "@/components/Reassurance";
import { JsonLd, filAriane } from "@/components/JsonLd";

export default function Contact({ lang }: { lang: Lang }) {
  return (
    <>
      <JsonLd
        data={filAriane([
          [LIBELLES.accueil[lang], route("accueil", lang)],
          [LIBELLES.contact[lang], route("contact", lang)],
        ])}
      />

      <Hero
        hauteur="reduit"
        image="/images/demeure-exterieur.jpg"
        alt={
          lang === "fr"
            ? "La Demeure des Trois Foudres à Caux, dans l'Hérault"
            : "Demeure des Trois Foudres in Caux, Hérault"
        }
        kicker={LIBELLES.contact[lang]}
        titre={CONTACT.titre[lang]}
        sousTitre={CONTACT.sousTitre[lang]}
      />

      <Section>
        <div className="grid gap-14 md:grid-cols-[1fr_1.2fr] md:gap-16">
          {/* Un humain joignable, en clair, immobile. */}
          <div>
            <Kicker>{lang === "fr" ? "Nous joindre" : "Reach us"}</Kicker>
            <ul className="space-y-5">
              <li>
                <LienTelephone
                  depuis="contact"
                  className="group flex items-start gap-4 transition-colors hover:text-lie"
                >
                  <Icone nom="telephone" taille={22} className="mt-1 text-sauge" />
                  <span>
                    <span className="block font-display text-2xl">{SITE.telephoneAffiche}</span>
                    <span className="mt-1 block text-sm text-taupe">
                      {lang === "fr" ? "Nous répondons nous-mêmes" : "We answer in person"}
                    </span>
                  </span>
                </LienTelephone>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-start gap-4 transition-colors hover:text-lie"
                >
                  <Icone nom="mail" taille={22} className="mt-1 text-sauge" />
                  <span className="break-all text-lg">{SITE.email}</span>
                </a>
              </li>
              <li>
                <LienItineraire className="group flex items-start gap-4 transition-colors hover:text-lie">
                  <Icone nom="adresse" taille={22} className="mt-1 text-sauge" />
                  <span className="text-lg not-italic">
                    {SITE.adresse.rue}
                    <br />
                    {SITE.adresse.codePostal} {SITE.adresse.ville}
                    <span className="mt-1 block text-sm text-taupe">{UI.itineraire[lang]}</span>
                  </span>
                </LienItineraire>
              </li>
            </ul>

            <div className="mt-10 border-t border-sauge/40 pt-8">
              <NoteGoogle lang={lang} />
            </div>
          </div>

          <div>
            <Suspense fallback={null}>
              <Formulaire lang={lang} />
            </Suspense>
          </div>
        </div>
      </Section>
    </>
  );
}
