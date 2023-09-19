import { ICreateExperience, TUpdateExperience } from "@/types/experience";
import api from "@/apis";

const getExperiences = async () => {
  const { data } = await api.get("/skills");

  return data;
};

const createExperience = async (input: ICreateExperience) => {
  const { data } = await api.post("/skills", input);

  return data;
};

const updateExperience = async (_id: string, input: TUpdateExperience) => {
  const { data } = await api.put(`/skills/${_id}`, input);

  return data;
};

const deleteExperience = async (_id: string) => {
  const { data } = await api.delete(`/skills/${_id}`);

  return data;
};

export { getExperiences, createExperience, updateExperience, deleteExperience };
