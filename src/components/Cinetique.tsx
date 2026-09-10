"use client";

import dynamic from "next/dynamic";

/**
 * Smooth scroll et reveals chargés après l'hydratation, hors du chunk
 * principal : la nav et les CTA deviennent cliquables plus tôt. Un clic
 * pendant l'hydratation est un clic perdu — c'était l'autre cause possible
 * du « deuxième clic ».
 */
const SmoothScroll = dynamic(() => import("./SmoothScroll"), { ssr: false });
const Reveal = dynamic(() => import("./Reveal"), { ssr: false });

export default function Cinetique() {
  return (
    <>
      <SmoothScroll />
      <Reveal />
    </>
  );
}
