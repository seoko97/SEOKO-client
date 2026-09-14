/* eslint-disable @next/next/no-img-element */
import { fireEvent, render, screen } from "@testing-library/react";

import PostItem from "@components/ui/PostList/Item";
import type { IPost } from "@/types";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("@/components/ui/core/Image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

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
      name: "next/js #1",
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

describe("PostItem", () => {
  beforeEach(() => {
    mockPush.mockReset();
  });

  it("태그 클릭 시 태그명을 인코딩해 이동한다", () => {
    render(<PostItem post={post} referenceTime={Date.now()} />);

    fireEvent.click(screen.getByText("next/js #1"));

    expect(mockPush).toHaveBeenCalledWith("/tag/next%2Fjs%20%231");
  });
});
