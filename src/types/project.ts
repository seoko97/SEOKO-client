import { IBaseResponse } from "@/types/base";

interface IProjectInput {
  _id?: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  github: string;
  page: string | null;
  start: string;
  end: string | null;
}

type TProject = IProjectInput & IBaseResponse;

export type { IProjectInput, TProject };
