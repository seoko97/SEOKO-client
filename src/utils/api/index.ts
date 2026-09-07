import { ResponseType, TokenName } from "@utils/api/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const IS_SERVER = typeof window === "undefined";
const HEADERS_OPTIONS: HeadersInit = {
  "Content-Type": "application/json",
};

const getUrl = (path: string) => {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  if (!/^\/(?!\/)/.test(path)) {
    throw new Error(`path must start with a single "/": ${path}`);
  }

  return new URL(`${BASE_URL}${path}`);
};

const getCookieValueFromSetCookie = (setCookie: string, name: TokenName) => {
  const [cookie] = setCookie.split(";");
  const prefix = `${name}=`;

  if (!cookie.startsWith(prefix)) {
    return;
  }

  return cookie.slice(prefix.length);
};

const getCookieValue = (cookieHeader: string, name: TokenName) => {
  const prefix = `${name}=`;

  return cookieHeader
    .split("; ")
    .find((cookie) => cookie.startsWith(prefix))
    ?.slice(prefix.length);
};

const getClientToken = (name: TokenName) => {
  return getCookieValue(document.cookie, name);
};

const getServerToken = async (name: TokenName) => {
  const cookies = await import("next/headers").then((module) => module.cookies());

  return cookies.get(name)?.value;
};

const getToken = (name: TokenName) => {
  if (!IS_SERVER) {
    return getClientToken(name);
  }

  return Promise.resolve(getServerToken(name));
};

const createRequestHeaders = (initHeaders?: HeadersInit) => {
  const headers = new Headers(HEADERS_OPTIONS);

  new Headers(initHeaders).forEach((value, key) => {
    headers.set(key, value);
  });

  return headers;
};

const refreshAccessToken = async () => {
  const headers = new Headers(HEADERS_OPTIONS);

  if (IS_SERVER) {
    const refreshToken = await getToken("refresh-token");

    if (!refreshToken) {
      return;
    }

    headers.set("Cookie", `refresh-token=${refreshToken}`);
  }

  const url = getUrl("/auth/refresh");

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({}),
    credentials: IS_SERVER ? undefined : "include",
  });

  if (res.status !== 201) {
    return;
  }

  if (!IS_SERVER) {
    return getToken("access-token");
  }

  const setCookie = res.headers.get("set-cookie");

  return setCookie ? getCookieValueFromSetCookie(setCookie, "access-token") : undefined;
};

const getErrorMessage = async (res: Response) => {
  const fallbackMessage = res.statusText || `Request failed with status ${res.status}`;

  try {
    const data = (await res.json()) as { message?: unknown };

    return typeof data.message === "string" ? data.message : fallbackMessage;
  } catch {
    return fallbackMessage;
  }
};

const getJsonResponseBody = async <T>(res: Response) => {
  const body = await res.text();

  if (!body) {
    return undefined as T;
  }

  return JSON.parse(body) as T;
};

const getResponseBody = <T>(res: Response, responseType: ResponseType) => {
  switch (responseType) {
    case "arrayBuffer":
      return res.arrayBuffer() as Promise<T>;
    case "blob":
      return res.blob() as Promise<T>;
    case "formData":
      return res.formData() as Promise<T>;
    case "text":
      return res.text() as Promise<T>;
    default:
      return getJsonResponseBody<T>(res);
  }
};

const appendForwardedIp = async (headers: Headers) => {
  if (!IS_SERVER) return;

  const requestHeaders = await import("next/headers").then((module) => module.headers());

  const forwardedIp = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();

  if (!forwardedIp) return;

  headers.set("x-forwarded-for", forwardedIp);
  headers.set("x-real-ip", forwardedIp);
};

export {
  appendForwardedIp,
  createRequestHeaders,
  getErrorMessage,
  getResponseBody,
  getToken,
  getUrl,
  refreshAccessToken,
};
