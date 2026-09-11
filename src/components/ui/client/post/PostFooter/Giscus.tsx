import { useEffect, useRef, useState } from "react";

import { usePathname } from "next/navigation";

import { THEME } from "@utils/constant/theme";
import { GISCUS } from "@utils/constant/env";
import useThemeStorage from "@hooks/useThemeStorage";

const Giscus = () => {
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const theme = useThemeStorage()[0] || THEME.light;

  const ref = useRef<HTMLDivElement>(null);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const container = ref.current;

    if (!container) {
      return;
    }

    setMounted(false);
    container.replaceChildren();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        observer.unobserve(entry.target);

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
        scriptElem.setAttribute("data-theme", themeRef.current);
        scriptElem.setAttribute("data-lang", GISCUS.lang);

        container.appendChild(scriptElem);
        setMounted(true);
      },
      { threshold: 0.5 },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const iframe = ref.current?.querySelector<HTMLIFrameElement>("iframe.giscus-frame");

    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, "https://giscus.app");
  }, [mounted, theme]);

  return <div className="w-full" ref={ref} />;
};

export default Giscus;
