"use client";
import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import {categories} from "../../lib/mock-data";
import {DirectFlash} from "./DirectFlash";
const slugify=(value:string)=>value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ & /g,"-").replace(/ /g,"-");
export function Header(){const[open,setOpen]=useState(false);const[q,setQ]=useState("");return <>
 <div className="utility-bar"><div className="shell utility-bar__inner"><span>Le quotidien économique et financier de référence en Côte d’Ivoire</span><div className="utility-links"><Link href="/tv" className="utility-live"><i/> TV Direct</Link><Link href="/brvm">BRVM</Link><Link href="/sport">Scores</Link><Link href="/agenda">Agenda</Link><Link href="/services">Services</Link><Link href="/studio">Podcasts</Link><Link href="/informations">Contact</Link></div></div></div>
 <header className="site-header"><div className="shell masthead"><button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Ouvrir le menu">☰</button><Link href="/" className="brand" aria-label="L’Économiste de la Côte d’Ivoire"><Image src="/logo-leconomiste.png" alt="L’Économiste de la Côte d’Ivoire" width={2114} height={744} priority className="brand__logo"/></Link><form className="header-search" action="/explorer"><input name="recherche" value={q} onChange={e=>setQ(e.target.value)} placeholder="Rechercher en Côte d’Ivoire…" aria-label="Rechercher"/><button>Rechercher</button></form><div className="header-actions"><Link href="/tv" className="header-live"><i/> Direct TV</Link><Link href="/espace" className="newsletter-button">Mon espace</Link><Link href="/login" className="login-button">Connexion</Link></div></div>
 <nav className={`main-nav ${open?"main-nav--open":""}`}><div className="shell nav-scroll"><Link href="/">Accueil</Link><Link href="/tv" className="nav-live"><i/> TV Direct</Link><Link href="/categorie/evenements" className="nav-events">Événements</Link>{categories.filter(c=>c!=="Événements").map(c=><Link key={c} href={`/categorie/${slugify(c)}`}>{c}</Link>)}<Link href="/regions">Éco Régions</Link></div></nav></header><DirectFlash/>
 </>}
