/**
 * Client de l'API rédactionnelle.
 *
 * Le site et l'API vivent sur deux sous-domaines du même hébergement :
 * `leconomistedelacotedivoire.com` sert les pages, `admin.leconomistedelacotedivoire.com`
 * sert les données et le back-office. Les appels de rendu partent donc du
 * serveur Node — de serveur à serveur, sans navigateur et sans CORS.
 *
 * Ce fichier ne fait que deux choses : décrire ce que l'API renvoie, et poser
 * les durées de cache. Aucune mise en forme : l'API rend des valeurs brutes
 * (`statut: "publie"`, `vues: 12400`) et c'est au site de composer ses phrases.
 */

/** Sans variable d'environnement, on vise la production : c'est le cas courant. */
const BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://admin.leconomistedelacotedivoire.com'
).replace(/\/$/, '');

/**
 * Durées de fraîcheur, alignées sur les `Cache-Control` que l'API renvoie déjà.
 *
 * Les tenir ici plutôt que de les disperser dans les pages permet de les lire
 * d'un coup d'œil — et de voir que le fil d'actualité vit à la minute quand les
 * référentiels tiennent l'heure.
 */
export const FRAICHEUR = {
  accueil: 300,
  articles: 120,
  article: 600,
  referentiels: 3600,
  breves: 300,
  flash: 60,
  agenda: 900,
  cotations: 120,
  sitemap: 900,
} as const;

// --- Ce que l'API renvoie ---------------------------------------------------

export type RefRubrique = { slug: string; name: string; color: string };
export type RefRegion = { slug: string; name: string };

export type Carte = {
  id: number;
  slug: string;
  titre: string;
  extrait: string | null;
  imageUrl: string | null;
  tempsLectureMinutes: number;
  vues: number;
  aLaUne: boolean;
  publieLe: string;
  auteur: { nom: string; initiales: string };
  rubrique: RefRubrique;
  region: RefRegion;
};

/** Un article complet : la carte, plus son corps en paragraphes. */
export type ArticleComplet = Carte & { corps: string[] };

/**
 * Les contenus courts n'exposent pas d'identifiant : le site ne les manipule
 * jamais un par un, il les affiche en liste.
 */
export type Breve = { tag: string; titre: string; publieLe: string; region: RefRegion };
export type Flash = { label: string; texte: string; publieLe: string };

export type Evenement = {
  titre: string;
  /** Jour seul — « 2026-08-21 » — un événement n'a pas d'heure ici. */
  date: string;
  type: string;
  imageUrl: string | null;
  region: RefRegion;
};

export type Cotation = {
  board: 'brvm' | 'macro';
  symbole: string | null;
  nom: string;
  valeur: number;
  unite: string | null;
  variationPct: number | null;
  /** Déduite du signe par l'API, pour que le site n'ait pas à la recalculer. */
  tendance: 'up' | 'down' | 'flat' | null;
  majLe: string;
};

export type RubriquePublique = RefRubrique & { articles: number };
export type RegionPublique = RefRegion & { articles: number };

export type EntreeSitemap = {
  slug: string;
  titre: string;
  rubrique: string;
  publieLe: string;
  modifieLe: string;
};

export type PageArticles = { items: Carte[]; total: number };

export type Accueil = {
  aLaUne: Carte[];
  derniers: Carte[];
  breves: Breve[];
  flash: Flash[];
  cotations: Cotation[];
  agenda: Evenement[];
};

// --- Appels -----------------------------------------------------------------

class ApiError extends Error {
  constructor(
    readonly statut: number,
    chemin: string,
  ) {
    super(`API ${statut} sur ${chemin}`);
  }
}

async function appel<T>(chemin: string, revalidate: number): Promise<T> {
  const reponse = await fetch(`${BASE}/api/public${chemin}`, {
    next: { revalidate },
    headers: { Accept: 'application/json' },
  });

  if (!reponse.ok) throw new ApiError(reponse.status, chemin);

  return (await reponse.json()) as T;
}

/** Variante tolérante : `null` sur 404, pour que la page rende un « introuvable ». */
async function appelFacultatif<T>(chemin: string, revalidate: number): Promise<T | null> {
  try {
    return await appel<T>(chemin, revalidate);
  } catch (erreur) {
    if (erreur instanceof ApiError && erreur.statut === 404) return null;

    throw erreur;
  }
}

export const getAccueil = () => appel<Accueil>('/home', FRAICHEUR.accueil);

export function getArticles(
  options: {
    rubrique?: string;
    region?: string;
    q?: string;
    /** Par défaut du plus récent au plus ancien. */
    tri?: 'recent' | 'populaire';
    limit?: number;
    offset?: number;
  } = {},
): Promise<PageArticles> {
  const params = new URLSearchParams();

  if (options.rubrique) params.set('rubrique', options.rubrique);
  if (options.region) params.set('region', options.region);
  if (options.q) params.set('q', options.q);
  if (options.tri === 'populaire') params.set('tri', 'populaire');
  params.set('limit', String(options.limit ?? 20));
  if (options.offset) params.set('offset', String(options.offset));

  return appel<PageArticles>(`/articles?${params}`, FRAICHEUR.articles);
}

export const getArticle = (slug: string) =>
  appelFacultatif<ArticleComplet>(`/articles/${encodeURIComponent(slug)}`, FRAICHEUR.article);

export const getVoisins = (slug: string) =>
  appel<Carte[]>(`/articles/${encodeURIComponent(slug)}/related`, FRAICHEUR.article);

export const getALaUne = () => appel<Carte[]>('/featured', FRAICHEUR.accueil);
export const getRubriques = () => appel<RubriquePublique[]>('/rubriques', FRAICHEUR.referentiels);
export const getRegions = () => appel<RegionPublique[]>('/regions', FRAICHEUR.referentiels);
export const getBreves = (limit = 12) => appel<Breve[]>(`/briefs?limit=${limit}`, FRAICHEUR.breves);
export const getFlash = (limit = 10) => appel<Flash[]>(`/flash?limit=${limit}`, FRAICHEUR.flash);
export const getAgenda = (limit = 12) => appel<Evenement[]>(`/events?limit=${limit}`, FRAICHEUR.agenda);

export const getCotations = (board?: 'brvm' | 'macro') =>
  appel<Cotation[]>(`/quotes${board ? `?board=${board}` : ''}`, FRAICHEUR.cotations);

export const getSitemap = () => appel<EntreeSitemap[]>('/sitemap', FRAICHEUR.sitemap);

// --- Aides de présentation --------------------------------------------------

/**
 * Rend une URL d'image utilisable depuis le site.
 *
 * L'API peut renvoyer un chemin relatif (`/uploads/…`) : sur son propre domaine
 * il fonctionne, mais depuis le site il pointerait vers `leconomistedelacotedivoire.com`,
 * où rien ne l'attend. En production, `MEDIA_URL` porte l'URL absolue ; cette
 * fonction couvre le cas où elle ne l'aurait pas.
 */
export function imageUrl(url: string | null): string | null {
  if (!url) return null;

  return url.startsWith('/') ? `${BASE}${url}` : url;
}

/** « 2026-08-13T08:00:00+00:00 » → « 13 août 2026 ». */
export function dateLongue(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Le site affiche « 8 min », l'API compte en minutes. */
export const tempsLecture = (minutes: number): string => `${Math.max(minutes, 1)} min`;
