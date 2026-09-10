import { useEffect } from "react";

type IProps = (targetEl: React.RefObject<HTMLDivElement>, fetchCallback: () => void) => void;

const OBSERVER_OPTIONS = {
  rootMargin: "0px",
  threshold: 0.3,
} as const;

const useInfinityScroll: IProps = (targetEl, fetchCallback) => {
  useEffect(() => {
    const target = targetEl.current?.lastElementChild;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        return;
      }

      fetchCallback();
      observer.unobserve(entry.target);
    }, OBSERVER_OPTIONS);

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetEl, fetchCallback]);
};

export default useInfinityScroll;
