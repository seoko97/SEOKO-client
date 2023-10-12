import { ReactNode, JSX } from "react";

import { getChildrenText } from "@utils/getChildrenText";
import { IToc } from "@/types/base";

const removeSpecialCharacters = (text: string) => {
  return text
    .replace(/[^a-zA-Z0-9가-힣\s]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s/g, "-")
    .toLowerCase()
    .trim();
};

const getToc = (markdown: ReactNode) => {
  const toc: IToc[] = [];

  const content = markdown as unknown as JSX.Element[];

  content.forEach((el) => {
    const tagname = el?.props?.tagname;

    if (!tagname) return;

    const children = el?.props?.children;

    const text = getChildrenText(children);
    const id = removeSpecialCharacters(text);
    const level = Number(tagname.replace("h", "")) - 1;

    if (level > 2) return;

    toc.push({ text, id, level });
  });

  return toc;
};

export { getToc, removeSpecialCharacters };
