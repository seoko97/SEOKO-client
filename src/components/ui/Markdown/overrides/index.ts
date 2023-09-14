import { MarkdownToJSX } from "markdown-to-jsx";

import pre from "@components/ui/Markdown/overrides/pre";
import p from "@components/ui/Markdown/overrides/p";
import img from "@components/ui/Markdown/overrides/img";
import { headings } from "@components/ui/Markdown/overrides/headings";
import code from "@components/ui/Markdown/overrides/code";
import blockquote from "@components/ui/Markdown/overrides/blockquote";

const overrides: MarkdownToJSX.Overrides = {
  code,
  pre,
  blockquote,
  img,
  p,
  ...headings,
};

export default overrides;
