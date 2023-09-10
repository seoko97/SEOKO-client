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

export type { IBaseResponse, IToc };
