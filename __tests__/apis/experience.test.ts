import {
  createExperience,
  deleteExperience,
  getExperiences,
  updateExperience,
} from "@/apis/experience";
import { authRequest, request } from "@/apis";

jest.mock("@/apis", () => ({
  authRequest: jest.fn(),
  request: jest.fn(),
}));

const mockAuthRequest = jest.mocked(authRequest);
const mockRequest = jest.mocked(request);

describe("apis/experience", () => {
  const createInput = {
    title: "Frontend Developer",
    description: "웹 클라이언트 개발",
    start: "2024-01-01",
    end: null,
  };
  const updateInput = { _id: "experience-id", title: "Senior Frontend Developer" };
  const response = { result: true };

  beforeEach(() => {
    mockAuthRequest.mockReset();
    mockRequest.mockReset();
  });

  it("경력 목록을 재검증 가능한 공개 요청으로 조회한다", async () => {
    mockRequest.mockResolvedValueOnce(response);

    await expect(getExperiences()).resolves.toBe(response);

    expect(mockRequest).toHaveBeenCalledTimes(1);
    expect(mockRequest).toHaveBeenCalledWith("/experiences", {
      method: "GET",
      next: { revalidate: 3600 },
    });
  });

  it.each([
    [
      "경력 생성",
      () => createExperience(createInput),
      "/experiences",
      { method: "POST", body: JSON.stringify(createInput) },
    ],
    [
      "경력 수정",
      () => updateExperience("experience-id", updateInput),
      "/experiences/experience-id",
      { method: "PUT", body: JSON.stringify(updateInput) },
    ],
    [
      "경력 삭제",
      () => deleteExperience("experience-id"),
      "/experiences/experience-id",
      { method: "DELETE" },
    ],
  ])("%s의 인증 요청 계약과 응답값을 유지한다", async (_, execute, path, options) => {
    mockAuthRequest.mockResolvedValueOnce(response);

    await expect(execute()).resolves.toBe(response);

    expect(mockAuthRequest).toHaveBeenCalledTimes(1);
    expect(mockAuthRequest).toHaveBeenCalledWith(path, options);
  });
});
