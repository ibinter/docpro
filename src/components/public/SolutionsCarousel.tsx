'use client';
// Carrousel « L'écosystème IBIG Soft » — monté par le script universel.
//
// Pourquoi ce composant client plutôt qu'une simple balise <script> en JSX :
// le script vendeur injecte du DOM dans un conteneur data-ibig="solutions".
// Si ce conteneur est rendu par React, l'hydratation détecte un écart et
// supprime le conteneur ; le script se replie alors sur document.body et la
// section s'affiche SOUS le pied de page. On crée donc le conteneur
// impérativement après l'hydratation : React ne gère que le div hôte vide et
// ne touche jamais au contenu injecté.
import { useEffect, useRef } from 'react';

interface IbigSoftApi { __mounted?: boolean; render?: () => void }
declare global {
  interface Window { IBIGSOFT?: IbigSoftApi }
}

const CONFIG: Record<string, string> = {
  'data-solution': 'docpro',
  'data-accent': '#4F46E5',
  'data-render': 'solutions',
  'data-masquer-courante': 'true',
  'data-speed': '40',
};

export default function SolutionsCarousel() {
  const hote = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hote.current;
    if (!host || host.dataset.monte === '1') return;
    host.dataset.monte = '1';

    // Conteneur cible créé hors de l'arbre géré par React
    const slot = document.createElement('div');
    slot.setAttribute('data-ibig', 'solutions');
    host.appendChild(slot);

    // Script déjà chargé (navigation client) : on redemande simplement un rendu
    if (window.IBIGSOFT?.render) {
      window.IBIGSOFT.render();
      return;
    }

    const script = document.createElement('script');
    script.src = '/assets/js/ibigsoft-universal.js';
    script.defer = true;
    for (const [k, v] of Object.entries(CONFIG)) script.setAttribute(k, v);
    document.body.appendChild(script);
  }, []);

  return <div ref={hote} />;
}
