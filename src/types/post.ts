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

interface IGetPostsInput {
  series?: string;
  skip?: number;
  limit?: number;
  tag?: string;
  text?: string;
}

interface IGetPost {
  post: IPost;
  sibling: {
    prev: IPost | null;
    next: IPost | null;
  };
}

export type { IPost, ICreatePostInput, IUpdatePostInput, IGetPostsInput, IGetPost };
