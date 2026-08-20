import {getArticles} from "../../lib/api";

const base="https://leconomistedelacotedivoire.com";
const xml=(value:string)=>value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");

export const revalidate = 900;

export async function GET(){
  // Cinquante entrées : un lecteur de flux affiche rarement au-delà, et
  // l'ensemble de l'archive alourdirait la réponse sans servir personne.
  //
  // API muette : on sert un flux vide plutôt qu'une erreur. Un agrégateur qui
  // reçoit une 500 peut se désabonner de lui-même ; un flux vide est simplement
  // ignoré jusqu'au passage suivant.
  const {items}=await getArticles({limit:50}).catch(()=>({items:[],total:0}));

  const entrees=items.map(a=>`<item><title>${xml(a.titre)}</title><link>${base}/articles/${a.slug}</link><guid isPermaLink="true">${base}/articles/${a.slug}</guid><description>${xml(a.extrait??"")}</description><category>${xml(a.rubrique.name)}</category><author>${xml(a.auteur.nom)}</author><pubDate>${new Date(a.publieLe).toUTCString()}</pubDate></item>`).join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>L’Économiste de la Côte d’Ivoire</title><link>${base}</link><description>Le quotidien économique et financier ivoirien de référence.</description><language>fr-CI</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${entrees}</channel></rss>`,{headers:{"Content-Type":"application/rss+xml; charset=utf-8","Cache-Control":"public, max-age=900"}});
}
