import Link from "next/link";
import {BrandLogo} from "../components/BrandLogo";

export default function Studio(){return <main className="studio-page">
  <header className="interior-header dark"><div className="shell interior-nav"><BrandLogo/><Link href="/">← Accueil</Link></div></header>
  <section className="studio-hero"><div className="shell"><span>AUDIO &amp; VIDÉO · CÔTE D’IVOIRE</span><h1>Le studio se prépare</h1><p>Nos premiers podcasts, entretiens et reportages seront disponibles ici après leur production. Aucun faux lecteur n’est présenté en attendant.</p><Link className="hero-slider__cta" href="/explorer">Découvrir les publications ↗</Link></div></section>
  </main>}
