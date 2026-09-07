import { AUTH_ERROR } from "@utils/constant/user";
import { RequestOptions } from "@utils/api/types";
import {
  appendForwardedIp,
  createRequestHeaders,
  getErrorMessage,
  getResponseBody,
  getToken,
  getUrl,
  refreshAccessToken,
} from "@utils/api";

class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}

const request = async <T = unknown>(
  path: string,
  { responseType = "json", forwardClientIp = false, ...options }: RequestOptions = {},
) => {
  const url = getUrl(path);
  const headers = createRequestHeaders(options.headers);

  if (forwardClientIp) {
    await appendForwardedIp(headers);
  }

  if (options.body instanceof FormData) {
    headers.delete("Content-Type");
  }

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const message = await getErrorMessage(res);

    throw new ApiError(message, res.status);
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

export { request, authRequest, ApiError };
