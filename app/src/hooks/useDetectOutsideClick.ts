import { MutableRefObject, useState, useEffect } from "react";
import { useRouter } from "next/router";

const useDetectOutsideClick = (el: MutableRefObject<Node | null>, initialState: boolean) => {
  const router = useRouter();
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
  }, [router.asPath]);

  return [isActive, onChangeActive] as const;
};

export default useDetectOutsideClick;
