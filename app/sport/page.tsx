import Link from "next/link";
import {Header} from "../components/Header";
import {ArticleCard} from "../components/ArticleCard";
import {getArticles} from "../../lib/api";
import {carteVersArticle} from "../../lib/adapt";

export const revalidate=120;

export default async function Sport(){
  const page=await getArticles({rubrique:"sport",limit:12});
  const articles=page.items.map(carteVersArticle);

  return <main className="sport-page"><Header/>
    <section className="page-hero"><div className="shell"><span className="page-hero__kicker">SPORT</span><h1>L’actualité sportive ivoirienne</h1><p>Les informations publiées par la rédaction sur les clubs, les compétitions et les Éléphants.</p></div></section>
    <section className="daily-section shell">
      <div className="daily-section-title"><div><span>DERNIÈRES PUBLICATIONS</span><h2>Le sport dans l’actualité</h2></div><Link href="/categorie/sport">Toute la rubrique →</Link></div>
      {articles.length>0?<div className="latest-grid">{articles.map(a=><ArticleCard key={a.slug} article={a}/>)}</div>:<p className="agenda-empty">Aucun article sportif n’est encore publié. Les scores en direct seront proposés lorsqu’une source officielle sera raccordée.</p>}
    </section>
  </main>;
}
