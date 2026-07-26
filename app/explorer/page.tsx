"use client";

import { useMemo, useState } from "react";

const articles = [
  ["Finance", "Côte d’Ivoire", "Aïssata Koné", "Abidjan accélère sa transformation en hub financier régional", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=82", 9840],
  ["Agriculture", "Côte d’Ivoire", "Idriss Diallo", "Cacao : les producteurs au cœur du nouveau rapport de force", "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=900&q=82", 7240],
  ["Technologie", "Sénégal", "Sarah Mensah", "La fintech francophone prépare son passage à l’échelle", "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=82", 6150],
  ["Business", "Cameroun", "Koffi Kouamé", "Les PME misent sur le numérique pour conquérir la sous-région", "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=82", 5890],
  ["Énergie", "RDC", "Fatou Ndiaye", "Solaire : la course aux infrastructures s’intensifie", "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=82", 4920],
  ["Santé", "Mali", "Aïssata Koné", "Les innovations qui rapprochent les soins des territoires", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=82", 4100],
  ["Monde", "France", "Sarah Mensah", "L’intelligence artificielle entre dans l’économie réelle", "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=82", 8550],
  ["Afrique", "Burkina Faso", "Idriss Diallo", "Une nouvelle génération d’entrepreneurs change d’échelle", "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=82", 7720],
] as const;

export default function Explorer() {
  const [country, setCountry] = useState("Tous");
  const [category, setCategory] = useState("Toutes");
  const [author, setAuthor] = useState("Tous");
  const [sort, setSort] = useState("Récent");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(6);

  const filtered = useMemo(() => {
    const result = articles.filter((a) =>
      (country === "Tous" || a[1] === country) &&
      (category === "Toutes" || a[0] === category) &&
      (author === "Tous" || a[2] === author) &&
      a[3].toLowerCase().includes(query.toLowerCase()),
    );
    return sort === "Populaire" ? [...result].sort((a, b) => b[5] - a[5]) : result;
  }, [country, category, author, query, sort]);

  return (
    <main className="interior">
      <header className="interior-header">
        <div className="shell interior-nav">
          <a href="/" className="mini-brand">L’Économiste<span>b</span></a>
          <a href="/">← Retour à l’accueil</a>
        </div>
      </header>
      <section className="explorer-hero">
        <div className="shell">
          <span className="section-kicker">TOUTE L’INFORMATION</span>
          <h1>Explorer l’actualité</h1>
          <p>Affinez votre lecture par territoire, rubrique, auteur ou popularité.</p>
        </div>
      </section>
      <section className="shell explorer-layout">
        <aside className="filter-panel">
          <div className="filter-title"><strong>Filtres</strong><button onClick={() => { setCountry("Tous"); setCategory("Toutes"); setAuthor("Tous"); setQuery(""); }}>Réinitialiser</button></div>
          <label>Recherche<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Mot-clé…" /></label>
          <label>Pays / région<select value={country} onChange={(e) => setCountry(e.target.value)}>{["Tous","Côte d’Ivoire","Sénégal","Cameroun","RDC","Mali","Burkina Faso","France"].map(x => <option key={x}>{x}</option>)}</select></label>
          <label>Catégorie<select value={category} onChange={(e) => setCategory(e.target.value)}>{["Toutes","Finance","Agriculture","Technologie","Business","Énergie","Santé","Monde","Afrique"].map(x => <option key={x}>{x}</option>)}</select></label>
          <label>Auteur<select value={author} onChange={(e) => setAuthor(e.target.value)}>{["Tous","Aïssata Koné","Idriss Diallo","Sarah Mensah","Koffi Kouamé","Fatou Ndiaye"].map(x => <option key={x}>{x}</option>)}</select></label>
          <label>Date<select><option>À tout moment</option><option>Aujourd’hui</option><option>Cette semaine</option><option>Ce mois-ci</option></select></label>
          <label>Langue<select><option>Français</option><option>English</option></select></label>
        </aside>
        <div className="results-panel">
          <div className="results-toolbar"><strong>{filtered.length} articles</strong><select value={sort} onChange={(e) => setSort(e.target.value)}><option>Récent</option><option>Populaire</option></select></div>
          <div className="results-grid">
            {filtered.slice(0, visible).map((a) => (
              <article className="result-card" key={a[3]}>
                <img src={a[4]} alt="" />
                <div><span className="eyebrow">{a[0]} • {a[1]}</span><h2><a href="/article">{a[3]}</a></h2><p>Analyse, contexte et chiffres clés pour comprendre ce qui change.</p><small>Par {a[2]} • {a[5].toLocaleString("fr-FR")} lectures</small></div>
              </article>
            ))}
          </div>
          {visible < filtered.length && <button className="load-more" onClick={() => setVisible(v => v + 3)}>Charger plus d’articles</button>}
          {!filtered.length && <div className="empty-state">Aucun article ne correspond à ces critères.</div>}
        </div>
      </section>
    </main>
  );
}
