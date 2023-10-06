const isProd = process.env.NODE_ENV === "production";

const TOKEN_EXPIRED = "jwt expired";
const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
const HOST = process.env.HOST as string;
const GOOGLE_SITE_VERIFICATION = isProd ? process.env.GOOGLE_SITE_VERIFICATION : "";
const GA_TRACKING_ID = isProd ? process.env.NEXT_PUBLIC_GA_ID : "";

export { isProd, TOKEN_EXPIRED, API_URL, GOOGLE_SITE_VERIFICATION, HOST, GA_TRACKING_ID };
