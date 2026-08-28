import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { usePostMutation } from "@hooks/query/post";
import TagEditor from "@components/ui/client/write/post/Tag";
import PostFooter from "@components/ui/client/write/post/Footer";
import { ICreatePostInput, IPost, IPostWriteInput, IUpdatePostInput } from "@/types";
import { PostWriteProvider } from "@/context/PostWriteContext";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: jest.fn() }),
}));

jest.mock("@/hooks/query/post", () => ({
  usePostMutation: jest.fn(),
}));

const mockUsePostMutation = jest.mocked(usePostMutation);
const mockMutate = jest.fn();

const createPost = (tagNames: string[]): IPost => ({
  _id: "post-id",
  nid: 1,
  createdAt: "2026-08-28",
  updatedAt: "2026-08-28",
  title: "기존 제목",
  content: "기존 본문",
  thumbnail: "/thumbnail.png",
  series: null,
  tags: tagNames.map((name, index) => ({
    _id: `tag-${index}`,
    nid: index,
    createdAt: "2026-08-28",
    updatedAt: "2026-08-28",
    name,
    posts: [],
    postCount: 0,
  })),
  isLiked: false,
  likeCount: 0,
  viewCount: 0,
});

const createWriteInput = (tags: string[]): IPostWriteInput => ({
  title: "작성 제목",
  content: "작성 본문",
  thumbnail: "/new-thumbnail.png",
  series: "Frontend",
  tags,
});

const renderPostFooter = (initialData: IPostWriteInput, nid: number | null, post?: IPost) => {
  return render(
    <PostWriteProvider initialData={initialData}>
      <PostFooter nid={nid} post={post} />
    </PostWriteProvider>,
  );
};

const renderTagEditorWithFooter = (initialData: IPostWriteInput, post: IPost) => {
  return render(
    <PostWriteProvider initialData={initialData}>
      <TagEditor />
      <PostFooter nid={post.nid} post={post} />
    </PostWriteProvider>,
  );
};

const addTag = async (tagName: string) => {
  const input = screen.getByPlaceholderText("태그를 입력하세요");

  fireEvent.change(input, { target: { value: tagName } });
  fireEvent.keyDown(input, { key: "Enter" });

  await waitFor(() => expect(screen.getByText(tagName)).toBeInTheDocument());
};

const deleteTag = async (tagName: string) => {
  fireEvent.click(screen.getByText(tagName));

  await waitFor(() => expect(screen.queryByText(tagName)).not.toBeInTheDocument());
};

const createUpdatePayload = (addTags: string[], deleteTags: string[]): IUpdatePostInput => ({
  title: "작성 제목",
  content: "작성 본문",
  thumbnail: "/new-thumbnail.png",
  series: "Frontend",
  addTags,
  deleteTags,
});

describe("PostFooter", () => {
  const confirmSpy = jest.spyOn(window, "confirm");

  beforeEach(() => {
    jest.clearAllMocks();
    confirmSpy.mockReturnValue(true);
    mockUsePostMutation.mockReturnValue(mockMutate as ReturnType<typeof usePostMutation>);
  });

  afterAll(() => {
    confirmSpy.mockRestore();
  });

  it("신규 게시글 저장 시 tags를 포함한 생성 payload를 전달한다", () => {
    const input = createWriteInput(["react", "nextjs"]);

    renderPostFooter(input, null);

    fireEvent.click(screen.getByRole("button", { name: "저장" }));

    const expected: ICreatePostInput = {
      title: "작성 제목",
      content: "작성 본문",
      thumbnail: "/new-thumbnail.png",
      series: "Frontend",
      tags: ["react", "nextjs"],
    };

    expect(mockUsePostMutation).toHaveBeenCalledWith(null);
    expect(mockMutate).toHaveBeenCalledWith(expected);
  });

  it("기존 게시글 저장 시 태그 차집합을 수정 payload로 전달한다", () => {
    const post = createPost(["react", "nextjs"]);
    const input = createWriteInput(["react", "typescript"]);

    renderPostFooter(input, post.nid, post);

    fireEvent.click(screen.getByRole("button", { name: "저장" }));

    const expected: IUpdatePostInput = {
      title: "작성 제목",
      content: "작성 본문",
      thumbnail: "/new-thumbnail.png",
      series: "Frontend",
      addTags: ["typescript"],
      deleteTags: ["nextjs"],
    };

    expect(mockUsePostMutation).toHaveBeenCalledWith(post.nid);
    expect(mockMutate).toHaveBeenCalledWith(expected);
  });

  it("저장을 취소하면 mutation을 호출하지 않는다", () => {
    confirmSpy.mockReturnValue(false);

    renderPostFooter(createWriteInput(["react"]), null);

    fireEvent.click(screen.getByRole("button", { name: "저장" }));

    expect(mockMutate).not.toHaveBeenCalled();
  });
});
