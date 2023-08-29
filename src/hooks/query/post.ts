import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { ICreatePostInput, IGetPostsInput, IPost, IUpdatePostInput } from "@/types";
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
  const { series = "", tag = "" } = params;

  return useInfiniteQuery({
    queryKey: ["posts", { series, tag }],
    queryFn: ({ pageParam: skip }) => getPosts({ ...params, skip }),
    getNextPageParam: (_, allPage) => allPage.flat().length,
  });
};

const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreatePostInput) => createPost(data),
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
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
};
