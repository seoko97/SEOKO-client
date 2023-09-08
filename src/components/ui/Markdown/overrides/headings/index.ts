import { MarkdownToJSX } from "markdown-to-jsx";

import heading from "./headings";

interface IHeading {
  [key: string]: MarkdownToJSX.Override;
}

export const headings = ["h1", "h2", "h3", "h4", "h5", "h6"].reduce<IHeading>((acc, tagname) => {
  acc[tagname] = {
    component: heading,
    props: {
      tagname,
    },
  };
  return acc;
}, {});
