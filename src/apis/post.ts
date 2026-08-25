import { cache } from "react";

import {
  ICreatePostInput,
  IGetPostsInput,
  IGetSiblingPost,
  IPost,
  IUpdatePostInput,
} from "@/types";
import { authRequest, request } from "@/apis";

const getPosts = async (params: IGetPostsInput = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) searchParams.set(key, String(value));
  });

  const query = searchParams.toString();

  return request<IPost[]>(`/posts${query ? `?${query}` : ""}`, { method: "GET" });
};

const getPost = cache(async (nid: number) => {
  return request<IPost>(`/posts/${nid}`, { method: "GET" });
});

const getSiblingPost = async (nid: number) => {
  return request<IGetSiblingPost>(`/posts/${nid}/sibling`, { method: "GET" });
};

const createPost = async (data: ICreatePostInput) => {
  return authRequest<IPost>("/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

const updatePost = async (nid: number, data: IUpdatePostInput) => {
  return authRequest<IPost>(`/posts/${nid}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

const deletePost = async (nid: number) => {
  return authRequest<number>(`/posts/${nid}`, { method: "DELETE" });
};

const likePost = async (nid: number) => {
  return request<number>(`/posts/${nid}/like`, { method: "PATCH" });
};

const unlikePost = async (nid: number) => {
  return request<number>(`/posts/${nid}/unlike`, { method: "PATCH" });
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
