import { type ReactNode, createContext, useContext } from "react";

import { type IWriteDataRef, useWriteDataRef } from "@hooks/write/useWriteDataRef";

interface IWriteDataProviderProps<T extends object> {
  children: ReactNode;
  initialData: T;
}

const createWriteDataContext = <T extends object>() => {
  const WriteDataContext = createContext<IWriteDataRef<T> | null>(null);

  const WriteDataProvider = ({ children, initialData }: IWriteDataProviderProps<T>) => {
    const value = useWriteDataRef(initialData);

    return <WriteDataContext.Provider value={value}>{children}</WriteDataContext.Provider>;
  };

  const useWriteDataContext = () => {
    const context = useContext(WriteDataContext);

    if (!context) {
      throw new Error("useWriteDataContext must be used within WriteDataProvider");
    }

    return context;
  };

  return { WriteDataContext, WriteDataProvider, useWriteDataContext };
};

export { createWriteDataContext };
export type { IWriteDataProviderProps };
