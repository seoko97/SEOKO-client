import { useCallback } from "react";

import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { IGetPostsInput, IPost, IUpdatePostInput } from "@/types";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getSiblingPost,
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
  return useQuery({ queryKey: ["post", nid, "sibling"], queryFn: () => getSiblingPost(nid) });
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

const useUpdatePostMutation = (nid: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdatePostInput) => updatePost(nid, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["post", nid]);
      queryClient.invalidateQueries(["posts"]);
    },
  });
};

const useDeletePostMutation = (nid: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePost(nid),
    onSuccess: () => {
      queryClient.removeQueries(["post", nid]);
      queryClient.invalidateQueries(["posts"]);
    },
  });
};

const useLikePostMutation = (nid: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likePost(nid),
    onMutate: () => {
      queryClient.cancelQueries(["post", nid]);

      const prev = queryClient.getQueryData<IPost>(["post", nid]);

      queryClient.setQueryData<IPost | undefined>(["post", nid], (prev) => {
        if (!prev) return prev;

        return { ...prev, isLiked: true, likeCount: prev.likeCount + 1 };
      });

      return prev;
    },
    onError: (err, _, prev) => {
      queryClient.setQueryData<IPost | undefined>(["post", nid], prev);
    },
  });
};

const useUnlikePostMutation = (nid: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => unlikePost(nid),
    onMutate: () => {
      queryClient.cancelQueries(["post", nid]);

      const prev = queryClient.getQueryData<IPost>(["post", nid]);

      queryClient.setQueryData<IPost | undefined>(["post", nid], (prev) => {
        if (!prev) return prev;

        return { ...prev, isLiked: false, likeCount: prev.likeCount - 1 };
      });

      return prev;
    },
    onError: (err, _, prev) => {
      queryClient.setQueryData<IPost | undefined>(["post", nid], prev);
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
