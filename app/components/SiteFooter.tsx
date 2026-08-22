import Link from "next/link";
import {BrandLogo} from "./BrandLogo";
import {CONTACT} from "../../lib/site-config";

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
          <Link href="/sport">Actualité sportive</Link>
          <Link href="/agenda">Agenda</Link>
          <Link href="/services">Outils pratiques</Link>
          <Link href="/studio">Studio à venir</Link>
          <Link href="/explorer">Toutes les publications</Link>
        </div>
        <address className="footer-contact">
          <strong>Nous contacter</strong>
          <div>
            <span>Téléphone</span>
            <a href={`tel:${CONTACT.telephoneLien}`}>{CONTACT.telephone}</a>
          </div>
          <div>
            <span>WhatsApp</span>
            <a href={`https://wa.me/${CONTACT.whatsappLien}`} target="_blank" rel="noopener noreferrer">{CONTACT.whatsapp}</a>
          </div>
          <div>
            <span>Email</span>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </div>
          <div>
            <span>Adresse</span>
            <p>{CONTACT.adresse.map(ligne=><span key={ligne}>{ligne}<br/></span>)}</p>
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
