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

import type { ArticleComplet, Breve, Carte } from './api';
import { dateLongue, imageUrl, tempsLecture } from './api';
import type { Article } from './article-view';

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

// --- Stories ----------------------------------------------------------------

export type StorySlide = { image: string; caption: string; region: string };
export type Story = { id: string; label: string; title: string; cover: string; slides: StorySlide[] };

/** Une bulle au maximum par étiquette, et pas de mur de bulles à l'écran. */
const BULLES_MAX = 6;
/** Au-delà, personne ne va au bout d'une story. */
const DIAPOS_MAX = 5;

/**
 * Compose les « stories » de l'accueil à partir des brèves illustrées.
 *
 * Le contenu affiché était auparavant écrit en dur — des légendes comme
 * « L'indice composite gagne 0,42 % à la clôture », c'est-à-dire un chiffre de
 * marché inventé, daté du jour, publié sous le nom du journal. Les stories
 * viennent désormais de la rédaction ou n'existent pas.
 *
 * Une bulle par étiquette, ses brèves en diapositives. Seules les brèves
 * **illustrées** entrent : une story sans image n'est pas une story, et il
 * n'est pas question de leur prêter un visuel pris ailleurs, qui ferait
 * illustration mensongère.
 *
 * Les brèves arrivent déjà triées de la plus récente à la plus ancienne ; on
 * conserve cet ordre, à l'intérieur des bulles comme entre elles.
 */
export function brevesVersStories(breves: Breve[]): Story[] {
  const parEtiquette = new Map<string, Story>();

  for (const breve of breves) {
    const image = imageUrl(breve.imageUrl);

    if (!image) continue;

    const existante = parEtiquette.get(breve.tag);

    if (existante) {
      if (existante.slides.length < DIAPOS_MAX) {
        existante.slides.push({ image, caption: breve.titre, region: breve.region.name });
      }

      continue;
    }

    parEtiquette.set(breve.tag, {
      id: slugifier(breve.tag),
      label: 'BRÈVES',
      title: breve.tag,
      // La couverture est la première image de la bulle, donc la plus récente :
      // une story doit s'ouvrir sur ce qu'elle montre.
      cover: image,
      slides: [{ image, caption: breve.titre, region: breve.region.name }],
    });
  }

  return [...parEtiquette.values()].slice(0, BULLES_MAX);
}
