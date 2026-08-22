export type Article={
  slug:string;
  title:string;
  excerpt:string;
  category:string;
  region:string;
  author:string;
  date:string;
  readTime:string;
  image:string;
  featured?:boolean;
  views:number;
  body:string[];
};
