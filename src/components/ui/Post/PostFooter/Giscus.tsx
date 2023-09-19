import React, { useCallback, useState } from "react";
import { useEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import useLocalStorage from "@hooks/useLocalStorage";

const Giscus = () => {
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const [theme] = useLocalStorage<string>("theme");

  const ref = useRef<HTMLDivElement>(null);

  const loadGiscus = useCallback(() => {
    if (!ref.current || !theme) return;

    const dataTheme = theme === "dark" ? "preferred_color_scheme" : "light";

    const scriptElem = document.createElement("script");

    scriptElem.src = "https://giscus.app/client.js";
    scriptElem.async = true;
    scriptElem.crossOrigin = "anonymous";

    scriptElem.setAttribute("data-repo", "seoko97/SEOKO-giscus-test");
    scriptElem.setAttribute("data-repo-id", "R_kgDOKQq8ZQ");
    scriptElem.setAttribute("data-category", "Announcements");
    scriptElem.setAttribute("data-category-id", "DIC_kwDOKQq8Zc4CZJ3K");
    scriptElem.setAttribute("data-mapping", "pathname");
    scriptElem.setAttribute("data-strict", "0");
    scriptElem.setAttribute("data-reactions-enabled", "0");
    scriptElem.setAttribute("data-emit-metadata", "0");
    scriptElem.setAttribute("data-input-position", "bottom");
    scriptElem.setAttribute("data-theme", dataTheme);
    scriptElem.setAttribute("data-lang", "ko");

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

    if (!iframe) return;

    const dataTheme = theme === "dark" ? "preferred_color_scheme" : "light";

    iframe.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: dataTheme } } },
      "https://giscus.app",
    );
  }, [theme]);

  return <div className="w-full" ref={ref} />;
};

export default Giscus;
