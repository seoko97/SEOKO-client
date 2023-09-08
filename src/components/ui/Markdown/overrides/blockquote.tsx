import React from "react";

interface IProps {
  children: React.ReactNode;
}

const blockquote = ({ children }: IProps) => {
  return (
    <blockquote className="border-l-4 border-solid border-gray-400 bg-secondary px-6 py-4 !transition-[background-color] [&>p]:m-0">
      {children}
    </blockquote>
  );
};

export default blockquote;
