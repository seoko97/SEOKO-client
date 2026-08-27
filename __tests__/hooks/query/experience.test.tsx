import { act, renderHook, waitFor } from "@testing-library/react";

import { experienceQueryKeys } from "@/utils/query/queryKeys";
import { IUpdateExperience } from "@/types/experience";
import { useDeleteExperienceMutation, useUpdateExperienceMutation } from "@/hooks/query/experience";
import { deleteExperience, updateExperience } from "@/apis/experience";

import { createQueryTestWrapper } from "../../utils/query";

jest.mock("@/apis/experience", () => ({
  deleteExperience: jest.fn(),
  updateExperience: jest.fn(),
}));

const mockUpdateExperience = jest.mocked(updateExperience);
const mockDeleteExperience = jest.mocked(deleteExperience);

describe("hooks/query/experience", () => {
  const id = "experience-id";

  beforeEach(() => {
    mockUpdateExperience.mockReset();
    mockDeleteExperience.mockReset();
  });

  it("수정 후 목록 query를 무효화한다", async () => {
    const { queryClient, wrapper } = createQueryTestWrapper();
    const invalidateQueries = jest.spyOn(queryClient, "invalidateQueries");
    const input: IUpdateExperience = { _id: id, title: "시니어 프론트엔드 개발자" };
    mockUpdateExperience.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useUpdateExperienceMutation(id), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(input);
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockUpdateExperience).toHaveBeenCalledWith(id, input);
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: experienceQueryKeys.root });
  });

  it("삭제 후 목록 query를 무효화한다", async () => {
    const { queryClient, wrapper } = createQueryTestWrapper();
    const invalidateQueries = jest.spyOn(queryClient, "invalidateQueries");
    mockDeleteExperience.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useDeleteExperienceMutation(id), { wrapper });

    await act(async () => {
      await result.current.mutateAsync();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockDeleteExperience).toHaveBeenCalledWith(id);
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: experienceQueryKeys.root });
  });
});
