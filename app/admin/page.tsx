import {redirect} from "next/navigation";

/**
 * `/admin` mène à l'espace rédaction.
 *
 * Cette adresse portait jusqu'ici une maquette de back-office : publique, sans
 * mot de passe, affichant « MAQUETTE SANS BACKEND » et simulant des
 * publications. Maintenant que le vrai back-office existe, un leurre qui lui
 * ressemble n'a plus de raison d'être — d'autant qu'il donnait l'impression que
 * des articles étaient enregistrés alors que rien ne quittait le navigateur.
 *
 * L'adresse de destination est une variable d'environnement : en développement,
 * le tableau de bord tourne sur `localhost:4500` ; en ligne, il est servi sous
 * `/admin` du sous-domaine de l'API.
 *
 * Redirection **temporaire** et non permanente : un 308 serait mis en cache par
 * les navigateurs de façon durable, et changer l'adresse ensuite deviendrait
 * impossible à rattraper chez ceux qui l'auraient déjà visitée.
 */
export default function Admin(){
  redirect(
    process.env.NEXT_PUBLIC_ADMIN_URL
      ?? "https://admin.leconomistedelacotedivoire.com/admin/",
  );
}
