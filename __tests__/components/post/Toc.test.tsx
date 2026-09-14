import { createRef } from "react";
import { render, screen } from "@testing-library/react";

import { extractToc } from "@/utils/markdown";
import { useActiveHeading } from "@/hooks/useActiveHeading";
import Toc from "@/components/ui/client/post/PostContent/Toc";

jest.mock("@/utils/markdown", () => ({
  extractToc: jest.fn(),
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

const mockExtractToc = jest.mocked(extractToc);
const mockUseActiveHeading = jest.mocked(useActiveHeading);
const contentRef = createRef<HTMLDivElement>();

const tocItems = [
  { id: "introduction", text: "소개", level: 0 },
  { id: "installation", text: "설치 방법", level: 1 },
  { id: "usage", text: "사용 방법", level: 2 },
];

describe("Toc", () => {
  it("목차 항목이 없으면 렌더링하지 않는다", () => {
    mockExtractToc.mockReturnValue([]);

    const { container } = render(<Toc markdown={null} contentRef={contentRef} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("목차 항목을 제목과 해시 링크 순서대로 렌더링한다", () => {
    mockExtractToc.mockReturnValue(tocItems);

    render(<Toc markdown={null} contentRef={contentRef} />);

    const links = screen.getAllByRole("link");

    expect(links.map((link) => link.textContent)).toEqual(tocItems.map((item) => item.text));

    links.forEach((link, index) => {
      expect(link).toHaveAttribute("href", `#${tocItems[index].id}`);
      expect(link).toHaveAttribute("data-id", tocItems[index].id);
    });
  });

  it("활성 heading에 해당하는 목차 항목만 활성화한다", () => {
    mockExtractToc.mockReturnValue(tocItems);
    mockUseActiveHeading.mockReturnValue(tocItems[1].id);

    render(<Toc markdown={null} contentRef={contentRef} />);

    const activeItem = screen.getByRole("link", { name: tocItems[1].text }).closest("li");

    const inactiveItems = [
      screen.getByRole("link", { name: tocItems[0].text }).closest("li"),
      screen.getByRole("link", { name: tocItems[2].text }).closest("li"),
    ];

    inactiveItems.forEach((item) => expect(item).not.toHaveClass("active"));

    expect(activeItem).toHaveClass("active");
  });
});
