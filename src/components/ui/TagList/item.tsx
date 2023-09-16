import React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Tag = ({ children, ...rest }: IProps) => {
  return (
    <div
      {...rest}
      className="inline-flex cursor-pointer items-center justify-center rounded-md bg-slate-600 px-3 py-1 text-sm font-bold text-slate-50 transition-[color] hover:text-main"
    >
      {children}
    </div>
  );
};

export default Tag;
