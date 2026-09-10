#!/usr/bin/env python3
"""Génère la planche de validation des icônes maison depuis traces.json.

Usage : python3 scripts/planche-icones.py [sortie.html]
Une seule source de tracés (src/components/icones/traces.json), lue par le
composant Icone.tsx et par cette planche : corriger un tracé le corrige partout.
"""
import json, sys, html, pathlib

RACINE = pathlib.Path(__file__).resolve().parent.parent
T = json.load(open(RACINE / "src/components/icones/traces.json", encoding="utf-8"))
SORTIE = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else RACINE / "planche-icones.html"

FAMILLES = [
  ("Navigation", "Ce qui fait bouger le visiteur d'un endroit à l'autre. Le menu reprend le motif des trois foudres du logo.",
   ["trois-foudres","fermer","fleche-droite","fleche-gauche","chevron-bas","chevron-gauche","chevron-droite","externe"]),
  ("Contact et temps", "Joindre la maison, venir, savoir quand.",
   ["telephone","mail","adresse","itineraire","horloge","calendrier","langue"]),
  ("Preuve", "La note Google et les coches. L'étoile pleine est la seule forme remplie du jeu.",
   ["etoile","etoile-vide","coche"]),
  ("Équipements des logements", "Les tuiles des fiches Écurie, Lingerie, Grenier — ce qu'un client compare entre deux chambres.",
   ["lit","douche","baignoire","clim","wifi","coffre","terrasse","cuisine","wc","murs-chauffants","personnes","surface","chambres","jardin"]),
  ("Le lieu", "Ce qu'on ne trouve pas ailleurs : les petits + de l'accueil et de la demeure.",
   ["piscine","onsen","foudre","billard","velo","borne","petanque","petit-dejeuner","curiosites"]),
  ("Réseaux", "Pied de page.", ["instagram","facebook"]),
]

def svg(nom, taille, trait=1.5, cls=""):
    t = T[nom]; out = []
    for d in t.get("p", []): out.append(f'<path d="{d}"/>')
    for cx, cy, r in t.get("c", []): out.append(f'<circle cx="{cx}" cy="{cy}" r="{r}"/>')
    for d in t.get("f", []): out.append(f'<path d="{d}" fill="currentColor" stroke="none"/>')
    for cx, cy, r in t.get("fc", []): out.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="currentColor" stroke="none"/>')
    return (f'<svg viewBox="0 0 24 24" width="{taille}" height="{taille}" fill="none" stroke="currentColor" '
            f'stroke-width="{trait}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="{cls}">{"".join(out)}</svg>')

n = len([k for k in T if not k.startswith("_")])
listes = set(x for _, _, noms in FAMILLES for x in noms)
oublies = [k for k in T if not k.startswith("_") and k not in listes]
if oublies: print("⚠ icônes absentes de la planche :", oublies, file=sys.stderr)

tuiles = ""
for titre, note, noms in FAMILLES:
    tuiles += f'<section class="famille"><h2>{svg("trois-foudres",18,cls="orn")}{html.escape(titre)}</h2><p class="note">{html.escape(note)}</p><ul class="grille">'
    for nom in noms:
        tuiles += (f'<li class="tuile"><div class="grand">{svg(nom,36)}</div>'
                   f'<div class="petits">{svg(nom,20,cls="sauge")}{svg(nom,16,cls="taupe")}</div><code>{nom}</code></li>')
    tuiles += '</ul></section>'

