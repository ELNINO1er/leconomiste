import type {Metadata,Viewport} from "next";
import "./globals.css";
import "./daily.css";
import {SiteFooter} from "./components/SiteFooter";
import {SiteTools} from "./SiteTools";

// Pas de `dynamic = "force-dynamic"` ici, volontairement : posé sur la mise en
// page racine, il s'impose à *toutes* les pages et annule les durées de cache
// que chacune déclare. L'API repasserait alors à chaque visite, page d'accueil
// comprise. Chaque page fixe désormais sa propre fraîcheur (`revalidate`), et
// celles qui lisent des paramètres d'URL — l'explorateur, l'agenda — deviennent
// dynamiques d'elles-mêmes, sans qu'on ait à le déclarer.
const base="https://leconomistedelacotedivoire.com";
export const metadata:Metadata={
 metadataBase:new URL(base),
 applicationName:"L’Économiste de la Côte d’Ivoire",
 title:{default:"L’Économiste de la Côte d’Ivoire — Le quotidien des décideurs",template:"%s | L’Économiste de la Côte d’Ivoire"},
 description:"Le quotidien ivoirien de référence pour comprendre l’économie, les entreprises, les politiques publiques et les transformations de la Côte d’Ivoire.",
 keywords:["quotidien ivoirien","actualité Côte d’Ivoire","économie ivoirienne","Abidjan","BRVM","cacao Côte d’Ivoire","entreprises ivoiriennes","événements Côte d’Ivoire"],
 authors:[{name:"La rédaction de L’Économiste de la Côte d’Ivoire"}],creator:"L’Économiste de la Côte d’Ivoire",publisher:"L’Économiste de la Côte d’Ivoire",
 alternates:{canonical:base,languages:{"fr-CI":base,"x-default":base}},
 openGraph:{type:"website",locale:"fr_CI",url:base,siteName:"L’Économiste de la Côte d’Ivoire",title:"L’Économiste — Le quotidien des décideurs",description:"L’actualité économique et financière qui éclaire les décisions en Côte d’Ivoire.",images:[{url:"/og-daily.png",width:1536,height:1024,alt:"L’Économiste — Le quotidien des décideurs"}]},
 twitter:{card:"summary_large_image",title:"L’Économiste — Le quotidien des décideurs",description:"L’information ivoirienne qui éclaire vos décisions.",images:["/og-daily.png"]},
 robots:{index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1,"max-video-preview":-1}},icons:{icon:[{url:"/icon.svg",type:"image/svg+xml",sizes:"any"}]},manifest:"/manifest.webmanifest",category:"Actualités",referrer:"origin-when-cross-origin",formatDetection:{telephone:false,email:false,address:false},other:{"geo.region":"CI-AB","geo.placename":"Abidjan","content-language":"fr-CI"}
};

/**
 * Colore la barre d'adresse d'Android au rouge du journal, et laisse la page
 * s'étendre sous l'encoche des téléphones récents.
 */
export const viewport:Viewport={
  themeColor:"#c4001d",
  colorScheme:"light",
  viewportFit:"cover",
};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr-CI"><body suppressHydrationWarning>{children}<SiteFooter/><SiteTools/></body></html>}
