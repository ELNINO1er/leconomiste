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
          <strong>Services</strong>
          <Link href="/brvm">BRVM & éco data</Link>
          <Link href="/sport">Scores & résultats</Link>
          <Link href="/agenda">Agenda</Link>
          <Link href="/services">Outils pratiques</Link>
          <Link href="/studio">Studio & podcasts</Link>
          <Link href="/explorer">Toutes les publications</Link>
        </div>
        <address className="footer-contact">
          <strong>Nous contacter</strong>
          <div>
            <span>Téléphone</span>
            <a href="tel:+2252720200000">+225 27 20 20 00 00</a>
          </div>
          <div>
            <span>WhatsApp</span>
            <a href="https://wa.me/2250757502230" target="_blank" rel="noopener noreferrer">+225 07 57 50 22 30</a>
          </div>
          <div>
            <span>Email</span>
            <a href="mailto:leconomistedelacotedivoire@gmail.com">leconomistedelacotedivoire@gmail.com</a>
          </div>
          <div>
            <span>Adresse</span>
            <p>34, boulevard de la République<br/>Immeuble Alpha 2000<br/>01 BP 1300 Abidjan 01</p>
          </div>
        </address>
      </div>
      <div className="shell footer-bottom">
        <span>© 2026 · Abidjan, Côte d’Ivoire</span>
        <span>Information économique et territoriale ivoirienne</span>
      </div>
    </footer>
  );
}
