"use client";

import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark";
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/esm/languages/prism/css";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import { PrismLight } from "react-syntax-highlighter";

PrismLight.registerLanguage("javascript", javascript);
PrismLight.registerLanguage("js", javascript);
PrismLight.registerLanguage("typescript", typescript);
PrismLight.registerLanguage("ts", typescript);
PrismLight.registerLanguage("jsx", jsx);
PrismLight.registerLanguage("tsx", tsx);
PrismLight.registerLanguage("bash", bash);
PrismLight.registerLanguage("css", css);
PrismLight.registerLanguage("json", json);
PrismLight.registerLanguage("yaml", yaml);

import InlineCode from "./inlineCode";

interface IProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  preProps?: React.HTMLAttributes<HTMLPreElement>;
}

const code = ({ children, className = "", preProps, ...props }: IProps) => {
  const language = className?.replace("lang-", "");

  const isText = language === "txt" || language === "text";
  const { className: preClassName, style: preStyle, ...restPreProps } = preProps ?? {};

  return language ? (
    <PrismLight
      {...restPreProps}
      language={language}
      startingLineNumber={1}
      showLineNumbers={!isText}
      showInlineLineNumbers={true}
      style={oneDark}
      customStyle={preStyle}
      codeTagProps={{ ...props, className: "text-sm" }}
      className={`relative w-full rounded-md !p-4 shadow-md !transition-[background-color] !text-shadow-none ${preClassName ?? ""}`}
    >
      {String(children).replace(/\n$/, "")}
    </PrismLight>
  ) : preProps ? (
    <pre {...preProps}>
      <InlineCode {...props}>{children}</InlineCode>
    </pre>
  ) : (
    <InlineCode {...props}>{children}</InlineCode>
  );
};

export default code;
