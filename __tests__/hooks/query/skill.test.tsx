import { act, renderHook, waitFor } from "@testing-library/react";

import { skillQueryKeys } from "@/utils/query/queryKeys";
import { TUpdateSkill } from "@/types/skill";
import { useDeleteSkillMutation, useUpdateSkillMutation } from "@/hooks/query/skill";
import { deleteSkill, updateSkill } from "@/apis/skill";

import { createQueryTestWrapper } from "../../utils/query";

jest.mock("@/apis/skill", () => ({
  deleteSkill: jest.fn(),
  updateSkill: jest.fn(),
}));

const mockUpdateSkill = jest.mocked(updateSkill);
const mockDeleteSkill = jest.mocked(deleteSkill);

describe("hooks/query/skill", () => {
  const id = "skill-id";

  beforeEach(() => {
    mockUpdateSkill.mockReset();
    mockDeleteSkill.mockReset();
  });

  it("수정 후 목록 query를 무효화한다", async () => {
    const { queryClient, wrapper } = createQueryTestWrapper();
    const invalidateQueries = jest.spyOn(queryClient, "invalidateQueries");
    const input: TUpdateSkill = { _id: id, name: "React" };
    mockUpdateSkill.mockResolvedValueOnce({} as never);

    const { result } = renderHook(() => useUpdateSkillMutation(id), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(input);
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockUpdateSkill).toHaveBeenCalledWith(id, input);
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: skillQueryKeys.root });
  });

  it("삭제 후 목록 query를 무효화한다", async () => {
    const { queryClient, wrapper } = createQueryTestWrapper();
    const invalidateQueries = jest.spyOn(queryClient, "invalidateQueries");
    mockDeleteSkill.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useDeleteSkillMutation(id), { wrapper });

    await act(async () => {
      await result.current.mutateAsync();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockDeleteSkill).toHaveBeenCalledWith(id);
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: skillQueryKeys.root });
  });
});
