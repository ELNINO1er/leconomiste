import { revalidateTag } from "next/cache";
import { ETIQUETTE_API } from "../../../lib/api";

/**
 * Purge du cache, appelée par l'API après chaque écriture de la rédaction.
 *
 * **Ne remettez pas cette route sous `/api/`.** Sur l'hébergement, l'API PHP
 * occupe `public_html/api/`, et le serveur sert ce dossier avant de passer la
 * main à Next : tout `/api/…` du site est donc intercepté et renvoie 403 sans
 * jamais atteindre ce fichier. C'est vérifiable en ligne —
 * `leconomistedelacotedivoire.com/api/public/rubriques` répond avec le 404 JSON
 * de l'API PHP, preuve que ce chemin n'appartient pas au site.
 *
 * Sans elle, un article publié n'apparaissait qu'au bout du délai de fraîcheur
 * de la page — jusqu'à dix minutes pour un article, cinq pour l'accueil. C'est
 * un comportement correct pour un site de presse, mais insupportable quand on
 * vient de corriger une coquille et qu'on veut la voir disparaître.
 *
 * Le secret est obligatoire : sans lui, n'importe qui pourrait vider le cache
 * en boucle et faire retomber toute la charge sur l'API à chaque requête.
 *
 * Réponse volontairement identique — `{ok:true}` — que l'étiquette ait purgé
 * quelque chose ou non : l'appelant n'a rien à en faire, et cela évite de
 * transformer cette route en sonde révélant l'état du cache.
 */
export async function POST(requete: Request) {
  const attendu = process.env.REVALIDATE_SECRET;

  // Pas de secret configuré = route désactivée. Refuser franchement vaut mieux
  // que d'ouvrir la purge à tout le monde parce qu'une variable manque.
  if (!attendu) {
    return Response.json({ error: "Rafraîchissement non configuré." }, { status: 503 });
  }

  if (requete.headers.get("x-revalidate-secret") !== attendu) {
    return Response.json({ error: "Secret invalide." }, { status: 401 });
  }

  // `{ expire: 0 }` et non le profil `'max'` : ce dernier périme en arrière-plan,
  // si bien que le visiteur suivant reçoit encore l'ancienne page pendant que la
  // nouvelle se construit. Le rédacteur qui vient de corriger une coquille
  // rechargerait et la verrait toujours là. Ici la page est périmée sur-le-champ :
  // la première requête après une publication paie l'aller-retour vers l'API,
  // c'est le prix de l'instantané.
  revalidateTag(ETIQUETTE_API, { expire: 0 });

  return Response.json({ ok: true });
}
