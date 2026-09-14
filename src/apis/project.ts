import { cache } from "react";

import { CACHE_TAG } from "@utils/constant/cacheTag";
import { IProjectInput, TProject } from "@/types";
import { authRequest, request } from "@/apis";

const getProject = cache(async (nid: number) => {
  return request<TProject>(`/projects/${nid}`, {
    method: "GET",
    next: { revalidate: 300, tags: [CACHE_TAG.projects] },
  });
});

const getProjects = async () => {
  return request<TProject[]>("/projects", {
    method: "GET",
    next: { revalidate: 300, tags: [CACHE_TAG.projects] },
  });
};

const createProject = async (input: IProjectInput) => {
  return authRequest<TProject>("/projects", {
    method: "POST",
    body: JSON.stringify(input),
  });
};

const updateProject = async (nid: number, input: IProjectInput) => {
  return authRequest<TProject>(`/projects/${nid}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
};

const deleteProject = async (nid: number) => {
  return authRequest<TProject>(`/projects/${nid}`, { method: "DELETE" });
};

export { getProject, getProjects, createProject, updateProject, deleteProject };
