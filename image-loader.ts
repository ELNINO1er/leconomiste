/**
 * Choix de la déclinaison d'image à servir.
 *
 * L'API produit déjà trois versions WebP de chaque visuel déposé par la
 * rédaction — 400, 800 et 1600 px — nommées `<référence>-<largeur>.webp`. Ce
 * chargeur se contente de désigner la bonne, ce qui permet deux choses :
 *
 *  - retirer `unoptimized` des balises `<Image>` sans pour autant dépendre de
 *    l'optimiseur de Next, qui exige `sharp` et un serveur Node — deux choses
 *    que l'hébergement mutualisé ne garantit pas ;
 *  - servir une image de 400 px à un téléphone au lieu de 1600, ce qui pèse
 *    lourd sur un forfait de données ivoirien.
 *
 * Toute URL qui ne suit pas cette convention — visuels locaux du site, images
 * de la maquette hébergées ailleurs — est renvoyée telle quelle : le chargeur
 * ne doit jamais inventer une adresse qui n'existe pas.
 */
const DECLINAISONS = [400, 800, 1600] as const;

export default function chargeurImage({ src, width }: { src: string; width: number }): string {
  const decoupe = /^(.*)-(?:400|800|1600)\.webp$/.exec(src);

  if (!decoupe) return src;

  // `width` est la largeur demandée par le navigateur d'après `sizes` ; on prend
  // la première déclinaison au moins aussi large, faute de quoi l'image serait
  // agrandie et paraîtrait floue.
  const cible = DECLINAISONS.find((d) => d >= width) ?? DECLINAISONS[DECLINAISONS.length - 1];

  return `${decoupe[1]}-${cible}.webp`;
}
