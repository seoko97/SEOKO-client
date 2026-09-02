import React from "react";

interface IProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

interface ICodeProps {
  preProps?: React.HTMLAttributes<HTMLPreElement>;
}

const pre = ({ children, ...props }: IProps) => {
  if (!React.isValidElement(children)) {
    return <pre {...props}>{children}</pre>;
  }

  return React.cloneElement(children as React.ReactElement<ICodeProps>, { preProps: props });
};

export default pre;
