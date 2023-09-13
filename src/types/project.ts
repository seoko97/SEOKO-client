import { IBaseResponse } from "@/types/base";

interface IProject extends IBaseResponse {
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  github: string;
  start: string;
  end: string;
}

export type { IProject };
