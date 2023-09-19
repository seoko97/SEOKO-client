import { IBaseResponse } from "@/types/base";

enum SkillType {
  FRONT_END = "front",
  BACK_END = "back",
  DEV_OPS = "devops",
}

interface ICreateSkill {
  name: string;
  type: SkillType;
  icon: string;
}

type TUpdateSkill = Partial<ICreateSkill>;

interface ISkill extends ICreateSkill, IBaseResponse {}

export type { ICreateSkill, TUpdateSkill, ISkill };
