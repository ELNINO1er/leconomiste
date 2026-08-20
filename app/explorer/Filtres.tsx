"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdSlot } from "../components/AdSlot";

type Option = { slug: string; name: string };

/**
 * Formulaire de filtres de l'explorateur.
 *
 * Les critères vivent dans l'URL et non dans l'état du composant : une
 * recherche se partage, se met en favori et s'indexe. Le filtrage lui-même est
 * fait par l'API — trier ou chercher dans la page déjà reçue donnerait un
 * résultat qui n'a l'air juste que tant que l'archive est petite.
 *
 * La frappe est amortie de 300 ms, faute de quoi chaque touche déclencherait une
 * navigation.
 */
export function Filtres({
  rubriques,
  regions,
}: {
  rubriques: Option[];
  regions: Option[];
}) {
  const routeur = useRouter();
  const params = useSearchParams();

  const [q, setQ] = useState(params.get("q") ?? "");

  const naviguer = (modifs: Record<string, string>) => {
    const suivants = new URLSearchParams(params.toString());

    for (const [cle, valeur] of Object.entries(modifs)) {
      if (valeur === "" || valeur === "Toutes") suivants.delete(cle);
      else suivants.set(cle, valeur);
    }

    // Changer un critère depuis la page 4 doit ramener à la page 1 : les
    // nouveaux résultats sont moins nombreux et la page 4 serait souvent vide.
    suivants.delete("page");

    // `replace` et non `push` : affiner un filtre ne doit pas empiler une entrée
    // d'historique par caractère tapé.
    routeur.replace(`/explorer?${suivants}`, { scroll: false });
  };

  useEffect(() => {
    if (q === (params.get("q") ?? "")) return;

    const minuteur = setTimeout(() => naviguer({ q }), 300);

    return () => clearTimeout(minuteur);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <aside className="filter-panel">
      <div className="filter-title">
        <strong>Affiner le fil</strong>
        <button
          onClick={() => {
            setQ("");
            routeur.replace("/explorer", { scroll: false });
          }}
        >
          Tout effacer
        </button>
      </div>

      <label>
        Recherche
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Entreprise, cacao, éco région…"
        />
      </label>

      <label>
        Rubrique
        <select
          value={params.get("rubrique") ?? "Toutes"}
          onChange={(e) => naviguer({ rubrique: e.target.value })}
        >
          <option value="Toutes">Toutes</option>
          {rubriques.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Région
        <select
          value={params.get("region") ?? "Toutes"}
          onChange={(e) => naviguer({ region: e.target.value })}
        >
          <option value="Toutes">Toutes</option>
          {regions.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.name}
            </option>
          ))}
        </select>
      </label>

      <AdSlot format="Pavé · 300 × 250" title="Soyez visible dans le fil." variant="dark" />
    </aside>
  );
}

/** Le tri vit dans l'URL lui aussi, pour la même raison. */
export function Tri() {
  const routeur = useRouter();
  const params = useSearchParams();

  return (
    <select
      value={params.get("tri") === "populaire" ? "Populaire" : "Récent"}
      onChange={(e) => {
        const suivants = new URLSearchParams(params.toString());

        if (e.target.value === "Populaire") suivants.set("tri", "populaire");
        else suivants.delete("tri");

        suivants.delete("page");

        routeur.replace(`/explorer?${suivants}`, { scroll: false });
      }}
    >
      <option>Récent</option>
      <option>Populaire</option>
    </select>
  );
}
