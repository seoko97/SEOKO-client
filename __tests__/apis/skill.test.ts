import { ESkillType } from "@/types/skill";
import { createSkill, deleteSkill, getSkills, updateSkill } from "@/apis/skill";
import { authRequest } from "@/apis";

jest.mock("@/apis", () => ({
  authRequest: jest.fn(),
}));

const mockAuthRequest = jest.mocked(authRequest);

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
  });

  it.each([
    ["기술 목록 조회", () => getSkills(), "/skills", { method: "GET" }],
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
  ])("%s의 요청 계약과 응답값을 유지한다", async (_, execute, path, options) => {
    mockAuthRequest.mockResolvedValueOnce(response);

    await expect(execute()).resolves.toBe(response);

    expect(mockAuthRequest).toHaveBeenCalledTimes(1);
    expect(mockAuthRequest).toHaveBeenCalledWith(path, options);
  });
});
