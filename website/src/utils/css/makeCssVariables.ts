import { ThemeType } from "@/theme";

interface CssVariables {
  [key: string]: string;
}

const makeCssVariables = (theme: ThemeType) => {
  const data = Object.entries(theme);

  const cssVariables = data.reduce<CssVariables>((cssVariables, [key, value]) => {
    if (typeof value === "object") return cssVariables;

    cssVariables[`--${key}`] = value;

    return {
      ...cssVariables,
      [`--${key}`]: value,
    };
  }, {});

  return cssVariables;
};

export { makeCssVariables };
