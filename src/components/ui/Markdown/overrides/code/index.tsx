"use client";

import React from "react";

import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";

import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism-light";

import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";

SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("json", json);

import InlineCode from "./inlineCode";

interface IProps extends React.HTMLAttributes<HTMLElement> {
  children: string;
}

const code = ({ children, className = "", ...props }: IProps) => {
  const language = className.replace("lang-", "");

  const isText = language === "txt" || language === "text";
  const TXT_CLASS = isText
    ? "!text-markdown1 !transition-[color,background-color] !bg-markdown"
    : "";

  return language ? (
    <SyntaxHighlighter
      language={language}
      startingLineNumber={1}
      showLineNumbers={!isText}
      showInlineLineNumbers={true}
      style={oneDark}
      codeTagProps={{
        className: "text-sm",
      }}
      className={`relative w-full rounded-md !p-4 shadow-md !transition-[background-color] ${TXT_CLASS}`}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <InlineCode {...props}>{children}</InlineCode>
  );
};

export default code;
