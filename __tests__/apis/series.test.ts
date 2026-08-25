import { deleteSeries, getSeries, getSeriesAll, updateSeries } from "@/apis/series";
import { authRequest } from "@/apis";

jest.mock("@/apis", () => ({
  authRequest: jest.fn(),
}));

const mockAuthRequest = jest.mocked(authRequest);

describe("apis/series", () => {
  const input = { name: "Next.js", thumbnail: "next.png" };
  const response = { result: true };

  beforeEach(() => {
    mockAuthRequest.mockReset();
  });

  it.each([
    ["시리즈 목록 조회", () => getSeriesAll(), "/series", { method: "GET" }],
    ["시리즈 상세 조회", () => getSeries(1), "/series/1", { method: "GET" }],
    [
      "시리즈 수정",
      () => updateSeries(1, input),
      "/series/1",
      { method: "PUT", body: JSON.stringify(input) },
    ],
    ["시리즈 삭제", () => deleteSeries(1), "/series/1", { method: "DELETE" }],
  ])("%s의 요청 계약과 응답값을 유지한다", async (_, execute, path, options) => {
    mockAuthRequest.mockResolvedValueOnce(response);

    await expect(execute()).resolves.toBe(response);

    expect(mockAuthRequest).toHaveBeenCalledTimes(1);
    expect(mockAuthRequest).toHaveBeenCalledWith(path, options);
  });
});
