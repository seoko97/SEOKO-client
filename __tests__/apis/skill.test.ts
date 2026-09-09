import { ESkillType } from "@/types/skill";
import { createSkill, deleteSkill, getSkills, updateSkill } from "@/apis/skill";
import { authRequest, request } from "@/apis";

jest.mock("@/apis", () => ({
  authRequest: jest.fn(),
  request: jest.fn(),
}));

const mockAuthRequest = jest.mocked(authRequest);
const mockRequest = jest.mocked(request);

describe("apis/skill", () => {
  const createInput = {
    name: "TypeScript",
    type: ESkillType.LANGUAGE,
    description: "타입스크립트",
    icon: "typescript.svg",
  };
  const updateInput = { _id: "skill-id", description: "수정된 설명" };
  const response = { result: true };

  beforeEach(() => {
    mockAuthRequest.mockReset();
    mockRequest.mockReset();
  });

  it("기술 목록을 재검증 가능한 공개 요청으로 조회한다", async () => {
    mockRequest.mockResolvedValueOnce(response);

    await expect(getSkills()).resolves.toBe(response);

    expect(mockRequest).toHaveBeenCalledTimes(1);
    expect(mockRequest).toHaveBeenCalledWith("/skills", {
      method: "GET",
      next: { revalidate: 3600 },
    });
  });

  it.each([
    [
      "기술 생성",
      () => createSkill(createInput),
      "/skills",
      { method: "POST", body: JSON.stringify(createInput) },
    ],
    [
      "기술 수정",
      () => updateSkill("skill-id", updateInput),
      "/skills/skill-id",
      { method: "PUT", body: JSON.stringify(updateInput) },
    ],
    ["기술 삭제", () => deleteSkill("skill-id"), "/skills/skill-id", { method: "DELETE" }],
  ])("%s의 인증 요청 계약과 응답값을 유지한다", async (_, execute, path, options) => {
    mockAuthRequest.mockResolvedValueOnce(response);

    await expect(execute()).resolves.toBe(response);

    expect(mockAuthRequest).toHaveBeenCalledTimes(1);
    expect(mockAuthRequest).toHaveBeenCalledWith(path, options);
  });
});
