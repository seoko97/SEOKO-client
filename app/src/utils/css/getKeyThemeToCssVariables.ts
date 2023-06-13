import { ThemeType } from "@/theme";

type TThemeKeyByCssVariable = Record<keyof ThemeType, `var(--${string})`>;

const getKeyThemeToCssVariables = (theme: ThemeType): TThemeKeyByCssVariable => {
  const data = Object.keys(theme) as (keyof ThemeType)[];

  const keyByTheme = data.reduce<TThemeKeyByCssVariable>((keyByTheme, key) => {
    if (theme[key] instanceof Object) return keyByTheme;

    keyByTheme[key] = `var(--${key})`;

    return keyByTheme;
  }, {} as TThemeKeyByCssVariable);

  return keyByTheme;
};

export { getKeyThemeToCssVariables };
