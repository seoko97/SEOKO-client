import { ICreateExperience, IExperience, IUpdateExperience } from "@/types/experience";
import { authRequest, request } from "@/apis";

const getExperiences = async () => {
  return request<IExperience[]>("/experiences", { method: "GET", next: { revalidate: 3600 } });
};

const createExperience = async (input: ICreateExperience) => {
  return authRequest("/experiences", {
    method: "POST",
    body: JSON.stringify(input),
  });
};

const updateExperience = async (_id: string, input: IUpdateExperience) => {
  return authRequest(`/experiences/${_id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
};

const deleteExperience = async (_id: string) => {
  return authRequest(`/experiences/${_id}`, { method: "DELETE" });
};

export { getExperiences, createExperience, updateExperience, deleteExperience };
