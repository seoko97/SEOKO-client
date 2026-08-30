import React from "react";

interface IProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
  children: React.ReactNode;
}

const blockquote = ({ children, className, ...props }: IProps) => {
  return (
    <blockquote
      {...props}
      className={`border-l-4 border-solid border-gray-400 bg-secondary px-6 py-4 !transition-[background-color] [&>p]:m-0 ${className ?? ""}`}
    >
      {children}
    </blockquote>
  );
};

export default blockquote;
