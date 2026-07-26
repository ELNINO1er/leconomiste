"use client";

import { useEffect, useState } from "react";

type Story = {
  category: string;
  title: string;
  excerpt: string;
  image: string;
  meta: string;
};

const heroStories = [
  {
    category: "ÉCONOMIE • CÔTE D’IVOIRE",
    title: "Abidjan accélère sa transformation en hub financier régional",
    excerpt:
      "Investissements, infrastructures, fintech : les nouveaux moteurs d’une ambition qui redessine la carte économique de l’Afrique de l’Ouest.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1900&q=88",
    meta: "Par Aïssata Koné  •  8 min de lecture",
  },
  {
    category: "AFRIQUE • ANALYSE",
    title: "Une nouvelle génération d’entrepreneurs change d’échelle",
    excerpt:
      "De Dakar à Nairobi, des entreprises africaines bâtissent des solutions pensées pour le continent et convoitent désormais le monde.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1900&q=88",
    meta: "Par Idriss Diallo  •  6 min de lecture",
  },
  {
    category: "TECHNOLOGIE • MONDE",
    title: "L’intelligence artificielle entre dans l’économie réelle",
    excerpt:
      "Après le temps des promesses, entreprises et États cherchent les usages capables de produire une valeur mesurable.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1900&q=88",
    meta: "Par Sarah Mensah  •  7 min de lecture",
  },
];

const latest: Story[] = [
  {
    category: "FINANCE",
    title: "Les marchés africains attirent une nouvelle vague d’investisseurs",
    excerpt: "Les capitaux privés se tournent vers les actifs à fort potentiel.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=82",
    meta: "Il y a 22 min • 5 min",
  },
  {
    category: "AGRICULTURE",
    title: "Cacao : les producteurs au cœur du nouveau rapport de force",
    excerpt: "La filière cherche un équilibre plus durable et plus équitable.",
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=900&q=82",
    meta: "Il y a 48 min • 6 min",
  },
  {
    category: "TECHNOLOGIE",
    title: "La fintech francophone prépare son passage à l’échelle",
    excerpt: "Paiements et crédit mobile changent les habitudes économiques.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=82",
    meta: "Il y a 1 h • 4 min",
  },
  {
    category: "SANTÉ",
    title: "Les innovations qui rapprochent les soins des territoires",
    excerpt: "La télémédecine s’installe au-delà des grandes capitales.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=82",
    meta: "Il y a 2 h • 7 min",
  },
];

const economy: Story[] = [
  {
    category: "DÉCRYPTAGE",
    title: "Pourquoi la croissance ivoirienne résiste aux vents contraires",
    excerpt:
      "Consommation, investissement public et diversification soutiennent une dynamique scrutée par toute la région.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=82",
    meta: "Économie • 9 min",
  },
  {
    category: "BUSINESS",
    title: "Les PME misent sur le numérique pour conquérir la sous-région",
    excerpt: "Une nouvelle culture de l’export prend forme.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=82",
    meta: "Business • 5 min",
  },
  {
    category: "ÉNERGIE",
    title: "Solaire : la course aux infrastructures s’intensifie",
    excerpt: "Les grands projets changent la donne énergétique.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=82",
    meta: "Afrique • 6 min",
  },
];

const mostRead = [
  "La BCEAO face au défi d’une croissance sans inflation",
  "Classement : les 25 entreprises qui transforment l’Afrique",
  "La bataille mondiale pour les minerais stratégiques",
  "Ce que prépare la nouvelle génération de banques mobiles",
  "Agriculture : dix innovations à suivre cette année",
];

function Icon({ children }: { children: React.ReactNode }) {
  return <span aria-hidden="true">{children}</span>;
}

