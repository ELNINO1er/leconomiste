import type {Metadata} from "next";
import {Fragment,Suspense} from "react";
import {AdSlot} from "../components/AdSlot";
import {ArticleCard} from "../components/ArticleCard";
import {Header} from "../components/Header";
import {Pagination} from "../components/Pagination";
import {getArticles,getRegions,getRubriques} from "../../lib/api";
import {carteVersArticle} from "../../lib/adapt";
import {Filtres,Tri} from "./Filtres";

export const revalidate = 120;

export const metadata:Metadata={
  title:"Rechercher dans l’actualité ivoirienne",
  description:"Explorez les articles de L’Économiste par rubrique, région, date ou mot-clé.",
  alternates:{canonical:"/explorer"},
};

/** Assez pour remplir la grille sans imposer un défilement interminable. */
const PAR_PAGE = 24;

type Params = {q?:string;rubrique?:string;region?:string;tri?:string;page?:string};

export default async function Explorer({searchParams}:{searchParams:Promise<Params>}){
  const filtres=await searchParams;

  // `?page=0`, `?page=abc` ou `?page=-3` sont des URL que le lecteur peut taper
  // à la main ou qu'un robot peut inventer : on retombe sur la première page
  // plutôt que de demander un décalage négatif à l'API.
  const numero=Math.max(1,Number.parseInt(filtres.page??"1",10)||1);

  const [rubriques,regions,page]=await Promise.all([
    getRubriques(),
    getRegions(),
    getArticles({
      q:filtres.q,
      rubrique:filtres.rubrique,
      region:filtres.region,
      tri:filtres.tri==="populaire"?"populaire":"recent",
      limit:PAR_PAGE,
      offset:(numero-1)*PAR_PAGE,
    }),
  ]);

  const list=page.items.map(carteVersArticle);
  const premier=(numero-1)*PAR_PAGE+1;

  // Le total vient de l'API et porte sur toute l'archive, pas sur les soixante
  // lignes affichées : annoncer « 60 résultats » quand il y en a trois cents
  // tromperait le lecteur sur ce qu'il reste à lire.
  const totalArticles=rubriques.reduce((somme,r)=>somme+r.articles,0);

  return <main className="explorer-page"><Header/>
    <section className="explorer-hero"><div className="shell explorer-hero__grid"><div><span className="section-kicker">LE KIOSQUE NUMÉRIQUE IVOIRIEN</span><h1>Explorer<br/><em>l’actualité.</em></h1><p>Économie, entreprises, territoires et décisions publiques : retrouvez toutes nos publications dans une expérience de recherche plus directe.</p><div className="explorer-stats"><span><strong>{totalArticles}</strong> publications</span><span><strong>{rubriques.length}</strong> rubriques</span><span><strong>{regions.length}</strong> territoires</span></div></div><AdSlot format="Billboard éditorial · 620 × 280" title="Votre campagne rencontre la Côte d’Ivoire qui décide." variant="dark"/></div></section>
    <section className="shell explorer-layout">
      {/* `useSearchParams` impose une frontière de suspense : sans elle, Next
          refuse de pré-rendre la page. */}
      <Suspense fallback={<aside className="filter-panel"/>}>
        <Filtres rubriques={rubriques} regions={regions}/>
      </Suspense>
      <div className="results-panel"><div className="results-toolbar"><div><small>LA SÉLECTION</small><strong>{page.total} résultat{page.total!==1?"s":""}</strong>{list.length>0&&page.total>PAR_PAGE&&<small>{premier} à {premier+list.length-1}</small>}</div><Suspense fallback={<select/>}><Tri/></Suspense></div><div className="results-grid">{list.map((a,i)=><Fragment key={a.slug}><ArticleCard article={a}/>{i===5&&<AdSlot className="results-ad" format="Native premium" title="Une prise de parole qui compte." variant="dark"/>}</Fragment>)}</div>{!list.length&&<div className="empty-state">{numero>1?"Cette page de résultats est vide : revenez au début du fil.":"Aucun article ivoirien ne correspond à ces critères."}</div>}<Pagination page={numero} total={page.total} parPage={PAR_PAGE} params={{q:filtres.q,rubrique:filtres.rubrique,region:filtres.region,tri:filtres.tri}}/></div>
    </section>
  </main>;
}
