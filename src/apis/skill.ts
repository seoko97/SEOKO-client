import { ICreateSkill, TSkills, TUpdateSkill } from "@/types/skill";
import { authRequest, request } from "@/apis";

const getSkills = async () => {
  return request<TSkills>("/skills", { method: "GET", next: { revalidate: 3600 } });
};

const createSkill = async (input: ICreateSkill) => {
  return authRequest<TSkills>("/skills", {
    method: "POST",
    body: JSON.stringify(input),
  });
};

const updateSkill = async (_id: string, input: TUpdateSkill) => {
  return authRequest<TSkills>(`/skills/${_id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
};

const deleteSkill = async (_id: string) => {
  return authRequest(`/skills/${_id}`, { method: "DELETE" });
};

export { getSkills, createSkill, updateSkill, deleteSkill };