page = f'''<title>Icônes Trois Foudres</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500&display=swap">
<style>
:root{{--pierre:#EFE9DE;--chaux:#F8F4ED;--ardoise:#2A2926;--chene:#241C15;--taupe:#5F584D;--sauge:#8A9179;--lie:#6E2B2B;
--fond:var(--pierre);--fond2:var(--chaux);--encre:var(--chene);--encre2:var(--taupe);--filet:rgba(138,145,121,.45);
--inv-fond:var(--ardoise);--inv-encre:var(--pierre)}}
@media (prefers-color-scheme:dark){{:root:not([data-theme="light"]){{--fond:#2A2926;--fond2:#33322E;--encre:#EFE9DE;--encre2:rgba(239,233,222,.72);--filet:rgba(138,145,121,.35);--inv-fond:#EFE9DE;--inv-encre:#241C15}}}}
:root[data-theme="dark"]{{--fond:#2A2926;--fond2:#33322E;--encre:#EFE9DE;--encre2:rgba(239,233,222,.72);--filet:rgba(138,145,121,.35);--inv-fond:#EFE9DE;--inv-encre:#241C15}}
body{{background:var(--fond);color:var(--encre);font:16px/1.6 "Switzer",system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}}
main{{max-width:1080px;margin:0 auto;padding:48px 24px 96px}}
h1,h2{{font-family:"Fraunces",Georgia,serif;font-weight:400;letter-spacing:-.015em;text-wrap:balance;margin:0}}
h1{{font-size:clamp(2rem,5vw,3.4rem);line-height:1.05}}
.entete{{display:grid;gap:14px;padding-bottom:36px;border-bottom:1px solid var(--filet)}}
.kicker{{display:flex;align-items:center;gap:10px;font-size:.8rem;letter-spacing:.16em;text-transform:uppercase;color:var(--encre2);margin:0}}
.kicker svg{{color:var(--sauge)}}
.entete p{{max-width:62ch;color:var(--encre2);margin:0}}
.regles{{display:flex;flex-wrap:wrap;gap:8px 28px;font-size:.9rem;color:var(--encre2);font-variant-numeric:tabular-nums;margin:0;padding:0;list-style:none}}
.regles b{{color:var(--encre);font-weight:500}}
.famille{{padding:40px 0 8px}}
h2{{font-size:1.6rem;display:flex;align-items:center;gap:10px}}
h2 .orn{{color:var(--sauge)}}
.note{{color:var(--encre2);max-width:62ch;margin:6px 0 20px}}
.grille{{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}}
.tuile{{display:grid;grid-template-rows:auto auto auto;gap:10px;padding:16px 14px 12px;background:var(--fond2);border:1px solid var(--filet);border-radius:3px}}
.grand{{color:var(--encre);height:36px}}
.petits{{display:flex;align-items:center;gap:14px;height:20px}}
.sauge{{color:var(--sauge)}}.taupe{{color:var(--encre2)}}
code{{font:.78rem/1 ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--encre2);letter-spacing:.02em}}
.contexte{{margin-top:56px;padding-top:36px;border-top:1px solid var(--filet)}}
.specimens{{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;align-items:start;margin-top:20px}}
.spec{{display:grid;gap:12px;padding:18px;border:1px solid var(--filet);border-radius:3px;background:var(--fond2)}}
.spec small{{font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;color:var(--encre2)}}
.cta{{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:12px 24px;border-radius:2px;font-weight:500;background:var(--lie);color:var(--pierre);width:100%;text-decoration:none}}
.cta.ligne{{background:transparent;color:var(--encre);border:1px solid var(--filet)}}
.eq{{display:grid;gap:8px;padding:14px;min-height:72px;border:1px solid var(--filet);border-radius:3px;background:var(--fond)}}
.eq svg{{color:var(--sauge)}}.eq span{{font-size:.9rem;line-height:1.3}}
.eqs{{display:grid;grid-template-columns:1fr 1fr;gap:10px}}
.inverse{{margin-top:14px;padding:22px;border-radius:3px;background:var(--inv-fond);color:var(--inv-encre);display:grid;gap:16px}}
.inverse .cta{{background:var(--inv-encre);color:var(--inv-fond)}}
.inverse .cta.voile{{background:transparent;color:var(--inv-encre);border:1px solid currentColor;opacity:.9}}
.inverse .rang{{display:flex;flex-wrap:wrap;gap:18px;align-items:center}}
.inverse small{{opacity:.7}}
.barre{{display:flex;gap:8px;padding:8px;border-radius:3px;background:var(--ardoise);color:var(--pierre)}}
.barre .cta{{background:var(--pierre);color:var(--chene)}}
.barre .tel{{display:flex;align-items:center;justify-content:center;width:52px;height:52px;border:1px solid rgba(239,233,222,.3);border-radius:2px;flex:none}}
.fin{{margin-top:48px;color:var(--encre2);font-size:.9rem;max-width:62ch}}
@media (prefers-reduced-motion:no-preference){{.cta svg{{transition:transform .3s cubic-bezier(.22,.61,.36,1)}}.cta:hover svg{{transform:translateX(2px)}}}}
</style>
<main>
<header class="entete">
  <p class="kicker">{svg("trois-foudres",18)}Demeure des Trois Foudres · Caux</p>
  <h1>Icônes Trois Foudres</h1>
  <p>Le jeu d'icônes maison du site, dessiné pour remplacer les icônes génériques. Chaque icône est montrée à 36, 20 et 16 px — les trois tailles réellement utilisées — sur les deux fonds du site.</p>
  <ul class="regles"><li><b>{n}</b> icônes</li><li>grille <b>24</b></li><li>trait <b>1,5 px</b></li><li>bouts <b>ronds</b></li><li>couleur <b>héritée du texte</b>, jamais en aplat</li></ul>
</header>
{tuiles}
<section class="contexte">
  <h2>{svg("trois-foudres",18,cls="orn")}En contexte</h2>
  <p class="note">Les trois emplois qui comptent : le bouton, la tuile d'équipement, l'ornement de section. Puis l'inversion sur Ardoise — l'accent lie-de-vin n'y va jamais, le CTA passe en Pierre.</p>
  <div class="specimens">
    <div class="spec"><small>CTA primaire · mobile 52 px</small><a class="cta" href="#">Voir les disponibilités {svg("fleche-droite",18)}</a><a class="cta ligne" href="#">Les trois logements</a></div>
    <div class="spec"><small>Tuiles d'équipement · 2 colonnes</small><div class="eqs">
      <div class="eq">{svg("baignoire",22)}<span>Baignoire</span></div><div class="eq">{svg("terrasse",22)}<span>Terrasse privative</span></div>
      <div class="eq">{svg("wc",22)}<span>WC séparé</span></div><div class="eq">{svg("murs-chauffants",22)}<span>Murs chauffants dans la salle d'eau</span></div></div></div>
    <div class="spec"><small>Ornement de section</small><p class="kicker">{svg("trois-foudres",18)}Les chambres</p><p style="margin:0;font-family:Fraunces,Georgia,serif;font-size:1.5rem;line-height:1.15">Deux chambres et un appartement, indépendants</p>
      <small>Barre mobile fixe</small><div class="barre"><a class="cta" href="#">Voir les disponibilités {svg("fleche-droite",18)}</a><a class="tel" href="#">{svg("telephone",22)}</a></div></div>
  </div>
  <div class="inverse">
    <div class="rang"><a class="cta" href="#" style="width:auto">Voir les disponibilités {svg("fleche-droite",18)}</a><a class="cta voile" href="#" style="width:auto">Les trois logements</a></div>
    <div class="rang">{svg("onsen",24)}{svg("foudre",24)}{svg("billard",24)}{svg("curiosites",24)}{svg("piscine",24)}{svg("velo",24)}{svg("borne",24)}{svg("petanque",24)}{svg("telephone",24)}{svg("instagram",24)}{svg("facebook",24)}<small>sur Ardoise, en Pierre</small></div>
  </div>
</section>
<p class="fin">Une seule source : <code>src/components/icones/traces.json</code>, lue par le composant du site et par cette planche (<code>scripts/planche-icones.py</code>). Corriger un tracé le corrige partout. Les libellés de la planche sont en police système ; sur le site, c'est Switzer.</p>
</main>
'''
SORTIE.write_text(page, encoding="utf-8")
print(f"planche : {SORTIE} — {n} icônes")
