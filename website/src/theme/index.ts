import { getKeyThemeToCssVariables } from "@/utils/css/getKeyThemeToCssVariables";

const BP = {
  HDPC: "1280px",
  PC: "980px",
  TABLET: "768px",
  MOBILE: "480px",
};

const BOX_SHADOW = {
  box_shadow1: "rgb(0 0 0 / 4%) 0px 4px 16px 0px",
  box_shadow2: "rgb(0 0 0 / 15%) 0px 4px 16px 0px",
};

const lightTheme = {
  BP,

  background1: "#F2F5F7",
  background2: "#fafafa",
  background3: "#f2f5f780",
  background4: "#23374D",

  font_color1: "#212529",
  font_color2: "#2b4f76",
  font_color3: "#86caf4",

  border1: "#d7dfe8",

  button1: "#86caf4",
  button2: "#ff4d4f",

  markdown_code1: "#212529",
  markdown_code2: "#ec4899",
  markdown_background: "#e9ecef",

  effect1: "#569aff",
  effect2: "#dee2e6",

  ...BOX_SHADOW,
};

const darkTheme = {
  BP,

  background1: "#212529",
  background2: "#343a40",
  background3: "#21252980",
  background4: "#444444",

  font_color1: "#f8f9fa",
  font_color2: "#9ca3af",
  font_color3: "#c58ff7",

  border1: "#b4bac2",

  button1: "#A076F1",
  button2: "#ff4d4f",

  markdown_code1: "#f8f9fa",
  markdown_code2: "#c58ff7",
  markdown_background: "#2d3236",

  effect1: "#569aff",
  effect2: "#495057",

  ...BOX_SHADOW,
};

const keyByTheme = getKeyThemeToCssVariables(lightTheme);

type ThemeType = typeof lightTheme;
type ThemeKey = typeof keyByTheme;

const theme = {
  ...keyByTheme,
  BP,
};

export { BP, keyByTheme, theme, lightTheme, darkTheme };
export type { ThemeType, ThemeKey };
