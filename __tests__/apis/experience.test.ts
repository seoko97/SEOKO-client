import {
  createExperience,
  deleteExperience,
  getExperiences,
  updateExperience,
} from "@/apis/experience";
import { authRequest } from "@/apis";

jest.mock("@/apis", () => ({
  authRequest: jest.fn(),
}));

const mockAuthRequest = jest.mocked(authRequest);

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
  });

  it.each([
    ["경력 목록 조회", () => getExperiences(), "/experiences", { method: "GET" }],
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
  ])("%s의 요청 계약과 응답값을 유지한다", async (_, execute, path, options) => {
    mockAuthRequest.mockResolvedValueOnce(response);

    await expect(execute()).resolves.toBe(response);

    expect(mockAuthRequest).toHaveBeenCalledTimes(1);
    expect(mockAuthRequest).toHaveBeenCalledWith(path, options);
  });
});
