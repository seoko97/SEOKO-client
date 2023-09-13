import { IProjectInput, TProject } from "@/types";
import api from "@/apis";

const getProject = async (nid: number) => {
  const { data } = await api.get<TProject>(`/project/${nid}`);

  return data;
};

const getProjects = async () => {
  const { data } = await api.get<TProject[]>(`/project`);

  return data;
};

const createProject = async (input: IProjectInput) => {
  const { data } = await api.post<TProject>(`/project`, input);

  return data;
};

const updateProject = async (nid: number, input: IProjectInput) => {
  const { data } = await api.put<TProject>(`/project/${nid}`, input);

  return data;
};

const deleteProject = async (nid: number) => {
  const { data } = await api.delete<TProject>(`/project/${nid}`);

  return data;
};

export { getProject, getProjects, createProject, updateProject, deleteProject };
