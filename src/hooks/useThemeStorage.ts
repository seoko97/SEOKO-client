import { useEffect, useSyncExternalStore } from "react";

import { THEME, THEME_STORAGE_KEY, type TTheme } from "@utils/constant/theme";

const handlers = new Set<() => void>();
let cachedTheme: TTheme | undefined;
let hasCachedTheme = false;
let hasListener = false;

const isTheme = (value: string | null): value is TTheme =>
  value === THEME.light || value === THEME.dark;

const emitChange = () => {
  handlers.forEach((handler) => handler());
};

const onStorage = (event: StorageEvent) => {
  const isSameStorageArea = event.storageArea === window.localStorage;
  const isThemeKey = event.key !== THEME_STORAGE_KEY && event.key !== null;

  if (!isSameStorageArea || isThemeKey) {
    return;
  }

  if (isTheme(event.newValue)) {
    cachedTheme = event.newValue;
  } else {
    cachedTheme = undefined;
  }

  hasCachedTheme = true;

  emitChange();
};

const onSubscribe = (onStoreChange: () => void) => {
  handlers.add(onStoreChange);

  if (!hasListener) {
    window.addEventListener("storage", onStorage);
    hasListener = true;
  }

  return () => {
    handlers.delete(onStoreChange);

    if (handlers.size === 0 && hasListener) {
      window.removeEventListener("storage", onStorage);
      hasListener = false;
    }
  };
};

const onSnapshot = () => cachedTheme;

const setTheme = (newValue: TTheme) => {
  if (cachedTheme === newValue) {
    return;
  }

  cachedTheme = newValue;
  hasCachedTheme = true;
  window.localStorage.setItem(THEME_STORAGE_KEY, newValue);
  emitChange();
};

const useThemeStorage = () => {
  const state = useSyncExternalStore(onSubscribe, onSnapshot, () => undefined);

  useEffect(() => {
    if (hasCachedTheme) {
      return;
    }

    const storedItem = window.localStorage.getItem(THEME_STORAGE_KEY);
    hasCachedTheme = true;

    if (isTheme(storedItem)) {
      cachedTheme = storedItem;
      emitChange();
    }
  }, []);

  useEffect(() => {
    if (state) {
      return;
    }

    const theme = document.body.dataset.theme ?? THEME.light;

    setTheme(theme as TTheme);
  }, [state]);

  return [state, setTheme] as const;
};

export default useThemeStorage;
