/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";

import { useGetPostQuery } from "@hooks/query/post";
import Post from "@components/ui/client/write/post";
import { IPost } from "@/types";

jest.mock("next/dynamic", () => ({
  __esModule: true,
  default: () => () => <div data-testid="markdown-editor" />,
}));

jest.mock("@/hooks/query/post", () => ({
  useGetPostQuery: jest.fn(),
}));

jest.mock("@/hooks/query/image", () => ({
  useUploadImage: ({ defaultImg }: { defaultImg?: string }) => ({
    image: defaultImg,
    changeImage: jest.fn(),
    clearImage: jest.fn(),
  }),
}));

jest.mock("@/components/ui/client/write/post/Footer", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("@/components/ui/core/Image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

const mockUseGetPostQuery = jest.mocked(useGetPostQuery);

const post: IPost = {
  _id: "post-id",
  nid: 1,
  title: "기존 게시글 제목",
  content: "기존 게시글 본문",
  thumbnail: "/existing-thumbnail.png",
  series: {
    _id: "series-id",
    nid: 1,
    name: "Frontend",
    thumbnail: "/series-thumbnail.png",
    posts: [],
    postCount: 0,
    createdAt: "2026-08-28",
    updatedAt: "2026-08-28",
  },
  tags: [
    {
      _id: "tag-id",
      nid: 1,
      name: "react",
      posts: [],
      postCount: 0,
      createdAt: "2026-08-28",
      updatedAt: "2026-08-28",
    },
  ],
  isLiked: false,
  likeCount: 0,
  viewCount: 0,
  createdAt: "2026-08-28",
  updatedAt: "2026-08-28",
};

describe("Post", () => {
  beforeEach(() => {
    mockUseGetPostQuery.mockReturnValue({ data: post } as ReturnType<typeof useGetPostQuery>);
  });

  it("기존 게시글의 제목, 태그, 시리즈, 썸네일 초기값을 표시한다", () => {
    render(<Post nid={post.nid} />);

    expect(screen.getByPlaceholderText("제목을 입력하세요")).toHaveValue(post.title);
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByAltText("thumbnail")).toHaveAttribute("src", post.thumbnail);
  });
});
