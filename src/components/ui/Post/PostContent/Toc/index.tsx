import React, { memo, useState } from "react";

import { usePathname } from "next/navigation";

import { getToc } from "@utils/getToc";
import { useTocEvent } from "@hooks/useTocEvent";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import TocItem from "@components/ui/Post/PostContent/Toc/item";

interface IProps {
  markdown: React.ReactNode;
}

const Toc = ({ markdown }: IProps) => {
  const toc = getToc(markdown);
  const pathname = usePathname();

  const [activeId, setActiveId] = useState("");
  const scrollToTargetItem = useTocEvent(toc);

  useIntersectionObserver(setActiveId, pathname);

  if (toc.length === 0) return null;

  return (
    <ul className="flex w-full flex-col gap-2 pl-8 text-sm">
      {toc.map((item) => (
        <TocItem
          key={item.id}
          item={item}
          isActive={item.id === activeId}
          onClick={scrollToTargetItem}
        />
      ))}
    </ul>
  );
};

export default memo(Toc);
