import Image from "next/image";
import Link from "next/link";
import {Header} from "../components/Header";
import {getArticles,getBreves,getFlash} from "../../lib/api";
import {carteVersArticle} from "../../lib/adapt";
import {liveBlogs} from "../../lib/mock-data";
import {Horloge} from "./Horloge";

/** Le fil vit à la minute : c'est le rythme du flash côté API. */
export const revalidate = 60;

const heure=(iso:string)=>new Date(iso).toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"});

type Entree={
  cle:string;
  quand:string;
  horodatage:number;
  label:string;
  titre:string;
  texte:string;
  lien?:string;
  image?:string;
};

export default async function EnDirect(){
  const [flash,breves,articles]=await Promise.all([
    getFlash(20),
    getBreves(20),
    getArticles({limit:12}),
  ]);

  /**
   * Un seul fil chronologique, alimenté par trois sources.
   *
   * C'est ainsi qu'un vrai direct se compose : des dépêches d'une ligne, des
   * brèves, et les articles publiés dans la journée. Les seconds portent une
   * image et un lien, les premiers non — on n'invente donc ni l'un ni l'autre
   * pour uniformiser l'affichage.
   */
  const entrees:Entree[]=[
    ...flash.map(f=>({
      cle:`flash-${f.publieLe}-${f.label}`,
      quand:heure(f.publieLe),
      horodatage:new Date(f.publieLe).getTime(),
      label:f.label,
      titre:f.texte,
      texte:"",
    })),
    ...breves.map(b=>({
      cle:`breve-${b.publieLe}-${b.titre}`,
      quand:heure(b.publieLe),
      horodatage:new Date(b.publieLe).getTime(),
      label:`${b.tag} · ${b.region.name}`,
      titre:b.titre,
      texte:"",
    })),
    ...articles.items.map(a=>{
      const carte=carteVersArticle(a);

      return {
        cle:`article-${a.slug}`,
        quand:heure(a.publieLe),
        horodatage:new Date(a.publieLe).getTime(),
        label:`${a.rubrique.name} · ${a.region.name}`,
        titre:a.titre,
        texte:a.extrait??"",
        lien:`/articles/${a.slug}`,
        image:carte.image,
      };
    }),
  ].sort((a,b)=>b.horodatage-a.horodatage);

  return (
    <main className="live-page">
      <Header/>
      <section className="live-hero"><div className="shell">
        <span className="live-badge"><i/> EN DIRECT</span>
        <h1>Le fil de l’actualité</h1>
        <p>Toute l’info ivoirienne minute par minute — politique, sport, société, économie, culture.</p>
        <Horloge/>
      </div></section>

      <section className="shell liveblog-strip">
        <span className="liveblog-strip__kicker">DIRECTS ÉVÉNEMENTIELS</span>
        <div className="liveblog-strip__row">
          {liveBlogs.map(b=>(
            <Link key={b.slug} href={`/live/${b.slug}`} className={`liveblog-chip ${b.kind==="match"?"is-match":""}`}>
              <span className="liveblog-chip__status"><i/> {b.status}</span>
              <strong>{b.title}</strong>
              {b.kind==="match"?<span className="liveblog-chip__score">{b.home} {b.score} {b.away}</span>:<span className="liveblog-chip__meta">{b.subtitle}</span>}
            </Link>
          ))}
        </div>
      </section>

      <section className="shell live-feed">
        {entrees.length===0
          ?<p className="agenda-empty">Le fil est vide pour le moment.</p>
          :<ol>
            {entrees.map(e=>(
              <li key={e.cle} className="live-item">
                <div className="live-item__time"><time>{e.quand}</time></div>
                <div className="live-item__body">
                  <span className="live-item__label">{e.label}</span>
                  <h2>{e.lien?<Link href={e.lien}>{e.titre}</Link>:e.titre}</h2>
                  {e.texte&&<p>{e.texte}</p>}
                </div>
                {e.lien&&e.image&&<Link href={e.lien} className="live-item__thumb" aria-hidden tabIndex={-1}><Image src={e.image} alt="" width={320} height={200} /></Link>}
              </li>
            ))}
          </ol>}
        <div className="live-foot">
          <span>Vous suivez un événement précis ?</span>
          <Link href="/explorer">Rechercher un sujet →</Link>
        </div>
      </section>
    </main>
  );
}
