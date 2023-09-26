import { IBaseResponse } from "@/types/base";
import { IPost } from "@/types";

interface IUpdateSeriesInput {
  name: string;
  thumbnail?: string;
}

interface ISeries extends IBaseResponse, IUpdateSeriesInput {
  posts: IPost[];
  postCount: number;
}

export type { ISeries, IUpdateSeriesInput };