function StoryCard({ story, large = false }: { story: Story; large?: boolean }) {
  return (
    <article className={`story-card ${large ? "story-card--large" : ""}`}>
      <a href="/article" className="image-wrap" aria-label={story.title}>
        <img src={story.image} alt="" loading="lazy" />
      </a>
      <div className="story-card__body">
        <span className="eyebrow">{story.category}</span>
        <h3>
          <a href="/article">{story.title}</a>
        </h3>
        <p>{story.excerpt}</p>
        <span className="meta">{story.meta}</span>
      </div>
    </article>
  );
}

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [country, setCountry] = useState("Côte d’Ivoire");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(
      () => setSlide((value) => (value + 1) % heroStories.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, []);

  const hero = heroStories[slide];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsMediaOrganization",
            name: "L’Économisteb",
            url: "https://leconomisteb.com",
            slogan: "L’information qui éclaire vos décisions.",
            publishingPrinciples: "https://leconomisteb.com/deontologie",
            areaServed: [
              "Côte d’Ivoire",
              "Sénégal",
              "Cameroun",
              "République démocratique du Congo",
              "Mali",
              "Burkina Faso",
              "France",
              "Belgique",
              "Canada",
            ],
          }),
        }}
      />
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>

      <div className="utility-bar">
        <div className="shell utility-bar__inner">
          <span>Dimanche 26 juillet 2026</span>
          <span className="edition">
            Édition : <strong>{country}</strong>
          </span>
          <div className="utility-links">
            <a href="#podcasts">Podcasts</a>
            <a href="#videos">Vidéos</a>
            <a href="#contact">Nous contacter</a>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="shell masthead">
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Ouvrir le menu"
          >
            <Icon>☰</Icon>
          </button>
          <a href="#" className="brand" aria-label="L’Économisteb, accueil">
            <span className="brand__name">L’Économiste<span>b</span></span>
            <span className="brand__tagline">
              L’information qui éclaire vos décisions.
            </span>
          </a>
          <div className="header-actions">
            <label className="country-select">
              <span className="sr-only">Sélectionner un pays</span>
              <Icon>◎</Icon>
              <select
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              >
                <option>Côte d’Ivoire</option>
                <option>Sénégal</option>
                <option>Cameroun</option>
                <option>RDC</option>
                <option>Mali</option>
                <option>Burkina Faso</option>
                <option>France</option>
                <option>Belgique</option>
                <option>Canada</option>
              </select>
            </label>
            <button
              className="icon-button"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-expanded={searchOpen}
              aria-label="Rechercher"
            >
              <Icon>⌕</Icon>
            </button>
            <a href="#newsletter" className="newsletter-button">
              Newsletter
            </a>
            <a href="/login" className="login-button">
              <Icon>♙</Icon> Connexion
            </a>
          </div>
        </div>

        {searchOpen && (
          <div className="search-panel">
            <div className="shell">
              <label htmlFor="site-search">Que recherchez-vous ?</label>
              <div>
                <input
                  id="site-search"
                  autoFocus
                  placeholder="Sujet, entreprise, pays ou personnalité…"
                />
                <button>Rechercher</button>
              </div>
            </div>
          </div>
        )}

        <nav className={`main-nav ${menuOpen ? "main-nav--open" : ""}`}>
          <div className="shell nav-scroll">
            {[
              "Accueil",
              "Côte d’Ivoire",
              "Afrique",
              "Monde",
              "Politique",
              "Économie",
              "Finance",
              "Business",
              "Agriculture",
              "Technologie",
              "Santé",
              "Culture",
              "Sport",
              "Opinion",
            ].map((item, index) => (
              <a href={`#${item.toLowerCase()}`} className={index === 0 ? "active" : ""} key={item}>
                {item}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <section className="breaking" aria-label="Dernière minute">
        <div className="shell breaking__inner">
          <strong><span></span> EN DIRECT</strong>
          <div className="breaking__text">
            <span>17:42</span>
            La CEDEAO dévoile une nouvelle feuille de route pour faciliter le
            commerce régional
          </div>
          <a href="/explorer">Suivre le direct <Icon>→</Icon></a>
        </div>
      </section>

      <section className="hero" id="contenu" aria-label="À la une">
        <div
          className="hero__background"
          style={{ backgroundImage: `url(${hero.image})` }}
        />
        <div className="hero__shade" />
        <div className="shell hero__content">
          <div className="hero__copy">
            <span className="hero__eyebrow">{hero.category}</span>
            <h1>{hero.title}</h1>
            <p>{hero.excerpt}</p>
            <div className="hero__meta">{hero.meta}</div>
            <a href="/article" className="primary-button">
              Lire l’article <Icon>↗</Icon>
            </a>
          </div>
          <div className="hero__controls" aria-label="Choisir un article">
            {heroStories.map((story, index) => (
              <button
                key={story.title}
                onClick={() => setSlide(index)}
                className={slide === index ? "is-active" : ""}
                aria-label={`Afficher : ${story.title}`}
              >
                <span>0{index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="market-strip">
        <div className="shell market-strip__inner">
          <span className="market-title">LES MARCHÉS</span>
          <span><b>BRVM 10</b> 290,42 <i className="up">+0,84 %</i></span>
          <span><b>EUR/XOF</b> 655,96 <i>0,00 %</i></span>
          <span><b>USD/XOF</b> 561,24 <i className="down">−0,31 %</i></span>
          <span><b>CAC 40</b> 8 169,06 <i className="up">+0,47 %</i></span>
          <span><b>OR</b> 2 418,30 $ <i className="up">+0,19 %</i></span>
        </div>
      </div>

      <section className="section shell">
        <div className="section-heading">
          <div>
            <span className="section-kicker">LE FIL DE L’INFO</span>
            <h2>Dernières publications</h2>
          </div>
          <a href="/explorer">Voir toute l’actualité <Icon>→</Icon></a>
        </div>
        <div className="latest-grid">
          {latest.map((story) => <StoryCard key={story.title} story={story} />)}
        </div>
      </section>

      <section className="section section--tinted">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="section-kicker">ANALYSES & PERSPECTIVES</span>
              <h2>Économie & Business</h2>
            </div>
            <div className="section-tabs">
              <button className="active">À la une</button>
              <button>Finance</button>
              <button>Entreprises</button>
            </div>
          </div>
          <div className="feature-layout">
            <StoryCard story={economy[0]} large />
            <div className="feature-side">
              {economy.slice(1).map((story) => (
                <StoryCard key={story.title} story={story} />
              ))}
            </div>
            <aside className="most-read">
              <div className="most-read__head">
                <span>LES PLUS LUS</span>
                <span>24 H</span>
              </div>
              <ol>
                {mostRead.map((title, index) => (
                  <li key={title}>
                    <span>0{index + 1}</span>
                    <a href="/article">{title}</a>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <div>
            <span className="section-kicker">LE CONTINENT EN MOUVEMENT</span>
            <h2>Afrique</h2>
          </div>
          <a href="#afrique">Toute l’Afrique <Icon>→</Icon></a>
        </div>
        <div className="africa-grid">
          <article className="africa-lead">
            <img
              src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=85"
              alt=""
              loading="lazy"
            />
            <div>
              <span className="eyebrow">GRAND FORMAT</span>
              <h3>De Lagos à Abidjan, le corridor qui peut changer l’Afrique de l’Ouest</h3>
              <p>Commerce, mobilité, industrie : enquête sur un projet hors normes.</p>
            </div>
          </article>
          <div className="briefs">
            {[
              ["SÉNÉGAL", "Dakar mise sur l’industrie créative pour diversifier sa croissance"],
              ["RDC", "Le cuivre au centre d’une stratégie de transformation locale"],
              ["CAMEROUN", "Douala veut réinventer sa logistique portuaire"],
              ["MALI", "Les coopératives agricoles accélèrent leur modernisation"],
            ].map(([tag, title]) => (
              <article key={title}>
                <span className="eyebrow">{tag}</span>
                <h3><a href="/article">{title}</a></h3>
                <span className="meta">5 min de lecture</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="media-section" id="videos">
        <div className="shell">
          <div className="section-heading section-heading--light">
            <div>
              <span className="section-kicker">À VOIR & À ÉCOUTER</span>
              <h2>Le studio</h2>
            </div>
            <a href="/studio">Explorer tous les formats <Icon>→</Icon></a>
          </div>
          <div className="media-grid">
            <article className="video-card">
              <img
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1400&q=85"
                alt=""
                loading="lazy"
              />
              <button aria-label="Lire la vidéo">▶</button>
              <div>
                <span className="eyebrow">L’ENTRETIEN • 18:42</span>
                <h3>« L’Afrique doit financer sa propre transformation »</h3>
              </div>
            </article>
            <div className="podcast-card" id="podcasts">
              <span className="podcast-card__type">PODCAST ORIGINAL</span>
              <div className="soundwave">▂▄▆▃▇▅▂▄▆▃▅▇▂▄</div>
              <h3>Le Brief Éco</h3>
              <p>L’essentiel de l’économie africaine, expliqué en 12 minutes.</p>
              <div className="podcast-player">
                <button aria-label="Lire le podcast">▶</button>
                <span>Épisode 48</span>
                <i>12:06</i>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell opinion-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">IDÉES & DÉBATS</span>
            <h2>Opinions</h2>
          </div>
          <a href="#opinions">Toutes les opinions <Icon>→</Icon></a>
        </div>
        <div className="opinion-grid">
          {[
            ["AM", "Aminata Mbaye", "La souveraineté économique commence par nos données"],
            ["KK", "Koffi Kouamé", "Le temps est venu d’investir dans les villes secondaires"],
            ["FN", "Fatou Ndiaye", "Financer les femmes, c’est accélérer toute l’économie"],
          ].map(([initials, author, title]) => (
            <article key={title}>
              <div className="avatar">{initials}</div>
              <div>
                <span className="eyebrow">LA CHRONIQUE DE {author.toUpperCase()}</span>
                <h3><a href="/article">{title}</a></h3>
                <span className="meta">Tribune • 4 min</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="newsletter" id="newsletter">
        <div className="shell newsletter__inner">
          <div className="newsletter__mark">É.</div>
          <div>
            <span className="section-kicker">LA MATINALE DE L’ÉCONOMISTEB</span>
            <h2>Commencez la journée avec un temps d’avance.</h2>
            <p>
              Chaque matin, les informations et analyses qui éclairent vos
              décisions. Gratuit, directement dans votre boîte mail.
            </p>
          </div>
          {subscribed ? (
            <div className="success-message">✓ Merci ! Votre inscription est confirmée.</div>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (email) setSubscribed(true);
              }}
            >
              <label htmlFor="email" className="sr-only">Votre adresse e-mail</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="votre@email.com"
              />
              <button>S’inscrire</button>
              <small>En vous inscrivant, vous acceptez notre politique de confidentialité.</small>
            </form>
          )}
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <div className="shell footer-top">
          <a href="#" className="brand brand--footer">
            <span className="brand__name">L’Économiste<span>b</span></span>
            <span className="brand__tagline">L’information qui éclaire vos décisions.</span>
          </a>
          <p>
            Le média international de référence pour comprendre l’économie,
            les entreprises et les transformations du continent africain.
          </p>
          <div className="socials">
            <a href="#linkedin" aria-label="LinkedIn">in</a>
            <a href="#x" aria-label="X">𝕏</a>
            <a href="#facebook" aria-label="Facebook">f</a>
            <a href="#youtube" aria-label="YouTube">▶</a>
          </div>
        </div>
        <div className="shell footer-grid">
          <div><h3>Rubriques</h3><a href="#economie">Économie</a><a href="#finance">Finance</a><a href="#business">Business</a><a href="#technologie">Technologie</a><a href="#agriculture">Agriculture</a></div>
          <div><h3>Éditions</h3><a href="#ci">Côte d’Ivoire</a><a href="#senegal">Sénégal</a><a href="#cameroun">Cameroun</a><a href="#rdc">RDC</a><a href="#international">International</a></div>
          <div><h3>Formats</h3><a href="#enquetes">Enquêtes</a><a href="#interviews">Interviews</a><a href="#opinions">Opinions</a><a href="#podcasts">Podcasts</a><a href="#videos">Vidéos</a></div>
          <div><h3>L’Économisteb</h3><a href="#apropos">À propos</a><a href="#equipe">La rédaction</a><a href="#publicite">Publicité</a><a href="#carriere">Carrières</a><a href="#contact">Nous contacter</a></div>
        </div>
        <div className="shell footer-bottom">
          <span>© 2026 L’Économisteb. Tous droits réservés.</span>
          <div><a href="#mentions">Mentions légales</a><a href="#confidentialite">Confidentialité</a><a href="#conditions">Conditions d’utilisation</a></div>
        </div>
      </footer>
    </main>
  );
}
