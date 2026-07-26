"use client";

import { useEffect, useState } from "react";

export default function Article() {
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState(["Une analyse très claire. Merci pour les chiffres clés."]);
  const [comment, setComment] = useState("");

  useEffect(() => setSaved(localStorage.getItem("saved-article") === "1"), []);
  const toggleSaved = () => { const next = !saved; setSaved(next); localStorage.setItem("saved-article", next ? "1" : "0"); };

  return (
    <main className="article-page">
      <header className="interior-header"><div className="shell interior-nav"><a href="/" className="mini-brand">L’Économiste<span>b</span></a><div><a href="/explorer">Explorer</a><a href="/login">Connexion</a></div></div></header>
      <article>
        <header className="article-hero shell">
          <span className="eyebrow">ÉCONOMIE • CÔTE D’IVOIRE</span>
          <h1>Abidjan accélère sa transformation en hub financier régional</h1>
          <p className="article-deck">Investissements, infrastructures, fintech : les nouveaux moteurs d’une ambition qui redessine la carte économique de l’Afrique de l’Ouest.</p>
          <div className="article-byline"><a href="/journaliste"><span>AK</span><div><strong>Aïssata Koné</strong><small>Publié le 26 juillet 2026 • Mis à jour à 17:42 • 8 min</small></div></a><button onClick={toggleSaved}>{saved ? "★ Enregistré" : "☆ Enregistrer"}</button></div>
        </header>
        <figure className="article-cover"><img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=90" alt="Quartier d’affaires moderne au crépuscule" /><figcaption>Le quartier d’affaires concentre une part croissante des services financiers régionaux.</figcaption></figure>
        <div className="shell article-layout">
          <aside className="share-rail"><span>Partager</span><a href="https://www.facebook.com/sharer/sharer.php" target="_blank" rel="noreferrer" aria-label="Partager sur Facebook">f</a><a href="https://www.linkedin.com/sharing/share-offsite/" target="_blank" rel="noreferrer" aria-label="Partager sur LinkedIn">in</a><a href="https://twitter.com/intent/tweet" target="_blank" rel="noreferrer" aria-label="Partager sur X">𝕏</a><a href="https://wa.me/?text=L%E2%80%99Economisteb" target="_blank" rel="noreferrer" aria-label="Partager sur WhatsApp">wa</a><a href="https://t.me/share/url" target="_blank" rel="noreferrer" aria-label="Partager sur Telegram">tg</a></aside>
          <div className="article-body">
            <p className="dropcap">Dans les tours qui bordent le Plateau, une transformation silencieuse est à l’œuvre. Banques panafricaines, fonds d’investissement et jeunes pousses de la finance numérique y installent leurs centres de décision.</p>
            <h2>Une dynamique régionale</h2>
            <p>La capitale économique ivoirienne bénéficie d’un marché régional de plus de 140 millions d’habitants et d’une infrastructure financière commune. Cette position lui permet d’attirer des acteurs à la recherche d’un point d’entrée stable en Afrique de l’Ouest.</p>
            <blockquote>« Abidjan ne veut plus seulement accueillir les capitaux : elle veut participer à leur allocation. »</blockquote>
            <p>Les investissements dans les télécommunications, les transports et la formation renforcent cette ambition. Le défi reste néanmoins de transformer cette croissance en emplois qualifiés et de faciliter l’accès des PME aux financements.</p>
            <div className="article-stat"><strong>+18 %</strong><span>de progression annuelle des investissements fintech dans la sous-région</span></div>
            <h2>La technologie comme accélérateur</h2>
            <p>Les solutions de paiement mobile et d’identité numérique réduisent progressivement les barrières d’accès. Les régulateurs cherchent désormais un équilibre entre innovation, inclusion et protection des utilisateurs.</p>
            <div className="article-tags"><span>Abidjan</span><span>Finance</span><span>Investissement</span><span>Fintech</span></div>
            <section className="comments">
              <h2>Commentaires <span>{comments.length}</span></h2>
              <form onSubmit={(e) => { e.preventDefault(); if (comment.trim()) { setComments([...comments, comment]); setComment(""); } }}><textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Partagez votre point de vue…" required /><button>Publier le commentaire</button></form>
              {comments.map((c, i) => <div className="comment" key={i}><span>{i ? "VO" : "KM"}</span><div><strong>{i ? "Vous" : "K. Mensah"}</strong><p>{c}</p><small>À l’instant</small></div></div>)}
            </section>
          </div>
          <aside className="article-aside"><div className="aside-newsletter"><span>LA MATINALE</span><h3>Un temps d’avance, chaque matin.</h3><input placeholder="votre@email.com" /><button>S’inscrire</button></div><h3>À lire ensuite</h3>{["La BCEAO face au défi d’une croissance sans inflation","Les PME misent sur le numérique","Le corridor Lagos–Abidjan prend forme"].map((x,i)=><a href="/article" key={x}><span>0{i+1}</span>{x}</a>)}</aside>
        </div>
      </article>
    </main>
  );
}
