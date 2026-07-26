import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/administration/"] },
    sitemap: "https://leconomisteb.com/sitemap.xml",
  };
}
