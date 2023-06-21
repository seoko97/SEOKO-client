const getKeyThemeToCssVariables = <T extends object, Q = Record<keyof T, `var(--${string})`>>(
  theme: T,
): Q => {
  const data = Object.keys(theme) as (keyof T)[];

  const keyByTheme = data.reduce<Q>((keyByTheme, key) => {
    if (theme[key] instanceof Object) return keyByTheme;

    keyByTheme[String(key)] = `var(--${String(key)})`;

    return keyByTheme;
  }, {} as Q);

  return keyByTheme;
};

export { getKeyThemeToCssVariables };
