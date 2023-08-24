import { useCallback, useEffect, useState } from "react";

type TDarkMode = "light" | "dark";
type TResult = () => [TDarkMode | undefined, () => void];

const useDarkMode: TResult = () => {
  const [mode, setMode] = useState<TDarkMode | undefined>(undefined);

  useEffect(() => {
    setMode(document.body.dataset.theme as TDarkMode);
  }, []);

  useEffect(() => {
    if (!mode) return;

    document.body.dataset.theme = mode;
    localStorage.setItem("theme", mode);
  }, [mode]);

  const onChangeTheme = useCallback(() => {
    if (!mode) return;

    const theme = mode === "light" ? "dark" : "light";

    setMode(theme);
  }, [mode]);

  return [mode, onChangeTheme];
};

export type { TDarkMode };
export default useDarkMode;
