import { useEffect } from "react";

import useLocalStorage from "@/hooks/useLocalStorage";

type TDarkMode = "light" | "dark";

const useDarkMode = () => {
  const [mode, setMode] = useLocalStorage<TDarkMode | undefined>("theme");

  useEffect(() => {
    const html = document.documentElement;

    const theme = (html.dataset.theme || localStorage.getItem("theme") || "light") as TDarkMode;

    setMode(theme);
  }, []);

  useEffect(() => {
    if (!mode) return;

    const html = document.documentElement;

    html.dataset.theme = mode;
  }, [mode]);

  function onChangeTheme() {
    if (!mode) return;

    const theme = mode === "light" ? "dark" : "light";

    setMode(theme);
  }

  return [mode, onChangeTheme] as const;
};

export type { TDarkMode };
export default useDarkMode;
