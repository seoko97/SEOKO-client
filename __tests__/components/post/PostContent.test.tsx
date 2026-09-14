import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";

import { useGetPostQuery } from "@hooks/query/post";
import PostContent from "@components/ui/client/post/PostContent";

jest.mock("@/hooks/query/post", () => ({
  useGetPostQuery: jest.fn(),
}));

jest.mock("@/components/ui/client/post/PostContent/Like", () => ({
  __esModule: true,
  default: () => null,
}));

jest.mock("next/navigation", () => ({
  usePathname: () => "/post/1",
}));

jest.mock("@/hooks/useActiveHeading", () => ({
  useActiveHeading: jest.fn(),
}));

jest.mock("@/hooks/useTocEvent", () => ({
  useTocEvent: () => jest.fn(),
}));

jest.mock("@/components/ui/Markdown/overrides/code", () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => <code>{children}</code>,
}));

const mockUseGetPostQuery = jest.mocked(useGetPostQuery);

describe("PostContent", () => {
  it("문단으로 구분된 Markdown 텍스트를 p 태그로 렌더링한다", () => {
    mockUseGetPostQuery.mockReturnValue({
      data: {
        content: "첫 번째 문단입니다.\n\n두 번째 문단입니다.",
        isLiked: false,
      },
    } as ReturnType<typeof useGetPostQuery>);

    render(<PostContent nid={1} />);

    const paragraphs = [
      screen.getByText("첫 번째 문단입니다."),
      screen.getByText("두 번째 문단입니다."),
    ];

    paragraphs.forEach((paragraph) => {
      expect(paragraph.tagName).toBe("P");
      expect(paragraph).toHaveClass("markdown-paragraph");
    });
  });

  it("제목 id와 Toc 링크를 동일한 slug로 렌더링한다", () => {
    mockUseGetPostQuery.mockReturnValue({
      data: {
        content: "# 소개\n\n## 설치 방법",
        isLiked: false,
      },
    } as ReturnType<typeof useGetPostQuery>);

    render(<PostContent nid={1} />);

    const introduction = screen.getByRole("heading", { name: "소개" });
    const installation = screen.getByRole("heading", { name: "설치 방법" });

    expect(introduction).toHaveAttribute("id", "소개");
    expect(installation).toHaveAttribute("id", "설치-방법");
    expect(screen.getByRole("link", { name: "소개" })).toHaveAttribute("href", "#소개");
    expect(screen.getByRole("link", { name: "설치 방법" })).toHaveAttribute("href", "#설치-방법");
  });

  it("중복된 제목에 고유한 slug와 Toc 링크를 생성한다", () => {
    mockUseGetPostQuery.mockReturnValue({
      data: {
        content: "# 소개\n\n## 소개",
        isLiked: false,
      },
    } as ReturnType<typeof useGetPostQuery>);

    render(<PostContent nid={1} />);

    const headings = screen.getAllByRole("heading", { name: "소개" });
    const links = screen.getAllByRole("link", { name: "소개" });

    expect(headings[0]).toHaveAttribute("id", "소개");
    expect(headings[1]).toHaveAttribute("id", "소개-2");
    expect(links[0]).toHaveAttribute("href", "#소개");
    expect(links[1]).toHaveAttribute("href", "#소개-2");
  });

  it("Alert를 override 컴포넌트로 렌더링한다", () => {
    mockUseGetPostQuery.mockReturnValue({
      data: {
        content: '<Alert type="info">알림 내용입니다.</Alert>',
        isLiked: false,
      },
    } as ReturnType<typeof useGetPostQuery>);

    render(<PostContent nid={1} />);

    expect(screen.getByText("알림 내용입니다.")).toHaveClass("border-[#4433ff]");
  });

  it("Markdown 이미지를 src와 alt를 유지해 렌더링한다", () => {
    mockUseGetPostQuery.mockReturnValue({
      data: {
        content: "![테스트](/profile.png)",
        isLiked: false,
      },
    } as ReturnType<typeof useGetPostQuery>);

    render(<PostContent nid={1} />);

    const image = screen.getByAltText("테스트");

    expect(image).toHaveAttribute("src", "/profile.png");
  });

  it("인라인 코드와 코드 블록의 텍스트를 렌더링한다", () => {
    mockUseGetPostQuery.mockReturnValue({
      data: {
        content: "인라인 `const name = 'seoko'` 코드입니다.\n\n```ts\nconst count = 1;\n```",
        isLiked: false,
      },
    } as ReturnType<typeof useGetPostQuery>);

    render(<PostContent nid={1} />);

    expect(screen.getByText("const name = 'seoko'")).toHaveProperty("tagName", "CODE");
    expect(screen.getByText("const count = 1;")).toBeInTheDocument();
  });

  it("데이터가 없으면 콘텐츠를 렌더링하지 않는다", () => {
    mockUseGetPostQuery.mockReturnValue({ data: undefined } as ReturnType<typeof useGetPostQuery>);

    const { container } = render(<PostContent nid={1} />);

    expect(container).toBeEmptyDOMElement();
  });
});
