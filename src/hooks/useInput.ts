import { useCallback, useRef } from "react";

interface IProps {
  [key: string]: string;
}

const useInput = <T extends IProps>(input: T) => {
  const inputRef = useRef<T>(input);

  const onChangeValue: React.ChangeEventHandler = useCallback((e) => {
    const target = e.target as HTMLInputElement;

    const type = target.name as keyof typeof inputRef.current;

    inputRef.current[type] = target.value as T[keyof T];
  }, []);

  return [inputRef.current, onChangeValue] as const;
};

export default useInput;
