import { ICreatePostInput, IGetPostsInput, IPost, IUpdatePostInput } from "@/types";
import api from "@/apis";

const getPosts = async (params: IGetPostsInput = {}) => {
  const res = await api.get<IPost[]>("/posts", { params });

  return res.data;
};

const getPost = async (nid: number) => {
  const res = await api.get<IPost>(`/posts/${nid}`);

  return res.data;
};

const createPost = async (data: ICreatePostInput) => {
  const res = await api.post<IPost>("/posts", data);

  return res.data;
};

const updatePost = async (_id: string, data: IUpdatePostInput) => {
  const res = await api.put<IPost>(`/posts/${_id}`, data);

  return res.data;
};

const deletePost = async (_id: string) => {
  const res = await api.delete<number>(`/posts/${_id}`);

  return res.data;
};

const likePost = async (_id: string) => {
  const res = await api.patch<number>(`/posts/${_id}/like`);

  return res.data;
};

const unlikePost = async (_id: string) => {
  const res = await api.patch<number>(`/posts/${_id}/like`);

  return res.data;
};

export { getPosts, getPost, createPost, updatePost, deletePost, likePost, unlikePost };
