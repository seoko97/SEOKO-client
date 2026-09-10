import { createPortal } from "react-dom";
import { FC, useEffect, useSyncExternalStore } from "react";

interface Props {
  children: React.ReactNode;
}

const emptySubscribe = () => () => {};
const getModalElement = () => document.getElementById("modal");
const getServerSnapshot = () => null;

const ModalPortal: FC<Props> = ({ children }) => {
  const modal = useSyncExternalStore(emptySubscribe, getModalElement, getServerSnapshot);

  useEffect(() => {
    if (!modal) {
      return;
    }

    const prevOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [modal]);

  return modal ? createPortal(children, modal) : null;
};

export default ModalPortal;
