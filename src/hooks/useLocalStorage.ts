import { useEffect, useSyncExternalStore } from "react";

const cache = (<T>() => new Map<string, T>())();
const handlers = new Set<(key: string) => unknown>();

const isPrimitive = (value: unknown) => {
  if (typeof value === "number") {
    return true;
  }
  if (typeof value === "string") {
    return true;
  }
  if (typeof value === "boolean") {
    return true;
  }
  return false;
};

function useLocalStorage<T>(key: string) {
  const state = useSyncExternalStore(onSubscribe, onSnapshot, () => undefined);

  useEffect(() => {
    const cachedValue = cache.get(key);

    if (cachedValue !== null && cachedValue !== undefined) {
      return;
    }

    const storedItem = window.localStorage.getItem(key);

    if (storedItem === null || storedItem === undefined) {
      return;
    }

    cache.set(key, storedItem);
  }, []);

  function onSubscribe(onStoreChange: () => unknown) {
    function onChange(cacheKey: string) {
      if (cacheKey !== key) {
        return;
      }

      onStoreChange();
    }

    handlers.add(onChange);

    return () => {
      handlers.delete(onChange);
    };
  }

  function onSnapshot() {
    return cache.get(key) as T;
  }

  function setState(newValue: T) {
    cache.set(key, newValue);

    if (isPrimitive(newValue)) {
      window.localStorage.setItem(key, newValue as string);
    } else {
      window.localStorage.setItem(key, JSON.stringify(newValue));
    }

    handlers.forEach((handler) => handler(key));
  }

  useEffect(() => {
    function onStorage(event: StorageEvent) {
      if (event.key !== key) {
        return;
      }

      handlers.forEach((handler) => handler(key));
    }

    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, [key]);

  return [state, setState] as const;
}

export default useLocalStorage;
