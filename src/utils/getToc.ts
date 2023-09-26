import { ReactNode, JSX } from "react";

import { getChildrenText } from "@utils/getChildrenText";
import { IToc } from "@/types/base";

const getToc = (markdown: ReactNode) => {
  const toc: IToc[] = [];

  const content = markdown as unknown as JSX.Element[];

  content.forEach((el) => {
    const tagname = el?.props?.tagname;

    if (!tagname) return;

    const children = el?.props?.children;

    const text = getChildrenText(children);
    const id = `${tagname}_${text.replace(/\s/g, "_").trim()}`;
    const level = Number(tagname.replace("h", "")) - 1;

    toc.push({ text, id, level });
  });

  return toc;
};

export { getToc };
