import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "@/apis/project";
import { authRequest } from "@/apis";

jest.mock("@/apis", () => ({
  authRequest: jest.fn(),
}));

const mockAuthRequest = jest.mocked(authRequest);

describe("apis/project", () => {
  const input = {
    title: "SEOKO",
    description: "블로그 프로젝트",
    content: "프로젝트 소개",
    thumbnail: "thumbnail.png",
    github: "https://github.com/seoko97/SEOKO-client",
    page: null,
    start: "2024-01-01",
    end: null,
  };
  const response = { result: true };

  beforeEach(() => {
    mockAuthRequest.mockReset();
  });

  it.each([
    ["프로젝트 상세 조회", () => getProject(1), "/projects/1", { method: "GET" }],
    ["프로젝트 목록 조회", () => getProjects(), "/projects", { method: "GET" }],
    [
      "프로젝트 생성",
      () => createProject(input),
      "/projects",
      { method: "POST", body: JSON.stringify(input) },
    ],
    [
      "프로젝트 수정",
      () => updateProject(1, input),
      "/projects/1",
      { method: "PUT", body: JSON.stringify(input) },
    ],
    ["프로젝트 삭제", () => deleteProject(1), "/projects/1", { method: "DELETE" }],
  ])("%s의 요청 계약과 응답값을 유지한다", async (_, execute, path, options) => {
    mockAuthRequest.mockResolvedValueOnce(response);

    await expect(execute()).resolves.toBe(response);

    expect(mockAuthRequest).toHaveBeenCalledTimes(1);
    expect(mockAuthRequest).toHaveBeenCalledWith(path, options);
  });
});
