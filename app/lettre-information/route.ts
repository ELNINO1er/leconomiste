/**
 * Inscription à la newsletter, relayée par le serveur du site.
 *
 * Le formulaire pourrait appeler l'API directement, mais il a besoin de **lire**
 * la réponse pour dire au lecteur si son inscription a été prise — et un appel
 * inter-origines dont on lit la réponse exige des en-têtes CORS côté API. Passer
 * par ici garde le navigateur sur une seule origine et l'API sans configuration
 * supplémentaire.
 *
 * Contrairement à la balise d'audience, qui elle ne lit rien et part donc en
 * direct.
 *
 * **Cette route vivait sous `/api/newsletter` et n'a jamais fonctionné en
 * ligne.** Sur l'hébergement, l'API PHP occupe `public_html/api/` et le serveur
 * sert ce dossier avant de passer la main à Next : tout `/api/…` du site était
 * intercepté et renvoyait 403. Chaque inscription échouait donc en production,
 * en local tout marchait. D'où ce chemin hors de `/api/`, à ne pas y remettre.
 */

const API = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://admin.leconomistedelacotedivoire.com"
).replace(/\/$/, "");

export async function POST(requete: Request) {
  let email = "";

  try {
    const corps = (await requete.json()) as { email?: unknown };
    email = typeof corps.email === "string" ? corps.email.trim() : "";
  } catch {
    return Response.json({ erreur: "Requête illisible." }, { status: 400 });
  }

  if (email === "") {
    return Response.json({ erreur: "Entrez une adresse e-mail valide." }, { status: 422 });
  }

  const reponse = await fetch(`${API}/api/public/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
    cache: "no-store",
  });

  if (reponse.status === 204) {
    // L'API répond la même chose que l'adresse soit nouvelle, déjà inscrite ou
    // anciennement désinscrite — c'est ce qui empêche de tester la présence
    // d'une adresse dans le fichier. Le site n'en dit donc pas plus.
    return new Response(null, { status: 204 });
  }

  if (reponse.status === 422) {
    return Response.json({ erreur: "Entrez une adresse e-mail valide." }, { status: 422 });
  }

  return Response.json(
    { erreur: "L’inscription n’a pas pu être enregistrée. Réessayez dans un instant." },
    { status: 502 },
  );
}
