"use client";

import { useState } from "react";

/**
 * Les rubriques d'information légale et éditoriale.
 *
 * Chaque entrée est un fragment plutôt qu'une chaîne : les mentions légales et
 * la politique de confidentialité ont besoin de listes et de liens, et une
 * simple phrase ne suffisait plus dès lors que ces pages engagent le journal.
 */
const RUBRIQUES: Record<string, React.ReactNode> = {
  "À propos": (
    <>
      <p>
        L’Économiste de la Côte d’Ivoire est un titre ivoirien indépendant consacré à l’économie,
        aux entreprises, aux politiques publiques et aux transformations du pays. Notre ambition est
        de rendre l’information exigeante claire, utile et accessible.
      </p>
      <p>
        La rédaction couvre l’actualité depuis Abidjan et suit les quatorze districts du territoire,
        avec une attention particulière portée aux décisions qui engagent l’activité économique.
      </p>
    </>
  ),

  Publicité: (
    <>
      <p>
        Nos formats publicitaires s’adressent aux entreprises, institutions et organisations qui
        souhaitent toucher les décideurs, entrepreneurs et citoyens ivoiriens : bannière d’accueil,
        pavé de rubrique, format intégré à la lecture et habillage d’événement.
      </p>
      <p>
        Le tarif dépend de l’emplacement et de la durée. Écrivez-nous pour recevoir le dossier de
        présentation et les disponibilités.
      </p>
    </>
  ),

  "Mentions légales": (
    <>
      <p>
        Conformément à la réglementation applicable aux services de communication au public en ligne
        en Côte d’Ivoire, les informations suivantes sont portées à la connaissance des lecteurs.
      </p>
      <dl className="legal-list">
        <dt>Éditeur du site</dt>
        <dd data-a-completer>Raison sociale, forme juridique, capital, RCCM et siège social</dd>

        <dt>Directeur de la publication</dt>
        <dd data-a-completer>Nom et qualité</dd>

        <dt>Contact de la rédaction</dt>
        <dd data-a-completer>Adresse électronique et téléphone</dd>

        <dt>Hébergement</dt>
        <dd data-a-completer>Nom, adresse et téléphone de l’hébergeur</dd>
      </dl>
      <p className="legal-note">
        Les mentions marquées ci-dessus sont en cours de complément par l’éditeur.
      </p>
      <p>
        L’ensemble des contenus publiés — textes, photographies, éléments graphiques — est protégé
        par le droit d’auteur. Toute reproduction, même partielle, est soumise à autorisation
        préalable, hors courte citation accompagnée du nom du titre et d’un lien vers l’article.
      </p>
    </>
  ),

  Confidentialité: (
    <>
      <p>
        <strong>Nous ne déposons aucun cookie publicitaire et ne suivons personne d’un site à
        l’autre.</strong> Le journal n’utilise ni régie de traçage, ni outil de mesure tiers.
      </p>
      <h2>Mesure d’audience</h2>
      <p>
        Nous comptons les pages lues afin de savoir ce qui intéresse nos lecteurs. Cette mesure ne
        pose pas de cookie et ne conserve pas votre adresse IP : celle-ci est combinée à votre
        navigateur et à un secret renouvelé chaque jour, puis transformée en une empreinte
        irréversible. Elle permet de distinguer deux visites d’une même journée, sans jamais
        permettre de remonter jusqu’à vous, et elle est effacée au bout de trois jours.
      </p>
      <h2>Ce qui reste sur votre appareil</h2>
      <p>
        Vos préférences de lecture — taille du texte, mode concentré, sujets suivis, articles
        sauvegardés — sont enregistrées dans votre navigateur et n’en sortent pas. Les vider revient
        à effacer les données du site depuis les réglages de votre navigateur.
      </p>
      <h2>Lettre d’information</h2>
      <p>
        Si vous vous y abonnez, votre adresse électronique est conservée pour vous envoyer nos
        éditions et n’est ni vendue, ni cédée, ni utilisée à d’autres fins. Vous pouvez demander sa
        suppression à tout moment en écrivant à la rédaction.
      </p>
      <h2>Vos droits</h2>
      <p>
        Vous disposez d’un droit d’accès, de rectification et de suppression des données vous
        concernant, exerçable auprès de la rédaction. La collecte est déclarée auprès de l’Autorité
        de régulation des télécommunications de Côte d’Ivoire (ARTCI) dans les conditions prévues
        par la loi n° 2013-450 relative à la protection des données à caractère personnel.
      </p>
    </>
  ),

  "Notre méthode": (
    <>
      <p>
        Séparer les faits du commentaire, citer les sources, corriger rapidement les erreurs et
        expliquer les enjeux dans leur contexte ivoirien.
      </p>
      <p>
        Une erreur signalée est vérifiée puis corrigée dans l’article, qui porte alors la date de sa
        mise à jour. Si vous en relevez une, écrivez-nous : c’est le meilleur service à rendre à un
        journal.
      </p>
    </>
  ),
};

export function Onglets() {
  const [onglet, setOnglet] = useState<string>("À propos");

  return (
    <div className="shell info-layout">
      <nav>
        {Object.keys(RUBRIQUES).map((titre) => (
          <button
            key={titre}
            className={onglet === titre ? "active" : ""}
            onClick={() => setOnglet(titre)}
          >
            {titre}
          </button>
        ))}
        <button className={onglet === "Contact" ? "active" : ""} onClick={() => setOnglet("Contact")}>
          Contact
        </button>
      </nav>

      <article>
        <span className="section-kicker">TRANSPARENCE</span>
        <h1>{onglet}</h1>

        {onglet === "Contact" ? <Contact /> : RUBRIQUES[onglet]}
      </article>
    </div>
  );
}

/**
 * Contact par courrier électronique, et non par formulaire.
 *
 * Le formulaire précédent affichait « message enregistré » sans rien envoyer
 * nulle part : un lecteur signalant une erreur pouvait croire la rédaction
 * prévenue alors que rien ne partait. Tant qu'aucun service d'envoi n'est
 * raccordé, un lien `mailto:` est la seule forme qui tienne sa promesse — il
 * ouvre la messagerie du lecteur, sujet pré-rempli.
 */
function Contact() {
  const adresse = "redaction@leconomistedelacotedivoire.com";

  const sujets = [
    { titre: "Rédaction", objet: "Contact rédaction" },
    { titre: "Signaler une erreur", objet: "Signalement d’une erreur" },
    { titre: "Publicité", objet: "Demande d’espace publicitaire" },
    { titre: "Partenariat", objet: "Proposition de partenariat" },
  ];

  return (
    <>
      <p>
        Écrivez-nous directement : chaque message arrive à la rédaction, à Abidjan. Choisissez
        l’objet qui correspond à votre demande, votre messagerie s’ouvrira avec le sujet déjà rempli.
      </p>

      <ul className="contact-list">
        {sujets.map((s) => (
          <li key={s.titre}>
            <a href={`mailto:${adresse}?subject=${encodeURIComponent(s.objet)}`}>
              <strong>{s.titre}</strong>
              <small>{adresse}</small>
            </a>
          </li>
        ))}
      </ul>

      <p className="legal-note" data-a-completer>
        Adresse postale et numéro de téléphone de la rédaction à compléter.
      </p>
    </>
  );
}
