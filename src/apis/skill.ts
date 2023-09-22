import { ICreateSkill, TSkills, TUpdateSkill } from "@/types/skill";
import api from "@/apis";

const getSkills = async () => {
  const { data } = await api.get<TSkills>("/skills");

  return data;
};

const createSkill = async (input: ICreateSkill) => {
  const { data } = await api.post<TSkills>("/skills", input);

  return data;
};

const updateSkill = async (_id: string, input: TUpdateSkill) => {
  const { data } = await api.put<TSkills>(`/skills/${_id}`, input);

  return data;
};

const deleteSkill = async (_id: string) => {
  const { data } = await api.delete(`/skills/${_id}`);

  return data;
};

export { getSkills, createSkill, updateSkill, deleteSkill };
