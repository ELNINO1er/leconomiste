import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "../components/BrandLogo";
import { Onglets } from "./Onglets";

/**
 * Page serveur, alors que le contenu est feuilleté côté client.
 *
 * Les onglets vivent dans `Onglets.tsx` justement pour que celle-ci puisse
 * rester un composant serveur et porter ses métadonnées : les mentions légales
 * et la politique de confidentialité sont des pages qu'on cherche par leur nom,
 * et un composant client ne peut pas exporter de `metadata`.
 */
export const metadata: Metadata = {
  title: "Informations, mentions légales et confidentialité",
  description:
    "Qui édite L’Économiste de la Côte d’Ivoire, comment nous traitons vos données, notre méthode de travail et comment joindre la rédaction.",
  alternates: { canonical: "https://leconomistedelacotedivoire.com/informations" },
};

export default function Informations() {
  return (
    <main className="info-page">
      <header className="interior-header">
        <div className="shell interior-nav">
          <BrandLogo />
          <Link href="/">Accueil</Link>
        </div>
      </header>

      <Onglets />
    </main>
  );
}
