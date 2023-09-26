import { useRef, useEffect, useCallback } from "react";

type IProps = (targetEl: React.RefObject<HTMLDivElement>, fetchCallback: () => void) => void;

const useInfinityScroll: IProps = (targetEl, fetchCallback) => {
  const observerRef = useRef<IntersectionObserver>();

  const getObserver = useCallback(() => {
    if (!targetEl) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && targetEl.current?.lastElementChild) {
          fetchCallback();
          observerRef.current?.unobserve(targetEl.current.lastElementChild);
        }
      },
      { rootMargin: "0px", threshold: 0.3 },
    );
  }, [fetchCallback, targetEl]);

  useEffect(() => {
    if (!targetEl.current?.lastElementChild) {
      return;
    }

    getObserver();
    observerRef.current?.observe(targetEl.current.lastElementChild);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [targetEl, getObserver, fetchCallback]);
};

export default useInfinityScroll;
