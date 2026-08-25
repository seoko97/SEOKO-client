/**
 * @jest-environment node
 */

import { AUTH_ERROR } from "@/utils/constant/user";

import { authRequest } from "@/apis";

import { getRequest, jsonResponse } from "../utils/api";

const mockCookies = jest.fn();
const mockHeaders = jest.fn();
const fetchMock = jest.fn();

jest.mock("next/headers", () => ({
  cookies: mockCookies,
  headers: mockHeaders,
}));

const setTokens = (tokens: Partial<Record<"access-token" | "refresh-token", string>>) => {
  mockCookies.mockResolvedValue({
    get: (name: keyof typeof tokens) => {
      const value = tokens[name];

      return value ? { value } : undefined;
    },
  });
};

describe("apis/index server", () => {
  beforeAll(() => {
    Object.defineProperty(global, "fetch", {
      configurable: true,
      value: fetchMock,
      writable: true,
    });
  });

  beforeEach(() => {
    fetchMock.mockReset();
    mockCookies.mockReset();
    mockHeaders.mockResolvedValue(new Headers({ "x-forwarded-for": "203.0.113.10, 10.0.0.1" }));
  });

  it("서버 cookie의 access token과 요청 IP를 전달한다", async () => {
    setTokens({ "access-token": "server-access-token" });
    fetchMock.mockResolvedValueOnce(jsonResponse({ id: 1 }));

    await expect(authRequest<{ id: number }>("/users")).resolves.toEqual({ id: 1 });

    const { url, init } = getRequest(fetchMock);
    const headers = new Headers(init.headers);

    expect(url.href).toBe("http://localhost:3065/api/users");
    expect(headers.get("Authorization")).toBe("Bearer server-access-token");
    expect(headers.get("x-forwarded-for")).toBe("203.0.113.10");
    expect(headers.get("x-real-ip")).toBe("203.0.113.10");
  });

  it("만료된 토큰은 refresh cookie와 Set-Cookie의 새 token으로 한 번 재시도한다", async () => {
    setTokens({
      "access-token": "expired-token",
      "refresh-token": "server-refresh-token",
    });
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ message: AUTH_ERROR.EXPIRED_TOKEN }, { status: 401 }))
      .mockResolvedValueOnce(
        new Response(null, {
          headers: { "set-cookie": "access-token=refreshed-token; Path=/; HttpOnly" },
          status: 201,
        }),
      )
      .mockResolvedValueOnce(jsonResponse({ id: 1 }));

    await expect(authRequest<{ id: number }>("/users")).resolves.toEqual({ id: 1 });

    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(getRequest(fetchMock, 1).url.href).toBe("http://localhost:3065/api/auth/refresh");
    expect(new Headers(getRequest(fetchMock, 1).init.headers).get("Cookie")).toBe(
      "refresh-token=server-refresh-token",
    );
    expect(new Headers(getRequest(fetchMock, 2).init.headers).get("Authorization")).toBe(
      "Bearer refreshed-token",
    );
  });

  it("refresh token이 없으면 refresh 요청 없이 최초 인증 오류를 반환한다", async () => {
    setTokens({ "access-token": "expired-token" });
    fetchMock.mockResolvedValueOnce(
      jsonResponse({ message: AUTH_ERROR.EXPIRED_TOKEN }, { status: 401 }),
    );

    await expect(authRequest("/users")).rejects.toMatchObject({
      message: AUTH_ERROR.EXPIRED_TOKEN,
      status: 401,
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
