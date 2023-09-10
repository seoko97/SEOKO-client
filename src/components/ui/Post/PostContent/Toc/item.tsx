import React, { memo } from "react";

import { IToc } from "@/types/base";

interface IProps {
  item: IToc;
  isActive: boolean;
  onClick: React.MouseEventHandler;
}

const TocItem = ({ item, isActive, onClick }: IProps) => {
  const { id, level, text } = item;

  const className = isActive ? "active" : "";

  return (
    <li
      style={{ paddingLeft: `${level * 0.8}rem` }}
      className={`${className} w-full [&.active>a]:text-primary [&.active]:-translate-x-1`}
    >
      <a
        id={id}
        href={`#${text}`}
        onClick={onClick}
        className="text-slate-400 transition-all hover:text-primary dark:text-slate-400"
      >
        {text}
      </a>
    </li>
  );
};

export default memo(TocItem, (prev, next) => prev.isActive === next.isActive);
