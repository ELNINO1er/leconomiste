import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {getArticles,getRubriques} from "../../../lib/api";
import {carteVersArticle} from "../../../lib/adapt";
import {AdSlot} from "../../components/AdSlot";
import {ArticleCard} from "../../components/ArticleCard";
import {Header} from "../../components/Header";

/** Aligné sur le cache de la liste d'articles côté API. */
export const revalidate = 120;

/**
 * Tolérant à une API muette, délibérément.
 *
 * Sans ce filet, une API indisponible **fait échouer la compilation entière** :
 * pas de site dégradé, pas de site du tout. Un incident de base ne doit pas
 * pouvoir empêcher un déploiement. Liste vide = les pages sont rendues à la
 * première visite, quand l'API répondra de nouveau.
 */
export async function generateStaticParams(){
  try{
    return (await getRubriques()).map(r=>({slug:r.slug}));
  }catch{
    return [];
  }
}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const{slug}=await params;
  const rubrique=(await getRubriques()).find(r=>r.slug===slug);
  const title=rubrique?.name??"Actualités";
  const url=`https://leconomistedelacotedivoire.com/categorie/${slug}`;
  const description=`Toute l’actualité ${title} en Côte d’Ivoire : informations, analyses, entreprises, décisions et enjeux expliqués par L’Économiste.`;

  return{title:`${title} en Côte d’Ivoire`,description,alternates:{canonical:url},openGraph:{title:`${title} — L’Économiste de la Côte d’Ivoire`,description,url,locale:"fr_CI",type:"website"},keywords:[`${title} Côte d’Ivoire`,`actualité ${title}`,"économie ivoirienne","Abidjan"]};
}

export default async function Category({params}:{params:Promise<{slug:string}>}){
  const p=await params;
  const rubrique=(await getRubriques()).find(r=>r.slug===p.slug);

  // Une rubrique inconnue rend une 404, là où la version de démonstration
  // retombait sur « Actualités » et affichait le fil général : une URL fautive
  // ne doit pas répondre comme si elle était valide.
  if(!rubrique)notFound();

  const title=rubrique.name;
  const {items,total}=await getArticles({rubrique:p.slug,limit:12});
  const list=items.map(carteVersArticle);
  const lead=list[0];

  // Rubrique encore vide : le gabarit suppose partout un article de tête, et
  // l'ouvrir sur `undefined` ferait tomber la page entière.
  if(!lead)return <main className="category-page"><Header/>
    <section className="category-hero"><div className="shell"><span className="section-kicker">RUBRIQUE IVOIRIENNE · EN DIRECT</span><div><h1>{title}</h1><p>Informations, analyses, chiffres et décisions qui transforment la Côte d’Ivoire.</p><strong>Aucune publication pour le moment</strong></div></div></section>
    <section className="section shell category-feed"><div className="editorial-heading"><span>+</span><div><small>LE FIL {title.toUpperCase()}</small><h2>Dernières publications</h2></div><Link href={`/explorer?rubrique=${p.slug}`}>Explorer les archives →</Link></div><p>Cette rubrique n’a pas encore d’article publié.</p></section>
    </main>;

  const secondary=list.slice(1,4);

  return <main className="category-page"><Header/>
  <section className="category-hero"><div className="shell"><span className="section-kicker">RUBRIQUE IVOIRIENNE · EN DIRECT</span><div><h1>{title}</h1><p>Informations, analyses, chiffres et décisions qui transforment la Côte d’Ivoire.</p><strong>{total} dossiers spécialisés · mise à jour continue</strong></div></div></section>
  <section className="shell category-lead"><article><Link className="category-lead__image" href={`/articles/${lead.slug}`}><Image src={lead.image} alt={`Illustration : ${lead.title}`} fill priority  sizes="(max-width:900px) 100vw, 65vw"/></Link><div><small>{lead.category} · {lead.region}</small><h2><Link href={`/articles/${lead.slug}`}>{lead.title}</Link></h2><p>{lead.excerpt}</p><Link href={`/articles/${lead.slug}`}>Lire le dossier ↗</Link></div></article><aside>{secondary.map((a,i)=><Link href={`/articles/${a.slug}`} key={a.slug}><span>0{i+1}</span><div><small>{a.region}</small><strong>{a.title}</strong></div></Link>)}<AdSlot format={`Pavé ${title} · 300 × 250`} title={`Votre marque dans l’univers ${title}.`} variant="dark"/></aside></section>
  <section className="category-ad shell"><AdSlot format="Leaderboard rubrique · 970 × 180" title="Une audience attentive à l’économie ivoirienne." variant="light"/></section>
  <section className="section shell category-feed"><div className="editorial-heading"><span>+</span><div><small>LE FIL {title.toUpperCase()}</small><h2>Dernières publications</h2></div><Link href={`/explorer?rubrique=${p.slug}`}>Explorer les archives →</Link></div><div className="latest-grid">{list.slice(1).map(a=><ArticleCard key={a.slug} article={a}/>)}</div>{total>list.length&&<p className="category-suite"><Link href={`/explorer?rubrique=${p.slug}`}>Voir les {total} publications de la rubrique {title} →</Link></p>}</section>
  </main>;
}
