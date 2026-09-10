"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icone } from "./Icone";
import type { Lang } from "@/lib/site";
import { UI } from "@/content/ui";
import type { Photo } from "@/content/logements";
import { verrouScroll } from "./SmoothScroll";

/**
 * Galerie photo. Pas de carrousel automatique (DESIGN.md §5) : rien ne défile
 * tout seul. Coins nets sur les images — un rayon sur une photo d'architecture,
 * c'est la signature du template.
 */
export default function Galerie({ photos, lang }: { photos: Photo[]; lang: Lang }) {
  const [index, setIndex] = useState<number | null>(null);

  const fermer = useCallback(() => setIndex(null), []);
  const bouger = useCallback(
    (pas: number) => setIndex((i) => (i === null ? null : (i + pas + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    verrouScroll(index !== null);
    if (index === null) return;
    const clavier = (e: KeyboardEvent) => {
      if (e.key === "Escape") fermer();
      if (e.key === "ArrowRight") bouger(1);
      if (e.key === "ArrowLeft") bouger(-1);
    };
    window.addEventListener("keydown", clavier);
    return () => window.removeEventListener("keydown", clavier);
  }, [index, fermer, bouger]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4" data-reveal="stagger">
        {photos.map((p, i) => (
          <li key={p.src}>
            <button
              onClick={() => setIndex(i)}
              className="group relative block aspect-[4/3] w-full overflow-hidden bg-chaux"
              aria-label={p.alt[lang]}
            >
              <Image
                src={p.src}
                alt={p.alt[lang]}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-feutre)] group-hover:scale-[1.04]"
              />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-ardoise/97 sur-ardoise"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between px-5 py-4 text-pierre">
              <span className="text-sm tabular-nums text-pierre/70">
                {index + 1} / {photos.length}
              </span>
              <button
                onClick={fermer}
                aria-label={UI.fermer[lang]}
                className="flex h-11 w-11 items-center justify-center"
              >
                <Icone nom="fermer" taille={24} />
              </button>
            </div>

            <div className="relative flex-1">
              <Image
                key={photos[index].src}
                src={photos[index].src}
                alt={photos[index].alt[lang]}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="flex items-center justify-between gap-4 px-5 pb-6 pt-3">
              <button
                onClick={() => bouger(-1)}
                aria-label={UI.precedent[lang]}
                className="flex h-12 w-12 items-center justify-center rounded-fin border border-pierre/25 text-pierre"
              >
                <Icone nom="chevron-gauche" taille={22} />
              </button>
              <p className="mesure text-center text-sm text-pierre/70">{photos[index].alt[lang]}</p>
              <button
                onClick={() => bouger(1)}
                aria-label={UI.suivant[lang]}
                className="flex h-12 w-12 items-center justify-center rounded-fin border border-pierre/25 text-pierre"
              >
                <Icone nom="chevron-droite" taille={22} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
