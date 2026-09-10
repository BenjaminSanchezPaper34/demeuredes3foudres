import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import type { Lang } from "@/lib/site";
import { route, urlLogement, type LogementId } from "@/lib/routes";
import { LOGEMENTS, parId } from "@/content/logements";
import { LIBELLES, UI } from "@/content/ui";
import Hero from "@/components/Hero";
import { Section, Kicker, Titre, Prose, Filet } from "@/components/Bloc";
import Galerie from "@/components/Galerie";
import { BoutonReserver } from "@/components/Reservation";
import CarteLogement from "@/components/CarteLogement";
import { JsonLd, ficheLogement, filAriane } from "@/components/JsonLd";

export default function Logement({ id, lang }: { id: LogementId; lang: Lang }) {
  const l = parId(id);
  const autres = LOGEMENTS.filter((x) => x.id !== id);
  const pieces =
    l.chambres > 1 ? `${l.chambres} ${UI.chambresPluriel[lang]}` : `${l.chambres} ${UI.chambre[lang]}`;

  return (
    <>
      <JsonLd data={ficheLogement(id, lang)} />
      <JsonLd
        data={filAriane([
          [LIBELLES.accueil[lang], route("accueil", lang)],
          [LIBELLES.chambres[lang], route("chambres", lang)],
          [l.nom[lang], urlLogement(id, lang)],
        ])}
      />

      <Hero
        hauteur="reduit"
        image={l.photos[0].src}
        alt={l.photos[0].alt[lang]}
        kicker={`${l.surface} m² · ${l.capacite} ${
          l.capacite > 1 ? UI.personnes[lang] : UI.personne[lang]
        } · ${pieces}`}
        titre={l.nom[lang]}
        sousTitre={l.accroche[lang]}
      />

      <Section>
        <Link
          href={route("chambres", lang)}
          className="mb-10 inline-flex items-center gap-2 text-base text-taupe transition-colors hover:text-lie"
        >
          <ArrowLeft size={16} /> {UI.retourChambres[lang]}
        </Link>

        <div className="grid gap-14 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <Prose paragraphes={l.texte[lang]} />

          <aside>
            <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.16em] text-taupe">
              {UI.equipements[lang]}
            </h2>
            <ul className="mt-5 space-y-3" data-reveal="stagger">
              {l.equipements.map((e, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-chene">
                  <Check size={16} className="mt-1 shrink-0 text-sauge" />
                  {e[lang]}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <BoutonReserver lang={lang} smoobuId={l.smoobuId} className="w-full sm:w-auto" />
            </div>
          </aside>
        </div>
      </Section>

      <Section fond="chaux">
        <Kicker>{UI.photos[lang]}</Kicker>
        <Titre className="mb-10">{l.nom[lang]}</Titre>
        <Galerie photos={l.photos} lang={lang} />
      </Section>

      <Section>
        <Filet />
        <div className="mt-12">
          <Titre className="mb-10">
            {lang === "fr" ? "Les autres logements" : "The other places to stay"}
          </Titre>
          <div className="grid gap-10 md:grid-cols-2 md:gap-8" data-reveal="stagger">
            {autres.map((a) => (
              <CarteLogement key={a.id} logement={a} lang={lang} />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
