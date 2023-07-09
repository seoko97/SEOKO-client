import { useEffect, useState } from "react";

const useAnimation = (condition: boolean) => {
  const [isComplete, setComplete] = useState(false);

  useEffect(() => {
    if (!condition) return;

    setComplete(true);
  }, [condition]);

  const handleTransitionEnd = () => {
    if (condition) return;

    setComplete(false);
  };

  const shouldRender = condition || isComplete;
  const animationTrigger = condition && isComplete;

  return [shouldRender, animationTrigger, handleTransitionEnd] as const;
};

export default useAnimation;
