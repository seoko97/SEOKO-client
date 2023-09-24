import { cache } from "react";

import {
  ICreatePostInput,
  IGetPostsInput,
  IGetSiblingPost,
  IPost,
  IUpdatePostInput,
} from "@/types";
import api from "@/apis";

const getPosts = async (params: IGetPostsInput = {}) => {
  const res = await api.get<IPost[]>("/posts", { params });

  return res.data;
};

const getPost = cache(async (nid: number) => {
  const res = await api.get<IPost>(`/posts/${nid}`);

  return res.data;
});

const getSiblingPost = async (nid: number) => {
  const res = await api.get<IGetSiblingPost>(`/posts/${nid}/sibling`);

  return res.data;
};

const createPost = async (data: ICreatePostInput) => {
  const res = await api.post<IPost>("/posts", data);

  return res.data;
};

const updatePost = async (nid: number, data: IUpdatePostInput) => {
  const res = await api.put<IPost>(`/posts/${nid}`, data);

  return res.data;
};

const deletePost = async (nid: number) => {
  const res = await api.delete<number>(`/posts/${nid}`);

  return res.data;
};

const likePost = async (nid: number) => {
  const res = await api.patch<number>(`/posts/${nid}/like`);

  return res.data;
};

const unlikePost = async (nid: number) => {
  const res = await api.patch<number>(`/posts/${nid}/unlike`);

  return res.data;
};

export {
  getPosts,
  getPost,
  getSiblingPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
};
