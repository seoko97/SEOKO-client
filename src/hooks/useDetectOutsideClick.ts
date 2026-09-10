import { type RefObject, useEffect, useState } from "react";

const useDetectOutsideClick = (el: RefObject<Node | null>, initialState: boolean) => {
  const [isActive, setIsActive] = useState(initialState);

  const onChangeActive = () => {
    setIsActive((prev) => !prev);
  };

  useEffect(() => {
    if (!isActive) return;

    const onClick = (event: MouseEvent) => {
      if (!el.current || el.current.contains(event.target as Node)) return;

      setIsActive(false);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [isActive, el]);

  return [isActive, onChangeActive] as const;
};

export default useDetectOutsideClick;
