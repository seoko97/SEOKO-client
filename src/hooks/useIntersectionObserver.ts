import { useEffect, useRef } from "react";

import { MARKDOWN_HEADING_SELECTOR } from "@utils/constant/toc";

interface IHeadingElement {
  [key: string]: IntersectionObserverEntry;
}

export const useIntersectionObserver = <T>(
  setActiveId: React.Dispatch<React.SetStateAction<string>>,
  reRender: T,
) => {
  const headingElementsRef = useRef<IHeadingElement>({});

  useEffect(() => {
    headingElementsRef.current = {};

    const callback: IntersectionObserverCallback = (headings) => {
      headingElementsRef.current = headings.reduce<IHeadingElement>((map, headingElement) => {
        if (headingElement.target.id) map[headingElement.target.id] = headingElement;

        return map;
      }, headingElementsRef.current);

      const visibleHeadings: IntersectionObserverEntry[] = [];

      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];

        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id: string) => {
        return headingElements.findIndex((heading) => heading.id === id);
      };

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id),
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, { rootMargin: "-72px 0px -90% 0px" });

    const headingElements = Array.from(document.querySelectorAll(MARKDOWN_HEADING_SELECTOR));

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [reRender]);
};
