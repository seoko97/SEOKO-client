import React from "react";
import { useEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import useLocalStorage from "@hooks/useLocalStorage";

const Giscus = () => {
  const pathname = usePathname();
  const [theme] = useLocalStorage<string>("theme");

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !theme) return;

    if (ref.current.firstChild) ref.current.removeChild(ref.current.firstChild);

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

    ref.current.appendChild(scriptElem);
  }, [pathname, theme]);

  return <div className="w-full" ref={ref} />;
};

export default Giscus;
