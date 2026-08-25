import { getTag, getTags } from "@/apis/tag";
import { authRequest } from "@/apis";

jest.mock("@/apis", () => ({
  authRequest: jest.fn(),
}));

const mockAuthRequest = jest.mocked(authRequest);

describe("apis/tag", () => {
  const response = { result: true };

  beforeEach(() => {
    mockAuthRequest.mockReset();
  });

  it.each([
    ["태그 상세 조회", () => getTag("nextjs"), "/tags/nextjs", { method: "GET" }],
    ["태그 목록 조회", () => getTags(), "/tags", { method: "GET" }],
  ])("%s의 요청 계약과 응답값을 유지한다", async (_, execute, path, options) => {
    mockAuthRequest.mockResolvedValueOnce(response);

    await expect(execute()).resolves.toBe(response);

    expect(mockAuthRequest).toHaveBeenCalledTimes(1);
    expect(mockAuthRequest).toHaveBeenCalledWith(path, options);
  });
});
