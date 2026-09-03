import { extractToc } from "@utils/markdown";
import { useTocEvent } from "@hooks/useTocEvent";
import { useActiveHeading } from "@hooks/useActiveHeading";
import TocItem from "@components/ui/client/post/PostContent/Toc/item";

interface IProps {
  markdown: React.ReactNode;
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const Toc = ({ markdown, contentRef }: IProps) => {
  const toc = extractToc(markdown);
  const activeId = useActiveHeading(toc, contentRef);
  const scrollToTargetItem = useTocEvent(toc, contentRef);

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
