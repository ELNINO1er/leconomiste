import Image from "next/image";
import Link from "next/link";

export function BrandLogo({className=""}:{className?:string}){
  return (
    <Link href="/" className={`brand-mark ${className}`} aria-label="L’Économiste de la Côte d’Ivoire">
      <Image src="/logo-leconomiste.png" alt="L’Économiste de la Côte d’Ivoire" width={2114} height={744}/>
    </Link>
  );
}
