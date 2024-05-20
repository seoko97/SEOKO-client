interface IBaseResponse {
  _id: string;
  nid: number;
  createdAt: string;
  updatedAt: string;
}

interface IToc {
  id: string;
  text: string;
  level: number;
}

type TImageType = "post" | "project" | "skill" | "series";

enum EImageType {
  POST = "post",
  PROJECT = "project",
  SKILL = "skill",
  SERIES = "series",
}

export { EImageType };
export type { IBaseResponse, IToc, TImageType };
