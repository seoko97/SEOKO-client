import { useEffect, useRef } from "react";

import { MARKDOWN_HEADING_SELECTOR } from "@utils/constant/toc";
import { IToc } from "@/types/base";

const useTocEvent = (toc: IToc[], contentRef: React.RefObject<HTMLElement | null>) => {
  const didScrollRef = useRef<boolean>(false);

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
    if (didScrollRef.current) return;

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

    const headings = Array.from(
      contentRef.current?.querySelectorAll<HTMLElement>(MARKDOWN_HEADING_SELECTOR) ?? [],
    );

    const target = headings.find((heading) => heading.id === item.id);

    if (!target) return;

    window.scrollTo({
      top: window.scrollY + target.getBoundingClientRect().top - 80,
      behavior: "instant",
      left: 0,
    });
    didScrollRef.current = true;
  }, [toc, contentRef]);

  return scrollToTargetItem;
};

export { useTocEvent };
