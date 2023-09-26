import React from "react";

import ModalPortal from "@components/modal/ModalPortal";

interface IProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalLayout = ({ children, onClose }: IProps) => {
  return (
    <ModalPortal>
      <>
        <div className="fixed left-0 top-0 z-[60] flex h-full w-full items-center justify-center px-4 py-4">
          <div
            onClick={onClose}
            className="absolute top-0 z-[51] flex h-full w-full items-center justify-center bg-black/30"
          />
          {children}
        </div>
      </>
    </ModalPortal>
  );
};

export default ModalLayout;
