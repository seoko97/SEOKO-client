import {
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

interface IProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

interface ICodeProps {
  preProps?: HTMLAttributes<HTMLPreElement>;
}

const pre = ({ children, ...props }: IProps) => {
  if (!isValidElement(children)) {
    return <pre {...props}>{children}</pre>;
  }

  return cloneElement(children as ReactElement<ICodeProps>, { preProps: props });
};

export default pre;
