import { useCallback } from "react";

import { useRouter } from "next/navigation";

import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";

import { postQueryKeys, seriesQueryKeys, tagQueryKeys } from "@utils/query/queryKeys";
import {
  ICreatePostInput,
  IGetPostsInput,
  IGetSiblingPost,
  IPost,
  IUpdatePostInput,
} from "@/types";
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
    queryKey: postQueryKeys.listByParams(params),
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
      queryClient.invalidateQueries({ queryKey: postQueryKeys.root });
      queryClient.invalidateQueries({ queryKey: seriesQueryKeys.root });
      queryClient.invalidateQueries({ queryKey: tagQueryKeys.root });
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
      queryClient.invalidateQueries({ queryKey: postQueryKeys.list });
      queryClient.invalidateQueries({ queryKey: seriesQueryKeys.root });
      queryClient.invalidateQueries({ queryKey: tagQueryKeys.root });
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
      const siblingPosts =
        queryClient.getQueryData<IGetSiblingPost>(postQueryKeys.sibling(nid)) ?? {};

      Object.values<IPost>(siblingPosts).map((post) => {
        const { nid } = post;

        queryClient.removeQueries({ queryKey: postQueryKeys.sibling(nid) });
      });

      queryClient.removeQueries({ queryKey: postQueryKeys.detail(nid) });
      queryClient.removeQueries({ queryKey: postQueryKeys.sibling(nid) });
      queryClient.invalidateQueries({ queryKey: postQueryKeys.list });
      queryClient.invalidateQueries({ queryKey: seriesQueryKeys.root });
      queryClient.invalidateQueries({ queryKey: tagQueryKeys.root });

      router.push("/");
    },
  });
};

const useLikePostMutation = (nid: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likePost(nid),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: postQueryKeys.detail(nid) });

      const post = queryClient.getQueryData<IPost>(postQueryKeys.detail(nid));

      queryClient.setQueryData<IPost | undefined>(postQueryKeys.detail(nid), (prev) => {
        if (!prev) return prev;

        return { ...prev, isLiked: true, likeCount: prev.likeCount + 1 };
      });

      return { post };
    },
    onError: (err, _, prev) => {
      if (!prev) return;

      queryClient.setQueryData<IPost | undefined>(postQueryKeys.detail(nid), prev.post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.list });
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
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: postQueryKeys.detail(nid) });

      const post = queryClient.getQueryData<IPost>(postQueryKeys.detail(nid));

      queryClient.setQueryData<IPost | undefined>(postQueryKeys.detail(nid), (prev) => {
        if (!prev) return prev;

        return { ...prev, isLiked: false, likeCount: prev.likeCount - 1 };
      });

      return { post };
    },
    onError: (_, __, prev) => {
      if (!prev) return;

      queryClient.setQueryData(postQueryKeys.detail(nid), prev.post);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueryKeys.list });
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
