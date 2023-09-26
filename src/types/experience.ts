import { IBaseResponse } from "@/types/base";

interface ICreateExperience {
  title: string;
  description: string;
  start: string;
  end: string | null;
}

interface IUpdateExperience extends Partial<ICreateExperience> {
  _id: string;
}

interface IExperience extends ICreateExperience, IBaseResponse {}

export type { ICreateExperience, IUpdateExperience, IExperience };
