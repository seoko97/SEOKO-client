import { act, renderHook, waitFor } from "@testing-library/react";

import { projectQueryKeys } from "@/utils/query/queryKeys";
import { IProjectInput, TProject } from "@/types";
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} from "@/hooks/query/project";
import { createProject, deleteProject, updateProject } from "@/apis/project";

import { createQueryTestWrapper } from "../../utils/query";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
}));

jest.mock("@/apis/project", () => ({
  createProject: jest.fn(),
  deleteProject: jest.fn(),
  updateProject: jest.fn(),
}));

const mockCreateProject = jest.mocked(createProject);
const mockUpdateProject = jest.mocked(updateProject);
const mockDeleteProject = jest.mocked(deleteProject);
const mockPush = jest.fn();
const mockReplace = jest.fn();

describe("hooks/query/project", () => {
  const nid = 1;
  const project: TProject = {
    _id: "project-id",
    nid,
    createdAt: "2026-08-27T00:00:00.000Z",
    updatedAt: "2026-08-27T00:00:00.000Z",
    title: "테스트 프로젝트",
    description: "설명",
    content: "내용",
    thumbnail: "",
    github: "",
    page: null,
    start: "2026-08-01",
    end: null,
  };

  beforeEach(() => {
    mockCreateProject.mockReset();
    mockUpdateProject.mockReset();
    mockDeleteProject.mockReset();
    mockPush.mockReset();
    mockReplace.mockReset();
  });

  it("생성 후 목록 query를 무효화하고 목록으로 이동한다", async () => {
    const { queryClient, wrapper } = createQueryTestWrapper();
    const invalidateQueries = jest.spyOn(queryClient, "invalidateQueries");
    const input: IProjectInput = {
      title: project.title,
      description: project.description,
      content: project.content,
      thumbnail: project.thumbnail,
      github: project.github,
      page: project.page,
      start: project.start,
      end: project.end,
    };
    mockCreateProject.mockResolvedValueOnce(project);

    const { result } = renderHook(() => useCreateProjectMutation(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(input);
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockCreateProject.mock.calls[0][0]).toBe(input);
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: projectQueryKeys.root });
    expect(mockReplace).toHaveBeenCalledWith("/project");
  });

  it("수정 후 상세와 목록 query를 무효화하고 상세 화면으로 이동한다", async () => {
    const { queryClient, wrapper } = createQueryTestWrapper();
    const invalidateQueries = jest.spyOn(queryClient, "invalidateQueries");
    const input: IProjectInput = {
      title: "수정된 프로젝트",
      description: project.description,
      content: project.content,
      thumbnail: project.thumbnail,
      github: project.github,
      page: project.page,
      start: project.start,
      end: project.end,
    };
    mockUpdateProject.mockResolvedValueOnce(project);

    const { result } = renderHook(() => useUpdateProjectMutation(nid), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(input);
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockUpdateProject).toHaveBeenCalledWith(nid, input);
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: projectQueryKeys.detail(nid) });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: projectQueryKeys.root });
    expect(mockReplace).toHaveBeenCalledWith(`/project/${nid}`);
  });

  it("삭제 후 상세 캐시를 제거하고 목록 query를 무효화한다", async () => {
    const { queryClient, wrapper } = createQueryTestWrapper();
    const removeQueries = jest.spyOn(queryClient, "removeQueries");
    const invalidateQueries = jest.spyOn(queryClient, "invalidateQueries");
    mockDeleteProject.mockResolvedValueOnce(project);

    const { result } = renderHook(() => useDeleteProjectMutation(nid), { wrapper });

    await act(async () => {
      await result.current.mutateAsync();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockDeleteProject).toHaveBeenCalledWith(nid);
    expect(removeQueries).toHaveBeenCalledWith({ queryKey: projectQueryKeys.detail(nid) });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: projectQueryKeys.root });
    expect(mockPush).toHaveBeenCalledWith("/project");
  });
});
