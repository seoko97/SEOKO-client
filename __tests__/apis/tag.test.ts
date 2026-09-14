import { CACHE_TAG } from "@/utils/constant/cacheTag";
import { getTag, getTags } from "@/apis/tag";
import { request } from "@/apis";

jest.mock("@/apis", () => ({
  request: jest.fn(),
}));

const mockRequest = jest.mocked(request);

describe("apis/tag", () => {
  const response = { result: true };

  beforeEach(() => {
    mockRequest.mockReset();
  });

  it.each([
    [
      "태그 상세 조회",
      () => getTag("next/js #1"),
      "/tags/next%2Fjs%20%231",
      { method: "GET", next: { revalidate: 3600, tags: [CACHE_TAG.tags] } },
    ],
    [
      "태그 목록 조회",
      () => getTags(),
      "/tags",
      { method: "GET", next: { revalidate: 3600, tags: [CACHE_TAG.tags] } },
    ],
  ])("%s의 요청 계약과 응답값을 유지한다", async (_, execute, path, options) => {
    mockRequest.mockResolvedValueOnce(response);

    await expect(execute()).resolves.toBe(response);

    expect(mockRequest).toHaveBeenCalledTimes(1);
    expect(mockRequest).toHaveBeenCalledWith(path, options);
  });
});
