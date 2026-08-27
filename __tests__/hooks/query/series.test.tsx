import { act, renderHook, waitFor } from "@testing-library/react";

import { seriesQueryKeys } from "@/utils/query/queryKeys";
import { ISeries } from "@/types";
import { useDeleteSeriesMutation, useUpdateSeriesMutation } from "@/hooks/query/series";
import { deleteSeries, updateSeries } from "@/apis/series";

import { createQueryTestWrapper } from "../../utils/query";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/apis/series", () => ({
  deleteSeries: jest.fn(),
  updateSeries: jest.fn(),
}));

const mockUpdateSeries = jest.mocked(updateSeries);
const mockDeleteSeries = jest.mocked(deleteSeries);
const mockPush = jest.fn();

describe("hooks/query/series", () => {
  const nid = 1;
  const series: ISeries = {
    _id: "series-id",
    nid,
    createdAt: "2026-08-27T00:00:00.000Z",
    updatedAt: "2026-08-27T00:00:00.000Z",
    name: "테스트 시리즈",
    thumbnail: "",
    posts: [],
    postCount: 0,
  };

  beforeEach(() => {
    mockUpdateSeries.mockReset();
    mockDeleteSeries.mockReset();
    mockPush.mockReset();
  });

  it("수정 후 상세와 목록 query를 무효화한다", async () => {
    const { queryClient, wrapper } = createQueryTestWrapper();
    const invalidateQueries = jest.spyOn(queryClient, "invalidateQueries");
    const input = { name: "수정된 시리즈", thumbnail: "new-thumbnail" };
    mockUpdateSeries.mockResolvedValueOnce(series);

    const { result } = renderHook(() => useUpdateSeriesMutation(nid), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(input);
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockUpdateSeries).toHaveBeenCalledWith(nid, input);
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: seriesQueryKeys.detail(nid) });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: seriesQueryKeys.root });
  });

  it("삭제 후 상세 캐시를 제거하고 관련 query를 무효화한다", async () => {
    const { queryClient, wrapper } = createQueryTestWrapper();
    const removeQueries = jest.spyOn(queryClient, "removeQueries");
    const invalidateQueries = jest.spyOn(queryClient, "invalidateQueries");
    mockDeleteSeries.mockResolvedValueOnce(series);

    const { result } = renderHook(() => useDeleteSeriesMutation(nid), { wrapper });

    await act(async () => {
      await result.current.mutateAsync();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockDeleteSeries).toHaveBeenCalledWith(nid);
    expect(removeQueries).toHaveBeenCalledWith({ queryKey: seriesQueryKeys.detail(nid) });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: seriesQueryKeys.detail(nid) });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: seriesQueryKeys.root });
    expect(mockPush).toHaveBeenCalledWith("/series");
  });
});
