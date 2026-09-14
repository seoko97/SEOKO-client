import { render, screen, within } from "@testing-library/react";

import { useGetSiblingPostQuery } from "@hooks/query/post";
import SiblingPost from "@components/ui/client/post/PostFooter/SiblingPost";
import { IPost } from "@/types";

jest.mock("@/hooks/query/post", () => ({
  useGetSiblingPostQuery: jest.fn(),
}));

const mockUseGetSiblingPostQuery = jest.mocked(useGetSiblingPostQuery);

const post: IPost = {
  _id: "post-id",
  nid: 2,
  title: "title",
  content: "content",
  thumbnail: "/thumbnail.png",
  series: null,
  tags: [],
  isLiked: false,
  likeCount: 4,
  viewCount: 12,
  createdAt: "2025-01-01",
  updatedAt: "2025-01-01",
};

const prevPost: IPost = {
  ...post,
  _id: "prev-id",
  nid: 1,
  title: "prev-title",
};

const nextPost: IPost = {
  ...post,
  _id: "next-id",
  nid: 3,
  title: "next-title",
};

describe("SiblingPost", () => {
  it("이전·다음 게시글 데이터가 없으면 렌더링하지 않는다", () => {
    mockUseGetSiblingPostQuery.mockReturnValue({
      data: undefined,
    } as ReturnType<typeof useGetSiblingPostQuery>);

    const { container } = render(<SiblingPost nid={post.nid} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("이전·다음 게시글 데이터를 렌더링한다", () => {
    mockUseGetSiblingPostQuery.mockReturnValue({
      data: { prev: prevPost, next: nextPost },
    } as ReturnType<typeof useGetSiblingPostQuery>);

    render(<SiblingPost nid={post.nid} />);

    const prevLink = screen.getByRole("link", { name: new RegExp(prevPost.title) });
    const nextLink = screen.getByRole("link", { name: new RegExp(nextPost.title) });

    expect(within(prevLink).getByText("PREV")).toBeInTheDocument();
    expect(prevLink).toHaveAttribute("href", `/post/${prevPost.nid}`);

    expect(within(nextLink).getByText("NEXT")).toBeInTheDocument();
    expect(nextLink).toHaveAttribute("href", `/post/${nextPost.nid}`);
  });

  it("이전 게시글 데이터만 있으면 이전 게시글만 렌더링한다", () => {
    mockUseGetSiblingPostQuery.mockReturnValue({
      data: { prev: prevPost, next: null },
    } as ReturnType<typeof useGetSiblingPostQuery>);

    render(<SiblingPost nid={post.nid} />);

    const prevLink = screen.getByRole("link", { name: new RegExp(prevPost.title) });
    const nextLink = screen.queryByRole("link", { name: new RegExp(nextPost.title) });

    expect(prevLink).toBeInTheDocument();
    expect(nextLink).not.toBeInTheDocument();
  });

  it("다음 게시글 데이터만 있으면 다음 게시글만 렌더링한다", () => {
    mockUseGetSiblingPostQuery.mockReturnValue({
      data: { prev: null, next: nextPost },
    } as ReturnType<typeof useGetSiblingPostQuery>);

    render(<SiblingPost nid={post.nid} />);

    const prevLink = screen.queryByRole("link", { name: new RegExp(prevPost.title) });
    const nextLink = screen.getByRole("link", { name: new RegExp(nextPost.title) });

    expect(prevLink).not.toBeInTheDocument();
    expect(nextLink).toBeInTheDocument();
  });
});
