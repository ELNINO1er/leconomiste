/**
 * Pont entre l'API et la forme d'affichage du site.
 *
 * Les composants — cartes, carrousels, slider — attendent le type `Article` :
 * un titre, une rubrique, une signature, une image, déjà mis en forme. L'API,
 * elle, renvoie des valeurs brutes et des objets imbriqués.
 *
 * Traduire ici plutôt que de réécrire une dizaine de composants est un choix
 * délibéré : le rendu ne change pas d'un pixel, et le risque de régression
 * visuelle tombe à zéro. `Article` cesse d'être « la forme des données de
 * démonstration » pour devenir ce qu'il a toujours été en pratique — le modèle
 * d'affichage du site.
 */

import type { ArticleComplet, Carte } from './api';
import { dateLongue, imageUrl, tempsLecture } from './api';
import type { Article } from './mock-data';

/**
 * Illustration de repli.
 *
 * Un article peut paraître sans visuel, et `next/image` refuse une source vide :
 * sans ce repli, la page entière tomberait pour une image manquante.
 */
export const IMAGE_PAR_DEFAUT = '/og-daily.png';

export function carteVersArticle(carte: Carte): Article {
  return {
    slug: carte.slug,
    title: carte.titre,
    excerpt: carte.extrait ?? '',
    category: carte.rubrique.name,
    region: carte.region.name,
    // La signature l'emporte déjà sur le nom du compte côté API : une tribune
    // paraît sous le nom de son auteur, pas sous celui qui l'a saisie.
    author: carte.auteur.nom,
    date: dateLongue(carte.publieLe),
    readTime: tempsLecture(carte.tempsLectureMinutes),
    image: imageUrl(carte.imageUrl) ?? IMAGE_PAR_DEFAUT,
    featured: carte.aLaUne,
    views: carte.vues,
    body: [],
  };
}

/** Idem, pour un article complet : le corps voyage en paragraphes. */
export function articleVersArticle(article: ArticleComplet): Article {
  return { ...carteVersArticle(article), body: article.corps };
}

// --- Cotations ---------------------------------------------------------------

const NOMBRE = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 });

/** « 335.18 » → « 335,18 » · « 7850 » → « 7 850 ». */
export const formatValeur = (valeur: number, unite: string | null): string =>
  unite ? `${NOMBRE.format(valeur)} ${unite}` : NOMBRE.format(valeur);

/**
 * « 0.42 » → « +0,42 % ».
 *
 * Le signe négatif est le vrai — U+2212, pas le trait d'union du clavier :
 * c'est celui que le site utilise déjà, et il s'aligne verticalement avec le
 * plus dans une colonne de chiffres.
 */
export function formatVariation(pct: number | null): string {
  if (pct === null) return '—';

  const signe = pct > 0 ? '+' : pct < 0 ? '−' : '';

  return `${signe}${NOMBRE.format(Math.abs(pct))} %`;
}

/**
 * Les indices se reconnaissent à leur symbole.
 *
 * `BRVM-C`, `BRVM-30` : c'est la convention de la place, et celle que la
 * rédaction saisit dans le back-office. Une valeur cotée porte le symbole de sa
 * société — `ORAC`, `SDCC` — jamais ce préfixe.
 */
export const estIndice = (symbole: string | null): boolean =>
  (symbole ?? '').toUpperCase().startsWith('BRVM-');

/**
 * Slug d'une rubrique à partir de son nom.
 *
 * Le site construit ses URLs de rubrique à partir du libellé — « Finance & BRVM »
 * donne `finance-brvm`. L'API expose déjà le slug ; cette fonction ne sert donc
 * qu'aux endroits qui n'ont que le nom sous la main, et reproduit à l'identique
 * la règle historique du site pour ne casser aucun lien existant.
 */
export const slugifier = (valeur: string): string =>
  valeur
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ & /g, '-')
    .replace(/ /g, '-');
