import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";
import { AUTH_ERROR } from "@utils/constant/user";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const isServer = typeof window === "undefined";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

const getRegExpByTokenName = (tokeName: string) => {
  return new RegExp(`(?:^|.*;\\s*)${tokeName}\\s*\\=\\s*([^;]*).*$`);
};

const getToken = async (tokeName: string) => {
  if (isServer) {
    return (await import("next/headers")).cookies().get(tokeName)?.value ?? "";
  } else {
    const matches = document.cookie.match(getRegExpByTokenName(tokeName));

    return matches?.[1] ?? "";
  }
};

api.interceptors.request.use(async (config) => {
  const token = await getToken("access-token");

  if (token) config.headers.setAuthorization(`Bearer ${token}`);

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if (status === 401 && message === AUTH_ERROR.EXPIRED_TOKEN && !originalRequest._retry) {
      originalRequest._retry = true;

      const config: AxiosRequestConfig = {
        baseURL,
        withCredentials: !isServer,
        headers: { "Content-Type": "application/json" },
      };

      if (isServer) {
        const token = await getToken("refresh-token");

        (config.headers as AxiosHeaders).cookie = `refresh-token=${token}`;
      }

      const res = await axios.post("/auth/refresh", {}, config);

      if (res.status === 201) {
        let token = "";

        if (isServer) {
          const setCookies = res.headers["set-cookie"] ?? [];

          token = setCookies?.[0].match(getRegExpByTokenName("access-token"))?.[1] ?? "";
        } else {
          token = await getToken("access-token");
        }

        if (token) originalRequest.headers.setAuthorization(`Bearer ${token}`);

        return axios(originalRequest);
      }
    }

    return Promise.reject(new Error(message ?? error));
  },
);

export default api;
