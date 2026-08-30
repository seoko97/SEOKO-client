import React from "react";

interface IProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
  children: React.ReactNode;
}

const blockquote = ({ children, className, ...props }: IProps) => {
  return (
    <blockquote
      {...props}
      className={`rounded-r border-l-4 border-solid border-gray-400 bg-secondary py-4 pl-8 pr-4 !transition-[background-color] [&>.markdown-paragraph]:m-0 ${className ?? ""}`}
    >
      {children}
    </blockquote>
  );
};

export default blockquote;
