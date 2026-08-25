import { ICreateExperience, IExperience, IUpdateExperience } from "@/types/experience";
import { authRequest } from "@/apis";

const getExperiences = async () => {
  return authRequest<IExperience[]>("/experiences", { method: "GET" });
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
