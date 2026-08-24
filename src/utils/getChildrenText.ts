import removeMd from "remove-markdown";

import { isValidElement, type ReactNode } from "react";

const getChildrenText = (node: ReactNode): string => {
  if (typeof node === "string") {
    const text = removeMd(node);
    return text;
  }

  if (Array.isArray(node)) {
    return node.map(getChildrenText).join(" ");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getChildrenText(node.props.children);
  }

  return "";
};

export { getChildrenText };
