import { useCallback, useEffect, useRef, useState } from "react";

type TDarkMode = "light" | "dark";
type TResult = () => [TDarkMode | undefined, () => void];

const useDarkMode: TResult = () => {
  const [mode, setMode] = useState<TDarkMode | undefined>(undefined);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    rootRef.current = document.body;

    const theme = localStorage.getItem("theme") as TDarkMode;

    if (theme) setMode(theme);

    const storageListener = (e: StorageEvent) => {
      if (e.key !== "theme" || !rootRef.current) return;

      const theme = e.newValue as TDarkMode;

      rootRef.current.dataset.theme = theme;
      setMode(theme);
    };

    window.addEventListener("storage", storageListener);

    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, []);

  const onChangeTheme = useCallback(() => {
    if (!mode || !rootRef.current) return;

    const theme = mode === "light" ? "dark" : "light";

    rootRef.current.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    setMode(theme);
  }, [mode]);

  return [mode, onChangeTheme];
};

export type { TDarkMode };
export default useDarkMode;
