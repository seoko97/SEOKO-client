import { fireEvent, screen } from "@testing-library/react";

import TagEditor from "@components/ui/client/write/post/Tag";
import { IPost, IPostWriteInput, ITag } from "@/types";

import { expectPostWriteProperty, renderPostWriteEditor } from "../../../utils/postWrite";

const createTag = (name: string, index: number): ITag => ({
  _id: `tag-${index}`,
  nid: index,
  name,
  createdAt: "2026-08-28",
  updatedAt: "2026-08-28",
  posts: [],
  postCount: 0,
});

const createPost = (tagNames: string[]): IPost => ({
  _id: "post-id",
  nid: 1,
  title: "기존 제목",
  content: "기존 본문",
  thumbnail: "/thumbnail.png",
  series: null,
  tags: tagNames.map(createTag),
  createdAt: "2026-08-28",
  updatedAt: "2026-08-28",
  isLiked: false,
  likeCount: 0,
  viewCount: 0,
});

const createWriteInput = (post: IPost): IPostWriteInput => ({
  title: post.title,
  content: post.content,
  thumbnail: post.thumbnail,
  series: post.series?.name,
  tags: post.tags.map((tag) => tag.name),
});

const renderTagEditor = (post: IPost) => {
  return renderPostWriteEditor(<TagEditor />, createWriteInput(post));
};

describe("TagEditor", () => {
  it("Enter 입력으로 새 태그를 추가한다", async () => {
    const post = createPost(["react"]);
    const dataRef = renderTagEditor(post);
    const input = screen.getByPlaceholderText("태그를 입력하세요");

    fireEvent.change(input, { target: { value: "nextjs" } });
    fireEvent.keyDown(input, { key: "Enter" });

    await expectPostWriteProperty(dataRef, "tags", ["react", "nextjs"]);
  });

  it("입력 중인 텍스트가 있으면 Backspace를 눌러도 태그를 삭제하지 않는다", async () => {
    const post = createPost(["react"]);
    const dataRef = renderTagEditor(post);
    const input = screen.getByPlaceholderText("태그를 입력하세요");

    fireEvent.change(input, { target: { value: "입력 중" } });
    fireEvent.keyDown(input, { key: "Backspace" });

    await expectPostWriteProperty(dataRef, "tags", ["react"]);
  });

  it("입력값이 없을 때 Backspace를 누르면 마지막 태그를 삭제한다", async () => {
    const post = createPost(["react", "nextjs"]);
    const dataRef = renderTagEditor(post);
    const input = screen.getByPlaceholderText("태그를 입력하세요");

    fireEvent.keyDown(input, { key: "Backspace" });

    await expectPostWriteProperty(dataRef, "tags", ["react"]);
  });

  it("태그를 클릭하면 해당 태그를 삭제한다", async () => {
    const post = createPost(["react", "nextjs"]);
    const dataRef = renderTagEditor(post);

    fireEvent.click(screen.getByText("react"));

    await expectPostWriteProperty(dataRef, "tags", ["nextjs"]);
  });
});
