import React from "react";

interface IProps extends React.HTMLAttributes<HTMLElement> {
  children: React.JSX.Element;
}

const pre = ({ children }: IProps) => {
  const language = children.props.className.replace("lang-", "");

  if (language) {
    return <>{children}</>;
  }

  return <pre>{children}</pre>;
};

export default pre;
