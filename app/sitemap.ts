import type {MetadataRoute} from "next";
import {getRubriques, getSitemap} from "../lib/api";

const base="https://leconomistedelacotedivoire.com";

/** Aligné sur le cache du sitemap côté API : rien ne sert d'être plus frais. */
export const revalidate = 900;

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const [entrees, rubriques] = await Promise.all([
    getSitemap().catch(()=>[]),
    getRubriques().catch(()=>[]),
  ]);

  // Les pages fixes suivent la publication la plus récente : un plan de site
  // figé sur une date en dur indique aux moteurs qu'il n'y a rien de neuf.
  const dernierePublication = entrees[0]
    ? new Date(entrees[0].modifieLe)
    : new Date();

  return [
    {url:base,changeFrequency:"hourly",priority:1,lastModified:dernierePublication,images:[`${base}/og-daily.png`]},
    {url:`${base}/tv`,changeFrequency:"hourly",priority:.9,lastModified:dernierePublication},
    {url:`${base}/en-direct`,changeFrequency:"hourly",priority:.9,lastModified:dernierePublication},
    {url:`${base}/brvm`,changeFrequency:"daily",priority:.8,lastModified:dernierePublication},
    {url:`${base}/agenda`,changeFrequency:"daily",priority:.7,lastModified:dernierePublication},
    {url:`${base}/sport`,changeFrequency:"daily",priority:.7,lastModified:dernierePublication},
    {url:`${base}/services`,changeFrequency:"weekly",priority:.6,lastModified:dernierePublication},
    {url:`${base}/explorer`,changeFrequency:"daily",priority:.8,lastModified:dernierePublication},
    {url:`${base}/regions`,changeFrequency:"daily",priority:.8,lastModified:dernierePublication},
    {url:`${base}/informations`,changeFrequency:"monthly",priority:.6,lastModified:dernierePublication},
    ...rubriques.map(r=>({url:`${base}/categorie/${r.slug}`,changeFrequency:"daily" as const,priority:.8,lastModified:dernierePublication})),
    ...entrees.map(a=>({url:`${base}/articles/${a.slug}`,changeFrequency:"weekly" as const,priority:.9,lastModified:new Date(a.modifieLe)})),
  ];
}
