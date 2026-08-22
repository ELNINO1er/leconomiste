import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import test from "node:test";

test("positionne le média sur la Côte d’Ivoire",async()=>{
  const [home,layout,config]=await Promise.all([
    readFile(new URL("../app/page.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/layout.tsx",import.meta.url),"utf8"),
    readFile(new URL("../lib/site-config.ts",import.meta.url),"utf8"),
  ]);
  assert.match(home,/Côte d’Ivoire/);
  assert.match(layout,/leconomistedelacotedivoire\.com/);
  assert.match(config,/Abidjan/);
  assert.doesNotMatch(home,/Sélectionner un pays/);
});

test("expose un SEO éditorial et des articles individuels",async()=>{
  const [sitemap,article]=await Promise.all([
    readFile(new URL("../app/sitemap.ts",import.meta.url),"utf8"),
    readFile(new URL("../app/articles/[slug]/page.tsx",import.meta.url),"utf8"),
  ]);
  assert.match(sitemap,/entrees\.map/);
  assert.match(article,/generateMetadata/);
  assert.match(article,/generateStaticParams/);
});

test("ne sert plus de données éditoriales de démonstration",async()=>{
  const [sport,tv,services]=await Promise.all([
    readFile(new URL("../app/sport/page.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/tv/page.tsx",import.meta.url),"utf8"),
    readFile(new URL("../app/services/page.tsx",import.meta.url),"utf8"),
  ]);
  assert.doesNotMatch(`${sport}${tv}${services}`,/mock-data|DIFFUSION MOCK|sportResults|tvSchedule/);
});
