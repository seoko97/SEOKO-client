import { useRouter } from "next/navigation";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { projectQueryKeys } from "@utils/query/queryKeys";
import { IProjectInput } from "@/types";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "@/apis/project";

const useGetProjectQuery = (nid: number | null) => {
  const queryKey = nid == null ? projectQueryKeys.all : projectQueryKeys.detail(nid);

  return useQuery({
    queryKey,
    queryFn: () => {
      if (nid === null) return;

      return getProject(nid);
    },
    enabled: nid !== null,
  });
};

const useGetProjectsQuery = () => {
  return useQuery({
    queryKey: projectQueryKeys.all,
    queryFn: getProjects,
  });
};

const useCreateProjectMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.all });
      router.replace("/project");
    },
  });
};

const useUpdateProjectMutation = (nid: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IProjectInput) => updateProject(nid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.detail(nid) });
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.all });
      router.replace(`/project/${nid}`);
    },
  });
};

const useDeleteProjectMutation = (nid: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProject(nid),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: projectQueryKeys.detail(nid) });
      queryClient.invalidateQueries({ queryKey: projectQueryKeys.all });
      router.push("/project");
    },
  });
};

const useProjectMutation = (nid: number | null = null) => {
  const { mutate: create } = useCreateProjectMutation();
  const { mutate: update } = useUpdateProjectMutation(nid ?? 0);

  const mutate = (data: IProjectInput) => {
    if (nid === null) {
      return create(data);
    }

    return update(data);
  };

  return mutate;
};

export {
  useGetProjectQuery,
  useGetProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useProjectMutation,
};
