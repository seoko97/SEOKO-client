import removeMd from "remove-markdown";

const getChildrenText = (node: React.ReactElement): string => {
  if (typeof node === "string") {
    const text = removeMd(node);
    return text;
  }

  if (Array.isArray(node)) {
    return node.map(getChildrenText).join(" ");
  }

  if (typeof node === "object" && node !== null && node.props) {
    return getChildrenText(node.props.children);
  }

  return "";
};

export { getChildrenText };
