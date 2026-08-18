"use client";
import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import {Header} from "./components/Header";
import {ArticleCard} from "./components/ArticleCard";
import {AdSlot} from "./components/AdSlot";
import {FlashTicker} from "./components/FlashTicker";
import {HeroSlider} from "./components/HeroSlider";
import {LiveDateline} from "./components/LiveDateline";
import {HomeSeoSchemas} from "./components/SeoSchemas";
import {articles,events} from "../lib/mock-data";

export default function Home(){
 const[email,setEmail]=useState("");const[ok,setOk]=useState(false);
 return <main className="daily-home"><Header/><HomeSeoSchemas/><FlashTicker/>
 <LiveDateline/>
 <section className="ad-leaderboard shell"><AdSlot format="Billboard · 970 × 250" title="Votre marque ouvre l’édition." copy="Touchez les décideurs au sommet de l’actualité économique ivoirienne." variant="dark"/></section>

 <section className="daily-lead shell"><header className="daily-kicker"><span>LA MANCHETTE</span><p>L’information qui éclaire les décisions et transforme la Côte d’Ivoire.</p></header><div className="daily-lead__grid"><div className="daily-lead__slider"><HeroSlider items={articles.slice(0,4)}/></div><div className="daily-lead__side">{articles.slice(4,7).map((a,i)=><Link href={`/articles/${a.slug}`} key={a.slug}><b>0{i+1}</b><Image src={a.image} alt="" width={560} height={340}/><small>{a.category} · {a.region}</small><h2>{a.title}</h2></Link>)}</div></div></section>

 <section className="editorial-band editorial-band--black"><div className="shell"><div className="daily-section-title daily-section-title--light"><div><span>ÉCO UNE</span><h2>L’économie ivoirienne en première ligne</h2></div><Link href="/categorie/economie">Toute l’économie →</Link></div><div className="eco-une-grid"><ArticleCard article={articles[1]} large/>{articles.slice(2,6).map(a=><ArticleCard key={a.slug} article={a}/>)}</div></div></section>

 <section className="daily-section shell"><div className="daily-section-title"><div><span>ÉCO INTER</span><h2>Le monde vu depuis la Côte d’Ivoire</h2><p>Marchés régionaux, UEMOA, commerce extérieur, diaspora et matières premières.</p></div><Link href="/explorer">Voir les analyses →</Link></div><div className="eco-inter-grid">{[articles[9],articles[7],articles[10]].map((a,i)=><Link href={`/articles/${a.slug}`} key={a.slug} className={i===0?"eco-inter-card eco-inter-card--lead":"eco-inter-card"}><Image src={a.image} alt="" width={1100} height={720}/><div><small>{a.category} · IMPACT CÔTE D’IVOIRE</small><h3>{a.title}</h3><p>{a.excerpt}</p><span>Lire l’analyse ↗</span></div></Link>)}<AdSlot format="Pavé premium · 300 × 250" title="Votre campagne au cœur des échanges." variant="dark"/></div></section>

 <section className="deciders-section"><div className="shell"><div className="deciders-intro"><span>07H00 · CHAQUE MATIN</span><h2>Le Journal<br/><em>des décideurs</em></h2><p>Le briefing exécutif pour comprendre les marchés, les entreprises et les politiques publiques avant le début de la journée.</p><Link href="/espace">Recevoir l’édition →</Link></div><div className="deciders-stories">{articles.slice(4,7).map((a,i)=><Link href={`/articles/${a.slug}`} key={a.slug}><Image src={a.image} alt="" width={760} height={520}/><span>0{i+1} · {a.region}</span><h3>{a.title}</h3></Link>)}</div><AdSlot format="Partenaire du Journal · 300 × 600" title="Associez votre marque aux décisions qui comptent." copy="Un emplacement premium chaque matin." variant="dark"/></div></section>

 <section className="daily-section shell"><div className="daily-section-title"><div><span>ÉVÉNEMENTS</span><h2>L’agenda des acteurs économiques</h2></div><Link href="/categorie/evenements">Tout l’agenda →</Link></div><div className="events-grid">{events.map(event=><article key={event.title}><Image src={event.image} alt="" width={800} height={520}/><div className="event-date"><strong>{event.day}</strong><span>{event.month}</span></div><div><small>{event.type} · {event.city}</small><h3>{event.title}</h3><Link href="/informations">Voir l’événement →</Link></div></article>)}<AdSlot format="Agenda partenaire" title="Annoncez votre prochain événement." variant="light"/></div></section>

 <section className="daily-section shell"><div className="daily-section-title"><div><span>LES PLUS LUS</span><h2>Ce que lisent les décideurs</h2></div><Link href="/explorer">Toutes les publications →</Link></div><div className="most-read">{[...articles].sort((a,b)=>b.views-a.views).slice(0,6).map((a,i)=><Link href={`/articles/${a.slug}`} key={a.slug}><span>{String(i+1).padStart(2,"0")}</span><div><small>{a.category}</small><h3>{a.title}</h3></div><b>{new Intl.NumberFormat("fr-FR").format(a.views)} lectures</b></Link>)}</div></section>

 <section className="newsletter-section newsletter-section--premium"><div className="shell newsletter-inner"><div><span>LE JOURNAL DES DÉCIDEURS</span><h2>Commencez informé.</h2><p>Une sélection concise envoyée avant 7 h.</p></div>{ok?<strong className="newsletter-success">✓ Inscription enregistrée.</strong>:<form onSubmit={e=>{e.preventDefault();localStorage.setItem("newsletter-email",email);setOk(true)}}><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Votre adresse e-mail"/><button>S’inscrire gratuitement</button><small>Mode maquette.</small></form>}</div></section>
 </main>
}
