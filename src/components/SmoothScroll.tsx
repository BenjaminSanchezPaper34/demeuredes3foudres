"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll global. Deux garde-fous :
 * — coupé si l'utilisateur refuse le mouvement ;
 * — coupé au doigt (pointer coarse), où le scroll natif est meilleur.
 * L'instance est exposée pour que les overlays puissent stopper le fond.
 */
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll() {
  useEffect(() => {
    const refuse = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doigt = window.matchMedia("(pointer: coarse)").matches;
    if (refuse || doigt) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    window.__lenis = lenis;

    let id = 0;
    const boucle = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(boucle);
    };
    id = requestAnimationFrame(boucle);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}

/** Bloque/relâche le scroll du fond quand une modale ou un menu s'ouvre. */
export function verrouScroll(actif: boolean) {
  if (typeof window === "undefined") return;
  document.body.style.overflow = actif ? "hidden" : "";
  if (actif) window.__lenis?.stop();
  else window.__lenis?.start();
}
