"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Article } from "../../lib/article-view";

export function RelatedCarousel({ items }: { items: Article[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = items[index];

  useEffect(() => {
    if (paused || items.length < 2) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % items.length),
      5500,
    );
    return () => window.clearInterval(timer);
  }, [items.length, paused]);

  if (!active) return null;
  const move = (direction: number) => setIndex((current) => (current + direction + items.length) % items.length);

  return (
    <section
      className="related-carousel"
      aria-roledescription="carousel"
      aria-label="Articles à découvrir"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="related-carousel__stage" key={active.slug}>
        <Link className="related-carousel__image" href={`/articles/${active.slug}`}>
          <Image src={active.image} alt={`Illustration : ${active.title}`} fill  sizes="(max-width: 800px) 100vw, 58vw" />
        </Link>
        <div className="related-carousel__content" aria-live="polite">
          <div className="related-carousel__count">{String(index + 1).padStart(2, "0")} <span>/ {String(items.length).padStart(2, "0")}</span></div>
          <small>{active.category} · {active.region}</small>
          <h3><Link href={`/articles/${active.slug}`}>{active.title}</Link></h3>
          <p>{active.excerpt}</p>
          <div className="related-carousel__meta"><span>Par {active.author}</span><span>{active.readTime} de lecture</span></div>
          <Link className="related-carousel__link" href={`/articles/${active.slug}`}>Lire cet article ↗</Link>
        </div>
      </div>

      <div className="related-carousel__nav">
        <button onClick={() => move(-1)} aria-label="Article précédent">←</button>
        <div>
          {items.map((item, itemIndex) => (
            <button
              key={item.slug}
              className={itemIndex === index ? "active" : ""}
              onClick={() => setIndex(itemIndex)}
              aria-label={`Afficher ${item.title}`}
              aria-current={itemIndex === index ? "true" : undefined}
            >
              <span>{String(itemIndex + 1).padStart(2, "0")}</span>
              <i />
            </button>
          ))}
        </div>
        <button onClick={() => move(1)} aria-label="Article suivant">→</button>
      </div>
    </section>
  );
}
