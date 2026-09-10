/**
 * Script d'amorce des animations, injecté dans le <head>.
 *
 * Il pose la classe `anime` sur <html> : c'est elle, et elle seule, qui
 * autorise le CSS à masquer les éléments en attente de révélation. Sans
 * JavaScript, la classe n'est jamais posée et tout le contenu est visible.
 *
 * Il arme aussi un filet de sécurité : si GSAP n'a pas pris la main au bout
 * de 2,5 s (script bloqué, onglet en arrière-plan qui ne fait pas tourner
 * requestAnimationFrame, erreur réseau), la classe est retirée et la page
 * s'affiche normalement. Une page blanche n'est jamais une option.
 */
const AMORCE = `(function(){
  var r=document.documentElement;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  r.classList.add('anime');
  var t=setTimeout(function(){r.classList.remove('anime')},2500);
  window.__revealPret=function(){clearTimeout(t)};
})();`;

export default function AmorceAnimation() {
  return <script dangerouslySetInnerHTML={{ __html: AMORCE }} />;
}
