import React from "react";

interface IProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

const InlineCode = ({ children, className = "", ...rest }: IProps) => {
  return (
    <code
      {...rest}
      className={`rounded-sm bg-markdown px-2 py-1 text-[0.9em] font-medium text-markdown2 transition-[color,background-color] md:px-[0.4em] md:py-[0.2em] md:text-[0.85em] ${className}`}
    >
      {children}
    </code>
  );
};

export default InlineCode;
