const isProd = process.env.NODE_ENV === "production";

const TOKEN_EXPIRED = "jwt expired";
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
const HOST = process.env.HOST as string;
const GOOGLE_SITE_VERIFICATION = isProd ? process.env.GOOGLE_SITE_VERIFICATION : "";
const GA_TRACKING_ID = isProd ? process.env.NEXT_PUBLIC_GA_ID : "";
const GISCUS = {
  src: "https://giscus.app/client.js",
  crossOrigin: "anonymous",
  repo: process.env.NEXT_PUBLIC_GISUS_REPO as string,
  repoId: process.env.NEXT_PUBLIC_GISUS_REPO_ID as string,
  category: "Announcements",
  categoryId: process.env.NEXT_PUBLIC_GISUS_CATEGORY_ID as string,
  mapping: "pathname",
  strict: "0",
  reactionsEnabled: "0",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "ko",
} as const;

export { isProd, TOKEN_EXPIRED, API_URL, GOOGLE_SITE_VERIFICATION, HOST, GA_TRACKING_ID, GISCUS };
