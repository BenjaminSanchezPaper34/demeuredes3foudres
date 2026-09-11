"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Fond vidéo du hero.
 * Le poster est une vraie image, peinte au premier rendu : c'est lui le LCP.
 * La vidéo n'est demandée qu'après le montage, dans la rendition adaptée à
 * l'écran (480p sur 30 s au doigt, 720p au large), et jamais si l'utilisateur
 * refuse le mouvement ou économise ses données. Muette, en boucle, inline —
 * jamais de son automatique.
 */
export default function HeroVideo({
  poster,
  alt,
  desktop,
  mobile,
}: {
  poster: string;
  alt: string;
  desktop: string;
  mobile: string;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const [pret, setPret] = useState(false);

  useEffect(() => {
    const refuse = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const eco = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (refuse || eco) return;
    setSrc(window.matchMedia("(max-width: 768px)").matches ? mobile : desktop);
  }, [desktop, mobile]);

  return (
    <>
      <Image src={poster} alt={alt} fill priority sizes="100vw" quality={80} className="-z-10 object-cover" />
      {src && (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          onCanPlay={() => setPret(true)}
          className={`absolute inset-0 -z-10 h-full w-full object-cover transition-opacity duration-700 ease-[var(--ease-feutre)] ${
            pret ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </>
  );
}
