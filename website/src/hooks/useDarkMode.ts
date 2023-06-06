import { useCallback, useEffect, useRef, useState } from "react";

type TDarkMode = "light" | "dark";
type TResult = () => [TDarkMode | undefined, () => void];

const useDarkMode: TResult = () => {
  const [mode, setMode] = useState<TDarkMode | undefined>(undefined);
  const bodyRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    bodyRef.current = document.body;

    const theme = localStorage.getItem("theme") as TDarkMode;

    setMode(theme);
  }, []);

  const onChangeTheme = useCallback(() => {
    if (!mode || !bodyRef.current) return;

    const theme = mode === "light" ? "dark" : "light";

    bodyRef.current.dataset.theme = theme;

    localStorage.setItem("theme", theme);

    setMode(theme);
  }, [mode]);

  return [mode, onChangeTheme];
};

export type { TDarkMode };
export default useDarkMode;
