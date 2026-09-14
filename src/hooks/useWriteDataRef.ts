import { type RefObject, useRef, useState } from "react";

interface IWriteDataRef<T extends object> {
  initialData: T;
  dataRef: RefObject<T>;
  updateData: <K extends keyof T>(key: K, value: T[K]) => void;
}

const useWriteDataRef = <T extends object>(initialData: T): IWriteDataRef<T> => {
  const [initialWriteData] = useState(() => initialData);
  const dataRef = useRef<T>(initialWriteData);

  const updateData = <K extends keyof T>(key: K, value: T[K]) => {
    dataRef.current[key] = value;
  };

  return {
    initialData: initialWriteData,
    dataRef,
    updateData,
  };
};
export { useWriteDataRef };
export type { IWriteDataRef };
