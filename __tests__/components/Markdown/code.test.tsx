/* eslint-disable @typescript-eslint/no-require-imports */
import type { ReactNode } from "react";

import { render, screen } from "@testing-library/react";

const mockOneDark = {};

const mockLanguageModules = [
  {
    name: "javascript",
    path: "react-syntax-highlighter/dist/esm/languages/prism/javascript",
  },
  {
    name: "js",
    path: "react-syntax-highlighter/dist/esm/languages/prism/javascript",
  },
  {
    name: "typescript",
    path: "react-syntax-highlighter/dist/esm/languages/prism/typescript",
  },
  {
    name: "ts",
    path: "react-syntax-highlighter/dist/esm/languages/prism/typescript",
  },
  {
    name: "jsx",
    path: "react-syntax-highlighter/dist/esm/languages/prism/jsx",
  },
  {
    name: "tsx",
    path: "react-syntax-highlighter/dist/esm/languages/prism/tsx",
  },
  {
    name: "bash",
    path: "react-syntax-highlighter/dist/esm/languages/prism/bash",
  },
  {
    name: "sh",
    path: "react-syntax-highlighter/dist/esm/languages/prism/bash",
  },
  {
    name: "css",
    path: "react-syntax-highlighter/dist/esm/languages/prism/css",
  },
  {
    name: "json",
    path: "react-syntax-highlighter/dist/esm/languages/prism/json",
  },
  {
    name: "yaml",
    path: "react-syntax-highlighter/dist/esm/languages/prism/yaml",
  },
  {
    name: "yml",
    path: "react-syntax-highlighter/dist/esm/languages/prism/yaml",
  },
];

const mockPrismLightTestId = "prism-light";

interface IPrismLightProps {
  children: ReactNode;
  language: string;
  showLineNumbers: boolean;
  startingLineNumber: number;
}

const mockPrismLight = Object.assign(
  ({ children, language, showLineNumbers, startingLineNumber }: IPrismLightProps) => (
    <pre
      data-testid={mockPrismLightTestId}
      data-language={language}
      data-show-line-numbers={showLineNumbers}
      data-starting-line-number={startingLineNumber}
    >
      {children}
    </pre>
  ),
  { registerLanguage: jest.fn() },
);

jest.mock("react-syntax-highlighter", () => ({
  PrismLight: mockPrismLight,
}));

jest.mock("react-syntax-highlighter/dist/esm/styles/prism/one-dark", () => ({
  __esModule: true,
  default: mockOneDark,
}));

mockLanguageModules.forEach(({ path: modulePath, name: mockLanguage }) => {
  jest.doMock(modulePath, () => ({
    __esModule: true,
    default: mockLanguage,
  }));
});

const MarkdownCode = require("@/components/ui/Markdown/overrides/code").default;

const typescriptCode = {
  className: "lang-ts",
  content: "const count = 1;\n",
  language: "ts",
  startingLineNumber: "1",
};

const inlineCode = {
  className: "custom-inline-code",
  content: "const count = 1;",
  tagName: "CODE",
};

const plainTextCodes = [
  { className: "lang-txt", language: "txt" },
  { className: "lang-text", language: "text" },
];

describe("Markdown code", () => {
  it("언어가 지정된 코드 블록을 줄 번호와 함께 렌더링한다", () => {
    render(
      <MarkdownCode className={typescriptCode.className}>{typescriptCode.content}</MarkdownCode>,
    );

    const codeBlock = screen.getByTestId(mockPrismLightTestId);

    expect(codeBlock).toHaveAttribute("data-language", typescriptCode.language);
    expect(codeBlock).toHaveAttribute("data-show-line-numbers", "true");
    expect(codeBlock).toHaveAttribute(
      "data-starting-line-number",
      typescriptCode.startingLineNumber,
    );
    expect(codeBlock).toHaveTextContent(typescriptCode.content.trim());
  });

  it("lang- 접두사가 없는 className은 인라인 코드로 렌더링한다", () => {
    render(<MarkdownCode className={inlineCode.className}>{inlineCode.content}</MarkdownCode>);

    const code = screen.getByText(inlineCode.content);

    expect(code.tagName).toBe(inlineCode.tagName);
    expect(screen.queryByTestId(mockPrismLightTestId)).not.toBeInTheDocument();
  });

  it.each(plainTextCodes)(
    "$language 코드 블록은 줄 번호를 표시하지 않는다",
    ({ className, language }) => {
      render(<MarkdownCode className={className}>{inlineCode.content}</MarkdownCode>);

      const codeBlock = screen.getByTestId(mockPrismLightTestId);

      expect(codeBlock).toHaveAttribute("data-language", language);
      expect(codeBlock).toHaveAttribute("data-show-line-numbers", "false");
    },
  );
});
