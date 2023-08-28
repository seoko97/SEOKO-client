import { IBaseResponse } from "@/types/base";

interface IPost extends IBaseResponse {
  title: string;
  content: string;
  thumbnail?: string;
  series: any;
  tags: any[];
  likeCount: number;
  viewCount: number;
}

interface ICreatePostInput extends Pick<IPost, "title" | "content" | "thumbnail"> {
  series?: string;
  tags?: string[];
}

interface IUpdatePostInput extends Pick<IPost, "title" | "content" | "thumbnail"> {
  series?: string;
  deleteTags?: string[];
  addTags?: string[];
}

interface IGetPostInput {
  series?: string;
  skip?: number;
  limit?: number;
  tag?: string;
  text?: string;
}

export type { IPost, ICreatePostInput, IUpdatePostInput, IGetPostInput };
