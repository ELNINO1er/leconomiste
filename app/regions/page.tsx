import type {Metadata} from "next";
import Link from "next/link";
import {Header} from "../components/Header";
import {ArticleCard} from "../components/ArticleCard";
import {getArticles,getRegions} from "../../lib/api";
import {carteVersArticle} from "../../lib/adapt";

export const revalidate = 120;

export const metadata:Metadata={
  title:"Actualité économique des régions de Côte d’Ivoire",
  description:"Projets, entreprises, agriculture, énergie et vie publique dans les régions et districts de Côte d’Ivoire.",
  alternates:{canonical:"/regions"},
};

export default async function Regions(){
  const regions=await getRegions();

  // On n'interroge que les districts qui ont publié : demander les quatorze
  // ferait quatorze allers-retours dont plusieurs pour rien.
  const peuplees=regions.filter(r=>r.articles>0);

  const sections=await Promise.all(
    peuplees.map(async region=>({
      region,
      articles:(await getArticles({region:region.slug,limit:4})).items.map(carteVersArticle),
    })),
  );

  return <main><Header/><section className="category-hero"><div className="shell"><span className="section-kicker">ÉCO RÉGIONS</span><h1>La Côte d’Ivoire, éco région par éco région</h1><p>Projets, entreprises, agriculture, énergie et vie publique au plus près des territoires ivoiriens.</p></div></section>{sections.map(({region,articles})=><section className="section shell region-section" id={region.slug} key={region.slug}><div className="section-heading"><div><span className="section-kicker">ÉCO RÉGION</span><h2>{region.name}</h2></div><Link href={`/explorer?region=${encodeURIComponent(region.slug)}`}>Explorer {region.name} →</Link></div><div className="latest-grid">{articles.map(a=><ArticleCard key={`${region.slug}-${a.slug}`} article={a}/>)}</div></section>)}</main>;
}
