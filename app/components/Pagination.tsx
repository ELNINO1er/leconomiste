import Link from "next/link";

/**
 * Pagination de l'explorateur.
 *
 * Volontairement faite de vrais liens `<a>` et non de boutons : une page
 * d'archive doit pouvoir être parcourue par un moteur de recherche, partagée et
 * ouverte dans un nouvel onglet. Un bouton qui appellerait `router.push`
 * n'offrirait rien de tout cela.
 *
 * La fenêtre affichée est glissante (deux voisins de part et d'autre) plutôt
 * qu'exhaustive : avec quelques centaines d'articles, lister toutes les pages
 * remplirait l'écran de chiffres sans aider personne.
 */
export function Pagination({
  page,
  total,
  parPage,
  params,
}: {
  page: number;
  total: number;
  parPage: number;
  /** Les filtres en cours, à reconduire d'une page à l'autre. */
  params: Record<string, string | undefined>;
}) {
  const pages = Math.ceil(total / parPage);

  if (pages <= 1) return null;

  const lien = (n: number) => {
    const suivants = new URLSearchParams();

    for (const [cle, valeur] of Object.entries(params)) {
      if (valeur) suivants.set(cle, valeur);
    }

    // La page 1 n'est pas numérotée dans l'URL : `/explorer` et
    // `/explorer?page=1` serviraient sinon le même contenu sous deux adresses,
    // ce qu'un moteur compte comme du contenu dupliqué.
    if (n > 1) suivants.set("page", String(n));

    const requete = suivants.toString();

    return requete ? `/explorer?${requete}` : "/explorer";
  };

  const debut = Math.max(1, Math.min(page - 2, pages - 4));
  const fin = Math.min(pages, Math.max(page + 2, 5));
  const numeros = [];

  for (let n = debut; n <= fin; n++) numeros.push(n);

  return (
    <nav className="pagination" aria-label="Pages de résultats">
      {page > 1 && (
        <Link href={lien(page - 1)} rel="prev" className="pagination__pas">
          ← Précédent
        </Link>
      )}

      <ul>
        {debut > 1 && (
          <li>
            <Link href={lien(1)}>1</Link>
          </li>
        )}
        {debut > 2 && <li aria-hidden="true">…</li>}

        {numeros.map((n) => (
          <li key={n}>
            {n === page ? (
              <span aria-current="page">{n}</span>
            ) : (
              <Link href={lien(n)}>{n}</Link>
            )}
          </li>
        ))}

        {fin < pages - 1 && <li aria-hidden="true">…</li>}
        {fin < pages && (
          <li>
            <Link href={lien(pages)}>{pages}</Link>
          </li>
        )}
      </ul>

      {page < pages && (
        <Link href={lien(page + 1)} rel="next" className="pagination__pas">
          Suivant →
        </Link>
      )}
    </nav>
  );
}
