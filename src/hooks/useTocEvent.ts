import { useEffect } from "react";

import { IToc } from "@/types/base";

const useTocEvent = (toc: IToc[]) => {
  const scroll = (id: string, behavior: ScrollBehavior = "smooth") => {
    const query = ".markdown > h1,.markdown > h2,.markdown > h3";

    const headingElements = Array.from(document.querySelectorAll(query));

    if (!headingElements.length) return;

    const targetHeading = headingElements.find((heading) => heading.id === id);

    if (!targetHeading) return;

    const scrollY = window.scrollY + targetHeading.getBoundingClientRect().top - 80;

    window.scrollTo({ top: scrollY, behavior, left: 0 });
  };

  const scrollToTargetItem: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement;

    if (!target) return;

    const id = target.id;

    if (!id) return;

    scroll(id);
  };

  useEffect(() => {
    const decodedHash = decodeURI(window.location.hash.slice(1));

    if (!decodedHash) return;

    const item = toc.find((item) => item.id === decodedHash);

    if (!item) return;

    scroll(item.id, "instant");
  }, []);

  return scrollToTargetItem;
};

export { useTocEvent };
