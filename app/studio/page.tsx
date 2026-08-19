import Link from "next/link";
import {BrandLogo} from "../components/BrandLogo";
import {PodcastPlayer} from "../components/PodcastPlayer";

export default function Studio(){
  return <main className="studio-page">
    <header className="interior-header dark"><div className="shell interior-nav"><BrandLogo/><Link href="/">← Accueil</Link></div></header>
    <section className="studio-hero"><div className="shell"><span>AUDIO &amp; VIDÉO · CÔTE D’IVOIRE</span><h1>Le studio</h1><p>Les voix qui expliquent l’économie et les transformations du pays.</p></div></section>
    <section className="shell studio-content">
      <div className="featured-video real-player"><div className="video-placeholder"><span>▶</span><strong>Émission vidéo mock</strong><small>Le lecteur définitif sera relié à votre plateforme média.</small></div><div><small>LE GRAND ENTRETIEN · 18:42</small><h2>« Produire davantage de valeur en Côte d’Ivoire »</h2></div></div>
      <h2>Nos séries de podcasts</h2>
      <PodcastPlayer/>
    </section>
  </main>;
}
