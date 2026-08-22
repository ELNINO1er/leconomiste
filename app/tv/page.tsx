import type {Metadata} from "next";
import Link from "next/link";
import {Header} from "../components/Header";

export const metadata:Metadata={
  title:"L’Économiste TV — lancement prochain",
  description:"La chaîne vidéo de L’Économiste de la Côte d’Ivoire est en préparation.",
  alternates:{canonical:"/tv"},
};

export default function TV(){return <main className="tv-page"><Header/>
  <section className="tv-hero"><div className="shell"><div><span>L’ÉCONOMISTE TV</span><h1>Notre antenne<br/><em>se prépare.</em></h1><p>Les émissions, entretiens et reportages seront publiés ici dès le lancement officiel. Aucun direct n’est diffusé pour le moment.</p><Link className="hero-slider__cta" href="/explorer">Lire toute l’actualité ↗</Link></div></div></section>
  </main>}
