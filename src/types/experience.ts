import { IBaseResponse } from "@/types/base";

interface ICreateExperience {
  title: string;
  description: string;
  start: string;
  end: string | null;
}

type TUpdateExperience = Partial<ICreateExperience>;

interface IExperience extends ICreateExperience, IBaseResponse {}

export type { ICreateExperience, TUpdateExperience, IExperience };
