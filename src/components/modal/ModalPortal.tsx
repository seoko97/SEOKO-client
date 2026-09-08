import { createPortal } from "react-dom";
import { FC, useRef, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const ModalPortal: FC<Props> = ({ children }) => {
  const modalRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const modal = document.getElementById("modal");

    if (!modal) return;

    const prevOverflow = document.body.style.overflow;

    modalRef.current = modal;
    document.body.style.overflow = "hidden";
    setMounted(true);

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return mounted ? createPortal(children, modalRef.current as HTMLElement) : null;
};

export default ModalPortal;
