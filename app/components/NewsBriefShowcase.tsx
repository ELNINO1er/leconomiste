import Image from "next/image";
import Link from "next/link";
import type {Article} from "../../lib/mock-data";

export function NewsBriefShowcase({items}:{items:Article[]}){
  const lead=items[0];const side=items.slice(1,5);const depth=items.slice(5,9);
  if(!lead)return null;
  return <div className="brief-showcase">
    <div className="brief-showcase__top">
      <aside className="brief-showcase__side">{side.slice(0,2).map((a,i)=><Brief key={a.slug} article={a} index={i+1}/>)}</aside>
      <article className="brief-showcase__lead"><Link className="brief-showcase__lead-image" href={`/articles/${lead.slug}`}><Image src={lead.image} alt={`Illustration : ${lead.title}`} fill  sizes="(max-width:800px) 100vw, 58vw"/><span>À LA UNE</span></Link><div><small>{lead.category} · {lead.region}</small><h3><Link href={`/articles/${lead.slug}`}>{lead.title}</Link></h3><p>{lead.excerpt}</p><div><span>Par {lead.author} · {lead.readTime}</span><Link href={`/articles/${lead.slug}`}>Continuer la lecture ↗</Link></div></div></article>
      <aside className="brief-showcase__side">{side.slice(2,4).map((a,i)=><Brief key={a.slug} article={a} index={i+3}/>)}</aside>
    </div>
    <div className="brief-showcase__divider"><span>EN PROFONDEUR</span></div>
    <div className="brief-showcase__depth">{depth.map((a,i)=><article key={a.slug}><Link className="brief-showcase__depth-image" href={`/articles/${a.slug}`}><Image src={a.image} alt={`Illustration : ${a.title}`} fill  sizes="(max-width:700px) 100vw, 25vw"/><b>0{i+1}</b></Link><small>{a.category} · {a.region}</small><h3><Link href={`/articles/${a.slug}`}>{a.title}</Link></h3><p>{a.excerpt}</p><Link href={`/articles/${a.slug}`}>Lire l’article →</Link></article>)}</div>
  </div>
}

function Brief({article,index}:{article:Article;index:number}){return <article className="visual-brief"><Link className="visual-brief__image" href={`/articles/${article.slug}`}><Image src={article.image} alt="" fill  sizes="180px"/><span>0{index}</span></Link><small>{article.category} · {article.region}</small><h3><Link href={`/articles/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p><Link href={`/articles/${article.slug}`}>À lire →</Link></article>}
