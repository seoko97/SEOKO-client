import { useEffect } from "react";

import { THEME, type TTheme } from "@utils/constant/theme";
import useThemeStorage from "@hooks/useThemeStorage";

type TDarkMode = TTheme;
type TResult = () => [TDarkMode | undefined, () => void];

const useDarkMode: TResult = () => {
  const [mode, setMode] = useThemeStorage();

  const onChangeTheme = () => {
    if (!mode) return;

    const theme = mode === THEME.light ? THEME.dark : THEME.light;

    setMode(theme);
  };

  useEffect(() => {
    const body = document.body;

    if (!mode || body?.dataset.theme === mode) return;

    body.dataset.theme = mode;
  }, [mode]);

  return [mode, onChangeTheme];
};

export type { TDarkMode };
export default useDarkMode;
