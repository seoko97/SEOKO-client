import { AUTH_ERROR } from "@/utils/constant/user";
import { authRequest, request } from "@/apis";

import { getRequest, jsonResponse } from "../utils/api";

import "@testing-library/jest-dom";

const fetchMock = jest.fn();

describe("apis/index", () => {
  beforeAll(() => {
    Object.defineProperty(global, "fetch", {
      configurable: true,
      value: fetchMock,
      writable: true,
    });
  });

  beforeEach(() => {
    fetchMock.mockReset();
    document.cookie = "access-token=; Max-Age=0";
    document.cookie = "refresh-token=; Max-Age=0";
  });

  it("기본 JSON 헤더와 요청 옵션으로 JSON 응답을 반환한다", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ id: 1 }));

    await expect(
      request<{ id: number }>("/posts", { method: "POST", body: '{"title":"test"}' }),
    ).resolves.toEqual({
      id: 1,
    });

    const { url, init } = getRequest(fetchMock);

    expect(url.href).toBe("http://localhost:3065/api/posts");
    expect(init).toMatchObject({ method: "POST", body: '{"title":"test"}' });
    expect(new Headers(init.headers).get("Content-Type")).toBe("application/json");
  });

  it("FormData 요청에서는 Content-Type을 제거하고 텍스트 응답을 반환한다", async () => {
    const formData = new FormData();
    formData.append("image", new Blob(["image"]), "image.png");

    fetchMock.mockResolvedValueOnce(new Response("https://example.com/image.png"));

    await expect(
      request<string>("/images/post", { body: formData, responseType: "text" }),
    ).resolves.toBe("https://example.com/image.png");

    const { init } = getRequest(fetchMock);

    expect(init.body).toBe(formData);
    expect(new Headers(init.headers).has("Content-Type")).toBe(false);
  });

  it("실패 응답의 status와 message를 오류로 반환한다", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse({ message: "request failed" }, { status: 400 }));

    await expect(request("/posts")).rejects.toMatchObject({
      message: "request failed",
      status: 400,
    });
  });

  it("잘못된 path는 요청 전에 거부한다", async () => {
    await expect(request("posts")).rejects.toThrow('path must start with a single "/": posts');

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("access token을 Authorization 헤더에 포함한다", async () => {
    document.cookie = "access-token=current-token";
    fetchMock.mockResolvedValueOnce(jsonResponse({ id: 1 }));

    await authRequest("/users");

    const { init } = getRequest(fetchMock);

    expect(new Headers(init.headers).get("Authorization")).toBe("Bearer current-token");
  });

  it("만료된 access token은 refresh 후 한 번만 재시도한다", async () => {
    document.cookie = "access-token=expired-token";

    fetchMock
      .mockResolvedValueOnce(jsonResponse({ message: AUTH_ERROR.EXPIRED_TOKEN }, { status: 401 }))
      .mockImplementationOnce(() => {
        document.cookie = "access-token=refreshed-token";

        return Promise.resolve(new Response(null, { status: 201 }));
      })
      .mockResolvedValueOnce(jsonResponse({ id: 1 }));

    await expect(authRequest<{ id: number }>("/users")).resolves.toEqual({ id: 1 });

    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(getRequest(fetchMock, 1).url.href).toBe("http://localhost:3065/api/auth/refresh");
    expect(getRequest(fetchMock, 1).init).toMatchObject({
      method: "POST",
      credentials: "include",
      body: "{}",
    });
    expect(new Headers(getRequest(fetchMock, 2).init.headers).get("Authorization")).toBe(
      "Bearer refreshed-token",
    );
  });

  it("refresh에 실패하면 최초 인증 오류를 반환하고 재시도하지 않는다", async () => {
    document.cookie = "access-token=expired-token";
    fetchMock
      .mockResolvedValueOnce(jsonResponse({ message: AUTH_ERROR.EXPIRED_TOKEN }, { status: 401 }))
      .mockResolvedValueOnce(new Response(null, { status: 401 }));

    await expect(authRequest("/users")).rejects.toMatchObject({
      message: AUTH_ERROR.EXPIRED_TOKEN,
      status: 401,
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
