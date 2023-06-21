import { getKeyThemeToCssVariables } from "./utils/getKeyThemeToCssVariables";

const BP = {
  HDPC: "1280px",
  PC: "980px",
  TABLET: "768px",
  MOBILE: "480px",
} as const;

const BOX_SHADOW = {
  box_shadow1: "rgb(0 0 0 / 4%) 0px 4px 16px 0px",
  box_shadow2: "rgb(0 0 0 / 15%) 0px 4px 16px 0px",
} as const;

const COLORS = {
  grey50: "#f9fafb",
  grey100: "#f2f4f6",
  grey200: "#e5e8eb",
  grey300: "#d1d6db",
  grey400: "#b0b8c1",
  grey500: "#8b95a1",
  grey600: "#6b7684",
  grey700: "#4e5968",
  grey800: "#333d4b",
  grey900: "#191f28",

  whiteOpacity50: "rgba(209, 209, 253, 0.05)",
  whiteOpacity100: "rgba(217, 217, 255, 0.11)",
  whiteOpacity200: "rgba(222, 222, 255, 0.19)",
  whiteOpacity300: "rgba(224, 224, 255, 0.27)",
  whiteOpacity400: "rgba(232, 232, 253, 0.36)",
  whiteOpacity500: "rgba(242, 242, 255, 0.47)",
  whiteOpacity600: "rgba(248, 248, 255, 0.6)",
  whiteOpacity700: "rgba(253, 253, 255, 0.75)",
  whiteOpacity800: "rgba(253, 253, 254, 0.89)",
  whiteOpacity900: "rgba(255, 255, 255, 1)",

  green50: "#e5fff4",
  green100: "#abf2d4",
  green200: "#5ae9ad",
  green300: "#1cd98a",
  green400: "#05c072",
  green500: "#00a661",
  green600: "#009959",
  green700: "#008a50",
  green800: "#007544",
  green900: "#005c36",

  red50: "#ffebee",
  red100: "#ffcdd2",
  red200: "#ef9a9a",
  red300: "#e57373",
  red400: "#ef5350",
  red500: "#f44336",
  red600: "#e53935",
  red700: "#d32f2f",
  red800: "#c62828",
  red900: "#b71c1c",

  white: "#ffffff",
  black: "#000000",
} as const;

const lightTheme = {
  primary: "#86caf4",

  background1: "#f2f5f7",
  background2: "#fafafa",
  background3: "#f2f5f780",
  background4: "#23374D",

  font_color1: "#212529",
  font_color2: "#2b4f76",

  border1: "#d7dfe8",

  markdown_code1: "#212529",
  markdown_code2: "#ec4899",
  markdown_background: "#e9ecef",

  effect1: "#569aff",
  effect2: "#dee2e6",
} as const;

const darkTheme = {
  primary: "#c58ff7",

  background1: "#212529",
  background2: "#343a40",
  background3: "#21252980",
  background4: "#444444",

  font_color1: "#f8f9fa",
  font_color2: "#9ca3af",

  border1: "#b4bac2",

  markdown_code1: "#f8f9fa",
  markdown_code2: "#c58ff7",
  markdown_background: "#2d3236",

  effect1: "#569aff",
  effect2: "#495057",
} as const;

const themeByCSSVariables = getKeyThemeToCssVariables(lightTheme);
const colorByCSSVariables = getKeyThemeToCssVariables(COLORS);

const theme = {
  ...themeByCSSVariables,
  ...colorByCSSVariables,
  BOX_SHADOW,
  BP,
} as const;

type TColorType = typeof COLORS;
type ThemeType = typeof theme;
type ThemeKey = keyof ThemeType;

export type { ThemeType, ThemeKey, TColorType };
export { BP, COLORS, theme, lightTheme, darkTheme };
