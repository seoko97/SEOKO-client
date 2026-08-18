import React, { useCallback, useState } from "react";
import { useEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import { GISCUS } from "@utils/constant/env";
import useLocalStorage from "@hooks/useLocalStorage";

const LIGHT = "light" as const;

const Giscus = () => {
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const theme = useLocalStorage<string>("theme")[0] || LIGHT;

  const ref = useRef<HTMLDivElement>(null);

  const loadGiscus = useCallback(() => {
    if (!ref.current || !theme) return;

    const scriptElem = document.createElement("script");

    scriptElem.src = GISCUS.src;
    scriptElem.async = true;
    scriptElem.crossOrigin = GISCUS.crossOrigin;

    scriptElem.setAttribute("data-repo", GISCUS.repo);
    scriptElem.setAttribute("data-repo-id", GISCUS.repoId);
    scriptElem.setAttribute("data-category", GISCUS.category);
    scriptElem.setAttribute("data-category-id", GISCUS.categoryId);
    scriptElem.setAttribute("data-mapping", GISCUS.mapping);
    scriptElem.setAttribute("data-strict", GISCUS.strict);
    scriptElem.setAttribute("data-reactions-enabled", GISCUS.reactionsEnabled);
    scriptElem.setAttribute("data-emit-metadata", GISCUS.emitMetadata);
    scriptElem.setAttribute("data-input-position", GISCUS.inputPosition);
    scriptElem.setAttribute("data-theme", theme);
    scriptElem.setAttribute("data-lang", GISCUS.lang);

    ref.current?.appendChild(scriptElem);
  }, [theme, ref.current]);

  useEffect(() => {
    if (mounted) return;

    if (!ref.current || !theme) return;

    if (ref.current.firstChild) ref.current.removeChild(ref.current.firstChild);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.unobserve(entry.target);
        setMounted(true);
        loadGiscus();
      },
      { threshold: 0.5 },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [pathname, theme]);

  useEffect(() => {
    if (!mounted) return;

    const iframe = document.querySelector<HTMLIFrameElement>("iframe.giscus-frame");

    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, "https://giscus.app");
  }, [theme]);

  return <div className="w-full" ref={ref} />;
};

export default Giscus;
