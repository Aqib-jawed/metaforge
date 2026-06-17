export interface MetaData {
  title: string;
  description: string;
  url: string;
  siteName: string;
  ogImage: string;
  twitterHandle: string;
  pageType: "website" | "article" | "product";
  index: boolean;
  follow: boolean;
}

export const defaultMetaData: MetaData = {
  title: "MetaForge — The Ultimate Meta Tag Tool",
  description:
    "Generate perfect HTML meta tags, Open Graph, and Twitter Card tags with live previews. Built for developers and marketers who care about SEO.",
  url: "https://metaforge.dev/",
  siteName: "MetaForge",
  ogImage: "",
  twitterHandle: "@metaforge",
  pageType: "website",
  index: true,
  follow: true,
};
