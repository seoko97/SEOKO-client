import React, { memo } from "react";

import { compiler } from "markdown-to-jsx";

import overrides from "@components/ui/Markdown/overrides";

interface IProps {
  isMarked?: boolean;
  content: string | JSX.Element;
}

const Viewer = ({ content, isMarked = false }: IProps) => {
  const markdown = isMarked ? content : compiler(content as string, { wrapper: null, overrides });

  return <div className="markdown w-[theme(screens.md.max)] md:w-full">{markdown}</div>;
};

export default memo(Viewer, (prev, next) => prev.content === next.content);
