import { useRouter } from "next/navigation";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { IProjectInput } from "@/types";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "@/apis/project";

const useGetProjectQuery = (nid: number | null) => {
  return useQuery({
    queryKey: ["project", nid],
    queryFn: () => {
      if (nid === null) return;

      return getProject(nid);
    },
    enabled: nid !== null,
  });
};

const useGetProjectsQuery = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
};

const useCreateProjectMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
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
      queryClient.invalidateQueries({ queryKey: ["project", nid] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
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
      queryClient.removeQueries({ queryKey: ["project", nid] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
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
