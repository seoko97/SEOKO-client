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

export type { IBaseResponse, IToc, TImageType };
