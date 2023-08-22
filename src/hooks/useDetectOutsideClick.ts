import { MutableRefObject, useState, useEffect } from "react";

import { usePathname } from "next/navigation";

const useDetectOutsideClick = (el: MutableRefObject<Node | null>, initialState: boolean) => {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(initialState);

  const onChangeActive = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    if (!isActive) return;

    const onClick = (e: MouseEvent) => {
      if (!el.current || el.current.contains(e.target as Node)) return;

      setIsActive(false);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [isActive, el]);

  useEffect(() => {
    setIsActive(false);
  }, [pathname]);

  return [isActive, onChangeActive] as const;
};

export default useDetectOutsideClick;
