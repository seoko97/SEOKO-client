import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

const useGetPostsQuery = (params: IGetPostsInput) => {
  // 텍스트 입력을 통해 많은 메모리를 사용하는 것을 방지하기 위해
  const { series = "", tag = "", skip = 0, limit = 10 } = params;

  return useQuery({
    queryKey: ["posts", { series, skip, limit, tag }],
    queryFn: () => getPosts(params),
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
