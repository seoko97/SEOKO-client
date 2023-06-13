const isProd = process.env.NODE_ENV === "production";

const TOKEN_EXPIRED = "jwt expired";
const API_URL = process.env.API_URL as string;
const HOST = process.env.HOST as string;
const GOOGLE_SITE_VERIFICATION = isProd ? process.env.GOOGLE_SITE_VERIFICATION : "";

export { TOKEN_EXPIRED, API_URL, isProd, GOOGLE_SITE_VERIFICATION, HOST };
