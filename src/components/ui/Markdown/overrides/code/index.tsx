import React from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import InlineCode from "./inlineCode";

interface IProps extends React.HTMLAttributes<HTMLElement> {
  children: string;
}

const code = ({ children, className = "", ...props }: IProps) => {
  const language = className.replace("lang-", "");

  return language ? (
    <SyntaxHighlighter
      language={language}
      showLineNumbers={true}
      startingLineNumber={1}
      codeTagProps={{
        className:
          "text-sm !text-markdown1 !transition-[color] !drop-shadow-none !text-shadow-none",
      }}
      className={`relative w-full rounded-md !bg-markdown shadow-md !transition-[background-color]`}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <InlineCode {...props}>{children}</InlineCode>
  );
};

export default code;
