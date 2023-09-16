import { IBaseResponse } from "@/types/base";
import { IPost } from "@/types";

interface ITag extends IBaseResponse {
  name: string;
  posts: IPost[];
  postCount: number;
}

export type { ITag };
