import { render, screen } from "@testing-library/react";

import MarkdownParagraph from "@components/ui/Markdown/overrides/p";

const className = "markdown-paragraph";
const textParagraph = {
  id: "paragraph",
  className: "custom-paragraph",
  content: "일반 문단",
  tagName: "P",
};
const elementParagraph = {
  className: "custom-paragraph",
  content: "강조 문단",
  tagName: "DIV",
};

describe("Markdown paragraph", () => {
  it("텍스트 자식은 p 태그로 렌더링하고 HTML 속성을 유지한다", () => {
    render(
      <MarkdownParagraph id={textParagraph.id} className={textParagraph.className}>
        {textParagraph.content}
      </MarkdownParagraph>,
    );

    const paragraph = screen.getByText(textParagraph.content);

    expect(paragraph.tagName).toBe(textParagraph.tagName);
    expect(paragraph).toHaveAttribute("id", textParagraph.id);
    expect(paragraph).toHaveClass(className, textParagraph.className);
  });

  it("React element 자식은 div 태그로 렌더링한다", () => {
    render(
      <MarkdownParagraph className={elementParagraph.className}>
        <strong>{elementParagraph.content}</strong>
      </MarkdownParagraph>,
    );

    const emphasis = screen.getByText(elementParagraph.content);
    const wrapper = emphasis.parentElement;

    expect(wrapper?.tagName).toBe(elementParagraph.tagName);
    expect(wrapper).toHaveClass(className, elementParagraph.className);
  });
});
