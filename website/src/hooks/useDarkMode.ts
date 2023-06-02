import { useCallback, useEffect, useRef, useState } from "react";

import { ThemeType, darkTheme, lightTheme } from "@/theme";

type TDarkMode = "light" | "dark";
type TResult = () => [TDarkMode | undefined, ThemeType, () => void];

const useDarkMode: TResult = () => {
  const [mode, setMode] = useState<TDarkMode | undefined>(undefined);
  const bodyRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    bodyRef.current = document.body;
    setMode(bodyRef.current.dataset.theme as TDarkMode);
  }, []);

  const onChangeTheme = useCallback(() => {
    if (!bodyRef.current) return;

    const theme = bodyRef.current.dataset.theme === "light" ? "dark" : "light";

    localStorage.setItem("theme", theme);

    bodyRef.current.dataset.theme = theme;
    setMode(theme);
  }, []);

  const theme = mode === "light" ? lightTheme : darkTheme;

  return [mode, theme, onChangeTheme];
};

export default useDarkMode;
