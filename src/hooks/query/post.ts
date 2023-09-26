import { useCallback } from "react";

import { useRouter } from "next/navigation";

import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { ICreatePostInput, IGetPostsInput, IPost, IUpdatePostInput } from "@/types";
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

const useGetPostQuery = (nid: number | null) => {
  return useQuery({
    queryKey: ["post", nid],
    queryFn: () => {
      if (nid === null) return;

      return getPost(nid);
    },
    enabled: nid !== null,
  });
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
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      router.push("/");
    },
  });
};

const useUpdatePostMutation = (nid: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IUpdatePostInput) => updatePost(nid, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["post", nid]);
      queryClient.invalidateQueries(["posts"]);
      router.push(`/post/${nid}`);
    },
  });
};

const useDeletePostMutation = (nid: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => deletePost(nid),
    onSuccess: () => {
      router.push("/");
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
    onSettled: () => {
      queryClient.invalidateQueries(["post", nid]);
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
    onSettled: () => {
      queryClient.invalidateQueries(["post", nid]);
    },
  });
};

const usePostMutation = (nid: number | null = null) => {
  const { mutate: create } = useCreatePostMutation();
  const { mutate: update } = useUpdatePostMutation(nid ?? 0);

  const onMutation = async <T extends ICreatePostInput>(input: T) => {
    if (nid === null) {
      create(input);
    } else {
      update(input);
    }
  };

  return onMutation;
};

export {
  useGetPostQuery,
  useGetPostsQuery,
  useGetSiblingPostQuery,
  usePostMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
};
