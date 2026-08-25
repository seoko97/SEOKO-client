import { cache } from "react";

import { IProjectInput, TProject } from "@/types";
import { authRequest } from "@/apis";

const getProject = cache(async (nid: number) => {
  return authRequest<TProject>(`/projects/${nid}`, { method: "GET" });
});

const getProjects = async () => {
  return authRequest<TProject[]>("/projects", { method: "GET" });
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
