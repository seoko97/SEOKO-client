import { type RefObject, useCallback, useMemo, useRef } from "react";

interface IWriteDataRef<T extends object> {
  dataRef: RefObject<T>;
  updateData: <K extends keyof T>(key: K, value: T[K]) => void;
}

const useWriteDataRef = <T extends object>(initialData: T): IWriteDataRef<T> => {
  const dataRef = useRef<T>(initialData);

  const updateData = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    dataRef.current[key] = value;
  }, []);

  return useMemo(() => ({ dataRef, updateData }), [updateData]);
};

export { useWriteDataRef };
export type { IWriteDataRef };
