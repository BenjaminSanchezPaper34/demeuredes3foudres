import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Lang } from "@/lib/site";
import { urlLogement } from "@/lib/routes";
import type { Logement } from "@/content/logements";
import { UI } from "@/content/ui";

/** Carte d'un logement. Un motif vu deux fois devient un composant. */
export default function CarteLogement({
  logement: l,
  lang,
  priorite,
}: {
  logement: Logement;
  lang: Lang;
  priorite?: boolean;
}) {
  const href = urlLogement(l.id, lang);
  const pieces =
    l.chambres > 1 ? `${l.chambres} ${UI.chambresPluriel[lang]}` : `${l.chambres} ${UI.chambre[lang]}`;

  return (
    <article className="group">
      <Link href={href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-chaux">
          <Image
            src={l.photos[0].src}
            alt={l.photos[0].alt[lang]}
            fill
            priority={priorite}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-feutre)] group-hover:scale-[1.04]"
          />
        </div>
        <div className="pt-5">
          <p className="text-sm uppercase tracking-[0.14em] text-taupe">
            {l.surface} m² · {l.capacite} {l.capacite > 1 ? UI.personnes[lang] : UI.personne[lang]} ·{" "}
            {pieces}
          </p>
          <h3 className="mt-2 font-display text-2xl transition-colors group-hover:text-lie">
            {l.nom[lang]}
          </h3>
          <p className="mesure mt-3 text-base leading-relaxed text-taupe">{l.accroche[lang]}</p>
          <span className="mt-4 inline-flex items-center gap-2 text-base text-lie">
            {UI.decouvrir[lang]}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
