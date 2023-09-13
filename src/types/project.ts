import { IBaseResponse } from "@/types/base";

interface IProjectInput {
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  github: string;
  start: string;
  end: string;
}

type TProject = IProjectInput & IBaseResponse;

export type { IProjectInput, TProject };
