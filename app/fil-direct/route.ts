import { getFlash } from "../../lib/api";

/**
 * Dépêches du fil, pour le bandeau « DIRECT » présent sur toutes les pages.
 *
 * Pourquoi une route et non une propriété passée depuis les pages : le bandeau
 * vit dans `Header`, qui est un composant client — il fait défiler les entrées
 * avec un minuteur. Treize pages rendent cet en-tête ; leur faire toutes
 * charger puis transmettre la liste aurait multiplié les points d'oubli, et
 * certaines sont encore sur les données de maquette.
 *
 * Le navigateur appelle donc cette route, sur la même origine : pas de CORS à
 * ouvrir côté API, et la réponse est mise en cache une minute.
 *
 * **Pas sous `/api/`**, comme les autres routes du site : ce chemin appartient
 * à l'API PHP sur ce domaine et renverrait 403.
 */
export const revalidate = 60;

/** L'heure est calculée ici et non dans le navigateur : rendue côté client à
 *  partir d'un ISO, elle dépendrait du fuseau du lecteur et afficherait une
 *  heure de dépêche fausse pour qui n'est pas à Abidjan. */
const heure = (iso: string) =>
  new Date(iso).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Abidjan",
  });

export async function GET() {
  // API muette : un bandeau absent vaut mieux qu'une erreur dans la console de
  // chaque page du site.
  const flash = await getFlash(12).catch(() => []);

  const entrees = flash.map((f) => ({
    time: heure(f.publieLe),
    label: f.label,
    text: f.texte,
  }));

  return Response.json(entrees, {
    headers: {
      "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
    },
  });
}
