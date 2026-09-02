/* eslint-disable @next/next/no-img-element */
import { fireEvent, render, screen } from "@testing-library/react";

import { useGetUserQuery } from "@hooks/query/user";
import { useGetSeriesQuery } from "@hooks/query/series";
import { useGetPostQuery, useDeletePostMutation } from "@hooks/query/post";
import PostHeader from "@components/ui/client/post/PostHeader";
import type { IPost, ISeries } from "@/types";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("@/hooks/query/post", () => ({
  useGetPostQuery: jest.fn(),
  useDeletePostMutation: jest.fn(),
}));

jest.mock("@/hooks/query/series", () => ({
  useGetSeriesQuery: jest.fn(),
}));

jest.mock("@/hooks/query/user", () => ({
  useGetUserQuery: jest.fn(),
}));

jest.mock("@/components/ui/core/Image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

jest.mock("@/components/ui/PostSeriesInfo", () => ({
  __esModule: true,
  default: ({ series }: { series: ISeries }) => <div>{series.name}</div>,
}));

const mockUseGetPostQuery = jest.mocked(useGetPostQuery);
const mockUseDeletePostMutation = jest.mocked(useDeletePostMutation);
const mockUseGetSeriesQuery = jest.mocked(useGetSeriesQuery);
const mockUseGetUserQuery = jest.mocked(useGetUserQuery);
const mockDeletePostMutate = jest.fn();
const confirmSpy = jest.spyOn(window, "confirm");

const post: IPost = {
  _id: "post-id",
  nid: 1,
  title: "title",
  content: "content",
  thumbnail: "/thumbnail.png",
  series: null,
  tags: [
    {
      _id: "tag-id",
      nid: 1,
      name: "react",
      posts: [],
      postCount: 1,
      createdAt: "2025-01-01",
      updatedAt: "2025-01-01",
    },
  ],
  isLiked: false,
  likeCount: 4,
  viewCount: 12,
  createdAt: "2025-01-01",
  updatedAt: "2025-01-01",
};

const series: ISeries = {
  _id: "series-id",
  nid: 2,
  name: "Frontend",
  thumbnail: "/series-thumbnail.png",
  posts: [],
  postCount: 1,
  createdAt: "2025-01-01",
  updatedAt: "2025-01-01",
};

describe("PostHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    confirmSpy.mockReturnValue(true);
    mockUseGetUserQuery.mockReturnValue({ data: null } as ReturnType<typeof useGetUserQuery>);
    mockUseGetSeriesQuery.mockReturnValue({ data: undefined } as ReturnType<
      typeof useGetSeriesQuery
    >);
    mockUseDeletePostMutation.mockReturnValue({
      mutate: mockDeletePostMutate,
    } as unknown as ReturnType<typeof useDeletePostMutation>);
  });

  afterAll(() => {
    confirmSpy.mockRestore();
  });

  it("데이터가 없으면 렌더링하지 않는다", () => {
    mockUseGetPostQuery.mockReturnValue({ data: undefined } as ReturnType<typeof useGetPostQuery>);

    const { container } = render(<PostHeader nid={1} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("기본 정보를 렌더링한다", () => {
    mockUseGetPostQuery.mockReturnValue({ data: post } as ReturnType<typeof useGetPostQuery>);

    render(<PostHeader nid={post.nid} />);

    expect(screen.getByAltText("post-thumbnail")).toHaveAttribute("src", post.thumbnail);
    expect(screen.getByRole("heading", { name: post.title })).toBeInTheDocument();
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText(String(post.viewCount))).toBeInTheDocument();
    expect(screen.getByText(String(post.likeCount))).toBeInTheDocument();
  });

  it("태그 클릭 시 태그 페이지로 이동한다", () => {
    mockUseGetPostQuery.mockReturnValue({ data: post } as ReturnType<typeof useGetPostQuery>);

    render(<PostHeader nid={post.nid} />);

    fireEvent.click(screen.getByText("react"));

    expect(mockPush).toHaveBeenCalledWith("/tag/react");
  });

  it("로그인한 사용자에게만 수정과 삭제 메뉴를 표시한다", () => {
    mockUseGetPostQuery.mockReturnValue({ data: post } as ReturnType<typeof useGetPostQuery>);

    const { rerender } = render(<PostHeader nid={post.nid} />);

    expect(screen.queryByRole("button", { name: "수정" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "삭제" })).not.toBeInTheDocument();

    mockUseGetUserQuery.mockReturnValue({ data: "seoko" } as ReturnType<typeof useGetUserQuery>);

    rerender(<PostHeader nid={post.nid} />);

    expect(screen.getByRole("button", { name: "수정" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "삭제" })).toBeInTheDocument();
  });

  it("수정 클릭 시 게시글 수정 페이지로 이동한다", () => {
    mockUseGetPostQuery.mockReturnValue({ data: post } as ReturnType<typeof useGetPostQuery>);
    mockUseGetUserQuery.mockReturnValue({ data: "seoko" } as ReturnType<typeof useGetUserQuery>);

    render(<PostHeader nid={post.nid} />);

    fireEvent.click(screen.getByRole("button", { name: "수정" }));

    expect(mockPush).toHaveBeenCalledWith(`/write/post/${post.nid}`);
  });

  it("삭제를 취소하면 삭제 mutation을 호출하지 않는다", () => {
    confirmSpy.mockReturnValue(false);
    mockUseGetPostQuery.mockReturnValue({ data: post } as ReturnType<typeof useGetPostQuery>);
    mockUseGetUserQuery.mockReturnValue({ data: "seoko" } as ReturnType<typeof useGetUserQuery>);

    render(<PostHeader nid={post.nid} />);

    fireEvent.click(screen.getByRole("button", { name: "삭제" }));

    expect(mockDeletePostMutate).not.toHaveBeenCalled();
  });

  it("삭제를 확인하면 삭제 mutation을 호출한다", () => {
    mockUseGetPostQuery.mockReturnValue({ data: post } as ReturnType<typeof useGetPostQuery>);
    mockUseGetUserQuery.mockReturnValue({ data: "seoko" } as ReturnType<typeof useGetUserQuery>);

    render(<PostHeader nid={post.nid} />);

    fireEvent.click(screen.getByRole("button", { name: "삭제" }));

    expect(mockDeletePostMutate).toHaveBeenCalledTimes(1);
  });

  it("시리즈 정보가 있을 때만 렌더링한다", () => {
    mockUseGetPostQuery.mockReturnValue({ data: post } as ReturnType<typeof useGetPostQuery>);

    const { rerender } = render(<PostHeader nid={post.nid} />);

    expect(screen.queryByText(series.name)).not.toBeInTheDocument();

    mockUseGetPostQuery.mockReturnValue({
      data: { ...post, series },
    } as ReturnType<typeof useGetPostQuery>);
    mockUseGetSeriesQuery.mockReturnValue({ data: series } as ReturnType<typeof useGetSeriesQuery>);

    rerender(<PostHeader nid={post.nid} />);

    expect(mockUseGetSeriesQuery).toHaveBeenCalledWith(series.nid);
    expect(screen.getByText(series.name)).toBeInTheDocument();
  });
});
