import type {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {getArticle,getSitemap,getVoisins,dateLongue} from "../../../lib/api";
import {carteVersArticle,articleVersArticle,slugifier,IMAGE_PAR_DEFAUT} from "../../../lib/adapt";
import {pollFor} from "../../../lib/mock-data";
import {AdSlot} from "../../components/AdSlot";
import {Header} from "../../components/Header";
import {RelatedCarousel} from "../../components/RelatedCarousel";
import {ArticleActions} from "./ArticleActions";
import {ListenButton} from "../../components/ListenButton";
import {FollowTopic} from "../../components/FollowTopic";
import {Poll} from "../../components/Poll";
import {Audience} from "../../components/Audience";

const base="https://leconomistedelacotedivoire.com";

export const revalidate = 600;

/**
 * Les articles connus au moment du build sont pré-rendus ; les suivants le sont
 * à la première visite. Sans ça, publier un article obligerait à redéployer.
 */
export async function generateStaticParams(){
  // Tolérant : une API muette ne doit pas faire échouer la compilation. Les
  // articles seront alors rendus à la première visite.
  try{
    return (await getSitemap()).slice(0,50).map(a=>({slug:a.slug}));
  }catch{
    return [];
  }
}

/** Première phrase d'un paragraphe, pour composer « L'essentiel ». */
const premierePhrase=(texte:string)=>{
  const fin=texte.search(/[.!?](\s|$)/);

  return fin===-1?texte:texte.slice(0,fin+1);
};

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const{slug}=await params;
  const article=await getArticle(slug);

  if(!article)return{};

  const a=articleVersArticle(article);
  const url=`${base}/articles/${a.slug}`;

  return{title:a.title,description:a.excerpt,keywords:[a.category,a.region,"Côte d’Ivoire","actualité ivoirienne","économie ivoirienne"],authors:[{name:a.author}],alternates:{canonical:url},openGraph:{type:"article",url,title:a.title,description:a.excerpt,siteName:"L’Économiste de la Côte d’Ivoire",images:[{url:a.image,alt:a.title}],locale:"fr_CI",publishedTime:article.publieLe,section:a.category,authors:[a.author]},twitter:{card:"summary_large_image",title:a.title,description:a.excerpt,images:[a.image]},robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}}};
}

