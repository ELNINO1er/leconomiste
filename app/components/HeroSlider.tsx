"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Article } from "../../lib/article-view";

export function HeroSlider({ items }: { items: Article[] }) {
  const [index, setIndex] = useState(0);
  const active = items[index];

  useEffect(() => {
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % items.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, [items.length]);

  if (!active) return null;

  return (
    <section className="hero-slider" aria-roledescription="carousel" aria-label="À la une">
      <div className="hero-slider__media" key={active.slug}>
        <Image
          src={active.image}
          alt={`Illustration : ${active.title}`}
          fill
          priority={index === 0} 
          sizes="(max-width: 1200px) 100vw, 1180px"
        />
        <div className="hero-slider__shade" />
      </div>

      <div className="hero-slider__copy" aria-live="polite">
        <div className="hero-slider__eyebrow">
          <span>{active.category}</span>
          <span>{active.region}</span>
          <b>{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</b>
        </div>
        <h2><Link href={`/articles/${active.slug}`}>{active.title}</Link></h2>
        <p>{active.excerpt}</p>
        <div className="hero-slider__meta">
          <strong>Par {active.author}</strong>
          <span>{active.readTime} de lecture</span>
        </div>
        <Link className="hero-slider__cta" href={`/articles/${active.slug}`}>Lire l’article ↗</Link>
      </div>

      <div className="hero-slider__controls">
        <button onClick={() => setIndex((current) => (current - 1 + items.length) % items.length)} aria-label="Article précédent">←</button>
        <div>
          {items.map((item, itemIndex) => (
            <button
              key={item.slug}
              onClick={() => setIndex(itemIndex)}
              className={itemIndex === index ? "active" : ""}
              aria-label={`Afficher ${item.title}`}
              aria-current={itemIndex === index ? "true" : undefined}
            >
              <span>{String(itemIndex + 1).padStart(2, "0")}</span><i />
            </button>
          ))}
        </div>
        <button onClick={() => setIndex((current) => (current + 1) % items.length)} aria-label="Article suivant">→</button>
      </div>
    </section>
  );
}
