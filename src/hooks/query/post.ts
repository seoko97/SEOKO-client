import { useCallback } from "react";

import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { IGetPostsInput, IPost, IUpdatePostInput } from "@/types";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  likePost,
  unlikePost,
  updatePost,
} from "@/apis/post";

const useGetPostQuery = (nid: number) => {
  return useQuery({ queryKey: ["post", nid], queryFn: () => getPost(nid) });
};

const useGetPostsQuery = (params: IGetPostsInput = {}) => {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["posts", params],
    queryFn: ({ pageParam: skip }) => getPosts({ ...params, skip }),
    getNextPageParam: (_, allPage) => allPage.flat().length,
    keepPreviousData: true,
  });

  const posts = data?.pages?.flat() ?? [];

  const fetchMore = useCallback(() => {
    const limit = params.limit ?? 10;

    if (posts.length % limit !== 0) return;

    fetchNextPage();
  }, [params.limit, posts.length, fetchNextPage]);

  return [posts, fetchMore] as const;
};

const useGetSiblingPostQuery = (nid: number) => {
  return useQuery({ queryKey: ["post", nid, "sibling"], queryFn: () => getPost(nid) });
};

const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
};

const useUpdatePostMutation = (_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdatePostInput) => updatePost(_id, data),
    onSuccess: ({ nid }) => {
      queryClient.invalidateQueries(["post", nid]);
      queryClient.invalidateQueries(["posts"]);
    },
  });
};

const useDeletePostMutation = (_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePost(_id),
    onSuccess: (nid) => {
      queryClient.removeQueries(["post", nid]);
      queryClient.invalidateQueries(["posts"]);
    },
  });
};

const useLikePostMutation = (_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likePost(_id),
    onSuccess: (nid) => {
      queryClient.setQueryData<IPost>(["post", nid], (prev) => {
        if (!prev) return prev;

        return { ...prev, isLiked: true, likeCount: prev.likeCount + 1 };
      });
    },
  });
};

const useUnlikePostMutation = (_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => unlikePost(_id),
    onSuccess: (nid) => {
      queryClient.setQueryData<IPost>(["post", nid], (prev) => {
        if (!prev) return prev;

        return { ...prev, isLiked: false, likeCount: prev.likeCount - 1 };
      });
    },
  });
};

export {
  useGetPostQuery,
  useGetPostsQuery,
  useGetSiblingPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
};
