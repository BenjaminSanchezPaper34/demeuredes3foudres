"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    /** Posé par le script d'amorce du <head> : désamorce le filet de sécurité. */
    __revealPret?: () => void;
    /** Nombre de déclencheurs posés par la dernière passe — contrôle en production. */
    __revealCompte?: number;
  }
}

/**
 * Contrôleur unique des reveals au scroll.
 * Tout élément portant `data-reveal` est révélé : fade + translateY(32px).
 * `data-reveal="stagger"` sur un parent décale ses enfants directs de 0,12 s.
 *
 * L'état masqué initial vient du CSS (classe `anime`), jamais d'un `gsap.set` :
 * un style en ligne survivrait au filet de sécurité du <head> et laisserait le
 * contenu invisible si le ticker ne tournait pas. GSAP ne fait qu'animer VERS
 * l'état visible.
 *
 * Relancé à CHAQUE changement de page : le composant vit dans la coque
 * commune et ne se remonte pas lors d'une navigation client. Sans cette
 * dépendance au chemin, les blocs de la page suivante restaient masqués
 * jusqu'au rechargement — « il faut un deuxième clic ».
 *
 * Un seul moteur, un seul ScrollTrigger par élément — cf. DESIGN.md §4.
 */
export default function Reveal() {
  const chemin = usePathname();

  useEffect(() => {
    const racine = document.documentElement;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      racine.classList.remove("anime");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let compte = 0;
    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        compte += 1;
        const groupe = el.dataset.reveal === "stagger";
        const cibles = groupe ? Array.from(el.children) : [el];
        if (!cibles.length) return;

        gsap.to(cibles, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          stagger: groupe ? 0.12 : 0,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    });

    window.__revealCompte = compte;
    // GSAP a la main : le filet de sécurité peut être désamorcé.
    window.__revealPret?.();
    // La page vient de changer : les positions aussi.
    ScrollTrigger.refresh();

    // Les images se chargeant après coup, les positions changent.
    const rafraichir = () => ScrollTrigger.refresh();
    window.addEventListener("load", rafraichir);

    return () => {
      window.removeEventListener("load", rafraichir);
      ctx.revert();
    };
  }, [chemin]);

  return null;
}
