import { IPost } from "@/types";

interface ITag {
  _id: string;
  name: string;
  nid: number;
  posts: IPost[];
}

export type { ITag };
