import Link from "next/link";
import {Header} from "../components/Header";
import {ArticleCard} from "../components/ArticleCard";
import {getArticles} from "../../lib/api";
import {carteVersArticle} from "../../lib/adapt";

export const revalidate=120;

export default async function Formats(){
  const page=await getArticles({rubrique:"opinions",limit:12});
  const articles=page.items.map(carteVersArticle);
  return <main><Header/><section className="category-hero"><div className="shell"><span className="section-kicker">OPINIONS &amp; ANALYSES</span><h1>Regards sur la Côte d’Ivoire</h1><p>Les opinions et analyses réellement publiées par la rédaction.</p></div></section><section className="section shell"><div className="daily-section-title"><div><span>PUBLICATIONS</span><h2>Opinions et analyses</h2></div><Link href="/categorie/opinions">Toute la rubrique →</Link></div>{articles.length>0?<div className="latest-grid">{articles.map(a=><ArticleCard key={a.slug} article={a}/>)}</div>:<p className="agenda-empty">Aucune opinion n’est encore publiée.</p>}</section></main>;
}
