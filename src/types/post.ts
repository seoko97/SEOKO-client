import { IBaseResponse } from "@/types/base";
import { ISeries, ITag } from "@/types";

interface IPost extends IBaseResponse {
  title: string;
  content: string;
  thumbnail: string;
  series: ISeries | null;
  tags: ITag[];
  isLiked: boolean;
  likeCount: number;
  viewCount: number;
}

interface BasePostInput extends Pick<IPost, "title" | "content" | "thumbnail"> {
  _id?: string;
  series?: string;
}

interface ICreatePostInput extends BasePostInput {
  tags?: string[];
}

interface IUpdatePostInput extends BasePostInput {
  deleteTags?: string[];
  addTags?: string[];
}

interface IGetPostsInput {
  series?: string;
  skip?: number;
  limit?: number;
  tag?: string;
  text?: string;
  sort?: number;
}

interface IGetSiblingPost {
  prev: IPost | null;
  next: IPost | null;
}

export type {
  IPost,
  BasePostInput,
  ICreatePostInput,
  IUpdatePostInput,
  IGetPostsInput,
  IGetSiblingPost,
};
