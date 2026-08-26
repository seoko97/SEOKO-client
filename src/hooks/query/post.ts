import { useCallback } from "react";

import { useRouter } from "next/navigation";

import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";

import { postQueryKeys } from "@utils/query/queryKeys";
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
    queryKey: postQueryKeys.detail(nid),
    queryFn: () => {
      if (nid === null) return;

      return getPost(nid);
    },
    enabled: nid !== null,
  });
};

const useGetPostsQuery = (params: IGetPostsInput = {}) => {
  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: postQueryKeys.list(params),
    queryFn: ({ pageParam: skip }) => getPosts({ ...params, skip }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const limit = params.limit ?? 10;

      if (lastPage.length < limit) return undefined;

      return lastPageParam + lastPage.length;
    },
  });

  const posts = data?.pages?.flat() ?? [];

  const fetchMore = () => {
    if (!hasNextPage || isFetching) return;

    fetchNextPage();
  };

  return [posts, fetchMore] as const;
};

const useGetSiblingPostQuery = (nid: number) => {
  return useQuery({
    queryKey: postQueryKeys.sibling(nid),
    queryFn: () => getSiblingPost(nid),
  });
};

const useCreatePostMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
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
      queryClient.invalidateQueries({ queryKey: postQueryKeys.detail(nid) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
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
      queryClient.removeQueries({ queryKey: postQueryKeys.detail(nid) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.all });
    },
  });
};

const useLikePostMutation = (nid: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likePost(nid),
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: postQueryKeys.detail(nid) });

      const post = queryClient.getQueryData<IPost>(postQueryKeys.detail(nid));
      const posts = queryClient.getQueryData<IPost[]>(postQueryKeys.all);

      queryClient.setQueryData<IPost | undefined>(postQueryKeys.detail(nid), (prev) => {
        if (!prev) return prev;

        return { ...prev, isLiked: true, likeCount: prev.likeCount + 1 };
      });

      queryClient.setQueryData<IPost[] | undefined>(postQueryKeys.all, (prev) => {
        if (!prev) return prev;

        return prev.map((post) => {
          if (post.nid !== nid) return post;

          return { ...post, isLiked: true, likeCount: post.likeCount + 1 };
        });
      });

      return { post, posts };
    },
    onError: (err, _, prev) => {
      if (!prev) return;

      const { post, posts } = prev;

      queryClient.setQueryData<IPost | undefined>(postQueryKeys.detail(nid), post);
      queryClient.setQueryData<IPost[] | undefined>(postQueryKeys.all, posts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.detail(nid) });
    },
  });
};

const useUnlikePostMutation = (nid: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => unlikePost(nid),
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: postQueryKeys.detail(nid) });

      const post = queryClient.getQueryData<IPost>(postQueryKeys.detail(nid));
      const posts = queryClient.getQueryData<IPost[]>(postQueryKeys.all);

      queryClient.setQueryData<IPost | undefined>(postQueryKeys.detail(nid), (prev) => {
        if (!prev) return prev;

        return { ...prev, isLiked: false, likeCount: prev.likeCount - 1 };
      });

      queryClient.setQueryData<IPost[] | undefined>(postQueryKeys.all, (prev) => {
        if (!prev) return prev;

        return prev.map((post) => {
          if (post.nid !== nid) return post;

          return { ...post, isLiked: false, likeCount: post.likeCount - 1 };
        });
      });

      return { post, posts };
    },
    onError: (err, _, prev) => {
      if (!prev) return;

      const { post, posts } = prev;

      queryClient.setQueryData<IPost | undefined>(postQueryKeys.detail(nid), post);
      queryClient.setQueryData<IPost[] | undefined>(postQueryKeys.all, posts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.detail(nid) });
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
