import { IBaseResponse } from "@/types/base";

enum ESkillType {
  FRONT_END = "front",
  BACK_END = "back",
  DEV_OPS = "devops",
  LANGUAGE = "language",
}

interface ICreateSkill {
  name: string;
  type: ESkillType;
  description: string;
  icon: string;
}

interface TUpdateSkill extends Partial<ICreateSkill> {
  _id: string;
}

interface ISkill extends ICreateSkill, IBaseResponse {}

type TSkills = Record<ESkillType, ISkill[]>;

export { ESkillType };
export type { ICreateSkill, TUpdateSkill, ISkill, TSkills };