export default async function ArticlePage({params}:{params:Promise<{slug:string}>}){
  const{slug}=await params;
  const complet=await getArticle(slug);

  if(!complet)notFound();

  const a=articleVersArticle(complet);
  const url=`${base}/articles/${a.slug}`;
  const related=(await getVoisins(slug)).map(carteVersArticle);

  // « L'essentiel » extrait les propres phrases de l'article — le chapô, puis le
  // début des deux paragraphes suivants. C'est une mise en avant, pas une
  // rédaction : rien n'y est ajouté que la rédaction n'ait écrit.
  const essentiel=[a.excerpt,premierePhrase(a.body[1]??""),premierePhrase(a.body[2]??"")]
    .map(s=>s.trim()).filter(Boolean).slice(0,3);

  const pourquoi=`Au-delà du fait, cette information pèse sur les décisions des citoyens, des entreprises et des acteurs publics concernés par ${a.category.toLowerCase()} en Côte d’Ivoire.`;
  const poll=pollFor(a.category);
  const listenText=`${a.title}. ${a.body.join(" ")}`;

  const schema={"@context":"https://schema.org","@graph":[{"@type":"NewsArticle","@id":`${url}#article`,mainEntityOfPage:url,headline:a.title,description:a.excerpt,image:[a.image],datePublished:complet.publieLe,dateModified:complet.publieLe,articleSection:a.category,inLanguage:"fr-CI",author:{"@type":"Person",name:a.author},publisher:{"@type":"NewsMediaOrganization",name:"L’Économiste de la Côte d’Ivoire",logo:{"@type":"ImageObject",url:`${base}/icon.svg`}},about:[{"@type":"Place",name:a.region},{"@type":"Country",name:"Côte d’Ivoire"}]},{"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Accueil",item:base},{"@type":"ListItem",position:2,name:a.category,item:`${base}/categorie/${slugifier(a.category)}`},{"@type":"ListItem",position:3,name:a.title,item:url}]}]};

  return <main className="article-page"><Audience slug={a.slug}/><Header/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><article><header className="article-hero shell"><span className="eyebrow">{a.category} · {a.region}</span><h1>{a.title}</h1><p className="article-deck">{a.excerpt}</p><div className="article-byline">
    {/* Signature en texte simple : il n'existe pas de page par auteur, et
        renvoyer chaque journaliste vers une fiche qui n'est pas la sienne
        serait une erreur visible par les lecteurs. */}
    <span className="article-author"><span>{complet.auteur.initiales}</span><div><strong>{a.author}</strong><small>Publié le {dateLongue(complet.publieLe)} · {a.readTime}</small></div></span><ArticleActions slug={a.slug}/><ListenButton text={listenText}/></div></header><figure className="article-cover"><Image src={a.image} alt={`Illustration de l’article : ${a.title}`} fill priority  sizes="(max-width: 1400px) 100vw, 1400px"/>{a.image===IMAGE_PAR_DEFAUT||<figcaption>{a.title}</figcaption>}</figure><div className="shell article-layout"><aside className="share-rail"><span>Partager</span><a className="share-rail__wa" href={`https://wa.me/?text=${encodeURIComponent(`${a.title} — ${url}`)}`} target="_blank" rel="noreferrer" aria-label="Partager sur WhatsApp">WA</a><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" aria-label="Partager sur Facebook">f</a><a href={`https://x.com/intent/post?text=${encodeURIComponent(a.title)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" aria-label="Partager sur X">X</a><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" aria-label="Partager sur LinkedIn">in</a></aside><div className="article-body">{essentiel.length>0&&<aside className="essentiel"><span className="essentiel__kicker">L’ESSENTIEL EN 3 POINTS</span><ul>{essentiel.map((point,i)=><li key={i}>{point}</li>)}</ul><FollowTopic topic={a.category}/></aside>}<p className="dropcap">{a.body[0]}</p>{a.body.length>1&&<h2>Ce qu’il faut comprendre</h2>}{a.body.slice(1).map((paragraph,i)=><p key={i}>{paragraph}</p>)}<div className="article-inline-ad"><AdSlot format="In-article · 728 × 180" title="Votre marque au cœur de l’analyse." copy="Un emplacement premium intégré à la lecture." variant="light"/></div><aside className="why-matters"><span className="why-matters__kicker">POURQUOI ÇA COMPTE</span><p>{pourquoi}</p></aside><div className="article-tags"><span>{a.region}</span><span>{a.category}</span><span>Côte d’Ivoire</span></div><Poll id={a.slug} question={poll.question} options={poll.options}/><ArticleActions slug={`${a.slug}:comments`} mode="comments"/></div><aside className="article-aside"><div className="article-next"><h3>À lire ensuite</h3>{related.slice(0,4).map((x,i)=><Link href={`/articles/${x.slug}`} key={x.slug}><span>{String(i+1).padStart(2,"0")}</span>{x.title}</Link>)}</div><AdSlot format="Pavé · 300 × 250" title="Une audience qui agit." copy="Présentez votre offre aux décideurs ivoiriens." variant="dark"/><AdSlot format="Skyscraper · 300 × 600" title="Votre campagne reste visible." copy="Un format vertical puissant pour les marques et institutions." variant="dark"/></aside></div></article>{related.length>0&&<section className="article-related"><div className="shell"><div className="editorial-heading"><span>+</span><div><small>POURSUIVRE LA LECTURE</small><h2>À découvrir également</h2></div><Link href="/explorer">Toute l’actualité →</Link></div><RelatedCarousel items={related}/></div></section>}</main>;
}
