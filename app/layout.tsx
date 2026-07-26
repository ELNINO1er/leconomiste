import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
import { SiteTools } from "./SiteTools";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "leconomisteb.com";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const origin = `${protocol}://${host}`;

  return {
  metadataBase: new URL(origin),
  title: {
    default: "L’Économisteb — L’information qui éclaire vos décisions",
    template: "%s | L’Économisteb",
  },
  description:
    "Actualités, analyses et décryptages sur l’économie, la finance, le business et les transformations de l’Afrique.",
  keywords: [
    "actualité économique",
    "Afrique",
    "Côte d’Ivoire",
    "finance",
    "business",
    "économie",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "L’Économisteb",
    title: "L’Économisteb — L’information qui éclaire vos décisions",
    description:
      "Le média international de référence pour comprendre l’économie et les transformations de l’Afrique.",
    images: [{ url: `${origin}/og.png`, width: 1732, height: 908 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "L’Économisteb",
    description: "L’information qui éclaire vos décisions.",
    images: [`${origin}/og.png`],
  },
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}<SiteTools /></body>
    </html>
  );
}
