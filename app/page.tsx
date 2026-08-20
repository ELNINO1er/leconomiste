import Image from "next/image";
import Link from "next/link";
import {Header} from "./components/Header";
import {ArticleCard} from "./components/ArticleCard";
import {AdSlot} from "./components/AdSlot";
import {FlashTicker} from "./components/FlashTicker";
import {HeroSlider} from "./components/HeroSlider";
import {LiveDateline} from "./components/LiveDateline";
import {HomeSeoSchemas} from "./components/SeoSchemas";
import {NewsletterHub} from "./components/NewsletterHub";
import {Stories} from "./components/Stories";
import {getAccueil,getArticles} from "../lib/api";
import {brevesVersStories,carteVersArticle,IMAGE_PAR_DEFAUT} from "../lib/adapt";

/** Aligné sur le cache de `/home` : cinq minutes. */
export const revalidate = 300;

const heure=(iso:string)=>new Date(iso).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"});
const nombre=new Intl.NumberFormat("fr-FR");

export default async function Home(){
 const [accueil,populaires]=await Promise.all([
   getAccueil(),
   getArticles({tri:"populaire",limit:6}),
 ]);

 const une=accueil.aLaUne.map(carteVersArticle);
 const derniers=accueil.derniers.map(carteVersArticle);
 const lesPlusLus=populaires.items;

 // Les stories viennent des brèves illustrées : sans image, une brève reste un
 // fil court et n'entre pas dans le bandeau.
 const stories=brevesVersStories(accueil.breves);

 // La Une pilote le slider ; si la rédaction n'en a pas composé, les dernières
 // publications prennent le relais plutôt que de laisser un trou.
 const slider=une.length?une.slice(0,4):derniers.slice(0,4);
 const colonne=derniers.slice(0,3);
 const ecoUne=derniers.slice(0,5);
 const ecoInter=derniers.slice(5,8);
 const decideurs=derniers.slice(3,6);

 return <main className="daily-home"><Header/><HomeSeoSchemas/><FlashTicker/>
 <LiveDateline/>

 <Stories stories={stories}/>

 {/* Le fil reprend les dernières publications : chaque entrée mène donc à un
     article qui existe. La version de démonstration pointait vers des slugs
     fictifs, qui auraient répondu 404 dès la première vraie publication. */}
 {derniers.length>0&&<section className="daily-section shell home-live home-live--top"><div className="daily-section-title"><div><span className="home-live__badge"><i/> EN DIRECT</span><h2>Le fil de l’actualité</h2></div><Link href="/en-direct">Tout le direct →</Link></div><ol className="live-timeline">{accueil.derniers.slice(0,6).map((e,i)=><li key={e.slug} className="live-tl" style={{animationDelay:`${i*90}ms`}}><span className="live-tl__dot"/><Link href={`/articles/${e.slug}`} className="live-tl__card"><span className="live-tl__thumb"><Image src={carteVersArticle(e).image} alt="" width={260} height={170} /></span><span className="live-tl__body"><span className="live-tl__meta"><time>{heure(e.publieLe)}</time><span className="live-tl__label">{e.rubrique.name} · {e.region.name}</span></span><span className="live-tl__title">{e.titre}</span><span className="live-tl__text">{e.extrait}</span></span></Link></li>)}</ol></section>}

 <section className="ad-leaderboard shell"><AdSlot format="Billboard · 970 × 250" title="Votre marque ouvre l’édition." copy="Touchez les décideurs au sommet de l’actualité économique ivoirienne." variant="dark"/></section>

 {slider.length>0&&<section className="daily-lead shell"><header className="daily-kicker"><span>LA MANCHETTE</span><p>L’information qui éclaire les décisions et transforme la Côte d’Ivoire.</p></header><div className="daily-lead__grid"><div className="daily-lead__slider"><HeroSlider items={slider}/></div><div className="daily-lead__side">{colonne.map((a,i)=><Link href={`/articles/${a.slug}`} key={a.slug}><b>0{i+1}</b><Image src={a.image} alt="" width={560} height={340}/><small>{a.category} · {a.region}</small><h2>{a.title}</h2></Link>)}</div></div></section>}

 {ecoUne.length>0&&<section className="editorial-band editorial-band--black"><div className="shell"><div className="daily-section-title daily-section-title--light"><div><span>ÉCO UNE</span><h2>L’économie ivoirienne en première ligne</h2></div><Link href="/categorie/economie">Toute l’économie →</Link></div><div className="eco-une-grid"><ArticleCard article={ecoUne[0]} large/>{ecoUne.slice(1).map(a=><ArticleCard key={a.slug} article={a}/>)}</div></div></section>}

 {ecoInter.length>0&&<section className="daily-section shell"><div className="daily-section-title"><div><span>ÉCO INTER</span><h2>Le monde vu depuis la Côte d’Ivoire</h2><p>Marchés régionaux, UEMOA, commerce extérieur, diaspora et matières premières.</p></div><Link href="/explorer">Voir les analyses →</Link></div><div className="eco-inter-grid">{ecoInter.map((a,i)=><Link href={`/articles/${a.slug}`} key={a.slug} className={i===0?"eco-inter-card eco-inter-card--lead":"eco-inter-card"}><Image src={a.image} alt="" width={1100} height={720}/><div><small>{a.category} · IMPACT CÔTE D’IVOIRE</small><h3>{a.title}</h3><p>{a.excerpt}</p><span>Lire l’analyse ↗</span></div></Link>)}<AdSlot format="Pavé premium · 300 × 250" title="Votre campagne au cœur des échanges." variant="dark"/></div></section>}

 {decideurs.length>0&&<section className="deciders-section"><div className="shell"><div className="deciders-intro"><span>07H00 · CHAQUE MATIN</span><h2>Le Journal<br/><em>des décideurs</em></h2><p>Le briefing exécutif pour comprendre les marchés, les entreprises et les politiques publiques avant le début de la journée.</p><Link href="/#newsletters">Recevoir l’édition →</Link></div><div className="deciders-stories">{decideurs.map((a,i)=><Link href={`/articles/${a.slug}`} key={a.slug}><Image src={a.image} alt="" width={760} height={520}/><span>0{i+1} · {a.region}</span><h3>{a.title}</h3></Link>)}</div><AdSlot format="Partenaire du Journal · 300 × 600" title="Associez votre marque aux décisions qui comptent." copy="Un emplacement premium chaque matin." variant="dark"/></div></section>}

 {accueil.agenda.length>0&&<section className="daily-section shell"><div className="daily-section-title"><div><span>ÉVÉNEMENTS</span><h2>L’agenda des acteurs économiques</h2></div><Link href="/agenda">Tout l’agenda →</Link></div><div className="events-grid">{accueil.agenda.slice(0,3).map(event=>{const jour=new Date(`${event.date}T00:00:00`);return <article key={`${event.date}-${event.titre}`}><Image src={event.imageUrl??IMAGE_PAR_DEFAUT} alt="" width={800} height={520} /><div className="event-date"><strong>{jour.getDate()}</strong><span>{jour.toLocaleDateString("fr-FR",{month:"short"}).toUpperCase()}</span></div><div><small>{event.type} · {event.region.name}</small><h3>{event.titre}</h3><Link href="/agenda">Voir l’événement →</Link></div></article>;})}<AdSlot format="Agenda partenaire" title="Annoncez votre prochain événement." variant="light"/></div></section>}

 {lesPlusLus.length>0&&<section className="daily-section shell"><div className="daily-section-title"><div><span>LES PLUS LUS</span><h2>Ce que lisent les décideurs</h2></div><Link href="/explorer">Toutes les publications →</Link></div><div className="most-read">{lesPlusLus.map((a,i)=><Link href={`/articles/${a.slug}`} key={a.slug}><span>{String(i+1).padStart(2,"0")}</span><div><small>{a.rubrique.name}</small><h3>{a.titre}</h3></div><b>{nombre.format(a.vues)} lectures</b></Link>)}</div></section>}

 <NewsletterHub/>
 </main>;
}
