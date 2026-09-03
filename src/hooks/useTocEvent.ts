import { useEffect } from "react";

import { MARKDOWN_HEADING_SELECTOR } from "@utils/constant/toc";
import { IToc } from "@/types/base";

const useTocEvent = (toc: IToc[], contentRef: React.RefObject<HTMLElement | null>) => {
  const scroll = (id: string, behavior: ScrollBehavior = "smooth") => {
    const headingElements = Array.from(
      contentRef?.current?.querySelectorAll<HTMLElement>(MARKDOWN_HEADING_SELECTOR) || [],
    );

    if (!headingElements.length) return;

    const targetHeading = headingElements.find((heading) => heading.id === id);

    if (!targetHeading) return;

    const scrollY = window.scrollY + targetHeading.getBoundingClientRect().top - 80;

    window.scrollTo({ top: scrollY, behavior, left: 0 });
  };

  const scrollToTargetItem: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    const id = e.currentTarget.dataset.id;

    if (!id) return;

    scroll(id);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    let decodedHash = "";

    try {
      decodedHash = decodeURI(url.hash.slice(1));
    } catch {
      return;
    }

    if (!decodedHash) return;

    const item = toc.find((item) => item.id === decodedHash);

    if (!item) return;

    scroll(item.id, "instant");
  }, []);

  return scrollToTargetItem;
};

export { useTocEvent };
