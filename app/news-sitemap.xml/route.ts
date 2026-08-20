import {getArticles} from "../../lib/api";

const base="https://leconomistedelacotedivoire.com";
const xml=(value:string)=>value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

export const revalidate = 900;

export async function GET(){
  // Google News ne considère que les publications des deux derniers jours : au
  // delà, une entrée est ignorée. On filtre donc plutôt que de servir une liste
  // qui donnerait l'illusion d'être plus fournie.
  const limite=Date.now()-2*24*60*60*1000;
  const {items}=await getArticles({limit:30}).catch(()=>({items:[],total:0}));
  const recents=items.filter(a=>new Date(a.publieLe).getTime()>=limite);

  const urls=recents.map(a=>`<url><loc>${base}/articles/${a.slug}</loc><news:news><news:publication><news:name>L’Économiste de la Côte d’Ivoire</news:name><news:language>fr</news:language></news:publication><news:publication_date>${new Date(a.publieLe).toISOString()}</news:publication_date><news:title>${xml(a.titre)}</news:title></news:news></url>`).join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${urls}</urlset>`,{headers:{"Content-Type":"application/xml; charset=utf-8","Cache-Control":"public, max-age=900"}});
}
