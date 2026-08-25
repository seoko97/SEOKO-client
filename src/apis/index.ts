import { AUTH_ERROR } from "@utils/constant/user";

type TokenName = "access-token" | "refresh-token";
type ResponseType = "arrayBuffer" | "blob" | "formData" | "json" | "text";
type RequestOptions = RequestInit & {
  responseType?: ResponseType;
};

class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

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

const getForwardedIp = async () => {
  if (!IS_SERVER) {
    return;
  }

  const headers = await import("next/headers").then((module) => module.headers());

  return headers.get("x-forwarded-for")?.split(", ")[0];
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

const createRequestHeaders = async (initHeaders?: HeadersInit) => {
  const headers = new Headers(HEADERS_OPTIONS);

  new Headers(initHeaders).forEach((value, key) => {
    headers.set(key, value);
  });

  const forwardedIp = await getForwardedIp();

  if (forwardedIp) {
    headers.set("x-forwarded-for", forwardedIp);
    headers.set("x-real-ip", forwardedIp);
  }

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
      return res.json() as Promise<T>;
  }
};

const request = async <T = unknown>(
  path: string,
  { responseType = "json", ...options }: RequestOptions = {},
) => {
  const url = getUrl(path);
  const headers = await createRequestHeaders(options.headers);

  if (options.body instanceof FormData) {
    headers.delete("Content-Type");
  }

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const data = await res.json();

    throw new ApiError(data.message ?? res.statusText, res.status);
  }

  return getResponseBody<T>(res, responseType);
};

const authRequest = async <T = unknown>(
  path: string,
  options: RequestOptions = {},
  retry = true,
  accessToken?: string,
) => {
  const token = accessToken ?? (await getToken("access-token"));
  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  try {
    return await request<T>(path, { ...options, headers });
  } catch (error) {
    const isExpiredToken =
      error instanceof ApiError &&
      error.status === 401 &&
      error.message === AUTH_ERROR.EXPIRED_TOKEN;

    if (!retry || !isExpiredToken) {
      throw error;
    }

    const refreshedToken = await refreshAccessToken();

    if (!refreshedToken) {
      throw error;
    }

    return authRequest<T>(path, options, false, refreshedToken);
  }
};

export { request, authRequest };
