import type { HTMLAttributes } from "react";

import { render, screen } from "@testing-library/react";

import MarkdownPre from "@components/ui/Markdown/overrides/pre";

const textPre = {
  id: "text-pre",
  className: "custom-pre",
  content: "일반 코드 블록",
  tagName: "PRE",
};
const codePre = {
  id: "code-pre",
  className: "custom-pre",
  testId: "code-block",
};

interface ICodeBlockProps {
  preProps?: HTMLAttributes<HTMLPreElement>;
}

const CodeBlock = ({ preProps }: ICodeBlockProps) => {
  return (
    <code
      data-testid={codePre.testId}
      data-pre-id={preProps?.id}
      data-pre-class-name={preProps?.className}
    />
  );
};

describe("Markdown pre", () => {
  it("일반 자식은 pre 태그로 렌더링하고 HTML 속성을 유지한다", () => {
    render(
      <MarkdownPre id={textPre.id} className={textPre.className}>
        {textPre.content}
      </MarkdownPre>,
    );

    const pre = screen.getByText(textPre.content);

    expect(pre.tagName).toBe(textPre.tagName);
    expect(pre).toHaveAttribute("id", textPre.id);
    expect(pre).toHaveClass(textPre.className);
  });

  it("React element 자식에 props를 주입한다", () => {
    render(
      <MarkdownPre id={codePre.id} className={codePre.className}>
        <CodeBlock />
      </MarkdownPre>,
    );

    const code = screen.getByTestId(codePre.testId);

    expect(code).toHaveAttribute("data-pre-id", codePre.id);
    expect(code).toHaveAttribute("data-pre-class-name", codePre.className);
  });
});
