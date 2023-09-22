import { ICreateExperience, IExperience, IUpdateExperience } from "@/types/experience";
import api from "@/apis";

const getExperiences = async () => {
  const { data } = await api.get<IExperience[]>("/experiences");

  return data;
};

const createExperience = async (input: ICreateExperience) => {
  const { data } = await api.post("/experiences", input);

  return data;
};

const updateExperience = async (_id: string, input: IUpdateExperience) => {
  const { data } = await api.put(`/experiences/${_id}`, input);

  return data;
};

const deleteExperience = async (_id: string) => {
  const { data } = await api.delete(`/experiences/${_id}`);

  return data;
};

export { getExperiences, createExperience, updateExperience, deleteExperience };
