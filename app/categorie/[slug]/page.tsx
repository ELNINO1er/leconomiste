import Image from "next/image";
import Link from "next/link";
import {articles,categories} from "../../../lib/mock-data";
import {AdSlot} from "../../components/AdSlot";
import {ArticleCard} from "../../components/ArticleCard";
import {Header} from "../../components/Header";
const slugify=(x:string)=>x.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ & /g,"-").replace(/ /g,"-");
export function generateStaticParams(){return categories.map(c=>({slug:slugify(c)}))}
export default async function Category({params}:{params:Promise<{slug:string}>}){const p=await params;const title=categories.find(c=>slugify(c)===p.slug)??"Actualités";const exact=articles.filter(a=>a.category===title);const list=[...exact,...articles.filter(a=>a.category!==title)].slice(0,12);const lead=list[0];const secondary=list.slice(1,4);return <main className="category-page"><Header/>
  <section className="category-hero"><div className="shell"><span className="section-kicker">RUBRIQUE IVOIRIENNE · EN DIRECT</span><div><h1>{title}</h1><p>Informations, analyses, chiffres et décisions qui transforment la Côte d’Ivoire.</p><strong>{exact.length} dossiers spécialisés · mise à jour continue</strong></div></div></section>
  <section className="shell category-lead"><article><Link className="category-lead__image" href={`/articles/${lead.slug}`}><Image src={lead.image} alt={`Illustration : ${lead.title}`} fill priority unoptimized sizes="(max-width:900px) 100vw, 65vw"/></Link><div><small>{lead.category} · {lead.region}</small><h2><Link href={`/articles/${lead.slug}`}>{lead.title}</Link></h2><p>{lead.excerpt}</p><Link href={`/articles/${lead.slug}`}>Lire le dossier ↗</Link></div></article><aside>{secondary.map((a,i)=><Link href={`/articles/${a.slug}`} key={a.slug}><span>0{i+1}</span><div><small>{a.region}</small><strong>{a.title}</strong></div></Link>)}<AdSlot format={`Pavé ${title} · 300 × 250`} title={`Votre marque dans l’univers ${title}.`} variant="dark"/></aside></section>
  <section className="category-ad shell"><AdSlot format="Leaderboard rubrique · 970 × 180" title="Une audience attentive à l’économie ivoirienne." variant="light"/></section>
  <section className="section shell category-feed"><div className="editorial-heading"><span>+</span><div><small>LE FIL {title.toUpperCase()}</small><h2>Dernières publications</h2></div><Link href="/explorer">Explorer les archives →</Link></div><div className="latest-grid">{list.slice(1).map(a=><ArticleCard key={a.slug} article={a}/>)}</div></section>
  </main>}
