import { useEffect, useRef, useState } from "react";

import { MARKDOWN_HEADING_SELECTOR } from "@utils/constant/toc";

const HEADER_OFFSET = 100 as const;

const useActiveHeading = <T>(
  headingVersion: T,
  contentRef: React.RefObject<HTMLElement | null> = { current: null },
) => {
  const [activeId, setActiveId] = useState("");

  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const headingElements = Array.from(
      contentRef.current?.querySelectorAll<HTMLElement>(MARKDOWN_HEADING_SELECTOR) || [],
    );

    const updateActiveHeading = () => {
      if (animationFrameRef.current !== null) return;

      animationFrameRef.current = requestAnimationFrame(() => {
        let activeId = "";

        for (const heading of headingElements) {
          if (heading.getBoundingClientRect().top > HEADER_OFFSET) break;

          activeId = heading.id;
        }

        setActiveId((previousId) => (previousId === activeId ? previousId : activeId));
        animationFrameRef.current = null;
      });
    };

    updateActiveHeading();

    window.addEventListener("scroll", updateActiveHeading, { passive: true });
    window.addEventListener("resize", updateActiveHeading);

    return () => {
      window.removeEventListener("scroll", updateActiveHeading);
      window.removeEventListener("resize", updateActiveHeading);

      if (animationFrameRef.current === null) return;

      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    };
  }, [headingVersion, setActiveId]);

  return activeId;
};

export { useActiveHeading };
