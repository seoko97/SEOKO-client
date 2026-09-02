import removeMd from "remove-markdown";
import { ReactNode, JSX } from "react";

import { compiler } from "markdown-to-jsx";

import { getChildrenText } from "@utils/getChildrenText";
import overrides from "@components/ui/Markdown/overrides";
import { IToc } from "@/types/base";

const removeSpecialCharacters = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const createHeadingSlug = () => {
  const slugCounts = new Map<string, number>();

  return (text: string) => {
    const baseSlug = removeSpecialCharacters(removeMd(text)) || "heading";
    const count = slugCounts.get(baseSlug) ?? 0;

    slugCounts.set(baseSlug, count + 1);

    return count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;
  };
};

const getToc = (markdown: ReactNode) => {
  const toc: IToc[] = [];

  const content = markdown as unknown as JSX.Element[];

  content.forEach((el) => {
    const tagname = typeof el?.type === "string" ? el.type : undefined;

    if (!tagname || !/^h[1-6]$/.test(tagname)) return;

    const children = el?.props?.children;

    const text = getChildrenText(children);
    const id = el?.props?.id ?? (removeSpecialCharacters(text) || "heading");
    const level = Number(tagname.replace("h", "")) - 1;

    if (level > 2) return;

    toc.push({ text, id, level });
  });

  return toc;
};

const compileMarkdown = (content: string) => {
  return compiler(content, {
    wrapper: null,
    overrides,
    slugify: createHeadingSlug(),
  });
};

export { createHeadingSlug, getToc, removeSpecialCharacters, compileMarkdown };
