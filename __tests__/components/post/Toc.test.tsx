import { render, screen } from "@testing-library/react";

import { extractToc } from "@/utils/markdown";
import Toc from "@/components/ui/client/post/PostContent/Toc";

jest.mock("@/utils/markdown", () => ({
  extractToc: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  usePathname: () => "/post/1",
}));

jest.mock("@/hooks/useIntersectionObserver", () => ({
  useIntersectionObserver: jest.fn(),
}));

jest.mock("@/hooks/useTocEvent", () => ({
  useTocEvent: () => jest.fn(),
}));

const mockExtractToc = jest.mocked(extractToc);

const tocItems = [
  { id: "introduction", text: "소개", level: 0 },
  { id: "installation", text: "설치 방법", level: 1 },
  { id: "usage", text: "사용 방법", level: 2 },
];

describe("Toc", () => {
  it("목차 항목이 없으면 렌더링하지 않는다", () => {
    mockExtractToc.mockReturnValue([]);

    const { container } = render(<Toc markdown={null} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("목차 항목을 제목과 해시 링크 순서대로 렌더링한다", () => {
    mockExtractToc.mockReturnValue(tocItems);

    render(<Toc markdown={null} />);

    const links = screen.getAllByRole("link");

    expect(links.map((link) => link.textContent)).toEqual(tocItems.map((item) => item.text));

    links.forEach((link, index) => {
      expect(link).toHaveAttribute("href", `#${tocItems[index].id}`);
      expect(link).toHaveAttribute("data-id", tocItems[index].id);
    });
  });
});
