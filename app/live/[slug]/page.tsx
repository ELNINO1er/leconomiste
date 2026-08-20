"use client";
import Image from "next/image";
import Link from "next/link";
import {useParams} from "next/navigation";
import {useEffect,useState} from "react";
import {Header} from "../../components/Header";
import {getLiveBlog} from "../../../lib/mock-data";

export default function LiveBlogPage(){
  const params=useParams<{slug:string}>();
  const slug=Array.isArray(params.slug)?params.slug[0]:params.slug;
  const blog=getLiveBlog(slug);
  const [now,setNow]=useState("");

  useEffect(()=>{
    const tick=()=>setNow(new Date().toLocaleTimeString("fr-FR"));
    tick();
    const t=window.setInterval(tick,1000);
    return ()=>window.clearInterval(t);
  },[]);

  if(!blog)return (
    <main className="liveblog-page"><Header/>
      <section className="liveblog-hero"><div className="shell"><h1>Direct introuvable</h1><Link href="/en-direct" className="liveblog-back">← Retour au direct</Link></div></section>
    </main>
  );

  return (
    <main className="liveblog-page"><Header/>
      <section className="liveblog-hero"><div className="shell">
        <span className="live-badge"><i/> {blog.status}</span>
        {blog.kind==="match"&&(
          <div className="liveblog-score">
            <div><span>{blog.home}</span></div>
            <strong>{blog.score}</strong>
            <div><span>{blog.away}</span></div>
          </div>
        )}
        <h1>{blog.title}</h1>
        <p>{blog.subtitle}</p>
        <small className="live-updated">Suivi en continu{now&&` · à jour à ${now}`}</small>
      </div></section>

      <section className="shell liveblog-feed">
        <ol>
          {blog.updates.map((u,i)=>(
            <li key={i} className={`liveblog-item ${u.kind==="goal"?"is-goal":""} ${u.kind==="quote"?"is-quote":""}`}>
              <div className="liveblog-item__time"><time>{u.time}</time>{u.kind==="goal"&&<b>BUT</b>}</div>
              <div className="liveblog-item__body">
                <span className="liveblog-item__author">{u.author}</span>
                <p>{u.text}</p>
                {u.image&&<figure className="liveblog-item__media"><Image src={u.image} alt="" width={640} height={380} /></figure>}
              </div>
            </li>
          ))}
        </ol>
        <Link href="/en-direct" className="liveblog-back">← Tout le direct</Link>
      </section>
    </main>
  );
}
