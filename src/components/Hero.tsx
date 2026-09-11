import Image from "next/image";
import { Icone } from "./Icone";
import HeroVideo from "./HeroVideo";
import type { ReactNode } from "react";

/**
 * Hero plein écran.
 *
 * Effet signature : la photo est peinte immédiatement (priority), et deux
 * panneaux Ardoise se retirent vers les bords comme les volets de la façade
 * qu'on pousse le matin. L'animation est en CSS pur — elle ne dépend pas de
 * l'hydratation et ne retarde pas le LCP.
 *
 * `volets` n'est activé QUE sur l'accueil : un effet signature ne se répète pas.
 */
export default function Hero({
  image,
  alt,
  kicker,
  titre,
  sousTitre,
  actions,
  volets = false,
  hauteur = "plein",
  video,
}: {
  image: string;
  alt: string;
  kicker?: string;
  titre: string;
  sousTitre?: string;
  actions?: ReactNode;
  volets?: boolean;
  hauteur?: "plein" | "reduit";
  /** Fond vidéo : `image` devient alors le poster. */
  video?: { desktop: string; mobile: string };
}) {
  const classeHauteur =
    hauteur === "plein"
      ? "min-h-[78svh] md:min-h-[92svh]"
      : "min-h-[58svh] md:min-h-[64svh]";

  return (
    <header className={`relative isolate flex items-end overflow-hidden ${classeHauteur}`}>
      {video ? (
        <HeroVideo poster={image} alt={alt} desktop={video.desktop} mobile={video.mobile} />
      ) : (
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="100vw"
          quality={82}
          className="-z-10 object-cover"
        />
      )}
      {/* Voile de lecture : le texte doit rester lisible quelle que soit la photo. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-chene/80 via-chene/35 to-chene/45"
      />

      {volets && (
        <>
          <div aria-hidden className="volet volet-gauche" />
          <div aria-hidden className="volet volet-droit" />
        </>
      )}

      <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-32 md:px-8 md:pb-28">
        {kicker && (
          <p className="mb-4 flex items-center gap-2.5 text-sm font-medium uppercase tracking-[0.16em] text-pierre/80">
            <Icone nom="trois-foudres" taille={18} className="text-pierre/70" />
            {kicker}
          </p>
        )}
        <h1 className="max-w-[19ch] text-[clamp(2.2rem,5.6vw,4.4rem)] leading-[1.06] text-pierre">
          {titre}
        </h1>
        {sousTitre && (
          <p className="mt-6 max-w-[52ch] text-lg leading-[1.65] text-pierre/85 md:text-xl">
            {sousTitre}
          </p>
        )}
        {actions && <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">{actions}</div>}
      </div>

      {hauteur === "plein" && (
        <Icone
          nom="chevron-bas"
          taille={26}
          className="fleche-scroll absolute bottom-7 left-1/2 -translate-x-1/2 text-pierre"
        />
      )}
    </header>
  );
}
