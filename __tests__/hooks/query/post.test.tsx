import { act, renderHook, waitFor } from "@testing-library/react";

import { postQueryKeys, seriesQueryKeys, tagQueryKeys } from "@/utils/query/queryKeys";
import { ICreatePostInput, IPost, IUpdatePostInput } from "@/types";
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useLikePostMutation,
  useUnlikePostMutation,
  useUpdatePostMutation,
} from "@/hooks/query/post";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  likePost,
  unlikePost,
  updatePost,
} from "@/apis/post";

import { createQueryTestWrapper } from "../../utils/query";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/apis/post", () => ({
  createPost: jest.fn(),
  deletePost: jest.fn(),
  getPost: jest.fn(),
  getPosts: jest.fn(),
  likePost: jest.fn(),
  unlikePost: jest.fn(),
  updatePost: jest.fn(),
}));

const mockGetPost = jest.mocked(getPost);
const mockGetPosts = jest.mocked(getPosts);
const mockLikePost = jest.mocked(likePost);
const mockUnlikePost = jest.mocked(unlikePost);
const mockCreatePost = jest.mocked(createPost);
const mockUpdatePost = jest.mocked(updatePost);
const mockDeletePost = jest.mocked(deletePost);
const mockPush = jest.fn();

describe("hooks/query/post", () => {
  const nid = 1;
  const post: IPost = {
    _id: "post-id",
    nid,
    createdAt: "2026-08-27T00:00:00.000Z",
    updatedAt: "2026-08-27T00:00:00.000Z",
    title: "테스트 게시글",
    content: "내용",
    thumbnail: "",
    series: null,
    tags: [],
    isLiked: false,
    likeCount: 0,
    viewCount: 0,
  };

  beforeEach(() => {
    mockGetPost.mockReset();
    mockGetPosts.mockReset();
    mockLikePost.mockReset();
    mockUnlikePost.mockReset();
    mockCreatePost.mockReset();
    mockUpdatePost.mockReset();
    mockDeletePost.mockReset();
    mockPush.mockReset();
  });

  it("nid가 null이면 게시글을 조회하지 않는다", () => {
    const { wrapper } = createQueryTestWrapper();

    const { result } = renderHook(() => useGetPostQuery(null), { wrapper });

    expect(result.current.fetchStatus).toBe("idle");
    expect(mockGetPost).not.toHaveBeenCalled();
  });

  it("다음 페이지를 누적하고 마지막 페이지 이후에는 추가 조회하지 않는다", async () => {
    const { wrapper } = createQueryTestWrapper();
    const secondPost: IPost = { ...post, _id: "post-id-2", nid: 2 };
    const thirdPost: IPost = { ...post, _id: "post-id-3", nid: 3 };
    mockGetPosts.mockResolvedValueOnce([post, secondPost]).mockResolvedValueOnce([thirdPost]);

    const { result } = renderHook(() => useGetPostsQuery({ limit: 2 }), { wrapper });

    await waitFor(() => expect(result.current[0]).toEqual([post, secondPost]));

    expect(mockGetPosts).toHaveBeenCalledWith({ limit: 2, skip: 0 });

    act(() => {
      result.current[1]();
    });

    await waitFor(() => expect(result.current[0]).toEqual([post, secondPost, thirdPost]));

    expect(mockGetPosts).toHaveBeenCalledWith({ limit: 2, skip: 2 });

    act(() => {
      result.current[1]();
    });

    expect(mockGetPosts).toHaveBeenCalledTimes(2);
    expect(result.current[0]).toEqual([post, secondPost, thirdPost]);
  });

  it("좋아요 요청 중에는 상세 캐시를 낙관적으로 갱신하고, 성공 후 관련 query를 무효화한다", async () => {
    const { queryClient, wrapper } = createQueryTestWrapper();
    const invalidateQueries = jest.spyOn(queryClient, "invalidateQueries");
    let resolveLike: (value: number) => void;
    const likePromise = new Promise<number>((resolve) => {
      resolveLike = resolve;
    });
    queryClient.setQueryData(postQueryKeys.detail(nid), post);
    mockLikePost.mockReturnValueOnce(likePromise);

    const { result } = renderHook(() => useLikePostMutation(nid), { wrapper });

    act(() => {
      result.current.mutate();
    });

    await waitFor(() =>
      expect(queryClient.getQueryData(postQueryKeys.detail(nid))).toEqual({
        ...post,
        isLiked: true,
        likeCount: 1,
      }),
    );

    resolveLike!(1);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: postQueryKeys.list });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: postQueryKeys.detail(nid) });
  });

  it("좋아요 취소 요청 중에는 상세 캐시를 낙관적으로 갱신하고, 성공 후 관련 query를 무효화한다", async () => {
    const { queryClient, wrapper } = createQueryTestWrapper();
    const invalidateQueries = jest.spyOn(queryClient, "invalidateQueries");
    const likedPost: IPost = { ...post, isLiked: true, likeCount: 1 };
    let resolveUnlike: (value: number) => void;
    const unlikePromise = new Promise<number>((resolve) => {
      resolveUnlike = resolve;
    });
    queryClient.setQueryData(postQueryKeys.detail(nid), likedPost);
    mockUnlikePost.mockReturnValueOnce(unlikePromise);

    const { result } = renderHook(() => useUnlikePostMutation(nid), { wrapper });

    act(() => {
      result.current.mutate();
    });

    await waitFor(() =>
      expect(queryClient.getQueryData(postQueryKeys.detail(nid))).toEqual({
        ...likedPost,
        isLiked: false,
        likeCount: 0,
      }),
    );

    resolveUnlike!(1);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: postQueryKeys.list });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: postQueryKeys.detail(nid) });
  });

  it("게시글 생성 후 게시글·시리즈·태그 query를 무효화한다", async () => {
    const { queryClient, wrapper } = createQueryTestWrapper();
    const invalidateQueries = jest.spyOn(queryClient, "invalidateQueries");
    const input: ICreatePostInput = {
      title: post.title,
      content: post.content,
      thumbnail: post.thumbnail,
      tags: ["nextjs"],
    };
    mockCreatePost.mockResolvedValueOnce(post);

    const { result } = renderHook(() => useCreatePostMutation(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(input);
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockCreatePost.mock.calls[0][0]).toBe(input);
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: postQueryKeys.root });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: seriesQueryKeys.root });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: tagQueryKeys.root });
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("게시글 수정 후 상세·목록·연관 query를 무효화한다", async () => {
    const { queryClient, wrapper } = createQueryTestWrapper();
    const invalidateQueries = jest.spyOn(queryClient, "invalidateQueries");
    const input: IUpdatePostInput = {
      title: "수정된 게시글",
      content: post.content,
      thumbnail: post.thumbnail,
    };
    mockUpdatePost.mockResolvedValueOnce(post);

    const { result } = renderHook(() => useUpdatePostMutation(nid), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(input);
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockUpdatePost).toHaveBeenCalledWith(nid, input);
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: postQueryKeys.detail(nid) });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: postQueryKeys.list });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: seriesQueryKeys.root });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: tagQueryKeys.root });
    expect(mockPush).toHaveBeenCalledWith(`/post/${nid}`);
  });

  it("게시글 삭제 후 상세·형제 캐시를 제거하고 연관 query를 무효화한다", async () => {
    const { queryClient, wrapper } = createQueryTestWrapper();
    const removeQueries = jest.spyOn(queryClient, "removeQueries");
    const invalidateQueries = jest.spyOn(queryClient, "invalidateQueries");
    mockDeletePost.mockResolvedValueOnce(nid);

    const { result } = renderHook(() => useDeletePostMutation(nid), { wrapper });

    await act(async () => {
      await result.current.mutateAsync();
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockDeletePost).toHaveBeenCalledWith(nid);
    expect(removeQueries).toHaveBeenCalledWith({ queryKey: postQueryKeys.detail(nid) });
    expect(removeQueries).toHaveBeenCalledWith({ queryKey: postQueryKeys.sibling(nid) });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: postQueryKeys.list });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: seriesQueryKeys.root });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: tagQueryKeys.root });
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
