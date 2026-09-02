import { useState } from "react";

import { usePathname } from "next/navigation";

import { extractToc } from "@utils/markdown";
import { useTocEvent } from "@hooks/useTocEvent";
import { useIntersectionObserver } from "@hooks/useIntersectionObserver";
import TocItem from "@components/ui/client/post/PostContent/Toc/item";

interface IProps {
  markdown: React.ReactNode;
}

const Toc = ({ markdown }: IProps) => {
  const toc = extractToc(markdown);
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

export default Toc;
