const getChildrenText = (node: React.ReactElement): string => {
  if (typeof node === "string") {
    const text = (node as string).replace(/[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g, " ");
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
