import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Bloque / relâche le défilement du fond quand un overlay s'ouvre.
 * Module minuscule et sans dépendance : importé par la nav, le tiroir et la
 * galerie sans tirer Lenis dans le chargement initial.
 */
export function verrouScroll(actif: boolean) {
  if (typeof window === "undefined") return;
  document.body.style.overflow = actif ? "hidden" : "";
  if (actif) window.__lenis?.stop();
  else window.__lenis?.start();
}
