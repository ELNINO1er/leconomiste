"use client";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {CATEGORIES} from "../../lib/site-config";
import {DirectFlash} from "./DirectFlash";
const slugify=(value:string)=>value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ & /g,"-").replace(/ /g,"-");
export function Header(){const[open,setOpen]=useState(false);const[q,setQ]=useState("");
 const chemin=usePathname();

 /**
  * Le lien correspond-il \u00e0 la page affich\u00e9e ?
  *
  * `/` est trait\u00e9 \u00e0 part : sans cela, l'accueil resterait actif partout, tout
  * chemin commen\u00e7ant par une barre oblique. Ailleurs on accepte les
  * sous-chemins, pour que `/regions/lagunes` garde \u00ab \u00c9co R\u00e9gions \u00bb allum\u00e9.
  */
 const actif=(href:string)=>href==="/"?chemin==="/":chemin===href||chemin.startsWith(`${href}/`);

 /** Attributs communs : la classe pour l'\u0153il, `aria-current` pour les lecteurs d'\u00e9cran. */
 const etat=(href:string,classes="")=>({
   className:`${classes}${actif(href)?`${classes?" ":""}active`:""}`||undefined,
   "aria-current":actif(href)?("page" as const):undefined,
 });

 return <>
 <div className="utility-bar"><div className="shell utility-bar__inner"><span>Le quotidien économique et financier de référence en Côte d’Ivoire</span><div className="utility-links"><Link href="/tv">TV</Link><Link href="/brvm">BRVM</Link><Link href="/sport">Sport</Link><Link href="/agenda">Agenda</Link><Link href="/services">Services</Link><Link href="/studio">Studio</Link><Link href="/informations">Contact</Link></div></div></div>
 <header className="site-header"><div className="shell masthead"><button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Ouvrir le menu">☰</button><Link href="/" className="brand" aria-label="L’Économiste de la Côte d’Ivoire"><Image src="/logo-leconomiste.png" alt="L’Économiste de la Côte d’Ivoire" width={2114} height={744} priority className="brand__logo"/></Link><form className="header-search" action="/explorer"><input name="q" value={q} onChange={e=>setQ(e.target.value)} placeholder="Rechercher en Côte d’Ivoire…" aria-label="Rechercher"/><button>Rechercher</button></form><div className="header-actions"><Link href="/tv" className="header-live"><i/> TV</Link>{/* « Mon espace » et « Connexion » retirés de l'en-tête : ils menaient à un
    compte lecteur simulé — n'importe quelle adresse ouvrait la session, rien
    n'était vérifié ni conservé côté serveur. Promettre une connexion qui n'en
    est pas une est pire que ne rien proposer. Les deux pages existent toujours
    et reviendront ici le jour où les comptes lecteurs seront réels ; d'ici là,
    « S'abonner » mène à la newsletter, qui elle fonctionne. */}
<Link href="/#newsletters" className="newsletter-button">S’abonner</Link></div></div>
 <nav className={`main-nav ${open?"main-nav--open":""}`}><div className="shell nav-scroll"><Link href="/" {...etat("/")}>Accueil</Link><Link href="/tv" {...etat("/tv")}>TV</Link><Link href="/categorie/evenements" {...etat("/categorie/evenements","nav-events")}>Événements</Link>{CATEGORIES.filter(c=>c!=="Événements").map(c=>{const href=`/categorie/${slugify(c)}`;return <Link key={c} href={href} {...etat(href)}>{c}</Link>})}<Link href="/regions" {...etat("/regions")}>Éco Régions</Link></div></nav></header><DirectFlash/>
 </>}
