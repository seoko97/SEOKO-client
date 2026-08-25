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
import { authRequest, request } from "@/apis";

jest.mock("@/apis", () => ({
  authRequest: jest.fn(),
  request: jest.fn(),
}));

const mockAuthRequest = jest.mocked(authRequest);
const mockRequest = jest.mocked(request);

describe("apis/post", () => {
  const createInput = {
    title: "새 글",
    content: "본문",
    thumbnail: "thumbnail.png",
    tags: ["next", "react"],
  };
  const updateInput = {
    title: "수정된 글",
    content: "수정된 본문",
    thumbnail: "updated-thumbnail.png",
    addTags: ["fetch"],
    deleteTags: ["axios"],
  };

  beforeEach(() => {
    mockAuthRequest.mockReset();
    mockRequest.mockReset();
  });

  it("게시글 목록 query에서 undefined를 제외하고 값을 문자열로 직렬화한다", async () => {
    await getPosts({ limit: 10, skip: 0, tag: "react", text: undefined });

    expect(mockRequest).toHaveBeenCalledWith("/posts?limit=10&skip=0&tag=react", { method: "GET" });
  });

  it("게시글 목록의 인자가 없으면 query 없이 요청한다", async () => {
    await getPosts();

    expect(mockRequest).toHaveBeenCalledWith("/posts", { method: "GET" });
  });

  it.each([
    ["게시글 상세 조회", () => getPost(1), "/posts/1", { method: "GET" }],
    ["이전·다음 게시글 조회", () => getSiblingPost(1), "/posts/1/sibling", { method: "GET" }],
    ["게시글 좋아요", () => likePost(1), "/posts/1/like", { method: "PATCH" }],
    ["게시글 좋아요 취소", () => unlikePost(1), "/posts/1/unlike", { method: "PATCH" }],
  ])("%s의 요청 계약을 유지한다", async (_, execute, path, options) => {
    await execute();

    expect(mockRequest).toHaveBeenCalledTimes(1);
    expect(mockRequest).toHaveBeenCalledWith(path, options);
  });

  it.each([
    [
      "게시글 생성",
      () => createPost(createInput),
      "/posts",
      { method: "POST", body: JSON.stringify(createInput) },
    ],
    [
      "게시글 수정",
      () => updatePost(1, updateInput),
      "/posts/1",
      { method: "PUT", body: JSON.stringify(updateInput) },
    ],
    ["게시글 삭제", () => deletePost(1), "/posts/1", { method: "DELETE" }],
  ])("%s의 요청 계약을 유지한다", async (_, execute, path, options) => {
    await execute();

    expect(mockAuthRequest).toHaveBeenCalledTimes(1);
    expect(mockAuthRequest).toHaveBeenCalledWith(path, options);
  });
});
