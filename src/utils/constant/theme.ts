const THEME = {
  light: "light",
  dark: "dark",
} as const;

const THEME_STORAGE_KEY = "theme";

type TTheme = (typeof THEME)[keyof typeof THEME];

export { THEME, THEME_STORAGE_KEY };
export type { TTheme };
