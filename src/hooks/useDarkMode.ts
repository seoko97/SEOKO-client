import { useCallback, useEffect } from "react";

import useLocalStorage from "@hooks/useLocalStorage";

type TDarkMode = "light" | "dark";
type TResult = () => [TDarkMode | undefined, () => void];

const useDarkMode: TResult = () => {
  const [mode, setMode] = useLocalStorage<TDarkMode | undefined>("theme");

  useEffect(() => {
    setMode(document.body.dataset.theme as TDarkMode);
  }, []);

  useEffect(() => {
    if (!mode) return;

    document.body.dataset.theme = mode;
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
