"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Contrôleur unique des reveals au scroll.
 * Tout élément portant `data-reveal` est révélé : fade + translateY(32px).
 * `data-reveal="stagger"` sur un parent décale ses enfants directs de 0,12 s.
 *
 * Un seul moteur, un seul ScrollTrigger par élément — cf. DESIGN.md §4.
 */
export default function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Le CSS a déjà neutralisé l'état initial : rien à animer.
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const groupe = el.dataset.reveal === "stagger";
        const cibles = groupe ? Array.from(el.children) : [el];

        // Un parent « stagger » ne s'anime pas lui-même : seuls ses enfants bougent.
        if (groupe) gsap.set(el, { opacity: 1, y: 0 });
        gsap.set(cibles, { opacity: 0, y: 32 });

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

    // Les images se chargeant après coup, les positions changent.
    const rafraichir = () => ScrollTrigger.refresh();
    window.addEventListener("load", rafraichir);

    return () => {
      window.removeEventListener("load", rafraichir);
      ctx.revert();
    };
  }, []);

  return null;
}
