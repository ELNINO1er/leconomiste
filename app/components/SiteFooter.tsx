import Link from "next/link";
import {BrandLogo} from "./BrandLogo";

export function SiteFooter() {
  return (
    <footer className="site-footer premium-footer">
      <div className="shell">
        <div className="footer-brand">
          <BrandLogo className="footer-brand__logo"/>
          <p>Le quotidien ivoirien de référence pour comprendre l’économie, les entreprises, les politiques publiques et les transformations du pays.</p>
        </div>
        <div>
          <strong>Rubriques</strong>
          <Link href="/categorie/economie">Économie</Link>
          <Link href="/categorie/politique">Politique</Link>
          <Link href="/categorie/entreprises">Entreprises</Link>
          <Link href="/categorie/finance-brvm">Finance & BRVM</Link>
          <Link href="/categorie/evenements">Événements</Link>
          <Link href="/regions">Éco Régions</Link>
        </div>
        <div>
          <strong>Le quotidien</strong>
          <Link href="/informations">À propos</Link>
          <Link href="/informations">Publicité</Link>
          <Link href="/informations">Contact</Link>
          <Link href="/studio">Studio</Link>
          <Link href="/explorer">Toutes les publications</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 · Abidjan, Côte d’Ivoire</span>
        <span>Information économique et territoriale ivoirienne</span>
      </div>
    </footer>
  );
}
