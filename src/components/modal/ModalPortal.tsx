import { createPortal } from "react-dom";
import { FC, useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const ModalPortal: FC<Props> = ({ children }) => {
  const [modal, setModal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const modalElement = document.getElementById("modal");

    if (!modalElement) return;

    const prevOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    setModal(modalElement);

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return modal ? createPortal(children, modal) : null;
};

export default ModalPortal;
